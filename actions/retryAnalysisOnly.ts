'use server';

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ConvexHttpClient } from "convex/browser";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL isn't set")
}
export const retryAnalysisOnly = async (jobId: string) => {
 // Initialize convex client
 const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
 try {
    console.log("Starting analysis-only retry for job:", jobId);
    // Trigger the analysis retry action
    await convex.action(api.analysis.retryAnalysisOnly, {
        jobId: jobId as Id<"scrapingJobs">,

    });

    return {
        ok: true,
        message: "Analysis retry started successfully",
    }

 } catch (error) {
console.error("Failed to retry analysis:", error);



await convex.mutation(api.scrapingJobs.failJob, {
    jobId: jobId as Id<"scrapingJobs">,
    error:
    error instanceof Error ? error.message : "Failed to retry analysis",
});

return {
    ok: false,
    error:
    error instanceof Error ? error.message : "Failed to retry analysis",
};
 }
};



export default retryAnalysisOnly
