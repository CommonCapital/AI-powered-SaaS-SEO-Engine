import { api } from "@/convex/_generated/api";
import { openai } from "@ai-sdk/openai";
import { auth } from "@clerk/nextjs/server";
import { convertToModelMessages, streamObject, streamText, UIMessage } from "ai";
import { ConvexHttpClient } from "convex/browser";


export const maxDuration = 30;


if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL isn't set")
}
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function POST(req: Request) {
const {userId} = await auth();
if (!userId) {
    throw new Error("User ID is not set");


}


const {messages, id,}: {
    messages: UIMessage[];
    id: string;
} = await req.json();

let seoReportData = null;
let systemPrompt = `You are an AI assistant that assists users on comprehending their SEO report.
Provde helpful insights and answer queries based on the SEO report data.`

if (id) {
    try {
        const job = await convex.query(api.scrapingJobs.getJobBySnapshotId, {
            snapshotId: id,
            userId: userId,
        });

        if (job?.seoReport) {
            seoReportData = job.seoReport;
            systemPrompt += `\n\nCURRENT SEO REPORT DATA:\n\n${JSON.stringify(seoReportData, null, 2)}
            You have access to comprehensive SEO report data for ${seoReportData.meta.entity_name || 'the entity'} (${seoReportData.meta.entity_type || "Unknown Type"}).
            -Follow this instruction:
            -Use this data to provide accurate and relevant responses to user queries.
            -Use the web_search tool to answer questions about the SEO report if it will help you provide a better answer.
            -Provide specific data-driven insights based on the actual report data. When referencing metrics, use the exact numbers from the report. Be conversational but informative.
            -On any of the outputs you ship, let’s make sure verbally, it is Managing Partner / CFO tone, voice and feel. No over using dashes or em dashes — it looks like ai slop. Should feel like a top tier, human IC is presenting it. Avoid any sign of it being ai. That’s the key to people’s trust.  
            -Avoid making up data or hallucinating information. If the report data does not contain the answer, respond with "The SEO report data does not provide information on that topic. Do you want me to use the web_search tool to find more information?"

             `
        } else {
            systemPrompt += `n\nNote: SEO report with ID ${id} was found, but analysis may be still in progress or failed. Please check the report status, and consider informing the user accordingly.`
        }
    } catch (error) {
        console.error("Error fetching SEO reports:", error);
        systemPrompt += `\n\nNote: Unable to fetch SEO report data for ID ${id}. The report may not exist or you may  not have access to it.`
    }

    const result = await streamText({
        model: openai("gpt-5"),
        messages: convertToModelMessages(messages),
        system: systemPrompt,
        tools: {
            web_search: openai.tools.webSearch({
                searchContextSize: 'high',
            }) as any,
        },
    });

    return result.toUIMessageStreamResponse();
}
}