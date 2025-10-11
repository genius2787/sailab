"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { GL } from "./gl";
import { useLanguage } from "@/contexts/language-context";
import { SummaryZone } from "./financial/summary-zone";
import { AgentVotingPanel } from "./financial/agent-voting-panel";
import { KPISnapshot } from "./financial/kpi-snapshot";
import { NewsTicker } from "./financial/news-ticker";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Users,
  Target,
  Brain,
  BarChart3,
  PieChart,
  LineChart,
  Clock,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Settings,
  Bell,
  Filter,
  Zap
} from "lucide-react";

export default function Dashboard() {
  const { t } = useLanguage();
  const { data: session } = useSession();
  const [hovering, setHovering] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observers = new Map();

    Object.entries(sectionRefs.current).forEach(([key, element]) => {
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleSections(prev => new Set([...prev, key]));
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(element);
        observers.set(key, observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const recentTrades = [
    {
      symbol: "AAPL",
      action: "BUY",
      quantity: 150,
      price: "$182.45",
      time: "09:34 AM",
      pnl: "+$2,340",
      status: "executed"
    },
    {
      symbol: "TSLA",
      action: "SELL",
      quantity: 75,
      price: "$248.92",
      time: "09:28 AM",
      pnl: "+$1,892",
      status: "executed"
    },
    {
      symbol: "NVDA",
      action: "BUY",
      quantity: 50,
      price: "$489.12",
      time: "09:15 AM",
      pnl: "+$3,245",
      status: "executed"
    },
    {
      symbol: "MSFT",
      action: "SELL",
      quantity: 100,
      price: "$378.55",
      time: "09:02 AM",
      pnl: "-$987",
      status: "executed"
    }
  ];

  return (
    <div className="min-h-screen relative bg-background">
      <GL hovering={hovering} />

      <div className="relative z-10 container mx-auto pt-32 pb-12 px-6">
        {/* Header */}
        <div className="mb-8" ref={el => sectionRefs.current.header = el}>
          <h1 className={`text-4xl md:text-5xl font-mono font-bold text-foreground mb-4 ${isLoaded ? 'animate-fade-in-up' : ''}`}>
            {t('dashboard.title')}
          </h1>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex-1">
              <p className={`text-lg text-foreground/70 font-mono mb-2 ${isLoaded ? 'animate-fade-in-up animate-delay-200' : ''}`}>
                {t('dashboard.subtitle')}
              </p>
              {session?.user && (
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-mono">
                    👤 {session.user.name || session.user.email}
                  </Badge>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30 font-mono">
                    💎 Paid Member
                  </Badge>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30 font-mono">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                {t('dashboard.agents')}
              </Badge>
              <Button variant="outline" size="sm" className="font-mono">
                <RefreshCw className="h-4 w-4 mr-2" />
                {t('dashboard.refresh')}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="font-mono text-red-500 border-red-500/30 hover:bg-red-500/10"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* News Ticker */}
        <div className="mb-8" ref={el => sectionRefs.current.news = el}>
          <div className={`${visibleSections.has('news') ? 'animate-fade-in-up' : ''}`}>
            <NewsTicker />
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3 space-y-8">
            {/* Summary Zone */}
            <div ref={el => sectionRefs.current.summary = el}>
              <div className={`${visibleSections.has('summary') ? 'animate-fade-in-up' : ''}`}>
                <SummaryZone />
              </div>
            </div>

            {/* Agent Voting Panel */}
            <div ref={el => sectionRefs.current.agents = el}>
              <div className={`${visibleSections.has('agents') ? 'animate-fade-in-up animate-delay-200' : ''}`}>
                <AgentVotingPanel />
              </div>
            </div>

            {/* KPI Snapshot */}
            <div ref={el => sectionRefs.current.kpis = el}>
              <div className={`${visibleSections.has('kpis') ? 'animate-fade-in-up animate-delay-400' : ''}`}>
                <KPISnapshot />
              </div>
            </div>

            {/* Recent Trades */}
            <Card className="bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 transition-all duration-300" ref={el => sectionRefs.current.trades = el}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-mono">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Recent Trades
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 font-mono text-xs">
                    Live
                  </Badge>
                </CardTitle>
                <CardDescription className="font-mono">
                  Latest executed trades and their performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTrades.map((trade, index) => (
                    <div key={index} className={`p-4 rounded-lg bg-background/20 border border-border/30 hover:bg-background/30 transition-all duration-300 ${visibleSections.has('trades') ? 'animate-slide-in-left' : ''}`} style={{animationDelay: visibleSections.has('trades') ? `${index * 0.1}s` : '0s'}}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant={trade.action === 'BUY' ? 'default' : 'destructive'} className="font-mono text-xs">
                            {trade.action}
                          </Badge>
                          <div>
                            <div className="font-semibold font-mono text-sm">{trade.symbol}</div>
                            <div className="text-xs text-foreground/60 font-mono">
                              {trade.quantity} shares @ {trade.price}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold font-mono text-sm ${trade.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                            {trade.pnl}
                          </div>
                          <div className="text-xs text-foreground/60 font-mono">
                            {trade.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Market Summary */}
            <Card className="bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 transition-all duration-300" ref={el => sectionRefs.current.market = el}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl font-mono">
                  <PieChart className="h-5 w-5 text-primary" />
                  Market Indices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-mono text-green-400">S&P 500</span>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                    <div className="text-lg font-bold font-mono text-green-400">4,785.23</div>
                    <div className="text-xs font-mono text-green-300">+1.24% (+58.32)</div>
                  </div>

                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-mono text-green-400">NASDAQ</span>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                    <div className="text-lg font-bold font-mono text-green-400">15,234.87</div>
                    <div className="text-xs font-mono text-green-300">+0.98% (+147.62)</div>
                  </div>

                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-mono text-red-400">VIX</span>
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    </div>
                    <div className="text-lg font-bold font-mono text-red-400">14.23</div>
                    <div className="text-xs font-mono text-red-300">-2.15% (-0.31)</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl font-mono">
                  <Settings className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full font-mono" variant="outline">
                    <LineChart className="h-4 w-4 mr-2" />
                    Portfolio Analysis
                  </Button>
                  <Button className="w-full font-mono" variant="outline">
                    <Target className="h-4 w-4 mr-2" />
                    Risk Assessment
                  </Button>
                  <Button className="w-full font-mono" variant="outline">
                    <Brain className="h-4 w-4 mr-2" />
                    Agent Configuration
                  </Button>
                  <Button
                    className="w-full font-mono hover-lift"
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Alert Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl font-mono">
                  <Activity className="h-5 w-5 text-primary" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono text-foreground/70">Data Feed</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-mono text-green-400">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono text-foreground/70">AI Agents</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-mono text-green-400">4/4 Active</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono text-foreground/70">Trading Engine</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-mono text-green-400">Ready</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono text-foreground/70">Risk Monitor</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-mono text-amber-400">Monitoring</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Model Performance */}
            <Card className="bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl font-mono">
                  <Zap className="h-5 w-5 text-primary" />
                  AI Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-mono">
                      <span className="text-foreground/70">Model Accuracy</span>
                      <span className="text-green-400 font-semibold">87%</span>
                    </div>
                    <div className="w-full bg-background/30 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-mono">
                      <span className="text-foreground/70">Prediction Confidence</span>
                      <span className="text-blue-400 font-semibold">74%</span>
                    </div>
                    <div className="w-full bg-background/30 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full" style={{ width: '74%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-mono">
                      <span className="text-foreground/70">Win Rate</span>
                      <span className="text-purple-400 font-semibold">73%</span>
                    </div>
                    <div className="w-full bg-background/30 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full" style={{ width: '73%' }}></div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/30">
                    <div className="text-xs text-foreground/60 font-mono text-center">
                      Last updated: 2 minutes ago
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}