import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GL } from "@/components/gl";
import Image from "next/image";

export const metadata: Metadata = {
  title: "November 2025 Backtest Results: TREND Strategy Performance Analysis - SAIL Lab",
  description: "Comprehensive 22-day backtest results for our TREND strategy on XAUUSD (Gold) in November 2025. Achieved $213.68 net profit with 40.6% win rate across 449 trades.",
};

export default function BacktestNov2025Page() {
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
              November 2025 Backtest Results: TREND Strategy Performance Analysis
              <br />
              <span className="text-2xl md:text-3xl text-foreground/70">
                2025年11月バックテスト結果：TREND戦略のパフォーマンス分析
              </span>
            </h1>
            
            <div className="flex items-center gap-6 text-sm font-mono text-foreground/60 mb-8">
              <span>SAIL Lab Team</span>
              <span>December 21, 2025</span>
              <span>8 min read</span>
            </div>
            
            <p className="text-xl font-mono text-foreground/80 leading-relaxed mb-4">
              Comprehensive 22-day backtest results for our TREND strategy on XAUUSD (Gold) in November 2025. Achieved $213.68 net profit with 40.6% win rate across 449 trades, demonstrating consistent performance with 68% profitable trading days.
            </p>
            <p className="text-lg font-mono text-foreground/70 leading-relaxed">
              2025年11月のXAUUSD（金）におけるTREND戦略の包括的な22日間バックテスト結果。449回の取引で40.6%の勝率を達成し、$213.68の純利益を獲得。68%の利益取引日で一貫したパフォーマンスを示しました。
            </p>
          </header>

          {/* Live Trading Update */}
          <section className="mb-12">
            <Card className="bg-gradient-to-r from-green-500/20 via-background/50 to-green-500/20 backdrop-blur-sm border-green-500/40">
              <CardHeader>
                <CardTitle className="text-2xl font-mono text-green-400">🚀 Live Trading Update (December 2025) / ライブ取引アップデート（2025年12月）</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-mono font-bold text-green-400 mb-2">$150</div>
                    <div className="text-sm font-mono text-foreground/60">Profit / 利益</div>
                  </div>
                  <div>
                    <div className="text-3xl font-mono font-bold text-primary mb-2">$2,000</div>
                    <div className="text-sm font-mono text-foreground/60">Initial Capital / 初期資本</div>
                  </div>
                  <div>
                    <div className="text-3xl font-mono font-bold text-green-400 mb-2">7.5%</div>
                    <div className="text-sm font-mono text-foreground/60">Return (20 days) / リターン（20日間）</div>
                  </div>
                </div>
                <p className="font-mono text-foreground/80 text-center pt-4 border-t border-green-500/20">
                  Since starting live trading in December 2025, we've achieved impressive results: $150 profit from $2,000 initial capital in just 20 trading days (350/200 profit ratio). Our TREND strategy is now live and performing!
                  <br />
                  <span className="text-sm text-foreground/70">
                    2025年12月にライブ取引を開始して以来、印象的な結果を達成しました：わずか20取引日で$2,000の初期資本から$150の利益（350/200の利益比率）。TREND戦略は現在ライブで稼働中で、良好なパフォーマンスを示しています！
                  </span>
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Executive Summary */}
          <section className="mb-12">
            <Card className="bg-gradient-to-r from-primary/10 via-background/50 to-primary/10 backdrop-blur-sm border-primary/30">
              <CardHeader>
                <CardTitle className="text-2xl font-mono text-primary">Executive Summary / エグゼクティブサマリー</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-background/50 backdrop-blur-sm border-primary/40">
                    <CardHeader>
                      <CardTitle className="text-xl font-mono text-primary">Backtest Results / バックテスト結果</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-center">
                        <div className="text-3xl font-mono font-bold text-green-400 mb-2">$213.68</div>
                        <div className="text-sm font-mono text-foreground/60">Total Net Profit / 総純利益</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-mono font-bold text-foreground mb-1">40.6%</div>
                          <div className="text-xs font-mono text-foreground/60">Win Rate / 勝率</div>
                        </div>
                        <div>
                          <div className="text-2xl font-mono font-bold text-foreground mb-1">68.2%</div>
                          <div className="text-xs font-mono text-foreground/60">Profitable Days / 利益日</div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-mono font-bold text-foreground mb-1">449</div>
                        <div className="text-xs font-mono text-foreground/60">Total Trades / 総取引数</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-mono font-bold text-foreground mb-1">2.14%</div>
                        <div className="text-xs font-mono text-foreground/60">Return (22 days) / リターン（22日間）</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-background/50 backdrop-blur-sm border-green-500/40">
                    <CardHeader>
                      <CardTitle className="text-xl font-mono text-green-400">Strategy Configuration / 戦略設定</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 font-mono text-sm">
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Symbol / シンボル</span>
                        <span className="font-bold">XAUUSD</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Timeframe / 時間足</span>
                        <span className="font-bold">M5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Fast EMA / 高速EMA</span>
                        <span className="font-bold">40</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Slow EMA / 低速EMA</span>
                        <span className="font-bold">75</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Stop Loss / ストップロス</span>
                        <span className="font-bold">5 points</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Risk/Reward / リスク/リワード</span>
                        <span className="font-bold">2.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Trailing Stop / トレーリング</span>
                        <span className="font-bold text-green-400">Enabled</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <h3 className="text-lg font-mono font-bold text-primary mb-3">Key Findings / 主要な発見</h3>
                  <ul className="space-y-2 font-mono text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 font-bold">✅</span>
                      <span className="text-foreground/80">Profitability achieved with 40.6% win rate through proper risk/reward management / 適切なリスク/リワード管理により40.6%の勝率で収益性を達成</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 font-bold">✅</span>
                      <span className="text-foreground/80">68% profitable days demonstrate strong consistency / 68%の利益日が強い一貫性を示す</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">📊</span>
                      <span className="text-foreground/80">Average 20.4 trades per day showing active market participation / 1日平均20.4回の取引で積極的な市場参加を示す</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">🎯</span>
                      <span className="text-foreground/80">Trailing stop mechanism effectively protected profits / トレーリングストップメカニズムが効果的に利益を保護</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Daily Performance Charts */}
          <section className="mb-12">
            <h2 className="text-3xl font-mono font-bold mb-6">
              Daily Performance Charts / 日次パフォーマンスチャート
            </h2>
            <p className="font-mono text-foreground/70 mb-8">
              Complete daily backtest charts for all 22 trading days in November 2025. Each chart shows price action, entry/exit signals, and trade performance.
              <br />
              <span className="text-sm">
                2025年11月の全22取引日の完全な日次バックテストチャート。各チャートは価格動向、エントリー/エグジットシグナル、取引パフォーマンスを示します。
              </span>
            </p>

            <div className="grid grid-cols-1 gap-8">
              {/* November 3 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">November 3, 2025 / 2025年11月3日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-border/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono">47.4% WR, +$25.88 profit, 19 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-11-03_0000_to_2025-11-03_2359_winrate_47pct_profit_26_Trailing.png"
                      alt="November 3, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-border/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* November 4 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">November 4, 2025 / 2025年11月4日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-border/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono">45.8% WR, +$14.28 profit, 24 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-11-04_0000_to_2025-11-04_2359_winrate_46pct_profit_14_Trailing.png"
                      alt="November 4, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-border/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* November 5 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">November 5, 2025 / 2025年11月5日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-red-400">34.8% WR, -$4.22 loss, 23 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-11-05_0000_to_2025-11-05_2359_winrate_35pct_loss_4_Trailing.png"
                      alt="November 5, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-red-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* November 6 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">November 6, 2025 / 2025年11月6日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">55.0% WR, +$32.00 profit, 20 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-11-06_0000_to_2025-11-06_2359_winrate_55pct_profit_32_Trailing.png"
                      alt="November 6, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* November 7 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">November 7, 2025 / 2025年11月7日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">40.0% WR, +$20.19 profit, 20 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-11-07_0000_to_2025-11-07_2359_winrate_40pct_profit_20_Trailing.png"
                      alt="November 7, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* November 10 - Best Win Rate */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">November 10, 2025 - Best Win Rate Day / 2025年11月10日 - 最高勝率日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">68.4% WR, +$48.96 profit, 19 trades (Highest win rate!)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-11-10_0000_to_2025-11-10_2359_winrate_68pct_profit_49_Trailing.png"
                      alt="November 10, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* November 11 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">November 11, 2025 / 2025年11月11日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-red-400">27.3% WR, -$16.29 loss, 22 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-11-11_0000_to_2025-11-11_2359_winrate_27pct_loss_16_Trailing.png"
                      alt="November 11, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-red-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* November 12 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">November 12, 2025 / 2025年11月12日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">34.8% WR, +$5.20 profit, 23 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-11-12_0000_to_2025-11-12_2359_winrate_35pct_profit_5_Trailing.png"
                      alt="November 12, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* November 13 - Highest Profit */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">November 13, 2025 - Highest Profit Day / 2025年11月13日 - 最高利益日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">52.2% WR, +$57.76 profit, 23 trades (Highest profit!)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-11-13_0000_to_2025-11-13_2359_winrate_52pct_profit_58_Trailing.png"
                      alt="November 13, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* November 14 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">November 14, 2025 / 2025年11月14日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">39.1% WR, +$25.43 profit, 23 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-11-14_0000_to_2025-11-14_2359_winrate_39pct_profit_25_Trailing.png"
                      alt="November 14, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* November 17 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">November 17, 2025 / 2025年11月17日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">36.8% WR, +$19.77 profit, 19 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-11-17_0000_to_2025-11-17_2359_winrate_37pct_profit_20_Trailing.png"
                      alt="November 17, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* November 18 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">November 18, 2025 / 2025年11月18日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">40.0% WR, +$8.59 profit, 20 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-11-18_0000_to_2025-11-18_2359_winrate_40pct_profit_9_Trailing.png"
                      alt="November 18, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* November 19 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">November 19, 2025 / 2025年11月19日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-red-400">30.0% WR, -$0.57 loss, 20 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-11-19_0000_to_2025-11-19_2359_winrate_30pct_loss_1_Trailing.png"
                      alt="November 19, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-red-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* November 20 - Largest Loss */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">November 20, 2025 - Largest Loss Day / 2025年11月20日 - 最大損失日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-red-400">25.0% WR, -$52.37 loss, 24 trades (Largest single-day loss)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-11-20_0000_to_2025-11-20_2359_winrate_25pct_loss_52_Trailing.png"
                      alt="November 20, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-red-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
                <p className="font-mono text-sm text-foreground/70 italic">
                  This day highlights the importance of enhanced risk management during volatile market conditions.
                  <br />
                  <span className="text-xs">この日は、変動の激しい市場環境でのリスク管理強化の重要性を示しています。</span>
                </p>
              </div>

              {/* November 21 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">November 21, 2025 / 2025年11月21日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">46.7% WR, +$32.50 profit, 15 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-11-21_0000_to_2025-11-21_2359_winrate_47pct_profit_33_Trailing.png"
                      alt="November 21, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* November 24 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">November 24, 2025 / 2025年11月24日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">41.7% WR, +$14.63 profit, 24 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-11-24_0000_to_2025-11-24_2359_winrate_42pct_profit_15_Trailing.png"
                      alt="November 24, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* November 25 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">November 25, 2025 / 2025年11月25日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-red-400">29.2% WR, -$28.68 loss, 24 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-11-25_0000_to_2025-11-25_2359_winrate_29pct_loss_29_Trailing.png"
                      alt="November 25, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-red-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* November 26 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">November 26, 2025 / 2025年11月26日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">42.9% WR, +$24.25 profit, 21 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-11-26_0000_to_2025-11-26_2359_winrate_43pct_profit_24_Trailing.png"
                      alt="November 26, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* November 27 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">November 27, 2025 / 2025年11月27日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-red-400">38.5% WR, -$13.96 loss, 13 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-11-27_0000_to_2025-11-27_2359_winrate_38pct_loss_14_Trailing.png"
                      alt="November 27, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-red-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* November 28 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">November 28, 2025 / 2025年11月28日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">50.0% WR, +$6.76 profit, 12 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-11-28_0000_to_2025-11-28_2359_winrate_50pct_profit_7_Trailing.png"
                      alt="November 28, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* December 1 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">December 1, 2025 / 2025年12月1日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">39.1% WR, +$13.25 profit, 23 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-12-01_0000_to_2025-12-01_2359_winrate_39pct_profit_13_Trailing.png"
                      alt="December 1, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* December 2 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">December 2, 2025 / 2025年12月2日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-red-400">27.8% WR, -$19.71 loss, 18 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-12-02_0000_to_2025-12-02_2359_winrate_28pct_loss_20_Trailing.png"
                      alt="December 2, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-red-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
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
                  <CardTitle className="text-xl font-mono text-primary">1. Win Rate vs. Risk/Reward / 勝率とリスク/リワード</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-foreground/80 mb-2">
                    With an average win rate of 40.6%, the strategy demonstrates that profitability can be achieved even with a win rate below 50%, thanks to the 2:1 risk/reward ratio. The best-performing days showed win rates above 50%, with November 10 achieving an exceptional 68.4% win rate.
                  </p>
                  <p className="font-mono text-foreground/70 text-sm">
                    平均勝率40.6%で、2:1のリスク/リワード比率により、勝率が50%未満でも収益性を達成できることを示しています。最高パフォーマンス日は50%以上の勝率を示し、11月10日は例外的な68.4%の勝率を達成しました。
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/30 backdrop-blur-sm border-primary/40">
                <CardHeader>
                  <CardTitle className="text-xl font-mono text-primary">2. Profitability Consistency / 収益性の一貫性</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-foreground/80 mb-2">
                    With 68.2% of trading days being profitable, the strategy shows strong consistency. However, the presence of several significant loss days (particularly November 20 with -$52.37) suggests the need for enhanced risk management during volatile market conditions.
                  </p>
                  <p className="font-mono text-foreground/70 text-sm">
                    取引日の68.2%が利益を出しており、戦略は強い一貫性を示しています。ただし、いくつかの重要な損失日（特に11月20日の-$52.37）の存在は、変動の激しい市場環境でのリスク管理の強化の必要性を示唆しています。
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/30 backdrop-blur-sm border-primary/40">
                <CardHeader>
                  <CardTitle className="text-xl font-mono text-primary">3. Trailing Stop Effectiveness / トレーリングストップの有効性</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-foreground/80 mb-2">
                    The trailing stop mechanism (enabled with 4-point step and 2-point distance) helped protect profits on winning trades, contributing to the overall positive performance despite the moderate win rate.
                  </p>
                  <p className="font-mono text-foreground/70 text-sm">
                    トレーリングストップメカニズム（4ポイントのステップと2ポイントの距離で有効）は、勝ち取引の利益を保護し、中程度の勝率にもかかわらず全体的なプラスパフォーマンスに貢献しました。
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/30 backdrop-blur-sm border-primary/40">
                <CardHeader>
                  <CardTitle className="text-xl font-mono text-primary">4. From Backtest to Live Trading / バックテストからライブ取引へ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-foreground/80 mb-2">
                    The transition from backtest to live trading has been successful. Our December live trading results (7.5% return in 20 days) validate the backtest findings and demonstrate the strategy's real-world effectiveness.
                  </p>
                  <p className="font-mono text-foreground/70 text-sm">
                    バックテストからライブ取引への移行は成功しています。12月のライブ取引結果（20日間で7.5%のリターン）は、バックテストの結果を検証し、戦略の実世界での有効性を示しています。
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
                  The November 2025 backtest demonstrates that our TREND strategy is capable of generating consistent profits in the gold market, achieving a 2.14% return over 22 trading days with a 40.6% win rate. The strategy's ability to maintain profitability despite a win rate below 50% highlights the importance of proper risk/reward management.
                </p>
                <p className="font-mono text-foreground/70 leading-relaxed text-sm">
                  2025年11月のバックテストは、TREND戦略が金市場で一貫した利益を生み出す能力があることを示しており、40.6%の勝率で22取引日に2.14%のリターンを達成しました。勝率が50%未満にもかかわらず収益性を維持する戦略の能力は、適切なリスク/リワード管理の重要性を強調しています。
                </p>
                <p className="font-mono text-foreground/80 leading-relaxed pt-4 border-t border-primary/20">
                  While the results are promising, the presence of significant loss days indicates areas for improvement in risk management and market condition filtering. Continued optimization and live trading validation will help refine the strategy further.
                </p>
                <p className="font-mono text-foreground/70 leading-relaxed text-sm">
                  結果は有望ですが、重要な損失日の存在は、リスク管理と市場環境フィルタリングの改善領域を示しています。継続的な最適化とライブ取引の検証により、戦略をさらに洗練することができます。
                </p>
                <p className="font-mono text-foreground/60 leading-relaxed text-xs pt-4 border-t border-primary/10 italic">
                  <strong>Note:</strong> Past performance does not guarantee future results. This backtest is for educational and research purposes. Always conduct thorough testing and risk assessment before deploying any trading strategy with real capital.
                  <br />
                  <span className="text-xs">
                    <strong>注意：</strong> 過去のパフォーマンスは将来の結果を保証するものではありません。このバックテストは教育および研究目的のものです。実際の資本で取引戦略を展開する前に、常に徹底的なテストとリスク評価を実施してください。
                  </span>
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
                <span>December 21, 2025</span>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}

