"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { GL } from "./gl";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";

interface InsightArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  featured?: boolean;
  image?: string;
  translationKey?: string;  // e.g. "insights.aiAgentMyth" - uses t(key + ".title"), t(key + ".description")
}

const insightArticles: InsightArticle[] = [
  {
    id: "ml-continuous-learning",
    title: "ML Filter vs Baseline: Why Continuous Learning Matters on XAUUSD",
    description: "Controlled MT5 optimizer test: MODE_ML_TRADE vs MODE_DATASET_ONLY on XAUUSD M5.",
    category: "AI Trading",
    readTime: "12 min read",
    date: "2026-03-22",
    author: "SAIL Lab Team",
    featured: true,
    image: "/insights/ml-vs-baseline-teaser.png",
    translationKey: "insights.mlContinuousLearning"
  },
  {
    id: "ai-agent-quant-myth",
    title: "AI Agent Quant Research: Seriously Misleading?",
    description: "We ran a controlled experiment with QuantaAlpha: Alpha158 baseline vs LLM factor mining vs evolution. The backtest results speak for themselves.",
    category: "AI Trading",
    readTime: "4 min read",
    date: "2026-03-22",
    author: "SAIL Lab",
    featured: true,
    image: "/insights/ai-agent-quant-comparison.png",
    translationKey: "insights.aiAgentMyth"
  },
  {
    id: "backtest-dec-2025",
    title: "December 2025 Backtest Results: TREND Strategy Performance Analysis - Upgrading to 0.04 Lot (4x) Next Month",
    description: "Comprehensive 23-day backtest results for our TREND strategy on XAUUSD (Gold) in December 2025. Achieved $775.10 net profit with 36.7% win rate across 450 trades. Plus live trading update: $846 profit in December 2025. Due to excellent performance, we're upgrading from 0.01 to 0.04 lot (4x) next month - stay tuned!",
    category: "AI Trading",
    readTime: "10 min read",
    date: "2026-01-20",
    author: "SAIL Lab Team",
    featured: true,
    image: "/backtest/backtest_XAUUSD_2025-12-30_0000_to_2025-12-30_2359_winrate_73pct_profit_250_Trailing.png"
  },
  {
    id: "backtest-nov-2025",
    title: "November 2025 Backtest Results: TREND Strategy Performance Analysis",
    description: "Comprehensive 22-day backtest results for our TREND strategy on XAUUSD (Gold) in November 2025. Achieved $213.68 net profit with 40.6% win rate across 449 trades. Plus live trading update: $150 profit from $2,000 capital in 20 days (7.5% return).",
    category: "AI Trading",
    readTime: "8 min read",
    date: "2025-12-21",
    author: "SAIL Lab Team",
    featured: true,
    image: "/backtest/backtest_XAUUSD_2025-11-10_0000_to_2025-11-10_2359_winrate_68pct_profit_49_Trailing.png"
  },
  {
    id: "backtest-oct-2025",
    title: "October 2025 Quant System Backtest Results: Trailing Stop Impact Analysis",
    description: "Comprehensive analysis comparing trading performance with and without trailing stop protection on GOLD markets during October 2025, demonstrating the significant impact of dynamic risk management.",
    category: "AI Trading",
    readTime: "15 min read",
    date: "2025-11-13",
    author: "Joe Wang",
    featured: true,
    image: "/backtest/backtest_XAUUSDm_2025-10-13_0000_to_2025-10-13_2359_winrate_50pct_profit_49_Trailing.png"
  },
  {
    id: "backtest-sep-2025",
    title: "September 2025 Quant System Backtest Results: GOLD Trading Performance Analysis",
    description: "Comprehensive analysis of our AI-powered quantitative trading system's performance on GOLD markets during September 2025, showcasing consistent profitability and adaptive risk management strategies.",
    category: "AI Trading",
    readTime: "12 min read",
    date: "2025-10-11",
    author: "Joe Wang",
    featured: false,
    image: "/backtest/backtest_GOLD._2025-09-11_0800_to_2025-09-11_2359_winrate_54pct_profit_22.png"
  },
  {
    id: "1",
    title: "LLM-Powered Quantitative Trading: The Future is Now",
    description: "Exploring how Large Language Models are revolutionizing algorithmic trading strategies and market analysis through natural language understanding of financial data.",
    category: "AI Trading",
    readTime: "8 min read",
    date: "2024-10-01",
    author: "Joe Wang"
  }
];

const getCategoryTranslationKey = (category: string) => {
  const map: Record<string, string> = {
    "All": "insights.categoryAll",
    "AI Trading": "insights.categoryAI",
    "Deep Learning": "insights.categoryDeep",
    "AI Governance": "insights.categoryGovernance",
    "NLP": "insights.categoryNLP",
    "Risk Management": "insights.categoryRisk",
    "Explainable AI": "insights.categoryExplainable"
  };
  return map[category] || category;
};

const categories = ["All", "AI Trading", "Deep Learning", "AI Governance", "NLP", "Risk Management", "Explainable AI"];

export function Insights() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    // Trigger initial animations
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observers = new Map();

    Object.entries(sectionRefs.current).forEach(([key, element]) => {
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleSections(prev => new Set([...prev, key]));
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(element);
        observers.set(key, observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const filteredArticles = selectedCategory === "All"
    ? insightArticles
    : insightArticles.filter(article => article.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen relative">
      <GL hovering={hovering} />

      <div className="relative z-10 container mx-auto pt-40 pb-24 px-6">
        <section id="insights" className="py-20 md:py-32">
          <div>
            {/* Header */}
            <div className="text-center mb-16" ref={(el) => { sectionRefs.current.header = el; }}>
              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-mono mb-6 ${isLoaded ? 'animate-fade-in-up' : ''}`}>
                {t('insights.title')}
              </h2>
              <p className={`font-mono text-foreground/60 text-lg max-w-2xl mx-auto ${isLoaded ? 'animate-fade-in-up animate-delay-200' : ''}`}>
                {t('insights.subtitle')}
              </p>
            </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" ref={(el) => { sectionRefs.current.filters = el; }}>
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 font-mono text-sm uppercase transition-all duration-300 border rounded-lg hover-lift ${selectedCategory === category
                  ? "bg-primary text-background border-primary"
                  : "text-foreground/60 border-border hover:text-foreground hover:border-foreground/40"
              } ${isLoaded ? 'animate-fade-in-up' : ''}`}
              style={{animationDelay: isLoaded ? `${index * 0.05 + 0.4}s` : '0s'}}
            >
              {t(getCategoryTranslationKey(category))}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {selectedCategory === "All" && (
          <div className="mb-16" ref={(el) => { sectionRefs.current.featured = el; }}>
            {insightArticles
              .filter(article => article.featured)
              .map((article) => (
                <Link key={article.id} href={`/insights/${article.id}`}>
                  <Card
                    className={`border-primary/20 bg-background/50 backdrop-blur-sm hover:border-primary/40 hover-lift transition-all duration-300 cursor-pointer ${visibleSections.has('featured') ? 'animate-scale-in' : ''}`}
                    onMouseEnter={() => setHoveredCard(article.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="flex flex-col md:flex-row gap-6 p-6">
                      {/* Left: Image */}
                      {article.image && (
                        <div className="w-full md:w-96 h-64 md:h-72 bg-muted overflow-hidden rounded-lg flex-shrink-0">
                          <img 
                            src={article.image} 
                            alt={article.title} 
                            className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      
                      {/* Center: Text Content */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-mono">
                            {t('insights.featured')}
                          </Badge>
                          <Badge variant="outline" className="font-mono text-xs">
                            {article.category}
                          </Badge>
                        </div>
                        
                        <h3 className={`text-xl md:text-2xl font-mono leading-tight hover:text-primary transition-colors duration-300 ${visibleSections.has('featured') ? 'animate-fade-in-up animate-delay-400' : ''}`}>
                          {article.translationKey ? t(article.translationKey + ".title") : article.title}
                        </h3>
                        
                        <p className="text-sm leading-relaxed font-mono text-foreground/80 line-clamp-3">
                          {article.translationKey ? t(article.translationKey + ".description") : article.description}
                        </p>
                        
                        <div className="flex items-center gap-3 text-xs font-mono text-foreground/60">
                          <span>{article.author}</span>
                          <span>•</span>
                          <span>{formatDate(article.date)}</span>
                          <span>•</span>
                          <span>{article.translationKey ? t(article.translationKey + ".readTime") : article.readTime}</span>
                        </div>
                      </div>
                      
                      {/* Right: Read Button */}
                      <div className="flex items-center justify-end md:w-44">
                        <Button
                          variant="default"
                          size="lg"
                          className={`px-8 py-6 text-base font-mono transition-all duration-300 ${
                            hoveredCard === article.id ? "translate-x-2" : ""
                          }`}
                        >
                          {t('insights.readMore')}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={(el) => { sectionRefs.current.articles = el; }}>
          {filteredArticles
            .filter(article => selectedCategory === "All" ? !article.featured : true)
            .map((article, index) => (
              <Card
                key={article.id}
                className={`border-border/40 bg-background/30 backdrop-blur-sm hover:border-primary/40 hover:bg-background/50 hover-lift transition-all duration-300 cursor-pointer group ${visibleSections.has('articles') ? 'animate-fade-in-up' : ''}`}
                style={{animationDelay: visibleSections.has('articles') ? `${index * 0.1}s` : '0s'}}
                onMouseEnter={() => setHoveredCard(article.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="font-mono text-xs">
                      {article.category}
                    </Badge>
                    <span className="text-xs font-mono text-foreground/40">
                      {article.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-mono leading-tight group-hover:text-primary transition-colors duration-300">
                    {article.translationKey ? t(article.translationKey + ".title") : article.title}
                  </CardTitle>
                  <CardDescription className="leading-relaxed font-mono">
                    {article.translationKey ? t(article.translationKey + ".description") : article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm font-mono text-foreground/60 mb-4">
                    <span>{article.author}</span>
                    <span>{formatDate(article.date)}</span>
                  </div>
                  <Link href={`/insights/${article.id}`}>
                    <div className={`transition-all duration-300 cursor-pointer ${
                      hoveredCard === article.id ? "translate-x-2" : ""
                    }`}>
                      <span className="text-primary font-mono text-sm uppercase hover:text-primary/80 transition-colors duration-150">
                        {t('insights.readArticle')} →
                      </span>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
        </div>

            {/* CTA Section */}
            <div className="text-center mt-20" ref={(el) => { sectionRefs.current.cta = el; }}>
              <div className="max-w-2xl mx-auto">
                <h3 className={`text-2xl md:text-3xl font-mono mb-4 ${visibleSections.has('cta') ? 'animate-fade-in-up' : ''}`}>
                  {t('insights.stayUpdated')}
                </h3>
                <p className={`font-mono text-foreground/60 mb-8 ${visibleSections.has('cta') ? 'animate-fade-in-up animate-delay-200' : ''}`}>
                  {t('insights.subscribeDesc')}
                </p>
                <Button
                  asChild
                  size="default"
                  className={`hover-lift ${visibleSections.has('cta') ? 'animate-fade-in-up animate-delay-400' : ''}`}
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                >
                  <Link href="/contact">{t('insights.subscribe')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}