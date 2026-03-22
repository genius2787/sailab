"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GL } from "@/components/gl";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

export default function AIAgentQuantMythPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen relative">
      <GL hovering={false} />

      <div className="relative z-10 container mx-auto pt-40 pb-24 px-6 max-w-4xl">
        <article className="prose prose-invert max-w-none">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="outline" className="font-mono text-xs border-amber-500/50 text-amber-400">
                {t("insights.aiAgentMyth.badgeCritical")}
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                AI Agent
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-mono font-bold mb-6 leading-tight">
              {t("insights.aiAgentMyth.title")}
            </h1>

            <div className="flex items-center gap-6 text-sm font-mono text-foreground/60 mb-8">
              <span>SAIL Lab</span>
              <span>{t("insights.aiAgentMyth.date")}</span>
              <span>{t("insights.aiAgentMyth.readTime")}</span>
            </div>

            <p className="text-xl font-mono text-foreground/80 leading-relaxed">
              {t("insights.aiAgentMyth.lead")}
            </p>
          </header>

          <section className="mb-12">
            <Card className="bg-background/30 backdrop-blur-sm border-amber-500/30">
              <CardHeader>
                <CardTitle className="text-2xl font-mono text-amber-400">
                  {t("insights.aiAgentMyth.sectionDesign")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-foreground/80">
                  {t("insights.aiAgentMyth.designText")}
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <Card className="bg-background/30 backdrop-blur-sm border-border/40 overflow-hidden">
              <CardContent className="p-0">
                <Image
                  src="/insights/ai-agent-quant-comparison.png"
                  alt="Alpha158 vs QuantaAlpha backtest comparison"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <Card className="bg-background/30 backdrop-blur-sm border-red-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-mono text-red-400">
                  {t("insights.aiAgentMyth.sectionData")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-mono text-foreground/80">
                  {t("insights.aiAgentMyth.dataText1")}
                </p>
                <p className="font-mono text-foreground/70">
                  {t("insights.aiAgentMyth.dataText2")}
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <Card className="bg-background/30 backdrop-blur-sm border-primary/30">
              <CardHeader>
                <CardTitle className="text-xl font-mono text-primary">
                  {t("insights.aiAgentMyth.sectionReflect")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-mono text-foreground/80">
                  {t("insights.aiAgentMyth.reflectText1")}
                </p>
                <p className="font-mono text-foreground/80">
                  {t("insights.aiAgentMyth.reflectText2")}
                </p>
              </CardContent>
            </Card>
          </section>

          <footer className="border-t border-border/20 pt-8">
            <div className="flex items-center justify-between text-sm font-mono text-foreground/60">
              <span>{t("insights.aiAgentMyth.footer")}</span>
              <span>{t("insights.aiAgentMyth.date")}</span>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
