import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GL } from "@/components/gl";
import Image from "next/image";

export const metadata: Metadata = {
  title: "ML Filter vs Baseline: Why Continuous Learning Matters on XAUUSD - SAIL Lab",
  description:
    "Controlled MT5 optimizer comparison: MODE_ML_TRADE vs MODE_DATASET_ONLY on XAUUSD M5. ML filter delivered 3x profit, 46% fewer trades, lower drawdown, and Sharpe 15.81 vs 2.35. Includes DeepAgent FX pipeline and continuous retraining loop.",
};

export default function MLContinuousLearningPage() {
  return (
    <div className="min-h-screen relative">
      <GL hovering={false} />

      <div className="relative z-10 container mx-auto pt-40 pb-24 px-6 max-w-4xl">
        <article className="prose prose-invert max-w-none">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-mono">
                Featured
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                AI Trading
              </Badge>
              <Badge variant="outline" className="font-mono text-xs border-purple-500/40 text-purple-300">
                Continuous Learning
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-mono font-bold mb-6 leading-tight">
              ML Filter vs Baseline: Why Continuous Learning Matters on XAUUSD
              <br />
              <span className="text-2xl md:text-3xl text-foreground/70">
                MLフィルター vs ベースライン：XAUUSDにおける継続学習の重要性
              </span>
            </h1>

            <div className="flex items-center gap-6 text-sm font-mono text-foreground/60 mb-8">
              <span>SAIL Lab Team</span>
              <span>March 22, 2026</span>
              <span>12 min read</span>
            </div>

            <p className="text-xl font-mono text-foreground/80 leading-relaxed mb-4">
              Same trend strategy. Same symbol (XAUUSD M5). Same backtest window. The only difference: whether an
              AI ensemble filter sits between the signal engine and live execution. The results are not marginal — they
              are structural.
            </p>
            <p className="text-lg font-mono text-foreground/70 leading-relaxed">
              同じTREND戦略、同じXAUUSD M5、同じバックテスト期間。違いはシグナル生成後にAIアンサンブルフィルターを通すかどうかだけ。結果の差は「少し良い」ではなく、構造的なものです。
            </p>
          </header>

          {/* Optimizer comparison */}
          <section className="mb-12">
            <Card className="bg-background/30 backdrop-blur-sm border-primary/30">
              <CardHeader>
                <CardTitle className="text-2xl font-mono text-primary">
                  Controlled Experiment: MT5 Strategy Tester / 対照実験：MT5ストラテジーテスター
                </CardTitle>
                <CardDescription className="font-mono text-foreground/70">
                  Pass 1 = MODE_ML_TRADE (AI filter ON) · Pass 0 = MODE_DATASET_ONLY (rule-based baseline, no ML gate)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="overflow-hidden rounded-lg border border-border/40">
                  <Image
                    src="/insights/ml-vs-baseline-optimizer.png"
                    alt="MT5 optimizer comparison: ML trade mode vs dataset-only baseline"
                    width={1400}
                    height={200}
                    className="w-full h-auto"
                  />
                </div>

                <div className="overflow-x-auto rounded-lg border border-border/40">
                  <table className="w-full font-mono text-sm">
                    <thead>
                      <tr className="bg-background/50 border-b border-border/40">
                        <th className="px-4 py-3 text-left">Metric</th>
                        <th className="px-4 py-3 text-right text-green-400">ML (Pass 1)</th>
                        <th className="px-4 py-3 text-right text-amber-400">Baseline (Pass 0)</th>
                        <th className="px-4 py-3 text-right text-primary">Δ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Net Profit", "$7,054.65", "$2,383.13", "+196%"],
                        ["Total Trades", "316", "587", "−46%"],
                        ["Profit Factor", "1.73", "1.09", "+59%"],
                        ["Expected Payoff", "22.26", "4.06", "+448%"],
                        ["Drawdown %", "21.77%", "32.52%", "−33%"],
                        ["Recovery Factor", "5.55", "0.58", "+857%"],
                        ["Sharpe Ratio", "15.81", "2.35", "+573%"],
                      ].map(([metric, ml, base, delta]) => (
                        <tr key={metric} className="border-b border-border/20">
                          <td className="px-4 py-3 text-foreground/90">{metric}</td>
                          <td className="px-4 py-3 text-right text-green-400 font-semibold">{ml}</td>
                          <td className="px-4 py-3 text-right text-foreground/80">{base}</td>
                          <td className="px-4 py-3 text-right text-primary">{delta}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid md:grid-cols-3 gap-4 font-mono text-sm">
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                    <div className="text-green-400 font-bold mb-1">Selectivity</div>
                    ML rejected low-quality setups. Fewer trades, higher edge per trade.
                  </div>
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                    <div className="text-blue-400 font-bold mb-1">Risk</div>
                    Drawdown fell from 32.5% → 21.8%. Recovery factor 5.55 vs 0.58.
                  </div>
                  <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                    <div className="text-purple-400 font-bold mb-1">Consistency</div>
                    Sharpe 15.81 vs 2.35 — smoother equity curve, not just higher return.
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Pipeline flowchart */}
          <section className="mb-12">
            <Card className="bg-background/30 backdrop-blur-sm border-border/40 overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl font-mono">
                  DeepAgent FX Pipeline: Where ML Fits In
                  <span className="block text-lg text-foreground/60 mt-2 font-normal">
                    DeepAgent FX パイプライン：MLが入る位置
                  </span>
                </CardTitle>
                <CardDescription className="font-mono">
                  Rule-based trend engine generates candidates → AI ensemble filters → confidence scoring → dynamic
                  sizing → MT5 execution → feedback loop
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Image
                  src="/insights/deepagent-fx-pipeline.png"
                  alt="DeepAgent FX six-stage AI trading pipeline with continuous learning loop"
                  width={1600}
                  height={900}
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
          </section>

          {/* Six stages */}
          <section className="mb-12 space-y-6">
            <h2 className="text-2xl font-mono font-bold text-primary">
              Six Stages: From Data to Live Trade / 6段階：データからライブ取引へ
            </h2>
            <div className="grid md:grid-cols-2 gap-4 font-mono text-sm">
              {[
                ["① Market Data", "Millions of M5 bars + tick data. Price, trend, volatility, regime, volume."],
                ["② Trend Policy Engine", "EMA pullback rules — the baseline strategy (no ML yet)."],
                ["③ AI Ensemble Filter", "Random Forest, XGBoost, CatBoost, Logistic Regression + calibrated consensus."],
                ["④ Confidence Scoring", "Side-specific thresholds (e.g. Long 0.32 / Short 0.28). Reject weak signals."],
                ["⑤ Dynamic Position Sizing", "Lot multiplier scales with model confidence (1x–3x)."],
                ["⑥ MT5 Live Execution", "ONNX models embedded in EA. Trailing stops + session risk rules."],
              ].map(([title, desc]) => (
                <Card key={title} className="bg-background/30 border-border/40">
                  <CardContent className="p-4">
                    <div className="text-primary font-bold mb-2">{title}</div>
                    <p className="text-foreground/75">{desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Continuous learning - main emphasis */}
          <section className="mb-12">
            <Card className="bg-gradient-to-r from-purple-500/15 via-background/50 to-primary/15 border-purple-500/40">
              <CardHeader>
                <CardTitle className="text-2xl font-mono text-purple-300">
                  Why Continuous Learning Is Non-Negotiable
                  <span className="block text-lg text-foreground/60 mt-2 font-normal">
                    なぜ継続学習（Continuous Learning）が必須なのか
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 font-mono text-foreground/80">
                <p>
                  A static ML model is a snapshot of the past. Gold regimes shift — volatility clusters change, session
                  dynamics evolve, macro events rewrite correlation structures. The baseline strategy (Pass 0) has no
                  mechanism to adapt; it fires every rule-based signal regardless of current market quality.
                </p>
                <p className="text-foreground/70 text-sm">
                  静的なMLモデルは「過去の写真」に過ぎません。金のレジームは変化し続けます。ベースライン（Pass 0）には適応機構がありません。
                </p>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-primary">Our Continuous Learning Loop / 継続学習ループ</h3>
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li>
                      <strong>Batch backtest</strong> — collect every trade + 20 features at entry (run_batch_backtest.py)
                    </li>
                    <li>
                      <strong>Walk-forward selection</strong> — pick best model on out-of-sample 30% (never peek at test)
                    </li>
                    <li>
                      <strong>Full-data refit</strong> — retrain deployment copy on 100% recent window (aligned Python +
                      MT5 ONNX)
                    </li>
                    <li>
                      <strong>Side-specific deploy</strong> — separate Long/Short models + thresholds to MT5 EA
                    </li>
                    <li>
                      <strong>Performance feedback</strong> — live results feed next batch cycle (target: retrain every
                      ~3 days as regimes shift)
                    </li>
                  </ol>
                </div>

                <div className="p-4 rounded-lg bg-background/40 border border-primary/30">
                  <p className="text-primary font-bold mb-2">Key insight / 要点</p>
                  <p>
                    The ML advantage in Pass 1 is not magic — it is{" "}
                    <em>learned selectivity from recent trade outcomes</em>. Without continuous retraining, that edge
                    decays. With it, the filter stays calibrated to the market you are actually trading today.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Takeaways */}
          <section className="mb-12">
            <Card className="bg-background/30 border-border/40">
              <CardHeader>
                <CardTitle className="text-xl font-mono text-primary">Takeaways / まとめ</CardTitle>
              </CardHeader>
              <CardContent className="font-mono text-sm space-y-3 text-foreground/80">
                <p>✅ ML does not replace the trend strategy — it <strong>filters</strong> it.</p>
                <p>✅ Same rules, 3× profit, half the trades, one-third less drawdown.</p>
                <p>✅ Side-specific models (Long ≠ Short) outperform a single common threshold.</p>
                <p>✅ Continuous learning closes the loop: live → data → retrain → redeploy → live.</p>
                <p>✅ Python live filter and MT5 ONNX EA now share identical decision logic.</p>
              </CardContent>
            </Card>
          </section>

          <footer className="text-center font-mono text-foreground/50 text-sm border-t border-border/30 pt-8">
            SAIL Lab · Tokyo · AI × Data × Strategy × Risk Management
            <br />
            <a href="/insights" className="text-primary hover:underline mt-2 inline-block">
              ← Back to Insights
            </a>
          </footer>
        </article>
      </div>
    </div>
  );
}
