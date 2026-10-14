"use client";

import { Badge } from "@/components/ui/badge";
import { GL } from "@/components/gl";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";

const PDF_URL = "/reports/SAIL_Lab_XAUUSD_Trend_Policy_profit_vs_risk.pdf";

const LADDER = [
  { key: "ladder1", pnl: "+923", dd: "−1,129", ratio: "0.8", tone: "text-red-400 border-red-500/30" },
  { key: "ladder2", pnl: "+2,610", dd: "−702", ratio: "3.7", tone: "text-foreground border-border/40" },
  { key: "ladder3", pnl: "+2,997", dd: "−774", ratio: "3.9", tone: "text-foreground border-border/40" },
  { key: "ladder4", pnl: "+1,718", dd: "−310", ratio: "5.5", tone: "text-green-400 border-green-500/40" },
  { key: "ladder5", pnl: "+2,163", dd: "−665", ratio: "3.3", tone: "text-foreground/70 border-border/40" },
] as const;

export default function XauusdAdaptivePolicyPage() {
  const { t } = useLanguage();
  const p = "insights.xauusdAdaptive";

  return (
    <div className="min-h-screen relative">
      <GL hovering={false} />

      <div className="relative z-10 container mx-auto pt-40 pb-24 px-6 max-w-5xl">
        <article>
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-mono">
                {t("insights.featured")}
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                {t("insights.categoryAI")}
              </Badge>
              <Badge variant="outline" className="font-mono text-xs border-green-500/40 text-green-300">
                {t(`${p}.badgeResearch`)}
              </Badge>
            </div>

            <h1 className="text-3xl md:text-5xl font-mono font-bold mb-6 leading-tight">{t(`${p}.title`)}</h1>

            <div className="flex items-center gap-6 text-sm font-mono text-foreground/60 mb-8">
              <span>SAIL Lab Team</span>
              <span>{t(`${p}.date`)}</span>
              <span>{t(`${p}.readTime`)}</span>
            </div>

            <p className="text-lg font-mono text-foreground/80 leading-relaxed">{t(`${p}.lead`)}</p>
          </header>

          <section className="mb-12 space-y-4">
            <h2 className="text-2xl font-mono font-bold text-primary">{t(`${p}.highlightsTitle`)}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {LADDER.map(({ key, pnl, dd, ratio, tone }) => (
                <div key={key} className={`p-4 rounded-lg bg-background/40 backdrop-blur-sm border ${tone.split(" ")[1]}`}>
                  <div className={`text-xl font-mono font-bold ${tone.split(" ")[0]}`}>
                    {pnl} <span className="text-foreground/50">/</span> {dd}
                  </div>
                  <div className="text-xs font-mono text-foreground/70 mt-2 leading-relaxed">{t(`${p}.${key}`)}</div>
                  <div className="text-xs font-mono text-foreground/50 mt-2">
                    {t(`${p}.ratioLabel`)}: <span className="text-foreground/80 font-semibold">{ratio}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs font-mono text-foreground/50">{t(`${p}.ladderNote`)}</p>
          </section>

          <section className="mb-12 space-y-4">
            <h2 className="text-2xl font-mono font-bold text-primary">{t(`${p}.findingsTitle`)}</h2>
            <ol className="space-y-3 font-mono text-sm">
              {[1, 2, 3, 4, 5].map((n) => (
                <li key={n} className="flex gap-3 p-4 rounded-lg bg-background/30 border border-border/40 text-foreground/85 leading-relaxed">
                  <span className="text-primary font-bold">{n}</span>
                  <span>{t(`${p}.point${n}`)}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mb-12 space-y-4">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <h2 className="text-2xl font-mono font-bold text-primary">{t(`${p}.reportTitle`)}</h2>
              <a
                href={PDF_URL}
                download
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/40 bg-primary/10 text-primary font-mono text-sm hover:bg-primary/20 transition-colors"
              >
                {t(`${p}.downloadPdf`)} ↓
              </a>
            </div>
            <iframe
              src={`${PDF_URL}#view=FitH`}
              title={t(`${p}.reportTitle`)}
              className="w-full h-[80vh] min-h-[600px] rounded-xl border border-border/40 bg-white"
            />
            <p className="text-xs font-mono text-foreground/50">{t(`${p}.reportNote`)}</p>
          </section>

          <footer className="text-center font-mono text-foreground/50 text-sm border-t border-border/30 pt-8">
            {t("insights.mlContinuousLearning.footer")}
            <br />
            <Link href="/insights" className="text-primary hover:underline mt-2 inline-block">
              {t("insights.mlContinuousLearning.backLink")}
            </Link>
          </footer>
        </article>
      </div>
    </div>
  );
}
