'use client'
import { initiateLLM } from '@/actions/initialeLLM';
import { Card, CardHeader } from '@/components/ui/card';
import { api } from '@/convex/_generated/api';
import {useUser} from '@clerk/nextjs'
import { useQuery } from 'convex/react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation'
import React, { useState, useTransition } from 'react'

function ReportPage() {
  const {id} = useParams<{id: string}>();
  const {user} = useUser();
  const job = useQuery(api.scrapingJobs.getJobBySnapshotId, {
    snapshotId: id || "skip",
    userId: user?.id || "skip"
  });
  const [isPending, startTransition] = useTransition();
  const [retryError, setRetryError ] = useState<string | null>(null);
  const router = useRouter();
  const handleRetry = () => {
    if (!job) return;

    setRetryError(null);
    startTransition(async () => {
      try {
        const result = await initiateLLM(job.originalPrompt, job._id);
        if (result.ok) {
          if (result.smartRetry) {
            console.log("Smart retry initiated - staying on current page");
            return;
          } else if (result.data?.snapshotId) {
            router.replace(`/dashboard/report/${result.data.snapshotId}`);
            return;
          }
        } else {
          setRetryError(result.error || "Failed to retry job");

        }
      } catch (error) {
        setRetryError( error instanceof Error ? error.message : "Unknown error occured");
      }
    })
  }
  if (!id) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
<Loader2 className='w-6 h-6 animate-spin mr-2' />
<span className='text-muted-foreground'>...Loading</span>
      </div>
    )
  }


  if (job === undefined) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
<Loader2 className='w-6 h-6 animate-spin mr-2' />
<span className='text-muted-foreground'>Loading report status...</span>
      </div>
    )
  }

  if (job === null) {
    <div className='flex items-center justify-center min-h-screen'>
<AlertCircle className='w-6 h-6 animate-spin mr-2' />
<span className='text-muted-foreground'>Report not found</span>
      </div>
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-muted/20'>
      <div className='mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8'>
<div className='space-y-6'>
{/** Header */}
<div className='text-center'>
<h1 className='text-3xl font-bold tracking-tight sm:text-4xl mb-4'>
Report Status
</h1>
<p className='text-lg text-muted-foreground'> 
Track the progress of your SEO report generation
</p>
</div>

{/** Status Card */}
<Card className='w-full max-w-2xl mx-auto'>
  <CardHeader className='text-center'>
    <div className='flex flex-col items-center justify-center mb-4'>
      {(job?.status === 'pending' || job?.status === "running" || job?.status==="analyzing") && (
        <Loader2 className={`w-5 h-5 animate-spin `} />
      )}
    </div>
  </CardHeader>
</Card>


</div>
      </div>
    </div>
  )
}

export default ReportPage