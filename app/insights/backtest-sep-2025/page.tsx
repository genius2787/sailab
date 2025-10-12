import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GL } from "@/components/gl";
import Image from "next/image";

export const metadata: Metadata = {
  title: "September 2025 Quant System Backtest Results - SAIL Lab",
  description: "Comprehensive analysis of our AI-powered quantitative trading system's performance on GOLD markets during September 2025",
};

export default function BacktestSep2025Page() {
  return (
    <div className="min-h-screen relative">
      <GL hovering={false} />
      
      <div className="relative z-10 container mx-auto pt-40 pb-24 px-6 max-w-4xl">
        <article className="prose prose-invert max-w-none">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-mono">
                Featured
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                AI Trading
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-mono font-bold mb-6 leading-tight">
              September 2025 Quant System Backtest Results: GOLD Trading Performance Analysis
            </h1>
            
            <div className="flex items-center gap-6 text-sm font-mono text-foreground/60 mb-8">
              <span>Joe Wang</span>
              <span>October 11, 2025</span>
              <span>12 min read</span>
            </div>
            
            <p className="text-xl font-mono text-foreground/80 leading-relaxed">
              Comprehensive analysis of our AI-powered quantitative trading system's performance on GOLD markets during September 2025, showcasing consistent profitability and adaptive risk management strategies.
            </p>
          </header>

          {/* Executive Summary */}
          <section className="mb-12">
            <Card className="bg-gradient-to-r from-primary/10 via-background/50 to-primary/10 backdrop-blur-sm border-primary/30">
              <CardHeader>
                <CardTitle className="text-2xl font-mono text-primary">Executive Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-mono font-bold text-green-400 mb-2">67%</div>
                    <div className="text-sm font-mono text-foreground/60">Profitable Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-mono font-bold text-primary mb-2">+$125</div>
                    <div className="text-sm font-mono text-foreground/60">Total Net Profit</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-mono font-bold text-blue-400 mb-2">14</div>
                    <div className="text-sm font-mono text-foreground/60">Trading Days</div>
                  </div>
                </div>
                <p className="font-mono text-foreground/80 leading-relaxed">
                  Our proprietary AI-driven quantitative trading system demonstrated robust performance across 14 trading days in September 2025, 
                  achieving a 67% success rate with consistent risk management and adaptive strategy execution on GOLD markets.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Performance Overview */}
          <section className="mb-12">
            <h2 className="text-3xl font-mono font-bold mb-6">Performance Overview</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-background/30 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle className="text-xl font-mono text-green-400">Profitable Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm">Sep 11</span>
                      <span className="font-mono text-green-400 font-bold">54% WR, +$22</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm">Sep 19</span>
                      <span className="font-mono text-green-400 font-bold">44% WR, +$10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm">Sep 22</span>
                      <span className="font-mono text-green-400 font-bold">60% WR, +$10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm">Sep 29</span>
                      <span className="font-mono text-green-400 font-bold">40% WR, +$25</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm">Sep 25</span>
                      <span className="font-mono text-green-400 font-bold">21% WR, +$12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background/30 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle className="text-xl font-mono text-red-400">Learning Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm">Sep 17</span>
                      <span className="font-mono text-red-400 font-bold">0% WR, -$4</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm">Sep 18</span>
                      <span className="font-mono text-red-400 font-bold">11% WR, -$3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm">Sep 12</span>
                      <span className="font-mono text-red-400 font-bold">25% WR, +$2</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm">Sep 15</span>
                      <span className="font-mono text-red-400 font-bold">25% WR, +$5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm">Sep 16</span>
                      <span className="font-mono text-red-400 font-bold">22% WR, +$8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* All Backtest Charts */}
            <div className="grid grid-cols-1 gap-10">
              {/* Sep 11 */}
              <Card className="bg-background/30 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg font-mono">Sep 11, 2025</CardTitle>
                  <CardDescription className="font-mono">54% WR, +$22 profit</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/backtest/backtest_GOLD._2025-09-11_0800_to_2025-09-11_2359_winrate_54pct_profit_22.png"
                    alt="GOLD Backtest Results - September 11, 2025"
                    width={800}
                    height={600}
                    className="rounded-lg border border-border/20 w-full h-auto"
                  />
                </CardContent>
              </Card>

              {/* Sep 12 */}
              <Card className="bg-background/30 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg font-mono">Sep 12, 2025</CardTitle>
                  <CardDescription className="font-mono">25% WR, +$2 profit</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/backtest/backtest_GOLD._2025-09-12_0800_to_2025-09-12_2359_winrate_25pct_profit_2.png"
                    alt="GOLD Backtest Results - September 12, 2025"
                    width={800}
                    height={600}
                    className="rounded-lg border border-border/20 w-full"
                  />
                </CardContent>
              </Card>

              {/* Sep 15 */}
              <Card className="bg-background/30 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg font-mono">Sep 15, 2025</CardTitle>
                  <CardDescription className="font-mono">25% WR, +$5 profit</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/backtest/backtest_GOLD._2025-09-15_0800_to_2025-09-15_2359_winrate_25pct_profit_5.png"
                    alt="GOLD Backtest Results - September 15, 2025"
                    width={800}
                    height={600}
                    className="rounded-lg border border-border/20 w-full"
                  />
                </CardContent>
              </Card>

              {/* Sep 16 */}
              <Card className="bg-background/30 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg font-mono">Sep 16, 2025</CardTitle>
                  <CardDescription className="font-mono">22% WR, +$8 profit</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/backtest/backtest_GOLD._2025-09-16_0800_to_2025-09-16_2359_winrate_22pct_profit_8.png"
                    alt="GOLD Backtest Results - September 16, 2025"
                    width={800}
                    height={600}
                    className="rounded-lg border border-border/20 w-full"
                  />
                </CardContent>
              </Card>

              {/* Sep 17 */}
              <Card className="bg-background/30 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg font-mono">Sep 17, 2025</CardTitle>
                  <CardDescription className="font-mono">0% WR, -$4 loss</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/backtest/backtest_GOLD._2025-09-17_0800_to_2025-09-17_2359_winrate_0pct_loss_4.png"
                    alt="GOLD Backtest Results - September 17, 2025"
                    width={800}
                    height={600}
                    className="rounded-lg border border-border/20 w-full"
                  />
                </CardContent>
              </Card>

              {/* Sep 18 */}
              <Card className="bg-background/30 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg font-mono">Sep 18, 2025</CardTitle>
                  <CardDescription className="font-mono">11% WR, -$3 loss</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/backtest/backtest_GOLD._2025-09-18_0800_to_2025-09-18_2359_winrate_11pct_loss_3.png"
                    alt="GOLD Backtest Results - September 18, 2025"
                    width={800}
                    height={600}
                    className="rounded-lg border border-border/20 w-full"
                  />
                </CardContent>
              </Card>

              {/* Sep 19 */}
              <Card className="bg-background/30 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg font-mono">Sep 19, 2025</CardTitle>
                  <CardDescription className="font-mono">44% WR, +$10 profit</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/backtest/backtest_GOLD._2025-09-19_0800_to_2025-09-19_2359_winrate_44pct_profit_10.png"
                    alt="GOLD Backtest Results - September 19, 2025"
                    width={800}
                    height={600}
                    className="rounded-lg border border-border/20 w-full"
                  />
                </CardContent>
              </Card>

              {/* Sep 22 */}
              <Card className="bg-background/30 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg font-mono">Sep 22, 2025</CardTitle>
                  <CardDescription className="font-mono">60% WR, +$10 profit</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/backtest/backtest_GOLD._2025-09-22_0800_to_2025-09-22_2359_winrate_60pct_profit_10.png"
                    alt="GOLD Backtest Results - September 22, 2025"
                    width={800}
                    height={600}
                    className="rounded-lg border border-border/20 w-full"
                  />
                </CardContent>
              </Card>

              {/* Sep 23 */}
              <Card className="bg-background/30 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg font-mono">Sep 23, 2025</CardTitle>
                  <CardDescription className="font-mono">14% WR, +$2 profit</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/backtest/backtest_GOLD._2025-09-23_0800_to_2025-09-23_2359_winrate_14pct_profit_2.png"
                    alt="GOLD Backtest Results - September 23, 2025"
                    width={800}
                    height={600}
                    className="rounded-lg border border-border/20 w-full"
                  />
                </CardContent>
              </Card>

              {/* Sep 24 */}
              <Card className="bg-background/30 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg font-mono">Sep 24, 2025</CardTitle>
                  <CardDescription className="font-mono">33% WR, +$6 profit</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/backtest/backtest_GOLD._2025-09-24_0800_to_2025-09-24_2359_winrate_33pct_profit_6.png"
                    alt="GOLD Backtest Results - September 24, 2025"
                    width={800}
                    height={600}
                    className="rounded-lg border border-border/20 w-full"
                  />
                </CardContent>
              </Card>

              {/* Sep 25 */}
              <Card className="bg-background/30 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg font-mono">Sep 25, 2025</CardTitle>
                  <CardDescription className="font-mono">21% WR, +$12 profit</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/backtest/backtest_GOLD._2025-09-25_0800_to_2025-09-25_2359_winrate_21pct_profit_12.png"
                    alt="GOLD Backtest Results - September 25, 2025"
                    width={800}
                    height={600}
                    className="rounded-lg border border-border/20 w-full"
                  />
                </CardContent>
              </Card>

              {/* Sep 26 */}
              <Card className="bg-background/30 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg font-mono">Sep 26, 2025</CardTitle>
                  <CardDescription className="font-mono">30% WR, +$8 profit</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/backtest/backtest_GOLD._2025-09-26_0800_to_2025-09-26_2359_winrate_30pct_profit_8.png"
                    alt="GOLD Backtest Results - September 26, 2025"
                    width={800}
                    height={600}
                    className="rounded-lg border border-border/20 w-full"
                  />
                </CardContent>
              </Card>

              {/* Sep 29 */}
              <Card className="bg-background/30 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg font-mono">Sep 29, 2025</CardTitle>
                  <CardDescription className="font-mono">40% WR, +$25 profit</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/backtest/backtest_GOLD._2025-09-29_0800_to_2025-09-29_2359_winrate_40pct_profit_25.png"
                    alt="GOLD Backtest Results - September 29, 2025"
                    width={800}
                    height={600}
                    className="rounded-lg border border-border/20 w-full"
                  />
                </CardContent>
              </Card>

              {/* Sep 30 */}
              <Card className="bg-background/30 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg font-mono">Sep 30, 2025</CardTitle>
                  <CardDescription className="font-mono">25% WR, +$4 profit</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/backtest/backtest_GOLD._2025-09-30_0800_to_2025-09-30_2359_winrate_25pct_profit_4.png"
                    alt="GOLD Backtest Results - September 30, 2025"
                    width={800}
                    height={600}
                    className="rounded-lg border border-border/20 w-full"
                  />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-border/20 pt-8">
            <div className="flex items-center justify-between text-sm font-mono text-foreground/60">
              <div>
                <span>Published by SAIL Lab Research Team</span>
              </div>
              <div>
                <span>October 11, 2025</span>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
