import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SeoReport } from '@/lib/seo-schema'
import { Award, Badge, BarChart3, CheckCircle, ExternalLink, Globe, Lightbulb, TrendingUp } from 'lucide-react';
import React from 'react'
interface Props {
    seoReport: SeoReport
}
export function AdditionalAnalysisGrid({
  seoReport,
}: Props) {
  const contentThemes = (seoReport?.content_analysis?.content_themes || [])
    .map((t) => ({ theme: t.theme, frequency: t.frequency }))
    .filter((t) => typeof t.frequency === "number" && Number.isFinite(t.frequency))
    .sort((a, b) => b.frequency - a.frequency);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {/* Backlink Sources Analysis */}
      <Card className="border bg-gradient-to-br from-card to-card/95">
        <CardHeader className="pb-4 sm:pb-6">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 sm:p-3 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 flex-shrink-0">
              <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-xl sm:text-2xl leading-tight">Backlink Sources</CardTitle>
              <CardDescription className="text-sm sm:text-base mt-1">
                External sources linking to or mentioning entity
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="min-w-0">
          <div className="space-y-4 sm:space-y-6 max-h-[600px] overflow-y-auto pr-2">
            {(seoReport?.backlink_analysis?.backlink_sources || []).length === 0 ? (
              <div className="text-center py-8 bg-muted/20 rounded-xl">
                <Globe className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  No backlink sources found yet.
                </p>
              </div>
            ) : (
              (seoReport?.backlink_analysis?.backlink_sources || []).map((source, index) => {
                const sourceTypeConfig = {
                  educational_citations: {
                    bgClass: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30",
                    borderClass: "border-blue-200 dark:border-blue-800",
                    iconClass: "text-blue-600 dark:text-blue-400",
                    badgeClass: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
                    icon: CheckCircle,
                  },
                  press_coverage: {
                    bgClass: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30",
                    borderClass: "border-purple-200 dark:border-purple-800",
                    iconClass: "text-purple-600 dark:text-purple-400",
                    badgeClass: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
                    icon: TrendingUp,
                  },
                  professional_references: {
                    bgClass: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30",
                    borderClass: "border-green-200 dark:border-green-800",
                    iconClass: "text-green-600 dark:text-green-400",
                    badgeClass: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
                    icon: Award,
                  },
                };

                const config = sourceTypeConfig[
                  source.source_type as keyof typeof sourceTypeConfig
                ] || {
                  bgClass: "bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-950/30 dark:to-slate-950/30",
                  borderClass: "border-gray-200 dark:border-gray-800",
                  iconClass: "text-gray-600 dark:text-gray-400",
                  badgeClass: "bg-gray-100 text-gray-700 dark:bg-gray-900/50 dark:text-gray-300",
                  icon: Globe,
                };

                const IconComponent = config.icon;

                return (
                  <div
                    key={index}
                    className={`p-4 sm:p-6 rounded-xl border ${config.bgClass} ${config.borderClass} hover:shadow-lg transition-all duration-300 group min-w-0`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div
                        className={`p-2 rounded-full bg-white/80 dark:bg-black/20 ${config.iconClass} flex-shrink-0`}
                      >
                        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                          <h4 className="font-bold text-base sm:text-lg leading-tight break-words">
                            {source.title}
                          </h4>
                          <Badge
                            className={`${config.badgeClass} border-0 text-xs sm:text-sm px-2 sm:px-3 py-1 capitalize self-start flex-shrink-0`}
                          >
                            {source.source_type.replace(/_/g, " ")}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed line-clamp-3">
                          {source.description}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          {source.domain && (
                            <span className="text-xs sm:text-sm text-muted-foreground font-medium flex items-center gap-1">
                              <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                              {source.domain}
                            </span>
                          )}
                          {source !== undefined && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs sm:text-sm text-muted-foreground">Authority:</span>
                              <div className="flex items-center gap-1">
                                <div className="w-16 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
                                  <div 
                                    className={`h-1.5 sm:h-2 rounded-full ${config.iconClass.replace('text-', 'bg-')}`}
                                   
                                  />
                                </div>
                                <span className="text-xs font-medium">{source.domain}</span>
                              </div>
                            </div>
                          )}
                          {source.url && (
                            <a 
                              href={source.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                            >
                              Visit source
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Content Themes Analysis */}
      <Card className="border bg-gradient-to-br from-card to-card/95">
        <CardHeader className="pb-4 sm:pb-6">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 sm:p-3 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 flex-shrink-0">
              <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-xl sm:text-2xl leading-tight">Content Themes</CardTitle>
              <CardDescription className="text-sm sm:text-base mt-1">
                Main topics and themes identified in content
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="min-w-0">
          <div className="space-y-4 sm:space-y-6 max-h-[600px] overflow-y-auto pr-2">
            {contentThemes.length === 0 ? (
              <div className="text-center py-8 bg-muted/20 rounded-xl">
                <Lightbulb className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  No content themes identified yet.
                </p>
              </div>
            ) : (
              contentThemes.map((theme, index) => {
                const intensity = theme.frequency / Math.max(...contentThemes.map(t => t.frequency));
                const getThemeColor = (freq: number) => {
                  if (freq >= 80) return {
                    bgClass: "bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30",
                    borderClass: "border-emerald-200 dark:border-emerald-800",
                    iconClass: "text-emerald-600 dark:text-emerald-400",
                    barClass: "bg-emerald-500"
                  };
                  if (freq >= 50) return {
                    bgClass: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
                    borderClass: "border-blue-200 dark:border-blue-800",
                    iconClass: "text-blue-600 dark:text-blue-400",
                    barClass: "bg-blue-500"
                  };
                  return {
                    bgClass: "bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30",
                    borderClass: "border-amber-200 dark:border-amber-800",
                    iconClass: "text-amber-600 dark:text-amber-400",
                    barClass: "bg-amber-500"
                  };
                };

                const colorConfig = getThemeColor(theme.frequency);

                return (
                  <div
                    key={index}
                    className={`p-4 sm:p-6 rounded-xl border ${colorConfig.bgClass} ${colorConfig.borderClass} hover:shadow-lg transition-all duration-300 group min-w-0`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div
                        className={`p-2 rounded-full bg-white/80 dark:bg-black/20 ${colorConfig.iconClass} flex-shrink-0`}
                      >
                        <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                          <h4 className="font-bold text-base sm:text-lg leading-tight break-words capitalize">
                            {theme.theme}
                          </h4>
                          <Badge
                            className={`${colorConfig.iconClass} bg-white/80 dark:bg-black/20 border-0 text-xs sm:text-sm px-2 sm:px-3 py-1 self-start flex-shrink-0`}
                          >
                            {theme.frequency} mentions
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
                            <span>Frequency</span>
                            <span className="font-medium">{theme.frequency}</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-2.5">
                            <div 
                              className={`h-2 sm:h-2.5 rounded-full ${colorConfig.barClass} transition-all duration-500`}
                              style={{width: `${intensity * 100}%`}}
                            />
                          </div>
                          
                          
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdditionalAnalysisGrid;