"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GL } from "@/components/gl";
import { useLanguage } from "@/contexts/language-context";
import Image from "next/image";
import Link from "next/link";

const TABLE_ROWS = [
  { metricKey: "metricProfit", ml: "$7,054.65", base: "$2,383.13", delta: "+196%" },
  { metricKey: "metricTrades", ml: "316", base: "587", delta: "−46%" },
  { metricKey: "metricPF", ml: "1.73", base: "1.09", delta: "+59%" },
  { metricKey: "metricPayoff", ml: "22.26", base: "4.06", delta: "+448%" },
  { metricKey: "metricDD", ml: "21.77%", base: "32.52%", delta: "−33%" },
  { metricKey: "metricRecovery", ml: "5.55", base: "0.58", delta: "+857%" },
  { metricKey: "metricSharpe", ml: "15.81", base: "2.35", delta: "+573%" },
] as const;

const STAGE_KEYS = ["stage1", "stage2", "stage3", "stage4", "stage5", "stage6"] as const;

export default function MLContinuousLearningPage() {
  const { t } = useLanguage();
  const p = "insights.mlContinuousLearning";

  return (
    <div className="min-h-screen relative">
      <GL hovering={false} />

      <div className="relative z-10 container mx-auto pt-40 pb-24 px-6 max-w-4xl">
        <article className="prose prose-invert max-w-none">
          <header className="mb-12">
            <div className="overflow-hidden rounded-xl border border-border/40 mb-10">
              <Image
                src="/insights/ml-vs-baseline-teaser.png"
                alt="With AI vs Without AI: XAUUSD trading comparison"
                width={1400}
                height={788}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="mb-8 border-l-2 border-primary pl-5">
              <p className="text-sm font-mono text-primary mb-2">{t(`${p}.launchLabel`)}</p>
              <p className="text-lg font-mono text-foreground/90 leading-relaxed mb-4">
                {t(`${p}.launchText`)}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.mql5.com/en/market/product/181980?source=Site+Profile#description"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-primary hover:underline"
                >
                  {t(`${p}.linkMql5`)} →
                </a>
                <a
                  href="https://www.gogojungle.co.jp/systemtrade/fx/80762?via=users_products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-primary hover:underline"
                >
                  {t(`${p}.linkGogoJungle`)} →
                </a>
              </div>
            </div>

            <p className="text-lg font-mono text-foreground/85 leading-relaxed mb-8">
              {t(`${p}.differentiatorText`)}
            </p>

            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-mono">
                {t("insights.featured")}
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                {t("insights.categoryAI")}
              </Badge>
              <Badge variant="outline" className="font-mono text-xs border-purple-500/40 text-purple-300">
                {t(`${p}.badgeContinuous`)}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-mono font-bold mb-6 leading-tight">
              {t(`${p}.title`)}
            </h1>

            <div className="flex items-center gap-6 text-sm font-mono text-foreground/60 mb-8">
              <span>SAIL Lab Team</span>
              <span>{t(`${p}.date`)}</span>
              <span>{t(`${p}.readTime`)}</span>
            </div>

            <p className="text-xl font-mono text-foreground/80 leading-relaxed">
              {t(`${p}.lead`)}
            </p>
          </header>

          <section className="mb-12">
            <Card className="bg-background/30 backdrop-blur-sm border-primary/30">
              <CardHeader>
                <CardTitle className="text-2xl font-mono text-primary">
                  {t(`${p}.sectionExperiment`)}
                </CardTitle>
                <CardDescription className="font-mono text-foreground/70">
                  {t(`${p}.sectionExperimentDesc`)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="overflow-x-auto rounded-lg border border-border/40">
                  <table className="w-full font-mono text-sm">
                    <thead>
                      <tr className="bg-background/50 border-b border-border/40">
                        <th className="px-4 py-3 text-left">{t(`${p}.colMetric`)}</th>
                        <th className="px-4 py-3 text-right text-green-400">{t(`${p}.colML`)}</th>
                        <th className="px-4 py-3 text-right text-amber-400">{t(`${p}.colBaseline`)}</th>
                        <th className="px-4 py-3 text-right text-primary">{t(`${p}.colDelta`)}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TABLE_ROWS.map(({ metricKey, ml, base, delta }) => (
                        <tr key={metricKey} className="border-b border-border/20">
                          <td className="px-4 py-3 text-foreground/90">{t(`${p}.${metricKey}`)}</td>
                          <td className="px-4 py-3 text-right text-green-400 font-semibold">{ml}</td>
                          <td className="px-4 py-3 text-right text-foreground/80">{base}</td>
                          <td className="px-4 py-3 text-right text-primary">{delta}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid md:grid-cols-3 gap-4 font-mono text-sm">
                  <div className="p-4 rounded-lg bg-background/40 border border-border/40">
                    <div className="text-foreground font-bold mb-1">{t(`${p}.cardSelectivityTitle`)}</div>
                    {t(`${p}.cardSelectivityDesc`)}
                  </div>
                  <div className="p-4 rounded-lg bg-background/40 border border-border/40">
                    <div className="text-foreground font-bold mb-1">{t(`${p}.cardRiskTitle`)}</div>
                    {t(`${p}.cardRiskDesc`)}
                  </div>
                  <div className="p-4 rounded-lg bg-background/40 border border-border/40">
                    <div className="text-foreground font-bold mb-1">{t(`${p}.cardConsistencyTitle`)}</div>
                    {t(`${p}.cardConsistencyDesc`)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <Card className="bg-background/30 backdrop-blur-sm border-border/40 overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl font-mono">{t(`${p}.sectionPipeline`)}</CardTitle>
                <CardDescription className="font-mono">{t(`${p}.sectionPipelineDesc`)}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Image
                  src="/insights/deepagent-fx-pipeline.png"
                  alt="DeepAgent FX six-stage AI trading pipeline"
                  width={1600}
                  height={900}
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
          </section>

          <section className="mb-12 space-y-6">
            <h2 className="text-2xl font-mono font-bold text-primary">{t(`${p}.sectionStages`)}</h2>
            <div className="grid md:grid-cols-2 gap-4 font-mono text-sm">
              {STAGE_KEYS.map((key) => (
                <Card key={key} className="bg-background/30 border-border/40">
                  <CardContent className="p-4">
                    <div className="text-primary font-bold mb-2">{t(`${p}.${key}Title`)}</div>
                    <p className="text-foreground/75">{t(`${p}.${key}Desc`)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <Card className="bg-background/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-2xl font-mono">{t(`${p}.sectionContinuous`)}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 font-mono text-foreground/80">
                <p>{t(`${p}.continuousP1`)}</p>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-primary">{t(`${p}.loopTitle`)}</h3>
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <li key={n}>{t(`${p}.loop${n}`)}</li>
                    ))}
                  </ol>
                </div>

                <div className="p-4 rounded-lg bg-background/40 border border-border/40">
                  <p className="font-bold mb-2">{t(`${p}.keyInsightTitle`)}</p>
                  <p>{t(`${p}.keyInsightText`)}</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <Card className="bg-background/30 border-border/40">
              <CardHeader>
                <CardTitle className="text-xl font-mono text-primary">{t(`${p}.sectionTakeaways`)}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="font-mono text-sm space-y-2 text-foreground/80 list-disc list-inside">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <li key={n}>{t(`${p}.takeaway${n}`)}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <footer className="text-center font-mono text-foreground/50 text-sm border-t border-border/30 pt-8">
            {t(`${p}.footer`)}
            <br />
            <Link href="/insights" className="text-primary hover:underline mt-2 inline-block">
              {t(`${p}.backLink`)}
            </Link>
          </footer>
        </article>
      </div>
    </div>
  );
}
