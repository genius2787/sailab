import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GL } from "@/components/gl";
import Image from "next/image";

export const metadata: Metadata = {
  title: "October 2025 Quant System Backtest Results: Trailing Stop Impact Analysis - SAIL Lab",
  description: "Comprehensive analysis comparing trading performance with and without trailing stop protection on GOLD markets during October 2025, demonstrating the significant impact of dynamic risk management.",
};

export default function BacktestOct2025Page() {
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
              October 2025 Quant System Backtest Results: Trailing Stop Impact Analysis
              <br />
              <span className="text-2xl md:text-3xl text-foreground/70">
                2025年10月定量システムバックテスト結果：トレーリングストップの影響分析
              </span>
            </h1>
            
            <div className="flex items-center gap-6 text-sm font-mono text-foreground/60 mb-8">
              <span>Joe Wang</span>
              <span>November 13, 2025</span>
              <span>15 min read</span>
            </div>
            
            <p className="text-xl font-mono text-foreground/80 leading-relaxed mb-4">
              Comprehensive analysis comparing trading performance with and without trailing stop protection on GOLD markets during October 2025, demonstrating the significant impact of dynamic risk management.
            </p>
            <p className="text-lg font-mono text-foreground/70 leading-relaxed">
              2025年10月のGOLD市場におけるトレーリングストップ保護ありとなしの取引パフォーマンスを比較分析し、動的リスク管理の重要な影響を示します。
            </p>
          </header>

          {/* Executive Summary */}
          <section className="mb-12">
            <Card className="bg-gradient-to-r from-primary/10 via-background/50 to-primary/10 backdrop-blur-sm border-primary/30">
              <CardHeader>
                <CardTitle className="text-2xl font-mono text-primary">Executive Summary / エグゼクティブサマリー</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Without Trailing Stop */}
                  <Card className="bg-background/50 backdrop-blur-sm border-border/40">
                    <CardHeader>
                      <CardTitle className="text-xl font-mono text-orange-400">Without Trailing Stop / トレーリングストップなし</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-center">
                        <div className="text-3xl font-mono font-bold text-orange-400 mb-2">$52.80</div>
                        <div className="text-sm font-mono text-foreground/60">Total Net Profit / 総純利益</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-mono font-bold text-foreground mb-1">52.2%</div>
                          <div className="text-xs font-mono text-foreground/60">Profitable Days / 利益日</div>
                        </div>
                        <div>
                          <div className="text-2xl font-mono font-bold text-foreground mb-1">36.5%</div>
                          <div className="text-xs font-mono text-foreground/60">Win Rate / 勝率</div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-mono font-bold text-foreground mb-1">418</div>
                        <div className="text-xs font-mono text-foreground/60">Total Trades / 総取引数</div>
                      </div>
                      <p className="text-sm font-mono text-foreground/70 text-center pt-2 border-t border-border/20">
                        Average Performance / 平均的なパフォーマンス
                      </p>
                    </CardContent>
                  </Card>

                  {/* With Trailing Stop */}
                  <Card className="bg-background/50 backdrop-blur-sm border-primary/40">
                    <CardHeader>
                      <CardTitle className="text-xl font-mono text-green-400">With Trailing Stop / トレーリングストップあり</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-center">
                        <div className="text-3xl font-mono font-bold text-green-400 mb-2">$147.52</div>
                        <div className="text-sm font-mono text-foreground/60">Total Net Profit / 総純利益</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-mono font-bold text-foreground mb-1">82.6%</div>
                          <div className="text-xs font-mono text-foreground/60">Profitable Days / 利益日</div>
                        </div>
                        <div>
                          <div className="text-2xl font-mono font-bold text-foreground mb-1">28.3%</div>
                          <div className="text-xs font-mono text-foreground/60">Win Rate / 勝率</div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-mono font-bold text-foreground mb-1">426</div>
                        <div className="text-xs font-mono text-foreground/60">Total Trades / 総取引数</div>
                      </div>
                      <p className="text-sm font-mono text-green-400 text-center pt-2 border-t border-primary/20">
                        Excellent Performance / 優れたパフォーマンス
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <h3 className="text-lg font-mono font-bold text-primary mb-3">Key Findings / 主要な発見</h3>
                  <ul className="space-y-2 font-mono text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 font-bold">+179%</span>
                      <span className="text-foreground/80">Profit increase with trailing stop / トレーリングストップによる利益増加</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 font-bold">+30.4%</span>
                      <span className="text-foreground/80">Improvement in profitable days / 利益日の改善</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">19 days</span>
                      <span className="text-foreground/80">Profitable days out of 23 / 23日中の19日が利益</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">Dynamic</span>
                      <span className="text-foreground/80">Risk management locks in profits / 動的リスク管理が利益を確保</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Trailing Stop Explanation */}
          <section className="mb-12">
            <h2 className="text-3xl font-mono font-bold mb-6">
              What is Trailing Stop? / トレーリングストップとは？
            </h2>
            
            <Card className="bg-background/30 backdrop-blur-sm border-border/40 mb-6">
              <CardHeader>
                <CardTitle className="text-xl font-mono">Trailing Stop Mechanism / トレーリングストップのメカニズム</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 font-mono text-sm">
                  <div>
                    <h4 className="font-bold text-primary mb-2">1. Breakeven Protection / 損益分岐点保護</h4>
                    <p className="text-foreground/80 mb-2">
                      When profit reaches 0.5 points, the stop loss moves to entry price, ensuring no loss.
                    </p>
                    <p className="text-foreground/70 text-xs">
                      利益が0.5ポイントに達すると、ストップロスがエントリー価格に移動し、損失を防ぎます。
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-2">2. Trailing Activation / トレーリング開始</h4>
                    <p className="text-foreground/80 mb-2">
                      When profit reaches 1.0 point, trailing stop activates, following price movement at 0.5 point distance.
                    </p>
                    <p className="text-foreground/70 text-xs">
                      利益が1.0ポイントに達すると、トレーリングストップが有効化され、0.5ポイントの距離で価格に追従します。
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-2">3. Maximum Distance / 最大距離</h4>
                    <p className="text-foreground/80 mb-2">
                      Stop loss maintains maximum 4 points distance from current price to prevent excessive drawdown.
                    </p>
                    <p className="text-foreground/70 text-xs">
                      ストップロスは現在価格から最大4ポイントの距離を維持し、過度なドローダウンを防ぎます。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Performance Comparison */}
          <section className="mb-12">
            <h2 className="text-3xl font-mono font-bold mb-6">
              Performance Comparison / パフォーマンス比較
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-background/30 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle className="text-xl font-mono text-orange-400">Without Trailing Stop / トレーリングストップなし</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm">Total Profit / 総利益</span>
                      <span className="font-mono text-orange-400 font-bold">$52.80</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm">Profitable Days / 利益日</span>
                      <span className="font-mono font-bold">12/23 (52.2%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm">Win Rate / 勝率</span>
                      <span className="font-mono font-bold">36.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm">Total Trades / 総取引数</span>
                      <span className="font-mono font-bold">418</span>
                    </div>
                    <div className="pt-3 border-t border-border/20">
                      <p className="text-xs font-mono text-foreground/60">
                        Fixed 5-point stop loss, 10-point take profit / 固定5ポイントストップロス、10ポイント利確
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background/30 backdrop-blur-sm border-primary/40">
                <CardHeader>
                  <CardTitle className="text-xl font-mono text-green-400">With Trailing Stop / トレーリングストップあり</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm">Total Profit / 総利益</span>
                      <span className="font-mono text-green-400 font-bold">$147.52</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm">Profitable Days / 利益日</span>
                      <span className="font-mono font-bold">19/23 (82.6%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm">Win Rate / 勝率</span>
                      <span className="font-mono font-bold">28.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm">Total Trades / 総取引数</span>
                      <span className="font-mono font-bold">426</span>
                    </div>
                    <div className="pt-3 border-t border-primary/20">
                      <p className="text-xs font-mono text-foreground/60">
                        Dynamic trailing stop locks in profits / 動的トレーリングストップが利益を確保
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Daily Comparison Charts */}
          <section className="mb-12">
            <h2 className="text-3xl font-mono font-bold mb-6">
              Daily Performance Comparison / 日次パフォーマンス比較
            </h2>
            <p className="font-mono text-foreground/70 mb-8">
              Charts with "_Trailing" suffix show results with trailing stop enabled. Charts without suffix show results without trailing stop.
              <br />
              <span className="text-sm">
                "_Trailing"サフィックス付きのチャートはトレーリングストップ有効の結果を示します。サフィックスなしのチャートはトレーリングストップなしの結果を示します。
              </span>
            </p>

            <div className="grid grid-cols-1 gap-10">
              {/* Oct 2 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">October 2, 2025 / 2025年10月2日</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-background/30 backdrop-blur-sm border-border/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">Without Trailing / トレーリングなし</CardTitle>
                      <CardDescription className="font-mono">39% WR, +$8 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-02_0000_to_2025-10-02_2359_winrate_39pct_profit_8.png"
                        alt="October 2, 2025 - Without Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-border/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-background/30 backdrop-blur-sm border-primary/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">With Trailing / トレーリングあり</CardTitle>
                      <CardDescription className="font-mono">56% WR, +$9 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-02_0000_to_2025-10-02_2359_winrate_56pct_profit_9_Trailing.png"
                        alt="October 2, 2025 - With Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-primary/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Oct 3 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">October 3, 2025 / 2025年10月3日</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">Without Trailing / トレーリングなし</CardTitle>
                      <CardDescription className="font-mono text-red-400">17% WR, -$35 loss</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-03_0000_to_2025-10-03_2359_winrate_17pct_loss_35.png"
                        alt="October 3, 2025 - Without Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-red-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">With Trailing / トレーリングあり</CardTitle>
                      <CardDescription className="font-mono text-red-400">8% WR, -$8 loss</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-03_0000_to_2025-10-03_2359_winrate_8pct_loss_8_Trailing.png"
                        alt="October 3, 2025 - With Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-red-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </div>
                <p className="font-mono text-sm text-foreground/70 italic">
                  Trailing stop reduced losses from -$35 to -$8, saving $27.
                  <br />
                  <span className="text-xs">トレーリングストップは損失を-$35から-$8に削減し、$27を節約しました。</span>
                </p>
              </div>

              {/* Oct 6 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">October 6, 2025 / 2025年10月6日</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">Without Trailing / トレーリングなし</CardTitle>
                      <CardDescription className="font-mono text-green-400">53% WR, +$47 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-06_0000_to_2025-10-06_2359_winrate_53pct_profit_47.png"
                        alt="October 6, 2025 - Without Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">With Trailing / トレーリングあり</CardTitle>
                      <CardDescription className="font-mono text-green-400">35% WR, +$12 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-06_0000_to_2025-10-06_2359_winrate_35pct_profit_12_Trailing.png"
                        alt="October 6, 2025 - With Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Oct 7 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">October 7, 2025 / 2025年10月7日</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">Without Trailing / トレーリングなし</CardTitle>
                      <CardDescription className="font-mono text-green-400">53% WR, +$47 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-07_0000_to_2025-10-07_2359_winrate_53pct_profit_47.png"
                        alt="October 7, 2025 - Without Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">With Trailing / トレーリングあり</CardTitle>
                      <CardDescription className="font-mono text-green-400">40% WR, +$4 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-07_0000_to_2025-10-07_2359_winrate_40pct_profit_4_Trailing.png"
                        alt="October 7, 2025 - With Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Oct 8 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">October 8, 2025 / 2025年10月8日</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">Without Trailing / トレーリングなし</CardTitle>
                      <CardDescription className="font-mono text-green-400">43% WR, +$22 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-08_0000_to_2025-10-08_2359_winrate_43pct_profit_22.png"
                        alt="October 8, 2025 - Without Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">With Trailing / トレーリングあり</CardTitle>
                      <CardDescription className="font-mono text-green-400">33% WR, +$7 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-08_0000_to_2025-10-08_2359_winrate_33pct_profit_7_Trailing.png"
                        alt="October 8, 2025 - With Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Oct 9 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">October 9, 2025 / 2025年10月9日</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">Without Trailing / トレーリングなし</CardTitle>
                      <CardDescription className="font-mono text-green-400">57% WR, +$44 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-09_0000_to_2025-10-09_2359_winrate_57pct_profit_44.png"
                        alt="October 9, 2025 - Without Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">With Trailing / トレーリングあり</CardTitle>
                      <CardDescription className="font-mono text-green-400">36% WR, +$27 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-09_0000_to_2025-10-09_2359_winrate_36pct_profit_27_Trailing.png"
                        alt="October 9, 2025 - With Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Oct 10 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">October 10, 2025 / 2025年10月10日</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">Without Trailing / トレーリングなし</CardTitle>
                      <CardDescription className="font-mono text-green-400">41% WR, +$13 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-10_0000_to_2025-10-10_2359_winrate_41pct_profit_13.png"
                        alt="October 10, 2025 - Without Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">With Trailing / トレーリングあり</CardTitle>
                      <CardDescription className="font-mono text-red-400">6% WR, -$25 loss</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-10_0000_to_2025-10-10_2359_winrate_6pct_loss_25_Trailing.png"
                        alt="October 10, 2025 - With Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-red-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </div>
                <p className="font-mono text-sm text-foreground/70 italic">
                  This day shows that trailing stop can sometimes reduce profits in strong trending days.
                  <br />
                  <span className="text-xs">この日は、強いトレンド日ではトレーリングストップが利益を減らす場合があることを示しています。</span>
                </p>
              </div>

              {/* Oct 13 - Best Day */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">October 13, 2025 - Best Day / 2025年10月13日 - 最高日</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">Without Trailing / トレーリングなし</CardTitle>
                      <CardDescription className="font-mono text-green-400">68% WR, +$120 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-13_0000_to_2025-10-13_2359_winrate_68pct_profit_120.png"
                        alt="October 13, 2025 - Without Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">With Trailing / トレーリングあり</CardTitle>
                      <CardDescription className="font-mono text-green-400">50% WR, +$49 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-13_0000_to_2025-10-13_2359_winrate_50pct_profit_49_Trailing.png"
                        alt="October 13, 2025 - With Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Oct 14 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">October 14, 2025 / 2025年10月14日</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">Without Trailing / トレーリングなし</CardTitle>
                      <CardDescription className="font-mono text-green-400">41% WR, +$13 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-14_0000_to_2025-10-14_2359_winrate_41pct_profit_13.png"
                        alt="October 14, 2025 - Without Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">With Trailing / トレーリングあり</CardTitle>
                      <CardDescription className="font-mono text-green-400">29% WR, +$3 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-14_0000_to_2025-10-14_2359_winrate_29pct_profit_3_Trailing.png"
                        alt="October 14, 2025 - With Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Oct 15 - Comparison Example */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">October 15, 2025 - Comparison Example / 2025年10月15日 - 比較例</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">Without Trailing / トレーリングなし</CardTitle>
                      <CardDescription className="font-mono text-red-400">31% WR, -$20 loss</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-15_0000_to_2025-10-15_2359_winrate_31pct_loss_20.png"
                        alt="October 15, 2025 - Without Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-red-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">With Trailing / トレーリングあり</CardTitle>
                      <CardDescription className="font-mono text-green-400">31% WR, +$19 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-15_0000_to_2025-10-15_2359_winrate_31pct_profit_19_Trailing.png"
                        alt="October 15, 2025 - With Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </div>
                <p className="font-mono text-sm text-foreground/70 italic">
                  This day perfectly demonstrates how trailing stop converted a loss into profit by locking in gains.
                  <br />
                  <span className="text-xs">
                    この日は、トレーリングストップが利益を確保することで損失を利益に転換したことを完璧に示しています。
                  </span>
                </p>
              </div>

              {/* Oct 16 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">October 16, 2025 / 2025年10月16日</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">Without Trailing / トレーリングなし</CardTitle>
                      <CardDescription className="font-mono text-green-400">57% WR, +$44 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-16_0000_to_2025-10-16_2359_winrate_57pct_profit_44.png"
                        alt="October 16, 2025 - Without Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">With Trailing / トレーリングあり</CardTitle>
                      <CardDescription className="font-mono text-green-400">36% WR, +$19 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-16_0000_to_2025-10-16_2359_winrate_36pct_profit_19_Trailing.png"
                        alt="October 16, 2025 - With Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Oct 17 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">October 17, 2025 / 2025年10月17日</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">Without Trailing / トレーリングなし</CardTitle>
                      <CardDescription className="font-mono text-red-400">35% WR, -$2 loss</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-17_0000_to_2025-10-17_2359_winrate_35pct_loss_2.png"
                        alt="October 17, 2025 - Without Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-red-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">With Trailing / トレーリングあり</CardTitle>
                      <CardDescription className="font-mono text-green-400">24% WR, +$5 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-17_0000_to_2025-10-17_2359_winrate_24pct_profit_5_Trailing.png"
                        alt="October 17, 2025 - With Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Oct 20 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">October 20, 2025 / 2025年10月20日</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">Without Trailing / トレーリングなし</CardTitle>
                      <CardDescription className="font-mono text-red-400">19% WR, -$41 loss</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-20_0000_to_2025-10-20_2359_winrate_19pct_loss_41.png"
                        alt="October 20, 2025 - Without Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-red-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">With Trailing / トレーリングあり</CardTitle>
                      <CardDescription className="font-mono text-green-400">19% WR, +$3 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-20_0000_to_2025-10-20_2359_winrate_19pct_profit_3_Trailing.png"
                        alt="October 20, 2025 - With Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </div>
                <p className="font-mono text-sm text-foreground/70 italic">
                  Trailing stop converted -$41 loss to +$3 profit, a $44 improvement.
                  <br />
                  <span className="text-xs">トレーリングストップは-$41の損失を+$3の利益に転換し、$44の改善を実現しました。</span>
                </p>
              </div>

              {/* Oct 21 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">October 21, 2025 / 2025年10月21日</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">Without Trailing / トレーリングなし</CardTitle>
                      <CardDescription className="font-mono text-red-400">29% WR, -$23 loss</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-21_0000_to_2025-10-21_2359_winrate_29pct_loss_23.png"
                        alt="October 21, 2025 - Without Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-red-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">With Trailing / トレーリングあり</CardTitle>
                      <CardDescription className="font-mono text-green-400">29% WR, +$21 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-21_0000_to_2025-10-21_2359_winrate_29pct_profit_21_Trailing.png"
                        alt="October 21, 2025 - With Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </div>
                <p className="font-mono text-sm text-foreground/70 italic">
                  Trailing stop converted -$23 loss to +$21 profit, a $44 improvement.
                  <br />
                  <span className="text-xs">トレーリングストップは-$23の損失を+$21の利益に転換し、$44の改善を実現しました。</span>
                </p>
              </div>

              {/* Oct 22 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">October 22, 2025 / 2025年10月22日</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">Without Trailing / トレーリングなし</CardTitle>
                      <CardDescription className="font-mono text-red-400">28% WR, -$30 loss</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-22_0000_to_2025-10-22_2359_winrate_28pct_loss_30.png"
                        alt="October 22, 2025 - Without Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-red-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">With Trailing / トレーリングあり</CardTitle>
                      <CardDescription className="font-mono text-red-400">16% WR, -$20 loss</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-22_0000_to_2025-10-22_2359_winrate_16pct_loss_20_Trailing.png"
                        alt="October 22, 2025 - With Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-red-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </div>
                <p className="font-mono text-sm text-foreground/70 italic">
                  Trailing stop reduced losses from -$30 to -$20, saving $10.
                  <br />
                  <span className="text-xs">トレーリングストップは損失を-$30から-$20に削減し、$10を節約しました。</span>
                </p>
              </div>

              {/* Oct 23 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">October 23, 2025 / 2025年10月23日</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">Without Trailing / トレーリングなし</CardTitle>
                      <CardDescription className="font-mono text-red-400">17% WR, -$64 loss</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-23_0000_to_2025-10-23_2359_winrate_17pct_loss_64.png"
                        alt="October 23, 2025 - Without Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-red-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">With Trailing / トレーリングあり</CardTitle>
                      <CardDescription className="font-mono text-red-400">26% WR, -$12 loss</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-23_0000_to_2025-10-23_2359_winrate_26pct_loss_12_Trailing.png"
                        alt="October 23, 2025 - With Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-red-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </div>
                <p className="font-mono text-sm text-foreground/70 italic">
                  Trailing stop reduced losses from -$64 to -$12, saving $52.
                  <br />
                  <span className="text-xs">トレーリングストップは損失を-$64から-$12に削減し、$52を節約しました。</span>
                </p>
              </div>

              {/* Oct 24 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">October 24, 2025 / 2025年10月24日</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">Without Trailing / トレーリングなし</CardTitle>
                      <CardDescription className="font-mono text-red-400">31% WR, -$11 loss</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-24_0000_to_2025-10-24_2359_winrate_31pct_loss_11.png"
                        alt="October 24, 2025 - Without Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-red-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">With Trailing / トレーリングあり</CardTitle>
                      <CardDescription className="font-mono text-green-400">25% WR, +$5 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-24_0000_to_2025-10-24_2359_winrate_25pct_profit_5_Trailing.png"
                        alt="October 24, 2025 - With Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </div>
                <p className="font-mono text-sm text-foreground/70 italic">
                  Trailing stop converted -$11 loss to +$5 profit, a $16 improvement.
                  <br />
                  <span className="text-xs">トレーリングストップは-$11の損失を+$5の利益に転換し、$16の改善を実現しました。</span>
                </p>
              </div>

              {/* Oct 27 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">October 27, 2025 / 2025年10月27日</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">Without Trailing / トレーリングなし</CardTitle>
                      <CardDescription className="font-mono text-green-400">43% WR, +$14 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-27_0000_to_2025-10-27_2359_winrate_43pct_profit_14.png"
                        alt="October 27, 2025 - Without Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">With Trailing / トレーリングあり</CardTitle>
                      <CardDescription className="font-mono text-green-400">21% WR, +$5 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-27_0000_to_2025-10-27_2359_winrate_21pct_profit_5_Trailing.png"
                        alt="October 27, 2025 - With Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Oct 28 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">October 28, 2025 / 2025年10月28日</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">Without Trailing / トレーリングなし</CardTitle>
                      <CardDescription className="font-mono text-red-400">32% WR, -$13 loss</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-28_0000_to_2025-10-28_2359_winrate_32pct_loss_13.png"
                        alt="October 28, 2025 - Without Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-red-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">With Trailing / トレーリングあり</CardTitle>
                      <CardDescription className="font-mono text-green-400">21% WR, +$0 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-28_0000_to_2025-10-28_2359_winrate_21pct_profit_0_Trailing.png"
                        alt="October 28, 2025 - With Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </div>
                <p className="font-mono text-sm text-foreground/70 italic">
                  Trailing stop converted -$13 loss to breakeven, saving $13.
                  <br />
                  <span className="text-xs">トレーリングストップは-$13の損失を損益分岐点に転換し、$13を節約しました。</span>
                </p>
              </div>

              {/* Oct 29 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">October 29, 2025 / 2025年10月29日</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">Without Trailing / トレーリングなし</CardTitle>
                      <CardDescription className="font-mono text-red-400">27% WR, -$21 loss</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-29_0000_to_2025-10-29_2359_winrate_27pct_loss_21.png"
                        alt="October 29, 2025 - Without Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-red-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">With Trailing / トレーリングあり</CardTitle>
                      <CardDescription className="font-mono text-green-400">33% WR, +$12 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-29_0000_to_2025-10-29_2359_winrate_33pct_profit_12_Trailing.png"
                        alt="October 29, 2025 - With Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </div>
                <p className="font-mono text-sm text-foreground/70 italic">
                  Trailing stop converted -$21 loss to +$12 profit, a $33 improvement.
                  <br />
                  <span className="text-xs">トレーリングストップは-$21の損失を+$12の利益に転換し、$33の改善を実現しました。</span>
                </p>
              </div>

              {/* Oct 30 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">October 30, 2025 / 2025年10月30日</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">Without Trailing / トレーリングなし</CardTitle>
                      <CardDescription className="font-mono text-green-400">41% WR, +$13 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-30_0000_to_2025-10-30_2359_winrate_41pct_profit_13.png"
                        alt="October 30, 2025 - Without Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">With Trailing / トレーリングあり</CardTitle>
                      <CardDescription className="font-mono text-green-400">24% WR, +$2 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-30_0000_to_2025-10-30_2359_winrate_24pct_profit_2_Trailing.png"
                        alt="October 30, 2025 - With Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Oct 31 - Worst Day */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">October 31, 2025 - Worst Day / 2025年10月31日 - 最悪日</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">Without Trailing / トレーリングなし</CardTitle>
                      <CardDescription className="font-mono text-red-400">0% WR, -$81 loss</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-31_0000_to_2025-10-31_2359_winrate_0pct_loss_81.png"
                        alt="October 31, 2025 - Without Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-red-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">With Trailing / トレーリングあり</CardTitle>
                      <CardDescription className="font-mono text-green-400">20% WR, +$4 profit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/backtest/backtest_XAUUSDm_2025-10-31_0000_to_2025-10-31_2359_winrate_20pct_profit_4_Trailing.png"
                        alt="October 31, 2025 - With Trailing Stop"
                        width={800}
                        height={600}
                        className="rounded-lg border border-green-400/20 w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </div>
                <p className="font-mono text-sm text-foreground/70 italic">
                  Trailing stop dramatically reduced losses from -$81 to +$4, a $85 improvement.
                  <br />
                  <span className="text-xs">
                    トレーリングストップは損失を-$81から+$4に劇的に削減し、$85の改善を実現しました。
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* Key Insights */}
          <section className="mb-12">
            <h2 className="text-3xl font-mono font-bold mb-6">
              Key Insights / 重要な洞察
            </h2>
            
            <div className="space-y-4">
              <Card className="bg-background/30 backdrop-blur-sm border-primary/40">
                <CardHeader>
                  <CardTitle className="text-xl font-mono text-primary">1. Profit Protection / 利益保護</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-foreground/80 mb-2">
                    Trailing stop protects profits by moving stop loss closer to current price as position becomes profitable, preventing profit erosion during market reversals.
                  </p>
                  <p className="font-mono text-foreground/70 text-sm">
                    トレーリングストップは、ポジションが利益を出すにつれてストップロスを現在価格に近づけることで利益を保護し、市場の反転時の利益減少を防ぎます。
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/30 backdrop-blur-sm border-primary/40">
                <CardHeader>
                  <CardTitle className="text-xl font-mono text-primary">2. Win Rate vs. Profit / 勝率と利益</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-foreground/80 mb-2">
                    While trailing stop reduces win rate (36.5% → 28.3%), it significantly increases total profit (+179%) by locking in smaller gains and preventing large losses.
                  </p>
                  <p className="font-mono text-foreground/70 text-sm">
                    トレーリングストップは勝率を下げますが（36.5% → 28.3%）、小さな利益を確保し、大きな損失を防ぐことで総利益を大幅に増加させます（+179%）。
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/30 backdrop-blur-sm border-primary/40">
                <CardHeader>
                  <CardTitle className="text-xl font-mono text-primary">3. Consistency Improvement / 一貫性の向上</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-foreground/80 mb-2">
                    Profitable days increased from 52.2% to 82.6%, demonstrating improved consistency and reduced drawdown periods.
                  </p>
                  <p className="font-mono text-foreground/70 text-sm">
                    利益日は52.2%から82.6%に増加し、一貫性の向上とドローダウン期間の短縮を示しています。
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/30 backdrop-blur-sm border-primary/40">
                <CardHeader>
                  <CardTitle className="text-xl font-mono text-primary">4. Risk Management / リスク管理</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-foreground/80 mb-2">
                    Dynamic risk management through trailing stops adapts to market conditions, providing better protection than fixed stop-loss levels.
                  </p>
                  <p className="font-mono text-foreground/70 text-sm">
                    トレーリングストップによる動的リスク管理は市場状況に適応し、固定ストップロスレベルよりも優れた保護を提供します。
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <Card className="bg-gradient-to-r from-primary/10 via-background/50 to-primary/10 backdrop-blur-sm border-primary/30">
              <CardHeader>
                <CardTitle className="text-2xl font-mono text-primary">Conclusion / 結論</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-mono text-foreground/80 leading-relaxed">
                  The October 2025 backtest results clearly demonstrate the significant value of trailing stop protection in quantitative trading systems. 
                  While the win rate decreased slightly, the implementation of trailing stops resulted in a 179% increase in total profit and a 30.4% improvement 
                  in profitable trading days. This analysis validates that dynamic risk management through trailing stops is essential for maximizing returns 
                  while maintaining consistent performance in volatile markets.
                </p>
                <p className="font-mono text-foreground/70 leading-relaxed text-sm">
                  2025年10月のバックテスト結果は、定量取引システムにおけるトレーリングストップ保護の重要な価値を明確に示しています。
                  勝率はわずかに低下しましたが、トレーリングストップの実装により、総利益が179%増加し、利益取引日が30.4%改善しました。
                  この分析は、変動の激しい市場で一貫したパフォーマンスを維持しながらリターンを最大化するには、トレーリングストップによる動的リスク管理が不可欠であることを検証しています。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Footer */}
          <footer className="border-t border-border/20 pt-8">
            <div className="flex items-center justify-between text-sm font-mono text-foreground/60">
              <div>
                <span>Published by SAIL Lab Research Team / SAIL Lab研究チーム</span>
              </div>
              <div>
                <span>November 13, 2025</span>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}

