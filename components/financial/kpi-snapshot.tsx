"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Activity, Target, Users } from "lucide-react"

interface KPIItem {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: React.ReactNode
  description: string
}

export function KPISnapshot() {
  const kpiData: KPIItem[] = [
    {
      title: "Portfolio Value",
      value: "$2,847,293",
      change: "+12.4%",
      changeType: "positive",
      icon: <DollarSign className="h-5 w-5" />,
      description: "Total portfolio value"
    },
    {
      title: "Daily P&L",
      value: "$47,832",
      change: "+3.2%",
      changeType: "positive",
      icon: <Activity className="h-5 w-5" />,
      description: "Today's profit/loss"
    },
    {
      title: "Risk Score",
      value: "7.2",
      change: "-0.8",
      changeType: "positive",
      icon: <Target className="h-5 w-5" />,
      description: "Current risk level (1-10)"
    },
    {
      title: "Active Positions",
      value: "23",
      change: "+2",
      changeType: "neutral",
      icon: <Users className="h-5 w-5" />,
      description: "Number of open positions"
    },
    {
      title: "Sharpe Ratio",
      value: "2.34",
      change: "+0.12",
      changeType: "positive",
      icon: <TrendingUp className="h-5 w-5" />,
      description: "Risk-adjusted returns"
    },
    {
      title: "Max Drawdown",
      value: "4.8%",
      change: "-1.2%",
      changeType: "positive",
      icon: <TrendingDown className="h-5 w-5" />,
      description: "Maximum loss from peak"
    }
  ]

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case "positive":
        return "text-green-400"
      case "negative":
        return "text-red-400"
      default:
        return "text-blue-400"
    }
  }

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case "positive":
        return <TrendingUp className="h-3 w-3" />
      case "negative":
        return <TrendingDown className="h-3 w-3" />
      default:
        return <Activity className="h-3 w-3" />
    }
  }

  const getBadgeClasses = (changeType: string) => {
    switch (changeType) {
      case "positive":
        return "bg-green-500/10 text-green-400 border-green-500/30"
      case "negative":
        return "bg-red-500/10 text-red-400 border-red-500/30"
      default:
        return "bg-blue-500/10 text-blue-400 border-blue-500/30"
    }
  }

  return (
    <Card className="w-full bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 transition-all duration-300 rounded-xl">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-2xl font-mono">
          <div className="p-2 rounded-full bg-primary/10">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          KPI Snapshot
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 px-3 py-1 font-mono text-xs">
            Real-time
          </Badge>
        </CardTitle>
        <p className="text-base text-foreground/70 font-mono">Key performance indicators and metrics</p>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpiData.map((kpi, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-background/20 backdrop-blur-sm border border-border/30 hover:bg-background/30 transition-all duration-300 hover:border-border/50 hover:scale-105"
            >
              {/* Header with icon and title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-all duration-300">
                  {kpi.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground font-mono text-sm">
                    {kpi.title}
                  </h4>
                  <p className="text-xs text-foreground/60 font-mono">
                    {kpi.description}
                  </p>
                </div>
              </div>

              {/* Value */}
              <div className="mb-3">
                <div className="text-2xl font-bold text-foreground font-mono">
                  {kpi.value}
                </div>
              </div>

              {/* Change indicator */}
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className={`${getBadgeClasses(kpi.changeType)} font-mono text-xs px-2 py-1`}
                >
                  <div className="flex items-center gap-1">
                    {getChangeIcon(kpi.changeType)}
                    {kpi.change}
                  </div>
                </Badge>

                <div className="text-xs text-foreground/50 font-mono">
                  24h
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="mt-8 p-6 bg-background/20 backdrop-blur-sm rounded-xl border border-border/30">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-full bg-primary/10 mt-1">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-foreground mb-2 font-mono">Performance Summary</h4>
              <p className="text-sm text-foreground/80 leading-relaxed font-mono mb-4">
                Portfolio showing strong performance with positive daily P&L and improved risk metrics.
                Risk score has decreased indicating better risk management, while maintaining solid returns.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="text-sm font-medium text-green-400 font-mono">ROI</div>
                  <div className="text-lg font-bold text-green-400 font-mono">+18.2%</div>
                </div>
                <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-sm font-medium text-blue-400 font-mono">Volatility</div>
                  <div className="text-lg font-bold text-blue-400 font-mono">12.4%</div>
                </div>
                <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="text-sm font-medium text-purple-400 font-mono">Win Rate</div>
                  <div className="text-lg font-bold text-purple-400 font-mono">73%</div>
                </div>
                <div className="text-center p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                  <div className="text-sm font-medium text-amber-400 font-mono">Correlation</div>
                  <div className="text-lg font-bold text-amber-400 font-mono">0.65</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}