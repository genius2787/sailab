"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, TrendingUp, TrendingDown, AlertCircle } from "lucide-react"

interface NewsItem {
  id: string
  title: string
  time: string
  impact: "high" | "medium" | "low"
  sentiment: "positive" | "negative" | "neutral"
  source: string
}

export function NewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const newsItems: NewsItem[] = [
    {
      id: "1",
      title: "Federal Reserve signals potential rate cuts in 2025",
      time: "2 min ago",
      impact: "high",
      sentiment: "positive",
      source: "Reuters"
    },
    {
      id: "2",
      title: "AI chip demand surges as tech companies expand infrastructure",
      time: "5 min ago",
      impact: "high",
      sentiment: "positive",
      source: "Bloomberg"
    },
    {
      id: "3",
      title: "Energy sector faces headwinds amid regulatory changes",
      time: "8 min ago",
      impact: "medium",
      sentiment: "negative",
      source: "CNBC"
    },
    {
      id: "4",
      title: "Cryptocurrency market shows signs of institutional adoption",
      time: "12 min ago",
      impact: "medium",
      sentiment: "positive",
      source: "Financial Times"
    },
    {
      id: "5",
      title: "Supply chain disruptions affect global manufacturing",
      time: "15 min ago",
      impact: "high",
      sentiment: "negative",
      source: "Wall Street Journal"
    }
  ]

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === newsItems.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [newsItems.length, isPlaying])

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-500/10 text-red-400 border-red-500/30"
      case "medium":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30"
      default:
        return "bg-blue-500/10 text-blue-400 border-blue-500/30"
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="h-3 w-3 text-green-400" />
      case "negative":
        return <TrendingDown className="h-3 w-3 text-red-400" />
      default:
        return <AlertCircle className="h-3 w-3 text-blue-400" />
    }
  }

  const currentNews = newsItems[currentIndex]

  return (
    <Card className="w-full bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 transition-all duration-300 rounded-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <h3 className="text-lg font-bold text-foreground font-mono">Market News</h3>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 font-mono text-xs">
              Live
            </Badge>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-xs text-foreground/60 hover:text-foreground/80 transition-colors font-mono"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>

        <div className="relative h-20 overflow-hidden">
          <div
            className="transition-transform duration-500 ease-in-out"
            style={{ transform: `translateY(-${currentIndex * 80}px)` }}
          >
            {newsItems.map((news, index) => (
              <div
                key={news.id}
                className="h-20 flex items-center justify-between p-4 bg-background/20 backdrop-blur-sm rounded-lg border border-border/30 mb-2"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {getSentimentIcon(news.sentiment)}
                    <Badge
                      variant="outline"
                      className={`${getImpactColor(news.impact)} text-xs font-mono`}
                    >
                      {news.impact.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-foreground/60 font-mono">{news.source}</span>
                  </div>
                  <h4 className="text-sm font-medium text-foreground leading-tight font-mono truncate">
                    {news.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                  <Clock className="h-3 w-3 text-foreground/50" />
                  <span className="text-xs text-foreground/60 font-mono">
                    {news.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-1 mt-4">
          {newsItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary w-6"
                  : "bg-foreground/20 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>

        {/* Summary */}
        <div className="mt-4 p-4 bg-background/20 backdrop-blur-sm rounded-lg border border-border/30">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400">3 Positive</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-red-400">2 Negative</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-red-400">3 High Impact</span>
              </div>
            </div>
            <span className="text-foreground/60">Updated {newsItems[0].time}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}