'use client'
import { api } from '@/convex/_generated/api';
import { SeoReport } from '@/lib/seo-schema';
import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { AlertTriangle, Loader2, MessageCircle, X } from 'lucide-react';
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import SummaryHeader from './ui/SummaryHeader';
import OverallScoreCard from './ui/OverallScoreCard';
import KeyMetricsGrid from './ui/KeyMetricsGrid';
import AIChat from './ui/AIChat';
import SourceDistributionChart from './ui/SourceDistributionChart';
import CompetitorStrength from './ui/CompetitorStrength';
import RecommendationsCard from './ui/RecommendationsCard';
import KeyWordAnalysisGrid from './ui/KeyWordAnalysisGrid';
import KeyInsightsGrid from './ui/KeyInsightsGrid';
import AdditionalAnalysisGrid from './ui/AdditionalAnalysisGrid';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ReportPage = () => {
  const {id} = useParams<{id: string}>();
  const {user} = useUser();
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const job = useQuery(api.scrapingJobs.getJobBySnapshotId, {
    snapshotId: id || "skip",
    userId: user?.id || "skip"
  });
  
  const seoReport = job?.seoReport as SeoReport | undefined;
  
  if (job === undefined) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <Loader2 className='w-8 h-8 animate-spin text-primary mx-auto mb-4' />
          <p className='text-muted-foreground'>Loading SEO Report...</p>
        </div>
      </div>
    )
  }
  
  if (job === null || !seoReport){
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <AlertTriangle className='h-12 w-12 text-destructive mx-auto mb-4'/>
          <h2 className='text-2xl font-bold mb-2'>Report Not Found</h2>
          <p className='text-muted-foreground'>
            The requested SEO Report could not be found.
          </p>
        </div>
      </div>
    )
  }
  
  return (
    <div className='min-h-screen bg-gradient-to-br from-background to-muted/20 relative'>
      <SummaryHeader seoReport={seoReport}/>
      
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-8 lg:space-y-12'>
        <OverallScoreCard seoReport={seoReport}/>
        <KeyMetricsGrid seoReport={seoReport}/>
        
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8'>
          <SourceDistributionChart seoReport={seoReport}/>
          <CompetitorStrength seoReport={seoReport}/>
        </div>
        
        <RecommendationsCard seoReport={seoReport}/>
        <KeyWordAnalysisGrid seoReport={seoReport}/>
        <KeyInsightsGrid seoReport={seoReport}/>
        <AdditionalAnalysisGrid seoReport={seoReport}/>
      </div>

      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={cn(
          'fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-2xl transition-all duration-300',
          'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700',
          'hover:scale-110 active:scale-95',
          isChatOpen && 'rotate-90'
        )}
        aria-label="Toggle AI Chat"
      >
        {isChatOpen ? (
          <X className='h-6 w-6 text-white' />
        ) : (
          <MessageCircle className='h-6 w-6 text-white' />
        )}
      </Button>

      {/* Notification Badge (optional - shows when chat is closed) */}
      {!isChatOpen && (
        <div className='fixed bottom-[88px] right-6 z-40 animate-bounce'>
          <div className='bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
            AI
          </div>
        </div>
      )}

      {/* Chat Component */}
      <AIChat seoReportId={id} isExpanded={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}

export default ReportPage