'use node'
import {internalAction, action} from './_generated/server';
import {v} from 'convex/values';
import {openai} from "@ai-sdk/openai";
import {generateObject} from 'ai';
import {buildAnalysisPrompt, systemPrompt} from "@/prompts/gpt";
import { seoReportSchema

 } from '@/lib/seo-schema';
 import { internal, api } from './_generated/api';



 export const runAnalysis = internalAction({
    args: {
        jobId: v.id("scrapingJobs"),
    },
    returns: v.null(),
    handler: async (ctx , args) => {
        console.log("Starting AI analysis for job:", args.jobId);
        try {
            const job = await ctx.runQuery(api.scrapingJobs.getJobById, {
                jobId: args.jobId,
            });

            if (!job) {
                console.error(`No Job found for job ID: ${args.jobId}` );
                return null;
            }
            if (!job.results || job.results.length === 0) {
                console.error(`No scraping results found for job: ${args.jobId}`);
                await ctx.runMutation(api.scrapingJobs.failJob, {
                    jobId: args.jobId,
                    error: "No scraping results available for analysis",
                });
                return null;
            }


            await ctx.runMutation(api.scrapingJobs.setjobToAnalyzing, {
                jobId: args.jobId,
            });

            const scrapingData = Array.isArray(job.results)
            ? job.results : [job.results];
            const analysisPrompt = buildAnalysisPrompt(scrapingData);
            console.log("Generating SEO Report for job:", args.jobId);

            await ctx.runMutation(internal.scrapingJobs.saveOriginalPrompt, {
                jobId: args.jobId,
                prompt: analysisPrompt,
            });
            console.log("prompt saved for job:", args.jobId);
            const {object: seoReport} = await generateObject({
                model: openai("gpt-5"),
                system: systemPrompt(),
                prompt: analysisPrompt,
                schema: seoReportSchema,
            })
        } catch (error) {
            
        }
    }
 })