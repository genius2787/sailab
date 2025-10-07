"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { GL } from "./gl";
import { Pill } from "./pill";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  featured?: boolean;
  image?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of AI in Quantitative Finance",
    excerpt: "Exploring how artificial intelligence is revolutionizing quantitative trading strategies and risk management in modern financial markets.",
    category: "AI & Finance",
    readTime: "5 min read",
    date: "2024-10-01",
    author: "Joe Wang",
    featured: true
  },
  {
    id: "2",
    title: "Building Robust Trading Algorithms with Neural Networks",
    excerpt: "A deep dive into implementing neural network architectures for high-frequency trading and market prediction systems.",
    category: "Machine Learning",
    readTime: "8 min read",
    date: "2024-09-28",
    author: "Evy Yang"
  },
  {
    id: "3",
    title: "Regulatory Compliance in AI Trading Systems",
    excerpt: "Understanding the legal landscape and compliance requirements for deploying AI-powered trading solutions in regulated markets.",
    category: "Compliance",
    readTime: "6 min read",
    date: "2024-09-25",
    author: "Jayne Yu"
  },
  {
    id: "4",
    title: "Market Microstructure and Algorithmic Trading",
    excerpt: "Analyzing market microstructure patterns and their impact on algorithmic trading strategy performance and execution quality.",
    category: "Trading Strategy",
    readTime: "10 min read",
    date: "2024-09-20",
    author: "Joe Wang"
  },
  {
    id: "5",
    title: "Risk Management in AI-Driven Portfolios",
    excerpt: "Advanced techniques for measuring and managing risks in portfolios managed by artificial intelligence systems.",
    category: "Risk Management",
    readTime: "7 min read",
    date: "2024-09-15",
    author: "Evy Yang"
  },
  {
    id: "6",
    title: "The Ethics of AI in Financial Decision Making",
    excerpt: "Examining the ethical implications and considerations when deploying AI systems for financial decision making and trading.",
    category: "Ethics & AI",
    readTime: "9 min read",
    date: "2024-09-10",
    author: "Jayne Yu"
  }
];

const categories = ["All", "AI & Finance", "Machine Learning", "Compliance", "Trading Strategy", "Risk Management", "Ethics & AI"];

export function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

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

      <div className="relative z-10 container mx-auto py-24 px-6">
        <section className="py-20 md:py-32">
          {/* Header Section */}
          <div className="text-center mb-16" ref={el => sectionRefs.current.header = el}>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-sentient mb-6 ${isLoaded ? 'animate-fade-in-up' : ''}`}>
            Our <br />
            <i className="font-light">Blog</i>
          </h2>
          <p className={`font-mono text-foreground/60 text-lg max-w-2xl mx-auto ${isLoaded ? 'animate-fade-in-up animate-delay-400' : ''}`}>
            Stay updated with the latest insights, research, and developments in AI-powered financial technology and quantitative trading
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" ref={el => sectionRefs.current.filters = el}>
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
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {selectedCategory === "All" && (
          <div className="mb-16" ref={el => sectionRefs.current.featured = el}>
            {blogPosts
              .filter(post => post.featured)
              .map((post) => (
                <Card
                  key={post.id}
                  className={`border-primary/20 bg-background/50 backdrop-blur-sm hover:border-primary/40 hover-lift transition-all duration-300 cursor-pointer ${visibleSections.has('featured') ? 'animate-scale-in' : ''}`}
                  onMouseEnter={() => setHoveredCard(post.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        Featured
                      </Badge>
                      <Badge variant="outline" className="font-mono text-xs">
                        {post.category}
                      </Badge>
                    </div>
                    <CardTitle className={`text-2xl md:text-3xl font-sentient leading-tight hover:text-primary transition-colors duration-300 ${visibleSections.has('featured') ? 'animate-fade-in-up animate-delay-400' : ''}`}>
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm font-mono text-foreground/60">
                      <div className="flex items-center gap-4">
                        <span>{post.author}</span>
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      className={`mt-6 transition-all duration-300 ${
                        hoveredCard === post.id ? "translate-x-2" : ""
                      }`}
                    >
                      Read Article
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={el => sectionRefs.current.posts = el}>
          {filteredPosts
            .filter(post => selectedCategory === "All" ? !post.featured : true)
            .map((post, index) => (
              <Card
                key={post.id}
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
                  <CardTitle className="text-xl font-sentient leading-tight group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="leading-relaxed">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm font-mono text-foreground/60 mb-4">
                    <span>{post.author}</span>
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className={`transition-all duration-300 ${
                    hoveredCard === post.id ? "translate-x-2" : ""
                  }`}>
                    <span className="text-primary font-mono text-sm uppercase hover:text-primary/80 transition-colors duration-150">
                      Read Article →
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Newsletter CTA Section */}
        <div className="text-center mt-20" ref={el => sectionRefs.current.cta = el}>
          <div className="max-w-2xl mx-auto">
            <h3 className={`text-2xl md:text-3xl font-sentient mb-4 ${visibleSections.has('cta') ? 'animate-fade-in-up' : ''}`}>
              Never Miss an <i className="font-light">Update</i>
            </h3>
            <p className={`font-mono text-foreground/60 mb-8 ${visibleSections.has('cta') ? 'animate-fade-in-up animate-delay-200' : ''}`}>
              Subscribe to our newsletter for the latest insights in AI trading, market analysis, and financial technology innovations
            </p>
            <Button
              size="default"
              className={`hover-lift ${visibleSections.has('cta') ? 'animate-fade-in-up animate-delay-400' : ''}`}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              Subscribe to Newsletter
            </Button>
          </div>
        </div>
        </section>
      </div>
    </div>
  );
}