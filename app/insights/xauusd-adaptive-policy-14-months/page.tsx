"use client";

import { Badge } from "@/components/ui/badge";
import { GL } from "@/components/gl";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";
import XauusdReport from "./report";

const HIGHLIGHT_STATS = [
  { value: "−73%", labelKey: "stat1Label", tone: "text-green-400 border-green-500/30" },
  { value: "5.5", labelKey: "stat2Label", tone: "text-primary border-primary/30" },
  { value: "+2,997 pts", labelKey: "stat3Label", tone: "text-primary border-primary/30" },
  { value: "12–38%", labelKey: "stat4Label", tone: "text-green-400 border-green-500/30" },
] as const;

const PDF_URL = "/reports/SAIL_Lab_XAUUSD_Trend_Policy_profit_vs_risk.pdf";

export default function XauusdAdaptivePolicyPage() {
  const { t } = useLanguage();
  const p = "insights.xauusdAdaptive";

  return (
    <div className="min-h-screen relative">
      <GL hovering={false} />

      <div className="relative z-10 container mx-auto pt-40 pb-24 px-6 max-w-6xl">
        <article>
          <header className="mb-12 max-w-4xl">
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

            <p className="text-lg md:text-xl font-mono text-foreground/80 leading-relaxed">{t(`${p}.lead`)}</p>
            <a
              href={PDF_URL}
              download
              className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-primary/40 bg-primary/10 text-primary font-mono text-sm hover:bg-primary/20 transition-colors"
            >
              {t(`${p}.downloadPdf`)} ↓
            </a>
          </header>

          <section className="mb-16 space-y-6">
            <h2 className="text-2xl font-mono font-bold text-primary">{t(`${p}.highlightsTitle`)}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {HIGHLIGHT_STATS.map(({ value, labelKey, tone }) => (
                <div key={labelKey} className={`p-5 rounded-lg bg-background/40 backdrop-blur-sm border ${tone.split(" ")[1]}`}>
                  <div className={`text-3xl font-mono font-bold ${tone.split(" ")[0]}`}>{value}</div>
                  <div className="text-xs font-mono text-foreground/65 mt-2 leading-relaxed">{t(`${p}.${labelKey}`)}</div>
                </div>
              ))}
            </div>
            <ol className="grid md:grid-cols-2 gap-4 font-mono text-sm">
              {[1, 2, 3, 4, 5].map((n) => (
                <li key={n} className="flex gap-3 p-4 rounded-lg bg-background/30 border border-border/40 text-foreground/80 leading-relaxed">
                  <span className="text-primary font-bold">{n}</span>
                  <span>{t(`${p}.point${n}`)}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mb-12 space-y-4">
            <div className="border-l-2 border-primary pl-5">
              <h2 className="text-2xl font-mono font-bold">{t(`${p}.reportTitle`)}</h2>
              <p className="text-sm font-mono text-foreground/60 mt-2">{t(`${p}.reportNote`)}</p>
              <a href={PDF_URL} download className="text-sm font-mono text-primary hover:underline mt-2 inline-block">
                {t(`${p}.downloadPdf`)} ↓
              </a>
            </div>
            <div className="rounded-xl border border-border/40 bg-background/70 backdrop-blur-sm p-4 md:p-8">
              <XauusdReport />
            </div>
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
