import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GL } from "@/components/gl";

export const metadata: Metadata = {
  title: "LLM-Powered Quantitative Trading: The Future is Now - SAIL Lab",
  description: "Exploring how Large Language Models are revolutionizing algorithmic trading strategies and market analysis",
};

export default function LLMTradingPage() {
  return (
    <div className="min-h-screen relative">
      <GL hovering={false} />
      
      <div className="relative z-10 container mx-auto pt-40 pb-24 px-6 max-w-4xl">
        <article className="prose prose-invert max-w-none">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="outline" className="font-mono text-xs">
                AI Trading
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-mono font-bold mb-6 leading-tight">
              LLM-Powered Quantitative Trading: The Future is Now
            </h1>
            
            <div className="flex items-center gap-6 text-sm font-mono text-foreground/60 mb-8">
              <span>Joe Wang</span>
              <span>October 1, 2024</span>
              <span>8 min read</span>
            </div>
            
            <p className="text-xl font-mono text-foreground/80 leading-relaxed">
              Exploring how Large Language Models are revolutionizing algorithmic trading strategies and market analysis through natural language understanding of financial data.
            </p>
          </header>

          {/* Content */}
          <section className="mb-12">
            <Card className="bg-background/30 backdrop-blur-sm border-border/40">
              <CardHeader>
                <CardTitle className="text-2xl font-mono text-primary">The LLM Revolution in Trading</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-foreground/80 leading-relaxed">
                  Large Language Models are transforming quantitative trading by enabling natural language processing of financial data, 
                  news sentiment analysis, and automated strategy generation. This article explores the cutting-edge applications 
                  of LLMs in algorithmic trading systems.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Footer */}
          <footer className="border-t border-border/20 pt-8">
            <div className="flex items-center justify-between text-sm font-mono text-foreground/60">
              <div>
                <span>Published by SAIL Lab Research Team</span>
              </div>
              <div>
                <span>October 1, 2024</span>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
