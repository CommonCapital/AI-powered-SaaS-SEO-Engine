import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { SeoReport } from '@/lib/seo-schema'
import { Globe } from 'lucide-react';
import React from 'react'
import { Cell, Pie, PieChart } from 'recharts';

interface Props {
  seoReport: SeoReport
}

const SourceDistributionChart = ({seoReport}: Props) => {
  const sourceTypeEntries = (() => {
    const st = seoReport.inventory.source_types as | Record<string, Array<unknown>> | undefined;
    if (!st) return [] as Array<{name: string; value: number; color: string}>;
    
    const palette = [
      '#3b82f6',
      '#10b981',
      '#f59e0b',
      '#ef4444',
      '#8b5cf6',
      '#06b6d4',
      '#22c55e',
      '#a855f7',
      '#f97316',
    ];
    
    return Object.entries(st)
      .filter(([, arr]) => Array.isArray(arr) && arr.length > 0)
      .map(([name, arr], index) => ({
        name,
        value: (arr as Array<unknown>).length,
        color: palette[index % palette.length]
      }));
  })();

  if (sourceTypeEntries.length === 0) {
    return null;
  }

  const totalSources = sourceTypeEntries.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <Card className='xl:col-span-2 border bg-gradient-to-br from-card to-card/95'>
      <CardHeader className="pb-6">
        <div className='flex items-center gap-3'>
          <div className='p-2 rounded-full bg-primary/10'>
            <Globe className="h-5 w-5 text-primary"/>
          </div>
          <div>
            <CardTitle className='text-xl'>Source Types Distribution</CardTitle>
            <CardDescription className='text-base'>
              Breakdown of data sources by type and volume
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className='grid md:grid-cols-2 gap-8 items-center'>
          {/* Chart */}
          <ChartContainer
            config={Object.fromEntries(
              sourceTypeEntries.map((e) => [
                e.name,
                {label: e.name, color: e.color}
              ])
            )}
            className='h-[350px] w-full'
          >
            <PieChart>
              <Pie
                data={sourceTypeEntries}
                dataKey='value'
                nameKey='name'
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                paddingAngle={8}
                strokeWidth={2}
                stroke="hsl(var(--background))"
              >
                {sourceTypeEntries.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
          
          {/* Legend */}
          <div className='space-y-4'>
            <div className='mb-6'>
              <div className='text-sm text-muted-foreground mb-1'>Total Sources</div>
              <div className='text-3xl font-bold'>{totalSources}</div>
            </div>
            
            <div className='space-y-3'>
              {sourceTypeEntries
                .sort((a, b) => b.value - a.value)
                .map((entry) => {
                  const percentage = ((entry.value / totalSources) * 100).toFixed(1);
                  
                  return (
                    <div key={entry.name} className='space-y-2'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <div 
                            className='w-3 h-3 rounded-full' 
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className='font-medium capitalize text-sm'>
                            {entry.name.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <div className='flex items-center gap-3'>
                          <span className='text-sm text-muted-foreground'>
                            {percentage}%
                          </span>
                          <span className='font-semibold text-sm min-w-[2rem] text-right'>
                            {entry.value}
                          </span>
                        </div>
                      </div>
                      
                      {/* Progress bar */}
                      <div className='h-2 bg-muted rounded-full overflow-hidden'>
                        <div 
                          className='h-full rounded-full transition-all duration-500'
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: entry.color 
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SourceDistributionChart