"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CircularGauge } from "@/components/ui/circular-gauge"
import { TrendingUp, TrendingDown, Minus, Clock, Shield, AlertTriangle, Database, Wifi, WifiOff } from "lucide-react"
import { useState } from "react"

interface MarketSentiment {
  overallSentiment: "positive" | "negative" | "neutral"
  confidenceScore: number
  suggestedAction: string
  biasNote: string
  consensusStrength: number
  volatilityIndex: number
  timestamp: Date
  lastUpdated: Date
  dataSource: string
  confidence: number
  conflictDetected: boolean
}

interface DataSourceInfo {
  source: string
  lastUpdated: Date
  isRealTime: boolean
  confidence: number
  delay: number
  status: string
  reliability: string
}

interface SummaryZoneProps {
  isLoading?: boolean
  error?: string
  className?: string
  selectedStocks?: string[]
  analysisResults?: any
}

export function SummaryZone({ isLoading = false, error, className, selectedStocks = [], analysisResults }: SummaryZoneProps) {
  console.log('[SummaryZone] selectedStocks:', selectedStocks);
  console.log('[SummaryZone] analysisResults:', analysisResults);
  
  // Mock data - in real app, this would come from props or API
  const marketSentiment: MarketSentiment = {
    overallSentiment: "neutral",
    confidenceScore: 73,
    suggestedAction: "hold",
    biasNote: "エージェント間で意見が分岐、慎重な評価が必要",
    consensusStrength: 65,
    volatilityIndex: 18.4,
    timestamp: new Date(),
    lastUpdated: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
    dataSource: "Multi-agent AI consensus",
    confidence: 87,
    conflictDetected: true
  }

  const dataSource: DataSourceInfo = {
    source: "SAIL Lab Trading API",
    lastUpdated: marketSentiment.lastUpdated,
    isRealTime: true,
    confidence: 87,
    delay: 0,
    status: "real-time",
    reliability: "high"
  }

  const getSentimentColorClasses = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
      case "bullish":
        return {
          text: "text-green-400",
          background: "from-green-500/20 to-green-600/10",
          border: "border-green-500/30"
        }
      case "negative":
      case "bearish":
        return {
          text: "text-red-400",
          background: "from-red-500/20 to-red-600/10",
          border: "border-red-500/30"
        }
      default:
        return {
          text: "text-blue-400",
          background: "from-blue-500/20 to-blue-600/10",
          border: "border-blue-500/30"
        }
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    const colors = getSentimentColorClasses(sentiment)
    switch (sentiment.toLowerCase()) {
      case "positive":
      case "bullish":
        return <TrendingUp className={`h-5 w-5 ${colors.text}`} />
      case "negative":
      case "bearish":
        return <TrendingDown className={`h-5 w-5 ${colors.text}`} />
      default:
        return <Minus className={`h-5 w-5 ${colors.text}`} />
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60)
    return `${diff}分前`
  }

  if (isLoading) {
    return (
      <Card className={`w-full bg-card/60 backdrop-blur-sm border-border/40 ${className}`}>
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <div className="text-sm font-medium text-foreground/70">Loading market analysis...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={`w-full bg-red-500/10 backdrop-blur-sm border border-red-500/30 ${className}`}>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center space-y-2">
            <AlertTriangle className="h-8 w-8 text-red-500 mx-auto" />
            <div className="text-sm font-medium text-red-400">Failed to load market data</div>
            <div className="text-xs text-red-300">{error}</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // If no stocks analyzed yet, show placeholder
  if (selectedStocks.length === 0) {
    return (
      <Card className={`w-full bg-card/60 backdrop-blur-sm border-border/40 ${className}`}>
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">📊</div>
            <div className="text-xl font-bold font-mono text-foreground">No Analysis Yet</div>
            <div className="text-sm text-foreground/60 font-mono max-w-md">
              Select up to 3 stocks above and click "Analyze Selected Stocks" to view AI-powered analysis
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`w-full bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 transition-all duration-300 ${className}`}>
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-3 text-3xl font-mono mb-2">
              Summary of Your Selected{' '}
              <span className="text-yellow-500">{selectedStocks.join(', ')}</span>
              <div className="p-2 rounded-full bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              {marketSentiment.conflictDetected && (
                <Badge variant="destructive" className="ml-2 text-xs px-2 py-1 bg-amber-500/10 text-amber-600 border-amber-500/30">
                  ⚠ Conflict
                </Badge>
              )}
            </CardTitle>
            <p className="text-lg text-foreground/70 font-mono">
              Multi-Agent AI {selectedStocks.length === 1 ? 'Stock' : 'Portfolio'} Sentiment Analysis
            </p>
          </div>
          <div className="flex items-center gap-2">
            {dataSource.status === 'real-time' ? (
              <Wifi className="h-4 w-4 text-green-400" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-400" />
            )}
            <span className="text-sm text-foreground/60 font-mono">Real-time</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8">
          {/* Judgment & Action */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className={`p-2 rounded-full bg-gradient-to-br ${getSentimentColorClasses(marketSentiment.overallSentiment).background}`}>
                {getSentimentIcon(marketSentiment.overallSentiment)}
              </div>
              <Badge variant="outline" className={`${getSentimentColorClasses(marketSentiment.overallSentiment).border} ${getSentimentColorClasses(marketSentiment.overallSentiment).text} font-mono`}>
                {marketSentiment.overallSentiment.toUpperCase()}
              </Badge>
            </div>
            <Badge variant="outline" className="px-4 py-2 bg-primary/10 text-primary border-primary/30 font-mono">
              Action: {marketSentiment.suggestedAction.toUpperCase()}
            </Badge>
            <div className="text-base text-foreground/90 font-mono leading-relaxed">
              {marketSentiment.biasNote}
            </div>
            <div className="text-sm text-foreground/70 font-mono">
              Consensus: <span className="font-semibold text-primary">
                {marketSentiment.consensusStrength}%
              </span>
              {" • VIX: "}
              <span className="font-mono text-foreground/80">{marketSentiment.volatilityIndex}</span>
            </div>
          </div>

          {/* Confidence Ring */}
          <div className="flex justify-center">
            <div className="transition-transform duration-300 hover:scale-105">
              <CircularGauge
                value={marketSentiment.confidenceScore}
                size={140}
                strokeWidth={12}
                label={<span className="text-base font-semibold font-mono">Confidence</span>}
                sublabel={
                  <span className="text-sm font-medium font-mono">
                    {marketSentiment.confidenceScore >= 80 ? 'High' :
                     marketSentiment.confidenceScore >= 60 ? 'Medium' : 'Low'} Accuracy
                  </span>
                }
              />
            </div>
          </div>

          {/* Time Context & Data Status */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-background/20 backdrop-blur-sm border border-border/30">
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground/70 font-mono">Data Source</span>
              </div>
              <div className="text-sm font-bold font-mono text-foreground">
                {dataSource.source}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-background/20 backdrop-blur-sm border border-border/30">
              <div className="text-sm text-foreground/70 font-mono mb-1">Last Update</div>
              <div className="text-sm font-bold text-foreground font-mono">
                {formatTime(dataSource.lastUpdated)}
              </div>
              <div className="text-xs text-foreground/60 font-mono mt-1">
                {dataSource.lastUpdated.toLocaleTimeString()}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-background/20 backdrop-blur-sm border border-border/30">
              <div className="text-sm text-foreground/70 font-mono mb-1">System Status</div>
              <div className="text-sm font-bold font-mono text-green-400">
                Active
              </div>
              <div className="text-xs text-foreground/60 font-mono mt-1">
                4 AI Agents Online
              </div>
            </div>
          </div>
        </div>

        {/* Market Analysis Summary */}
        <div className="p-6 bg-background/20 backdrop-blur-sm rounded-xl border border-border/30 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-3 h-3 rounded-full bg-primary mt-3 flex-shrink-0 animate-pulse" />
            <div className="flex-1">
              <h4 className="text-lg font-bold text-foreground mb-2 font-mono">Market Analysis Summary</h4>
              <p className="text-base text-foreground/80 leading-relaxed mb-4 font-mono">
                {marketSentiment.biasNote}
              </p>

              <div className="flex items-center justify-between flex-wrap gap-4 mt-4 pt-4 border-t border-border/20">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-medium text-foreground/70 font-mono">Confidence:</span>
                    <Badge variant="outline" className="text-xs px-2 py-1 bg-green-400/10 text-green-400 border-green-400/30">
                      HIGH
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary border border-primary/20 font-mono">
                    SAIL Lab AI
                  </div>
                  <div className="px-3 py-1 bg-foreground/10 rounded-full text-xs font-medium text-foreground/70 font-mono">
                    Real-time
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trading Agent Results */}
        {analysisResults && Object.keys(analysisResults).length > 0 && (
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-foreground font-mono">🤖 Trading Agent Analysis Results</h4>
            {Object.entries(analysisResults).map(([stock, data]: [string, any]) => (
              <div key={stock} className="p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-xl border border-yellow-500/30">
                <h5 className="text-xl font-bold text-yellow-500 mb-4 font-mono">{stock}</h5>
                
                {data.financial && data.financial !== 'N/A' && (
                  <div className="mb-4">
                    <div className="text-sm font-bold text-foreground/80 mb-2 font-mono">📊 Financial Analysis:</div>
                    <div className="bg-background/50 rounded-lg p-4 max-h-60 overflow-y-auto">
                      <pre className="text-xs font-mono text-foreground/90 whitespace-pre-wrap">{data.financial}</pre>
                    </div>
                  </div>
                )}
                
                {data.news && data.news !== 'N/A' && (
                  <div className="mb-4">
                    <div className="text-sm font-bold text-foreground/80 mb-2 font-mono">📰 News Analysis:</div>
                    <div className="bg-background/50 rounded-lg p-4 max-h-60 overflow-y-auto">
                      <pre className="text-xs font-mono text-foreground/90 whitespace-pre-wrap">{data.news}</pre>
                    </div>
                  </div>
                )}
                
                {data.rawOutput && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm font-bold text-foreground/60 hover:text-foreground font-mono">🔍 View Raw Output</summary>
                    <div className="mt-2 bg-background/50 rounded-lg p-4 max-h-40 overflow-y-auto">
                      <pre className="text-xs font-mono text-foreground/70 whitespace-pre-wrap">{data.rawOutput}</pre>
                    </div>
                  </details>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}