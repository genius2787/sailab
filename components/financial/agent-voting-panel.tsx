"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Newspaper, TrendingUp, Building, RefreshCw, MoreVertical } from "lucide-react"
import { CircularGauge } from "@/components/ui/circular-gauge"

interface AgentVote {
  name: string
  icon: React.ReactNode
  sentiment: "Positive" | "Negative" | "Neutral"
  percentage: number
  reasoning: string
  color: string
}

export function AgentVotingPanel() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [expandedView, setExpandedView] = useState(false)

  const handleRefreshVotes = async () => {
    setIsRefreshing(true)
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }

  const getSentimentBadgeClasses = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "bg-green-500/10 text-green-400 border-green-500/30"
      case "negative":
        return "bg-red-500/10 text-red-400 border-red-500/30"
      default:
        return "bg-blue-500/10 text-blue-400 border-blue-500/30"
    }
  }

  const agentVotes: AgentVote[] = [
    {
      name: "RL Agent",
      icon: <Brain className="h-4 w-4" />,
      sentiment: "Negative",
      percentage: 72,
      reasoning: "Short-term momentum weak, downtrend continuing",
      color: "negative",
    },
    {
      name: "News Agent",
      icon: <Newspaper className="h-4 w-4" />,
      sentiment: "Neutral",
      percentage: 68,
      reasoning: "Mixed signals from news, cautious outlook prevailing",
      color: "neutral",
    },
    {
      name: "Financial Agent",
      icon: <TrendingUp className="h-4 w-4" />,
      sentiment: "Positive",
      percentage: 85,
      reasoning: "Strong earnings and revenue, fundamentals solid",
      color: "positive",
    },
    {
      name: "Institutional Agent",
      icon: <Building className="h-4 w-4" />,
      sentiment: "Positive",
      percentage: 78,
      reasoning: "Average price target +15%, institutions bullish",
      color: "positive",
    },
  ]

  return (
    <Card className="w-full bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 transition-all duration-300 rounded-xl">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-2xl font-mono">
            <div className="p-2 rounded-full bg-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            Agent Voting Panel
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 px-4 py-2 font-mono font-semibold">
              4 Agents Active
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefreshVotes}
              disabled={isRefreshing}
              className="border-border/40 hover:bg-background/50 transition-all duration-200 text-foreground/80 hover:text-foreground font-mono"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Updating...' : 'Refresh'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExpandedView(!expandedView)}
              className="border-border/40 hover:bg-background/50 transition-all duration-200 text-foreground/80 hover:text-foreground"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-base text-foreground/70 mt-2 font-mono">Multi-modal analysis by 4 AI agents</p>
      </CardHeader>

      <CardContent>
        {/* 4-grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agentVotes.map((agent, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-background/20 backdrop-blur-sm border border-border/30 hover:bg-background/30 cursor-pointer transition-all duration-300 hover:border-border/50"
              onClick={() => setSelectedAgent(agent.name)}
            >
              {/* Agent name and icon */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  {agent.icon}
                </div>
                <h4 className="font-bold text-lg text-foreground group-hover:text-foreground/90 transition-colors duration-300 font-mono">
                  {agent.name}
                </h4>
              </div>

              {/* Sentiment and confidence */}
              <div className="flex items-center justify-between mb-4">
                <Badge
                  variant="outline"
                  className={`${getSentimentBadgeClasses(agent.sentiment)} font-mono`}
                >
                  {agent.sentiment}
                </Badge>
                <div className="transition-transform duration-300 hover:scale-105">
                  <CircularGauge
                    value={agent.percentage}
                    size={56}
                    strokeWidth={8}
                    showPercentText={false}
                    label={<span className="text-xs text-foreground font-bold font-mono">{agent.percentage}%</span>}
                  />
                </div>
              </div>

              {/* Reasoning */}
              <div className="text-sm text-foreground/70 leading-relaxed font-mono">
                {agent.reasoning}
              </div>
            </div>
          ))}
        </div>

        {/* Consensus summary */}
        <div className="mt-8 p-6 bg-background/20 backdrop-blur-sm rounded-xl border border-border/30">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-full bg-primary/10 mt-1">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-3 flex-1">
              <h4 className="text-xl font-bold text-foreground font-mono">Consensus Summary</h4>
              <p className="text-base text-foreground/80 leading-relaxed font-mono">
                Agents are split in opinion. Fundamental analysts are bullish, technical analysts bearish.
                News analysis remains neutral, requiring careful judgment in this situation.
              </p>
              <div className="flex items-center gap-3 pt-2 flex-wrap">
                <div className="px-4 py-2 bg-green-500/10 rounded-full text-sm font-medium text-green-400 border border-green-500/20 font-mono">
                  50% Positive
                </div>
                <div className="px-4 py-2 bg-red-500/10 rounded-full text-sm font-medium text-red-400 border border-red-500/20 font-mono">
                  25% Negative
                </div>
                <div className="px-4 py-2 bg-blue-500/10 rounded-full text-sm font-medium text-blue-400 border border-blue-500/20 font-mono">
                  25% Neutral
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}