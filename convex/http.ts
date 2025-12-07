import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import {api, internal} from './_generated/api';
import { Id } from "./_generated/dataModel";


const http = httpRouter();

export enum ApiPath {
    Webhook = '/api/webhook'
}

//Webhook endpoint after BirghtData Perplexity scraper completes.
http.route({
    path: ApiPath.Webhook,
    method: "POST",
    handler: httpAction(async (ctx, req) => {
        type Job = {
            _id: Id<"scrapingJobs">;
            originalPrompt: string;
            status: string;
        };

        let job: Job | null = null;
       
try {
    const data = await req.json();
    console.log("Webhook received data:", data);
    const url = new URL(req.url);
    const jobId = url.searchParams.get("jobId");
    if (!jobId) {
        console.error("No job ID found in webhook data:", data);
        return new Response("No job ID found", { status: 400 });
    }

     job = await ctx.runQuery(api.scrapingJobs.getJobById, {
        jobId: jobId as Id<'scrapingJobs'>
    });

    if (!job) {
        console.error(`No job found for job ID: ${jobId}`);
        return new Response("Job not found", { status: 404 });
    }

    // Ensure rawResults is an array (not a boolean)
    const rawResults = Array.isArray(data) ? data : [data];

    await ctx.runMutation(internal.scrapingJobs.saveRawScrapingData, {
        jobId: job._id,
        rawData: rawResults
    });
console.log("Raw scraping data saved for job:", job._id);

await ctx.scheduler.runAfter(0, internal.analysis.runAnalysis, {
    jobId: job._id,
});
console.log(`Analysis scheduled for job ${job._id}, `);
return new Response("Success", {status: 200});

} catch (error) {
    console.error("Error parsing JSON:", error);
   if (job) {
    try {
        await ctx.runMutation(api.scrapingJobs.failJob, {
            jobId: job._id,
            error: error instanceof Error ? error.message : "Unknown error occured during analysis",
        });
        console.log(`Job ${job._id} marked as failed due to analysis error`);
    } catch (error) {
        console.error("Failed to update job status to failed:", error)
    }
   }


   if (error instanceof Error && error.message.includes("schema")) {
    console.error("Schema validation failed - AI response incomplete");
    console.error("Error details:", error.message);
   }
return new Response("Initial Server Error", {status: 500});
}


        
    }),
});


http.route({
    path: '/helloworld',
    method: 'GET',
    handler: httpAction(async (ctx, req ) => {
        const body = await req.bytes();
        return new Response(body, {status: 200})
    })
})

export default http;