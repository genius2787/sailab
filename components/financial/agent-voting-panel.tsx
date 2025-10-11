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

interface AgentVotingPanelProps {
  agentResults?: {
    rlAgent?: string
    financialAgent?: string
    newsAgent?: string
    institutionalAgent?: string
  }
  isLoading?: boolean
}

export function AgentVotingPanel({ agentResults, isLoading = false }: AgentVotingPanelProps) {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [expandedView, setExpandedView] = useState(false)

  // Debug logging
  console.log('[AgentVotingPanel] agentResults:', agentResults);
  console.log('[AgentVotingPanel] isLoading:', isLoading);

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

  // Parse agent results and create voting data
  const parseAgentResults = () => {
    const defaultVote = {
      sentiment: "Neutral" as const,
      percentage: 50,
      reasoning: "No analysis available",
      color: "neutral"
    };

    // Parse RL Agent results
    const rlAgent = agentResults?.rlAgent ? {
      sentiment: agentResults.rlAgent.toLowerCase().includes('sell') ? "Negative" as const : 
                 agentResults.rlAgent.toLowerCase().includes('buy') ? "Positive" as const : "Neutral" as const,
      percentage: agentResults.rlAgent.includes('60%') ? 60 : 
                  agentResults.rlAgent.includes('80%') ? 80 : 70,
      reasoning: agentResults.rlAgent.substring(0, 120) + "...",
      color: agentResults.rlAgent.toLowerCase().includes('sell') ? "negative" : 
             agentResults.rlAgent.toLowerCase().includes('buy') ? "positive" : "neutral"
    } : defaultVote;

    // Parse Financial Agent results
    const financialAgent = agentResults?.financialAgent ? {
      sentiment: agentResults.financialAgent.toLowerCase().includes('increase') || 
                 agentResults.financialAgent.toLowerCase().includes('growth') ? "Positive" as const : "Neutral" as const,
      percentage: 80,
      reasoning: agentResults.financialAgent.substring(0, 120) + "...",
      color: "positive"
    } : defaultVote;

    // Parse News Agent results
    const newsAgent = agentResults?.newsAgent ? {
      sentiment: agentResults.newsAgent.toLowerCase().includes('positive') ? "Positive" as const :
                 agentResults.newsAgent.toLowerCase().includes('negative') ? "Negative" as const : "Neutral" as const,
      percentage: 65,
      reasoning: agentResults.newsAgent.substring(0, 120) + "...",
      color: agentResults.newsAgent.toLowerCase().includes('positive') ? "positive" :
             agentResults.newsAgent.toLowerCase().includes('negative') ? "negative" : "neutral"
    } : defaultVote;

    // Parse Institutional Agent results
    const institutionalAgent = agentResults?.institutionalAgent ? {
      sentiment: agentResults.institutionalAgent.toLowerCase().includes('optimistic') || 
                 agentResults.institutionalAgent.toLowerCase().includes('target') ? "Positive" as const : "Neutral" as const,
      percentage: 70,
      reasoning: agentResults.institutionalAgent.substring(0, 120) + "...",
      color: "positive"
    } : defaultVote;

    return { rlAgent, financialAgent, newsAgent, institutionalAgent };
  };

  const { rlAgent, financialAgent, newsAgent, institutionalAgent } = parseAgentResults();

  const agentVotes: AgentVote[] = [
    {
      name: "RL Agent",
      icon: <Brain className="h-4 w-4" />,
      ...rlAgent,
    },
    {
      name: "Financial Agent",
      icon: <TrendingUp className="h-4 w-4" />,
      ...financialAgent,
    },
    {
      name: "News Agent",
      icon: <Newspaper className="h-4 w-4" />,
      ...newsAgent,
    },
    {
      name: "Institutional Agent",
      icon: <Building className="h-4 w-4" />,
      ...institutionalAgent,
    },
  ]

  // Show loading state or default state
  if (isLoading) {
    return (
      <Card className="w-full bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 transition-all duration-300 rounded-xl">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-2xl font-mono">
            <div className="p-2 rounded-full bg-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            Agent Voting Panel
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 px-4 py-2 font-mono font-semibold">
              Analyzing...
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-foreground/70 font-mono">Agents are analyzing your selected stocks...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

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
              {agentResults && (agentResults.rlAgent || agentResults.financialAgent || agentResults.newsAgent || agentResults.institutionalAgent) 
                ? `${agentVotes.filter(agent => agent.reasoning !== "No analysis available").length} Agents Active`
                : "4 Agents Ready"
              }
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
              {(() => {
                // Calculate consensus based on agent votes
                const positiveCount = agentVotes.filter(agent => agent.sentiment === "Positive").length;
                const negativeCount = agentVotes.filter(agent => agent.sentiment === "Negative").length;
                const neutralCount = agentVotes.filter(agent => agent.sentiment === "Neutral").length;
                const totalAgents = agentVotes.length;
                
                const positivePercent = Math.round((positiveCount / totalAgents) * 100);
                const negativePercent = Math.round((negativeCount / totalAgents) * 100);
                const neutralPercent = Math.round((neutralCount / totalAgents) * 100);
                
                let consensusText = "";
                if (positivePercent > 60) {
                  consensusText = "Agents show strong positive consensus. Most indicators suggest bullish sentiment.";
                } else if (negativePercent > 60) {
                  consensusText = "Agents show strong negative consensus. Most indicators suggest bearish sentiment.";
                } else if (positivePercent > negativePercent) {
                  consensusText = "Agents lean positive overall. Mixed signals but slightly bullish bias.";
                } else if (negativePercent > positivePercent) {
                  consensusText = "Agents lean negative overall. Mixed signals but slightly bearish bias.";
                } else {
                  consensusText = "Agents show mixed opinions. Careful evaluation and risk management required.";
                }
                
                return (
                  <>
                    <p className="text-base text-foreground/80 leading-relaxed font-mono">
                      {consensusText}
                    </p>
                    <div className="flex items-center gap-3 pt-2 flex-wrap">
                      {positivePercent > 0 && (
                        <div className="px-4 py-2 bg-green-500/10 rounded-full text-sm font-medium text-green-400 border border-green-500/20 font-mono">
                          {positivePercent}% Positive
                        </div>
                      )}
                      {negativePercent > 0 && (
                        <div className="px-4 py-2 bg-red-500/10 rounded-full text-sm font-medium text-red-400 border border-red-500/20 font-mono">
                          {negativePercent}% Negative
                        </div>
                      )}
                      {neutralPercent > 0 && (
                        <div className="px-4 py-2 bg-blue-500/10 rounded-full text-sm font-medium text-blue-400 border border-blue-500/20 font-mono">
                          {neutralPercent}% Neutral
                        </div>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}