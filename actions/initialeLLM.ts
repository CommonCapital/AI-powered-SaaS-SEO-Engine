'use server'

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { auth } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import retryAnalysisOnly from "./retryAnalysisOnly";
import { buildPerplexityPrompt } from "@/prompts/perplexity";
import { ApiPath } from "@/lib/constant";

export async function initiateLLM(prompt: string, existingJobId?: string, country = "US") {
    if (!process.env.BRIGHTDATA_API_KEY) {
  throw new Error('BRIGHTDATA_API_KEY is not set in environment');
}

if (!process.env.NEXT_PUBLIC_CONVEX_URL!)
{
    throw new Error("NEXT_PUBLIC_CONVEX_URL isn't set")
    
}
const {userId} = await auth()
if (!userId) {
    throw new Error("User ID is required")
}

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);


let jobId: string;
if (existingJobId) {
    const retryInfo = await convex.query(api.scrapingJobs.canUseSmartRetry, {
        jobId: existingJobId as Id<"scrapingJobs">,
        userId: userId
    });


if (retryInfo.canRetryAnalysisOnly) {
    console.log("Using smart retry - analysis only for jobs:", existingJobId);
   
    const result = await retryAnalysisOnly(existingJobId);
    if (result.ok) {
        return {
            ok: true,
            data: {snapshot_id: true},
            jobId: existingJobId,
            smartRetry: true,
        };
    } else {
        return {
            ok: false,
            error: result.error || "Smart retry failed",
        };
    }

} else {
    console.log("Full retry required for job:", existingJobId);
    await convex.mutation(api.scrapingJobs.retryJob, {
        jobId: existingJobId as Id<"scrapingJobs">,
    });
    jobId = existingJobId;
}
} else {
    // Create new job record in the database
    jobId = await convex.mutation(api.scrapingJobs.createScrappingJob, {
        originalPrompt: prompt,
        userId: userId
    })
}



const ENDPOINT = `${process.env.NEXT_PUBLIC_CONVEX_SITE_URL}${ApiPath.Webhook}?jobId=${jobId}`;
const encodeEndpoint = encodeURIComponent(ENDPOINT);
 const url = `https://api.brightdata.com/datasets/v3/trigger?dataset_id=${process.env.BRIGHTDATA_DATASET_ID}&endpoint=${encodeEndpoint}&format=json&uncompressed_webhook=true&include_errors=true`


 const perplexityPrompt = buildPerplexityPrompt(prompt);
 try {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.BRIGHTDATA_API_KEY}`,
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            input: [
                {
                    url: "https://www.perplexity.ai",
                    prompt: perplexityPrompt,
                    country: country,
                    index: 1,
                },
            ],
            custom_output_fields: [
                'url',
                'prompt',
                'answer_text',
                'sources',
                'citations',
                'timestamp',
                "input",
            ],
        }),
    });
    if (!response.ok) {
        const text = await response.text().catch(() => "");

        await convex.mutation(api.scrapingJobs.failJob, {
            jobId: jobId as Id<"scrapingJobs">,
            error: `HTTP ${response.status} ${response.statusText}${text ? `: ${text}` : ""}`,

        });
        return {
            ok: false,
            error: `HTTP ${response.status} ${response.statusText}${text ? `: ${text}` : ""}`,
        };
    }


    const data = await response.json().catch(() => null);
    if (data && data.snapshot_id) {
        await convex.mutation(api.scrapingJobs.updateJobWithSnapshotId, {
            jobId: jobId as Id<"scrapingJobs">,
            snapshotId: data.snapshot_id,
        });
    }


    return {ok: true, data, jobId}
 } catch (error) {
    await convex.mutation(api.scrapingJobs.failJob, {
        jobId: jobId as Id<"scrapingJobs">,
        error: error instanceof Error ? error.message : String(error)
    });
    return {
        ok: false,
        error: error instanceof Error ? error.message : String(error)
    };
 }
}