"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { GL } from "./gl";
import { Pill } from "./pill";
import Link from "next/link";
import { Eye, MessageCircle, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  featured?: boolean;
  image?: string;
  views?: number;
  comments?: number;
  likes?: number;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "sail-laboratory-official-launch-announcement",
    title: "Sail Laboratory — Official Launch Announcement\n株式会社Sail Laboratory — 開業のお知らせ",
    excerpt: "We are thrilled to announce that Sail Laboratory Co., Ltd. has officially opened its doors! From our headquarters in Tokyo, we embark on a mission to revolutionize AI-powered asset management with cutting-edge LLM Agents and advanced reinforcement learning.",
    category: "Company News",
    readTime: "2 min read",
    date: "2025-08-15",
    author: "Zhao WANG",
    featured: true,
    image: "/companny.png",
    views: 324,
    comments: 23,
    likes: 47
  },
  {
    id: "10",
    slug: "cto-wang-featured-in-waseda-university-interview",
    title: "SAIL Lab CTO Featured in Waseda University Interview\nSAIL Lab CTO、早稲田大学インタビューに掲載",
    excerpt: "Our CTO Joe Wang was featured in an exclusive interview by Waseda University's Computer Science and Engineering Department, sharing insights on his journey from academic research to founding SAIL Laboratory and pioneering AI-powered financial technology.",
    category: "Company News",
    readTime: "3 min read",
    date: "2025-10-08",
    author: "Joe Wang",
    featured: true,
    image: "/waseda-joe-portrait.jpg",
    views: 95,
    comments: 8,
    likes: 18
  },
  {
    id: "9",
    slug: "cto-presents-okg-at-coling-2025-as-sony-researcher",
    title: "SAIL Lab CTO Presents First LLM Agent Work at COLING 2025\nSAIL Lab CTO、COLING 2025で初のLLM Agent研究を発表",
    excerpt: "Our CTO Joe Wang, as a Sony researcher, presented the first LLM agent work in keyword generation at COLING 2025—'On-the-Fly Keyword Generation' introduces autonomous AI agents that dynamically adapt to market trends, revolutionizing digital advertising.",
    category: "Research News",
    readTime: "4 min read",
    date: "2025-01-20",
    author: "Joe Wang",
    featured: false,
    views: 128,
    comments: 14,
    likes: 25
  },
  {
    id: "8",
    slug: "cto-presents-research-at-kdd-2025-as-sony-researcher",
    title: "SAIL Lab CTO Presents Research at KDD 2025 as Sony Researcher\nSAIL Lab CTO、Sony研究員としてKDD 2025で研究を発表",
    excerpt: "Our CTO Joe Wang, as a Sony researcher, presented 'Auto-bidding in Real-Time Auctions via Oracle Imitation Learning' at KDD 2025, introducing a novel framework that significantly improves auction efficiency and ROI through oracle-guided policy learning.",
    category: "Research News",
    readTime: "5 min read",
    date: "2025-08-20",
    author: "Joe Wang",
    featured: false,
    views: 142,
    comments: 18,
    likes: 29
  },
  {
    id: "7",
    slug: "cto-attends-sts-forum-2025",
    title: "SAIL Lab CTO Participates in STS Forum 2025\nSAIL Lab CTO、STS フォーラム 2025 に参加",
    excerpt: "Our CTO Joe Wang was selected for the prestigious STS Forum Young Leaders Program in Kyoto, engaging with His Majesty the Emperor of Japan, Prime Minister Ishiba, 13 Nobel Prize laureates, and global leaders on AI governance and ethical technology deployment.",
    category: "Company News",
    readTime: "6 min read",
    date: "2025-10-10",
    author: "Joe Wang",
    featured: true,
    image: "/sts-young-leaders.jpg",
    views: 186,
    comments: 15,
    likes: 34
  },
  {
    id: "2",
    slug: "regulatory-compliance-ai-trading",
    title: "New AI Regulations Impact Financial Markets",
    excerpt: "Recent regulatory updates from financial authorities worldwide are reshaping how AI systems can be deployed in trading and investment management.",
    category: "Market News",
    readTime: "4 min read",
    date: "2024-10-05",
    author: "Jayne Yu",
    views: 89,
    comments: 7,
    likes: 15
  },
  {
    id: "3",
    slug: "neural-network-trading-algorithms",
    title: "Quantitative Trading Market Trends for 2024",
    excerpt: "Analysis of current market trends in quantitative trading, including the rise of machine learning algorithms and their impact on market liquidity.",
    category: "Market Analysis",
    readTime: "6 min read",
    date: "2024-10-03",
    author: "Evy Yang",
    views: 124,
    comments: 9,
    likes: 22
  },
  {
    id: "4",
    slug: "future-ai-quantitative-finance",
    title: "Breakthrough in AI-Powered Risk Management",
    excerpt: "New research demonstrates how advanced AI systems can predict and mitigate financial risks with unprecedented accuracy in real-time trading environments.",
    category: "Technology News",
    readTime: "5 min read",
    date: "2024-10-01",
    author: "Joe Wang",
    views: 203,
    comments: 18,
    likes: 35
  },
  {
    id: "5",
    slug: "regulatory-compliance-ai-trading",
    title: "New Guidelines for Ethical AI in Finance",
    excerpt: "Financial institutions are adopting new ethical guidelines for AI deployment, focusing on transparency, fairness, and accountability in automated decision-making.",
    category: "Industry News",
    readTime: "4 min read",
    date: "2024-09-29",
    author: "Jayne Yu",
    views: 97,
    comments: 11,
    likes: 19
  },
  {
    id: "6",
    slug: "neural-network-trading-algorithms",
    title: "Neural Networks Show Superior Trading Performance",
    excerpt: "Latest research shows that neural network-based trading systems outperform traditional quantitative strategies by 15-20% in volatile market conditions.",
    category: "Research News",
    readTime: "7 min read",
    date: "2024-09-27",
    author: "Evy Yang",
    views: 178,
    comments: 14,
    likes: 31
  }
];

const getCategoryTranslationKey = (category: string) => {
  const map: Record<string, string> = {
    "All": "blog.categoryAll",
    "Company News": "blog.categoryCompany",
    "Market News": "blog.categoryMarket",
    "Market Analysis": "blog.categoryAnalysis",
    "Technology News": "blog.categoryTechnology",
    "Industry News": "blog.categoryIndustry",
    "Research News": "blog.categoryResearch"
  };
  return map[category] || category;
};

const categories = ["All", "Company News", "Market News", "Market Analysis", "Technology News", "Industry News", "Research News"];

export function Blog() {
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

  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

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
        <section className="py-20 md:py-32">
          {/* Header Section */}
          <div className="text-center mb-16" ref={(el) => { sectionRefs.current.header = el; }}>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-mono mb-6 ${isLoaded ? 'animate-fade-in-up' : ''}`}>
            {t('blog.title')}
          </h2>
          <p className={`font-mono text-foreground/60 text-lg max-w-2xl mx-auto ${isLoaded ? 'animate-fade-in-up animate-delay-400' : ''}`}>
            {t('blog.subtitle')}
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
              style={{animationDelay: isLoaded ? `${index * 0.05 + 0.6}s` : '0s'}}
            >
              {t(getCategoryTranslationKey(category))}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {selectedCategory === "All" && (
          <div className="mb-16" ref={(el) => { sectionRefs.current.featured = el; }}>
            {blogPosts
              .filter(post => post.featured)
              .map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card
                    className={`border-primary/20 bg-background/50 backdrop-blur-sm hover:border-primary/40 hover-lift transition-all duration-300 cursor-pointer ${visibleSections.has('featured') ? 'animate-scale-in' : ''}`}
                    onMouseEnter={() => setHoveredCard(post.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="flex flex-col md:flex-row gap-6 p-6">
                      {/* Left: Image */}
                      {post.image && (
                        <div className="w-full md:w-80 h-48 bg-muted overflow-hidden rounded-lg flex-shrink-0">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      
                      {/* Center: Text Content */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-mono">
                            {t('blog.featured')}
                          </Badge>
                          <Badge variant="outline" className="font-mono text-xs">
                            {post.category}
                          </Badge>
                        </div>
                        
                        <h3 className={`text-xl md:text-2xl font-mono leading-tight hover:text-primary transition-colors duration-300 ${visibleSections.has('featured') ? 'animate-fade-in-up animate-delay-400' : ''}`}>
                          {post.title.split('\n').map((line, index) => (
                            <span key={index}>
                              {line}
                              {index < post.title.split('\n').length - 1 && <br />}
                            </span>
                          ))}
                        </h3>
                        
                        <p className="text-sm leading-relaxed font-mono text-foreground/80 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-3 text-xs font-mono text-foreground/60">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{formatDate(post.date)}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs font-mono text-foreground/60">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{post.views || 0}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            <span>{post.comments || 0}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            <span>{post.likes || 0}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right: Read Button */}
                      <div className="flex items-center justify-end md:w-44">
                        <Button
                          variant="default"
                          size="lg"
                          className={`px-8 py-6 text-base font-mono transition-all duration-300 ${
                            hoveredCard === post.id ? "translate-x-2" : ""
                          }`}
                        >
                          {t('blog.readArticle')}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={(el) => { sectionRefs.current.posts = el; }}>
          {filteredPosts
            .filter(post => selectedCategory === "All" ? !post.featured : true)
            .map((post, index) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card
                  className={`border-border/40 bg-background/30 backdrop-blur-sm hover:border-primary/40 hover:bg-background/50 hover-lift transition-all duration-300 cursor-pointer group ${visibleSections.has('posts') ? 'animate-fade-in-up' : ''}`}
                  style={{animationDelay: visibleSections.has('posts') ? `${index * 0.1}s` : '0s'}}
                  onMouseEnter={() => setHoveredCard(post.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-xs font-mono text-foreground/40">
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-mono leading-tight group-hover:text-primary transition-colors duration-300">
                      {post.title.split('\n').map((line, index) => (
                        <span key={index}>
                          {line}
                          {index < post.title.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </CardTitle>
                    <CardDescription className="leading-relaxed font-mono">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm font-mono text-foreground/60 mb-4">
                      <span>{post.author}</span>
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs font-mono text-foreground/50">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{post.views || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          <span>{post.comments || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          <span>{post.likes || 0}</span>
                        </div>
                      </div>
                      <div className={`transition-all duration-300 ${
                        hoveredCard === post.id ? "translate-x-2" : ""
                      }`}>
                        <span className="text-primary font-mono text-sm uppercase hover:text-primary/80 transition-colors duration-150">
                          {t('blog.readArticle')} →
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>

        {/* Newsletter CTA Section */}
        <div className="text-center mt-20" ref={(el) => { sectionRefs.current.cta = el; }}>
          <div className="max-w-2xl mx-auto">
            <h3 className={`text-2xl md:text-3xl font-mono mb-4 ${visibleSections.has('cta') ? 'animate-fade-in-up' : ''}`}>
              {t('blog.neverMiss')}
            </h3>
            <p className={`font-mono text-foreground/60 mb-8 ${visibleSections.has('cta') ? 'animate-fade-in-up animate-delay-200' : ''}`}>
              {t('blog.newsletterDesc')}
            </p>
            <Button
              size="default"
              className={`hover-lift ${visibleSections.has('cta') ? 'animate-fade-in-up animate-delay-400' : ''}`}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              {t('blog.subscribe')}
            </Button>
          </div>
        </div>
        </section>
      </div>
    </div>
  );
}