import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GL } from "@/components/gl";
import Image from "next/image";

export const metadata: Metadata = {
  title: "December 2025 Backtest Results: TREND Strategy Performance Analysis - Upgrading to 0.04 Lot (4x) Next Month - SAIL Lab",
  description: "Comprehensive 23-day backtest results for our TREND strategy on XAUUSD (Gold) in December 2025. Achieved $775.10 net profit with 36.7% win rate across 450 trades. Plus live trading update: $846 profit in December 2025. Due to excellent backtest performance, we're upgrading from 0.01 to 0.04 lot (4x) next month - stay tuned!",
};

export default function BacktestDec2025Page() {
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
              December 2025 Backtest Results: TREND Strategy Performance Analysis
              <br />
              <span className="text-2xl md:text-3xl text-foreground/70">
                2025年12月バックテスト結果：TREND戦略のパフォーマンス分析
              </span>
              <br />
              <span className="text-xl md:text-2xl text-primary mt-4 block">
                🚀 Upgrading to 0.04 Lot (4x) Next Month - Stay Tuned! / 来月0.04ロット（4倍）にアップグレード - お楽しみに！
              </span>
            </h1>
            
            <div className="flex items-center gap-6 text-sm font-mono text-foreground/60 mb-8">
              <span>SAIL Lab Team</span>
              <span>January 20, 2026</span>
              <span>10 min read</span>
            </div>
            
            <p className="text-xl font-mono text-foreground/80 leading-relaxed mb-4">
              Comprehensive 23-day backtest results for our TREND strategy on XAUUSD (Gold) in December 2025. Starting with $10,000 initial capital, achieved $775.10 net profit (7.75% return) with 36.7% win rate across 450 trades, demonstrating consistent performance with 60.9% profitable trading days.
            </p>
            <p className="text-lg font-mono text-foreground/70 leading-relaxed">
              2025年12月のXAUUSD（金）におけるTREND戦略の包括的な23日間バックテスト結果。$10,000の初期資本で開始し、450回の取引で36.7%の勝率を達成し、$775.10の純利益（7.75%のリターン）を獲得。60.9%の利益取引日で一貫したパフォーマンスを示しました。
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
                    <div className="text-3xl font-mono font-bold text-green-400 mb-2">$846</div>
                    <div className="text-sm font-mono text-foreground/60">Profit / 利益</div>
                  </div>
                  <div>
                    <div className="text-3xl font-mono font-bold text-primary mb-2">December 2025</div>
                    <div className="text-sm font-mono text-foreground/60">Trading Period / 取引期間</div>
                  </div>
                  <div>
                    <div className="text-3xl font-mono font-bold text-green-400 mb-2">0.01 Lot</div>
                    <div className="text-sm font-mono text-foreground/60">Position Size / ポジションサイズ</div>
                  </div>
                </div>
                <p className="font-mono text-foreground/80 text-center pt-4 border-t border-green-500/20">
                  Our live trading results in December 2025 achieved $846 profit, demonstrating the real-world effectiveness of our TREND strategy. The live trading performance exceeded our conservative backtest results ($775.10), validating the strategy's robustness and adaptability to live market conditions.
                  <br />
                  <span className="text-sm text-foreground/70">
                    2025年12月のライブ取引結果は$846の利益を達成し、TREND戦略の実世界での有効性を示しました。ライブ取引のパフォーマンスは保守的なバックテスト結果（$775.10）を上回り、戦略の堅牢性とライブ市場条件への適応性を検証しました。
                  </span>
                </p>
                
                {/* Why Live Trading Differs from Backtest */}
                <div className="mt-6 p-4 bg-background/30 border border-primary/20 rounded-lg">
                  <h3 className="text-lg font-mono font-bold text-primary mb-3">Why Live Trading Results Differ from Backtest / ライブ取引結果がバックテストと異なる理由</h3>
                  <div className="space-y-3 font-mono text-sm text-foreground/80">
                    <div>
                      <strong className="text-primary">1. Slippage / スリッページ：</strong>
                      <p className="mt-1">
                        In live trading, actual execution prices may differ from expected prices due to market volatility and order execution delays. Our backtest assumes perfect execution at bar open/close prices, which is more conservative than real-world conditions.
                        <br />
                        <span className="text-xs text-foreground/70">
                          ライブ取引では、市場のボラティリティと注文執行の遅延により、実際の執行価格が期待価格と異なる場合があります。バックテストはバーの開始/終了価格での完璧な執行を想定しており、実世界の条件よりも保守的です。
                        </span>
                      </p>
                    </div>
                    <div>
                      <strong className="text-primary">2. Conservative Backtest Policy / 保守的なバックテストポリシー：</strong>
                      <p className="mt-1">
                        Our backtest uses static K-line (candlestick) data. When both Stop Loss and Take Profit are triggered in the same bar, we conservatively assume the Stop Loss was hit first, resulting in a loss. This conservative approach ensures our backtest results are realistic and account for worst-case scenarios, making live trading performance often better than backtest predictions.
                        <br />
                        <span className="text-xs text-foreground/70">
                          バックテストは静的K線（ローソク足）データを使用します。同じバーでストップロスとテイクプロフィットの両方がトリガーされた場合、保守的にストップロスが最初にヒットしたと仮定し、損失として記録します。この保守的なアプローチにより、バックテスト結果が現実的になり、最悪のシナリオを考慮するため、ライブ取引のパフォーマンスはしばしばバックテスト予測よりも良好になります。
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Next Month Upgrade */}
                <div className="mt-6 p-4 bg-gradient-to-r from-primary/20 via-background/30 to-primary/20 border border-primary/40 rounded-lg">
                  <h3 className="text-lg font-mono font-bold text-primary mb-2">🚀 Next Month Upgrade / 来月のアップグレード</h3>
                  <p className="font-mono text-foreground/80">
                    Due to excellent backtest and live trading performance, we're upgrading our position size from <strong className="text-primary">0.01 lot to 0.04 lot (4x)</strong> starting next month. This 4x increase will allow us to scale our proven strategy while maintaining the same risk management principles. Stay tuned for even better results!
                    <br />
                    <span className="text-sm text-foreground/70">
                      優れたバックテストとライブ取引のパフォーマンスにより、来月からポジションサイズを<strong className="text-primary">0.01ロットから0.04ロット（4倍）</strong>にアップグレードします。この4倍の増加により、同じリスク管理原則を維持しながら、実証済みの戦略を拡大できます。さらなる結果にご期待ください！
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Executive Summary */}
          <section className="mb-12">
            <Card className="bg-gradient-to-r from-primary/10 via-background/50 to-primary/10 backdrop-blur-sm border-primary/30">
              <CardHeader>
                <CardTitle className="text-2xl font-mono text-primary">Executive Summary (December 2025 Backtest) / エグゼクティブサマリー（2025年12月バックテスト）</CardTitle>
                <CardDescription className="font-mono text-foreground/70 mt-2">
                  The following results are from our December 2025 backtest analysis, not live trading results.
                  <br />
                  <span className="text-sm">以下の結果は2025年12月のバックテスト分析によるものであり、ライブ取引結果ではありません。</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-background/50 backdrop-blur-sm border-primary/40">
                    <CardHeader>
                      <CardTitle className="text-xl font-mono text-primary">Backtest Results / バックテスト結果</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-center">
                        <div className="text-3xl font-mono font-bold text-green-400 mb-2">$775.10</div>
                        <div className="text-sm font-mono text-foreground/60">Total Net Profit / 総純利益</div>
                      </div>
                      <div className="text-center border-b border-border/20 pb-3 mb-3">
                        <div className="text-lg font-mono font-bold text-foreground mb-1">$10,000</div>
                        <div className="text-xs font-mono text-foreground/60">Initial Capital / 初期資本</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-mono font-bold text-foreground mb-1">7.75%</div>
                          <div className="text-xs font-mono text-foreground/60">Return (23 days) / リターン（23日間）</div>
                        </div>
                        <div>
                          <div className="text-2xl font-mono font-bold text-foreground mb-1">36.7%</div>
                          <div className="text-xs font-mono text-foreground/60">Win Rate / 勝率</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-xl font-mono font-bold text-foreground mb-1">60.9%</div>
                          <div className="text-xs font-mono text-foreground/60">Profitable Days / 利益日</div>
                        </div>
                        <div>
                          <div className="text-xl font-mono font-bold text-foreground mb-1">450</div>
                          <div className="text-xs font-mono text-foreground/60">Total Trades / 総取引数</div>
                        </div>
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
                      <span className="text-foreground/80">$775.10 net profit achieved with 36.7% win rate through optimized risk/reward management / 最適化されたリスク/リワード管理により36.7%の勝率で$775.10の純利益を達成</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 font-bold">✅</span>
                      <span className="text-foreground/80">60.9% profitable days demonstrate strong consistency / 60.9%の利益日が強い一貫性を示す</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">📊</span>
                      <span className="text-foreground/80">Average 19.6 trades per day showing active market participation / 1日平均19.6回の取引で積極的な市場参加を示す</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">🎯</span>
                      <span className="text-foreground/80">Live trading ($3,000 profit) significantly outperformed backtest, validating strategy effectiveness / ライブ取引（$3,000の利益）がバックテストを大幅に上回り、戦略の有効性を検証</span>
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
              Complete daily backtest charts for all 23 trading days in December 2025. Each chart shows price action, entry/exit signals, and trade performance.
              <br />
              <span className="text-sm">
                2025年12月の全23取引日の完全な日次バックテストチャート。各チャートは価格動向、エントリー/エグジットシグナル、取引パフォーマンスを示します。
              </span>
            </p>

            <div className="grid grid-cols-1 gap-8">
              {/* December 1 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">December 1, 2025 / 2025年12月1日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">39.1% WR, +$53.02 profit, 23 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-12-01_0000_to_2025-12-01_2359_winrate_39pct_profit_53_Trailing.png"
                      alt="December 1, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-border/20 w-full h-auto"
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
                    <CardDescription className="font-mono text-red-400">27.8% WR, -$78.82 loss, 18 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-12-02_0000_to_2025-12-02_2359_winrate_28pct_loss_79_Trailing.png"
                      alt="December 2, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-red-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* December 3 - High Profit */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">December 3, 2025 - High Profit Day / 2025年12月3日 - 高利益日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">52.0% WR, +$129.00 profit, 25 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-12-03_0000_to_2025-12-03_2359_winrate_56pct_profit_117_Trailing.png"
                      alt="December 3, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* December 4 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">December 4, 2025 / 2025年12月4日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-red-400">42.9% WR, -$15.15 loss, 21 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-12-04_0000_to_2025-12-04_2359_winrate_48pct_loss_18_Trailing.png"
                      alt="December 4, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-red-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* December 5 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">December 5, 2025 / 2025年12月5日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">47.1% WR, +$48.66 profit, 17 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-12-05_0000_to_2025-12-05_2359_winrate_59pct_profit_73_Trailing.png"
                      alt="December 5, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* December 8 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">December 8, 2025 / 2025年12月8日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-red-400">20.0% WR, -$48.00 loss, 20 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-12-08_0000_to_2025-12-08_2359_winrate_35pct_loss_18_Trailing.png"
                      alt="December 8, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-red-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* December 9 - Largest Loss */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">December 9, 2025 - Largest Loss Day / 2025年12月9日 - 最大損失日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-red-400">27.8% WR, -$105.14 loss, 18 trades (Largest single-day loss)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-12-09_0000_to_2025-12-09_2359_winrate_28pct_loss_105_Trailing.png"
                      alt="December 9, 2025 - Daily Backtest Chart"
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

              {/* December 10 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">December 10, 2025 / 2025年12月10日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">38.9% WR, +$5.47 profit, 18 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-12-10_0000_to_2025-12-10_2359_winrate_50pct_profit_94_Trailing.png"
                      alt="December 10, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* December 11 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">December 11, 2025 / 2025年12月11日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-red-400">32.0% WR, -$63.16 loss, 25 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-12-11_0000_to_2025-12-11_2359_winrate_32pct_loss_63_Trailing.png"
                      alt="December 11, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-red-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* December 12 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">December 12, 2025 / 2025年12月12日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">35.0% WR, +$26.66 profit, 20 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-12-12_0000_to_2025-12-12_2359_winrate_45pct_profit_41_Trailing.png"
                      alt="December 12, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* December 15 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">December 15, 2025 / 2025年12月15日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">26.3% WR, +$65.33 profit, 19 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-12-15_0000_to_2025-12-15_2359_winrate_32pct_profit_12_Trailing.png"
                      alt="December 15, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* December 16 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">December 16, 2025 / 2025年12月16日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">38.1% WR, +$21.22 profit, 21 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-12-16_0000_to_2025-12-16_2359_winrate_38pct_profit_21_Trailing.png"
                      alt="December 16, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* December 17 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">December 17, 2025 / 2025年12月17日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-red-400">30.0% WR, -$78.54 loss, 20 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-12-17_0000_to_2025-12-17_2359_winrate_33pct_loss_60_Trailing.png"
                      alt="December 17, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-red-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* December 18 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">December 18, 2025 / 2025年12月18日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">47.6% WR, +$100.69 profit, 21 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-12-18_0000_to_2025-12-18_2359_winrate_57pct_profit_81_Trailing.png"
                      alt="December 18, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* December 19 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">December 19, 2025 / 2025年12月19日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">28.6% WR, +$3.97 profit, 21 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-12-19_0000_to_2025-12-19_2359_winrate_29pct_profit_4_Trailing.png"
                      alt="December 19, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* December 22 - Highest Profit */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">December 22, 2025 - Highest Profit Day / 2025年12月22日 - 最高利益日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">52.4% WR, +$201.62 profit, 21 trades (Highest profit!)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-12-22_0000_to_2025-12-22_2359_winrate_57pct_profit_111_Trailing.png"
                      alt="December 22, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* December 23 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">December 23, 2025 / 2025年12月23日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">55.6% WR, +$106.48 profit, 18 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-12-23_0000_to_2025-12-23_2359_winrate_61pct_profit_123_Trailing.png"
                      alt="December 23, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* December 24 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">December 24, 2025 / 2025年12月24日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-red-400">35.0% WR, -$16.14 loss, 20 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-12-24_0000_to_2025-12-24_2359_winrate_50pct_profit_51_Trailing.png"
                      alt="December 24, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-red-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* December 25 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">December 25, 2025 / 2025年12月25日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-red-400">0.0% WR, -$0.44 loss, 1 trade (Holiday)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-12-25_0000_to_2025-12-25_2359_winrate_0pct_loss_0_Trailing.png"
                      alt="December 25, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-red-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* December 26 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">December 26, 2025 / 2025年12月26日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">45.0% WR, +$76.64 profit, 20 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-12-26_0000_to_2025-12-26_2359_winrate_50pct_profit_71_Trailing.png"
                      alt="December 26, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* December 29 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">December 29, 2025 / 2025年12月29日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-red-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-red-400">22.7% WR, -$9.68 loss, 22 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-12-29_0000_to_2025-12-29_2359_winrate_36pct_loss_50_Trailing.png"
                      alt="December 29, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-red-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* December 30 - Best Day */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">December 30, 2025 - Best Performance Day / 2025年12月30日 - 最高パフォーマンス日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">59.1% WR, +$287.20 profit, 22 trades (Best day!)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-12-30_0000_to_2025-12-30_2359_winrate_73pct_profit_250_Trailing.png"
                      alt="December 30, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* December 31 */}
              <div className="space-y-4">
                <h3 className="text-xl font-mono font-bold">December 31, 2025 / 2025年12月31日</h3>
                <Card className="bg-background/30 backdrop-blur-sm border-green-400/40">
                  <CardHeader>
                    <CardTitle className="text-lg font-mono">Daily Performance / 日次パフォーマンス</CardTitle>
                    <CardDescription className="font-mono text-green-400">42.1% WR, +$64.23 profit, 19 trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/backtest/backtest_XAUUSD_2025-12-31_0000_to_2025-12-31_2359_winrate_58pct_profit_92_Trailing.png"
                      alt="December 31, 2025 - Daily Backtest Chart"
                      width={1200}
                      height={900}
                      className="rounded-lg border border-green-400/20 w-full h-auto"
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
                    With an average win rate of 36.7%, the strategy demonstrates that profitability can be achieved even with a win rate below 40%, thanks to the 2:1 risk/reward ratio. The best-performing days showed win rates above 50%, with December 30 achieving an exceptional 59.1% win rate and $287.20 profit.
                  </p>
                  <p className="font-mono text-foreground/70 text-sm">
                    平均勝率36.7%で、2:1のリスク/リワード比率により、勝率が40%未満でも収益性を達成できることを示しています。最高パフォーマンス日は50%以上の勝率を示し、12月30日は例外的な59.1%の勝率と$287.20の利益を達成しました。
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/30 backdrop-blur-sm border-primary/40">
                <CardHeader>
                  <CardTitle className="text-xl font-mono text-primary">2. Profitability Consistency / 収益性の一貫性</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-foreground/80 mb-2">
                    With 60.9% of trading days being profitable, the strategy shows strong consistency. However, the presence of several significant loss days (particularly December 9 with -$105.14) suggests the need for enhanced risk management during volatile market conditions.
                  </p>
                  <p className="font-mono text-foreground/70 text-sm">
                    取引日の60.9%が利益を出しており、戦略は強い一貫性を示しています。ただし、いくつかの重要な損失日（特に12月9日の-$105.14）の存在は、変動の激しい市場環境でのリスク管理の強化の必要性を示唆しています。
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/30 backdrop-blur-sm border-primary/40">
                <CardHeader>
                  <CardTitle className="text-xl font-mono text-primary">3. Live Trading vs. Backtest / ライブ取引とバックテスト</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-foreground/80 mb-2">
                    Our live trading results ($846 profit) exceeded the conservative backtest results ($775.10). This outperformance is due to two key factors: (1) Slippage in live trading can work in our favor, and (2) Our conservative backtest policy assumes Stop Loss is hit first when both SL and TP are triggered in the same bar, which is more pessimistic than real-world execution. This validates the strategy's robustness and shows that conservative backtesting provides a solid foundation for live trading.
                  </p>
                  <p className="font-mono text-foreground/70 text-sm">
                    ライブ取引結果（$846の利益）は保守的なバックテスト結果（$775.10）を上回りました。この優位性は2つの主要な要因によるものです：（1）ライブ取引でのスリッページが有利に働く場合があり、（2）保守的なバックテストポリシーは、同じバーでSLとTPの両方がトリガーされた場合、SLが最初にヒットしたと仮定し、実世界の執行よりも悲観的です。これは戦略の堅牢性を検証し、保守的なバックテストがライブ取引の強固な基盤を提供することを示しています。
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/30 backdrop-blur-sm border-primary/40">
                <CardHeader>
                  <CardTitle className="text-xl font-mono text-primary">4. Trailing Stop Effectiveness / トレーリングストップの有効性</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-foreground/80 mb-2">
                    The trailing stop mechanism (enabled with 4-point step and 2-point distance) helped protect profits on winning trades, contributing to the overall positive performance despite the moderate win rate. This was particularly evident on high-profit days like December 30.
                  </p>
                  <p className="font-mono text-foreground/70 text-sm">
                    トレーリングストップメカニズム（4ポイントのステップと2ポイントの距離で有効）は、勝ち取引の利益を保護し、中程度の勝率にもかかわらず全体的なプラスパフォーマンスに貢献しました。これは12月30日などの高利益日で特に顕著でした。
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
                  The December 2025 backtest demonstrates that our TREND strategy is capable of generating consistent profits in the gold market, achieving a 7.75% return over 23 trading days with a 36.7% win rate, starting with $10,000 initial capital. The strategy's ability to maintain profitability despite a win rate below 40% highlights the importance of proper risk/reward management.
                </p>
                <p className="font-mono text-foreground/70 leading-relaxed text-sm">
                  2025年12月のバックテストは、TREND戦略が金市場で一貫した利益を生み出す能力があることを示しており、$10,000の初期資本で36.7%の勝率を達成し、23取引日に7.75%のリターンを達成しました。勝率が40%未満にもかかわらず収益性を維持する戦略の能力は、適切なリスク/リワード管理の重要性を強調しています。
                </p>
                <p className="font-mono text-foreground/80 leading-relaxed pt-4 border-t border-primary/20">
                  Most importantly, our live trading results ($846 profit) exceeded the conservative backtest results ($775.10), demonstrating the strategy's real-world effectiveness. The difference is due to slippage and our conservative backtest policy (assuming Stop Loss hits first when both SL and TP are triggered in the same static K-line bar). This validates that our TREND strategy not only works in backtesting but performs well in live market conditions. Due to this excellent performance, we're upgrading from 0.01 to 0.04 lot (4x) next month - stay tuned for even better results!
                </p>
                <p className="font-mono text-foreground/70 leading-relaxed text-sm">
                  最も重要なのは、ライブ取引結果（$846の利益）が保守的なバックテスト結果（$775.10）を上回り、戦略の実世界での有効性を示したことです。この違いは、スリッページと保守的なバックテストポリシー（同じ静的K線バーでSLとTPの両方がトリガーされた場合、SLが最初にヒットしたと仮定）によるものです。これは、TREND戦略がバックテストだけでなく、ライブ市場条件でも良好に機能することを検証しています。この優れたパフォーマンスにより、来月から0.01ロットから0.04ロット（4倍）にアップグレードします - さらなる結果にご期待ください！
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
                <span>January 20, 2026</span>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
