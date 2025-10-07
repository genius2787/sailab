'use client'

import React, { useState, useEffect } from 'react'
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend
} from 'recharts'
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle, CardAction
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  TrendingUp, TrendingDown, Brain, BarChart3, Users, Target,
  Activity, DollarSign, PieChart as PieChartIcon, Zap, Trophy,
  ArrowUpRight, ArrowDownRight, RefreshCw, Settings, Bell,
  User, MessageCircle, Share, Eye, Lock, Unlock
} from 'lucide-react'

// Types for our dashboard data
interface TradingMetrics {
  totalReturn: number
  dailyPnL: number
  winRate: number
  sharpeRatio: number
  maxDrawdown: number
  activeTrades: number
}

interface PerformanceData {
  date: string
  portfolio: number
  benchmark: number
  aiPrediction: number
}

interface SentimentData {
  source: string
  sentiment: number
  confidence: number
  impact: 'high' | 'medium' | 'low'
}

interface LeaderboardEntry {
  rank: number
  trader: string
  return: number
  winRate: number
  followers: number
  verified: boolean
}

interface AISignal {
  id: string
  type: 'buy' | 'sell' | 'hold'
  symbol: string
  confidence: number
  reasoning: string
  timestamp: string
}

// Mock data generators
const generatePerformanceData = (): PerformanceData[] => {
  const data: PerformanceData[] = []
  const startDate = new Date('2024-01-01')
  let portfolioValue = 100000
  let benchmarkValue = 100000
  let aiValue = 100000

  for (let i = 0; i < 90; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    const portfolioChange = (Math.random() - 0.48) * 0.02
    const benchmarkChange = (Math.random() - 0.5) * 0.015
    const aiChange = (Math.random() - 0.47) * 0.025

    portfolioValue *= (1 + portfolioChange)
    benchmarkValue *= (1 + benchmarkChange)
    aiValue *= (1 + aiChange)

    data.push({
      date: date.toISOString().split('T')[0],
      portfolio: Math.round(portfolioValue),
      benchmark: Math.round(benchmarkValue),
      aiPrediction: Math.round(aiValue)
    })
  }

  return data
}

const generateSentimentData = (): SentimentData[] => [
  { source: 'Social Media', sentiment: 0.72, confidence: 0.89, impact: 'high' },
  { source: 'News Analysis', sentiment: 0.65, confidence: 0.94, impact: 'high' },
  { source: 'Options Flow', sentiment: 0.58, confidence: 0.76, impact: 'medium' },
  { source: 'Insider Trading', sentiment: 0.81, confidence: 0.67, impact: 'medium' },
  { source: 'Technical Indicators', sentiment: 0.43, confidence: 0.91, impact: 'low' }
]

const generateLeaderboard = (): LeaderboardEntry[] => [
  { rank: 1, trader: 'QuantMaster', return: 127.3, winRate: 0.89, followers: 12400, verified: true },
  { rank: 2, trader: 'AITrader_Pro', return: 98.7, winRate: 0.84, followers: 8900, verified: true },
  { rank: 3, trader: 'NeuralNet_Ninja', return: 87.2, winRate: 0.81, followers: 6700, verified: true },
  { rank: 4, trader: 'AlgoWizard', return: 79.5, winRate: 0.78, followers: 5200, verified: false },
  { rank: 5, trader: 'DataDriven_Dave', return: 72.1, winRate: 0.76, followers: 4100, verified: true }
]

const generateAISignals = (): AISignal[] => [
  {
    id: '1',
    type: 'buy',
    symbol: 'AAPL',
    confidence: 0.87,
    reasoning: 'Strong earnings momentum, positive sentiment analysis, and favorable technical indicators',
    timestamp: '2 minutes ago'
  },
  {
    id: '2',
    type: 'sell',
    symbol: 'TSLA',
    confidence: 0.73,
    reasoning: 'Overvaluation signals from fundamental analysis, high volatility risk',
    timestamp: '5 minutes ago'
  },
  {
    id: '3',
    type: 'hold',
    symbol: 'MSFT',
    confidence: 0.65,
    reasoning: 'Mixed signals from multiple AI models, recommend maintaining current position',
    timestamp: '12 minutes ago'
  }
]

// Chart configurations
const performanceChartConfig = {
  portfolio: {
    label: 'Portfolio',
    color: '#3B82F6'
  },
  benchmark: {
    label: 'S&P 500',
    color: '#6B7280'
  },
  aiPrediction: {
    label: 'AI Prediction',
    color: '#10B981'
  }
}

const sentimentChartConfig = {
  sentiment: {
    label: 'Sentiment Score',
    color: '#3B82F6'
  }
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  // Mock data
  const [tradingMetrics] = useState<TradingMetrics>({
    totalReturn: 23.7,
    dailyPnL: 2847.32,
    winRate: 0.73,
    sharpeRatio: 1.89,
    maxDrawdown: -8.2,
    activeTrades: 14
  })

  const [performanceData] = useState<PerformanceData[]>(generatePerformanceData())
  const [sentimentData] = useState<SentimentData[]>(generateSentimentData())
  const [leaderboard] = useState<LeaderboardEntry[]>(generateLeaderboard())
  const [aiSignals] = useState<AISignal[]>(generateAISignals())

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleRefresh = async () => {
    setRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setRefreshing(false)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="h-8 w-8 mx-auto animate-spin text-primary" />
          <p className="text-lg font-medium">Loading Dashboard...</p>
          <p className="text-sm text-muted-foreground">Analyzing market data and AI signals</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Trading Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time analytics powered by advanced neural networks
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="default"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="default" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button variant="default" size="sm" className="gap-2">
              <Bell className="h-4 w-4" />
              Alerts
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Return</CardDescription>
              <CardTitle className="flex items-center gap-2">
                {formatPercentage(tradingMetrics.totalReturn)}
                {tradingMetrics.totalReturn > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Daily P&L</CardDescription>
              <CardTitle className="flex items-center gap-2">
                {formatCurrency(tradingMetrics.dailyPnL)}
                {tradingMetrics.dailyPnL > 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Win Rate</CardDescription>
              <CardTitle>{formatPercentage(tradingMetrics.winRate * 100)}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Sharpe Ratio</CardDescription>
              <CardTitle>{tradingMetrics.sharpeRatio.toFixed(2)}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Max Drawdown</CardDescription>
              <CardTitle className="text-red-500">
                {formatPercentage(tradingMetrics.maxDrawdown)}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Active Trades</CardDescription>
              <CardTitle className="flex items-center gap-2">
                {tradingMetrics.activeTrades}
                <Activity className="h-4 w-4 text-primary" />
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Portfolio Performance Chart */}
              <Card className="xl:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Portfolio Performance
                  </CardTitle>
                  <CardDescription>
                    90-day performance comparison vs benchmark and AI predictions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={performanceChartConfig} className="h-[300px]">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis tickFormatter={(value) => formatCurrency(value)} />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                      />
                      <Line
                        type="monotone"
                        dataKey="portfolio"
                        stroke="var(--color-portfolio)"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="benchmark"
                        stroke="var(--color-benchmark)"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="aiPrediction"
                        stroke="var(--color-aiPrediction)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Risk Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Risk Analysis
                  </CardTitle>
                  <CardDescription>Current portfolio risk metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Value at Risk (95%)</span>
                      <span className="font-medium">$12,450</span>
                    </div>
                    <Progress value={24} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Portfolio Beta</span>
                      <span className="font-medium">1.23</span>
                    </div>
                    <Progress value={61} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Correlation to Market</span>
                      <span className="font-medium">0.74</span>
                    </div>
                    <Progress value={74} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Volatility (30D)</span>
                      <span className="font-medium">18.7%</span>
                    </div>
                    <Progress value={46} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Neural Network Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Neural Network Performance
                </CardTitle>
                <CardDescription>
                  Real-time performance indicators of our AI trading models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Model Accuracy</p>
                    <div className="flex items-center gap-2">
                      <Progress value={87} className="flex-1" />
                      <span className="text-sm font-medium">87%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Prediction Confidence</p>
                    <div className="flex items-center gap-2">
                      <Progress value={74} className="flex-1" />
                      <span className="text-sm font-medium">74%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Processing Speed</p>
                    <div className="flex items-center gap-2">
                      <Progress value={92} className="flex-1" />
                      <span className="text-sm font-medium">92ms</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Market Coverage</p>
                    <div className="flex items-center gap-2">
                      <Progress value={89} className="flex-1" />
                      <span className="text-sm font-medium">89%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Analysis Tab */}
          <TabsContent value="ai-analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Market Sentiment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Market Sentiment Analysis
                  </CardTitle>
                  <CardDescription>
                    AI-powered sentiment analysis from multiple data sources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={sentimentChartConfig} className="h-[250px]">
                    <BarChart data={sentimentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="source" />
                      <YAxis domain={[0, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, 'Sentiment']}
                      />
                      <Bar dataKey="sentiment" fill="var(--color-sentiment)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* AI Trading Signals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Latest AI Signals
                  </CardTitle>
                  <CardDescription>
                    Real-time trading recommendations from our AI models
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiSignals.map((signal) => (
                    <div key={signal.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={signal.type === 'buy' ? 'default' : signal.type === 'sell' ? 'destructive' : 'secondary'}
                          >
                            {signal.type.toUpperCase()}
                          </Badge>
                          <span className="font-medium">{signal.symbol}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {(signal.confidence * 100).toFixed(0)}% confidence
                          </span>
                          <Progress value={signal.confidence * 100} className="w-20 h-2" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{signal.reasoning}</p>
                      <p className="text-xs text-muted-foreground">{signal.timestamp}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Quantitative Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5" />
                  Quantitative Analysis
                </CardTitle>
                <CardDescription>
                  Advanced statistical analysis and pattern recognition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Pattern Recognition</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Head & Shoulders</span>
                        <span className="text-sm font-medium">67%</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Double Bottom</span>
                        <span className="text-sm font-medium">43%</span>
                      </div>
                      <Progress value={43} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Breakout Potential</span>
                        <span className="text-sm font-medium">81%</span>
                      </div>
                      <Progress value={81} className="h-2" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Technical Indicators</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">RSI Overbought</span>
                        <span className="text-sm font-medium">29%</span>
                      </div>
                      <Progress value={29} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">MACD Bullish</span>
                        <span className="text-sm font-medium">74%</span>
                      </div>
                      <Progress value={74} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Volume Surge</span>
                        <span className="text-sm font-medium">52%</span>
                      </div>
                      <Progress value={52} className="h-2" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Market Regime</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Trending Market</span>
                        <span className="text-sm font-medium">68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">High Volatility</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Mean Reversion</span>
                        <span className="text-sm font-medium">32%</span>
                      </div>
                      <Progress value={32} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Leaderboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Performance Leaderboard
                  </CardTitle>
                  <CardDescription>
                    Top performing AI traders this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaderboard.map((trader) => (
                      <div key={trader.rank} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                            <span className="text-sm font-bold">#{trader.rank}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{trader.trader}</span>
                              {trader.verified && (
                                <Badge variant="secondary" className="text-xs">Verified</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Win Rate: {(trader.winRate * 100).toFixed(0)}%</span>
                              <span>{trader.followers.toLocaleString()} followers</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-green-500">
                            +{trader.return.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Strategy Sharing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share className="h-5 w-5" />
                    Strategy Sharing
                  </CardTitle>
                  <CardDescription>
                    Popular trading strategies from the community
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Momentum Breakout AI</h4>
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">1.2k views</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Neural network trained on breakout patterns with 73% accuracy
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="text-sm">QuantMaster</span>
                      </div>
                      <Badge>Premium</Badge>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Sentiment Arbitrage</h4>
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">890 views</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Exploits sentiment-price discrepancies using NLP analysis
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="text-sm">AITrader_Pro</span>
                      </div>
                      <Badge variant="secondary">Free</Badge>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Options Flow Predictor</h4>
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">654 views</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Predicts price movements from unusual options activity
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="text-sm">NeuralNet_Ninja</span>
                      </div>
                      <Badge>Premium</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Expert Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Expert Insights Feed
                </CardTitle>
                <CardDescription>
                  Latest insights and discussions from top AI traders
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-primary pl-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">QuantMaster</span>
                    <span className="text-sm text-muted-foreground">2 hours ago</span>
                  </div>
                  <p className="text-sm">
                    Seeing unusual options flow in tech sector. My momentum model is flagging potential breakout in NVDA.
                    Confidence level at 84%. Watch for volume confirmation.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>12 likes</span>
                    <span>3 replies</span>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">AITrader_Pro</span>
                    <span className="text-sm text-muted-foreground">4 hours ago</span>
                  </div>
                  <p className="text-sm">
                    Market sentiment has shifted dramatically in the past 24hrs. My NLP models are picking up increased
                    bearish sentiment on social media. Reducing position sizes temporarily.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>8 likes</span>
                    <span>5 replies</span>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">DataDriven_Dave</span>
                    <span className="text-sm text-muted-foreground">6 hours ago</span>
                  </div>
                  <p className="text-sm">
                    Updated my ensemble model with new economic indicators. Backtesting shows 15% improvement
                    in win rate. Will be publishing the research paper next week.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>23 likes</span>
                    <span>7 replies</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Research Tab */}
          <TabsContent value="research" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Automated Research Reports */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Automated Research Reports
                  </CardTitle>
                  <CardDescription>
                    AI-generated research reports and market analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Q4 Tech Sector Analysis</h4>
                      <Badge>New</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive analysis of tech sector performance with AI-powered predictions for Q4
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Generated 1 hour ago</span>
                      <Button variant="default" size="sm">View Report</Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Federal Reserve Policy Impact</h4>
                      <Badge variant="secondary">Popular</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Analysis of Fed policy changes and their impact on different market sectors
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Generated 6 hours ago</span>
                      <Button variant="default" size="sm">View Report</Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Crypto Market Volatility Study</h4>
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        <Badge>Premium</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Deep dive into cryptocurrency volatility patterns and correlation analysis
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Generated yesterday</span>
                      <Button variant="default" size="sm">Upgrade to View</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Multi-Agent Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Multi-Agent LLM Analysis
                  </CardTitle>
                  <CardDescription>
                    Collaborative analysis from multiple AI agents with different specializations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Brain className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Technical Analysis Agent</span>
                          <Badge variant="secondary">Active</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Analyzing chart patterns and technical indicators
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <DollarSign className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Fundamental Analysis Agent</span>
                          <Badge variant="secondary">Active</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Processing earnings data and financial metrics
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <MessageCircle className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Sentiment Analysis Agent</span>
                          <Badge variant="secondary">Active</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Monitoring news sentiment and social media
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Target className="h-4 w-4 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Risk Management Agent</span>
                          <Badge>Evaluating</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Assessing portfolio risk and correlation matrices
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Consensus Analysis</h4>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-sm">
                        All agents agree on bullish outlook for tech sector with 78% confidence.
                        Recommended action: Increase allocation to FAANG stocks with stops at -8%.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Market Data Stream */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Real-time Market Data Stream
                </CardTitle>
                <CardDescription>
                  Live market data analysis and pattern detection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-500">+2.3%</div>
                    <div className="text-sm text-muted-foreground">NASDAQ</div>
                    <div className="text-xs">Strong momentum</div>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-red-500">-0.8%</div>
                    <div className="text-sm text-muted-foreground">VIX</div>
                    <div className="text-xs">Low volatility</div>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-500">+1.7%</div>
                    <div className="text-sm text-muted-foreground">Gold</div>
                    <div className="text-xs">Safe haven demand</div>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-500">+4.2%</div>
                    <div className="text-sm text-muted-foreground">Bitcoin</div>
                    <div className="text-xs">Breakout pattern</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}