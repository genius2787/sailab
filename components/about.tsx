"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Pill } from "./pill";
import { Button } from "./ui/button";
import { GL } from "./gl";
import { useState, useEffect, useRef } from "react";

export function About() {
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

  const teamHighlights = [
    {
      area: "AI Governance",
      description: "Regulatory compliance and ethical AI implementation",
      expertise: "Risk Assessment, Compliance Automation"
    },
    {
      area: "AI Research",
      description: "Advanced machine learning and quantitative modeling",
      expertise: "Neural Networks, Deep Learning, Pattern Recognition"
    },
    {
      area: "Trading Systems",
      description: "High-frequency and algorithmic trading infrastructure",
      expertise: "Market Making, Portfolio Optimization, Risk Management"
    }
  ];

  const values = [
    {
      title: "Innovation",
      description: "Pioneering next-generation AI solutions for financial markets"
    },
    {
      title: "Precision",
      description: "Mathematical rigor and data-driven decision making"
    },
    {
      title: "Reliability",
      description: "Enterprise-grade systems built for 24/7 market operations"
    }
  ];

  return (
    <div className="min-h-screen relative">
      <GL hovering={hovering} />

      <div className="relative z-10 container mx-auto py-24 px-6">
        <section className="py-20 md:py-32">
          {/* Header Section */}
          <div className="text-center mb-16" ref={el => sectionRefs.current.header = el}>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-sentient mb-6 ${isLoaded ? 'animate-fade-in-up animate-delay-200' : ''}`}>
            About <br />
            <i className="font-light">SAIL Lab Co., Ltd.</i>
          </h2>
          <p className={`font-mono text-sm text-foreground/60 mb-4 ${isLoaded ? 'animate-fade-in-up animate-delay-300' : ''}`}>
            株式会社セール・ラボ
          </p>
          <p className={`font-mono text-foreground/60 text-lg max-w-2xl mx-auto ${isLoaded ? 'animate-fade-in-up animate-delay-400' : ''}`}>
            At SAIL Laboratory, we pioneer the intersection of LLM Agent and financial investment, empowering individuals and organizations with cutting-edge tools for stock portfolio management.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-20" ref={el => sectionRefs.current.mission = el}>
          <Card className={`max-w-4xl mx-auto bg-card/80 backdrop-blur-sm border-border/50 hover-lift ${visibleSections.has('mission') ? 'animate-scale-in' : ''}`}>
            <CardHeader className="text-center">
              <CardTitle className={`text-3xl font-sentient ${visibleSections.has('mission') ? 'animate-fade-in-up animate-delay-200' : ''}`}>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-xl font-mono text-foreground/90 text-center leading-relaxed mb-6 ${visibleSections.has('mission') ? 'animate-fade-in-up animate-delay-400' : ''}`}>
                Our core mission is to empower individuals and organizations with cutting-edge tools for portfolio management, driven by our proprietary LLM-based multi-agent analysis engine.
              </p>
              <p className={`text-lg font-mono text-foreground/80 text-center leading-relaxed ${visibleSections.has('mission') ? 'animate-fade-in-up animate-delay-600' : ''}`}>
                Developed by a team of AI researchers and financial experts, our technology continuously monitors and analyzes global markets, financial news, and institutional insights—offering dynamic, data-driven recommendations with human-level understanding.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <div className="mb-20" ref={el => sectionRefs.current.team = el}>
          <h2 className={`text-4xl font-sentient text-center mb-12 ${visibleSections.has('team') ? 'animate-fade-in-up' : ''}`}>Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className={`bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 hover-lift transition-all duration-300 group text-center ${visibleSections.has('team') ? 'animate-scale-in animate-delay-200' : ''}`}>
              <CardHeader className="pb-4">
                <div className="w-32 h-32 mx-auto mb-4 relative overflow-hidden rounded-full border-2 border-primary/20 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                  <img
                    src="/Jayne.jpg"
                    alt="Jayne Yu, CEO of SAIL Lab"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardTitle className="text-xl font-sentient group-hover:text-primary transition-colors">
                  Jayne Yu
                </CardTitle>
                <Badge variant="outline" className="w-fit mx-auto mb-2 border-primary/50 text-primary group-hover:bg-primary/10 transition-colors">
                  CEO
                </Badge>
                <CardDescription className="font-mono text-foreground/70">
                  Keio University Law School JD. AI Governance & Legal Affairs specialist leading regulatory compliance and ethical AI implementation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className={`bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 hover-lift transition-all duration-300 group text-center ${visibleSections.has('team') ? 'animate-scale-in animate-delay-300' : ''}`}>
              <CardHeader className="pb-4">
                <div className="w-32 h-32 mx-auto mb-4 relative overflow-hidden rounded-full border-2 border-primary/20 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                  <img
                    src="/Joe.jpg"
                    alt="Joe Wang, CTO of SAIL Lab"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardTitle className="text-xl font-sentient group-hover:text-primary transition-colors">
                  Joe Wang
                </CardTitle>
                <Badge variant="outline" className="w-fit mx-auto mb-2 border-primary/50 text-primary group-hover:bg-primary/10 transition-colors">
                  CTO
                </Badge>
                <CardDescription className="font-mono text-foreground/70">
                  Waseda University PhD, 15+ years AI research, 12 years investment experience. AI Research specialist driving advanced machine learning and quantitative modeling
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className={`bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 hover-lift transition-all duration-300 group text-center md:col-span-2 lg:col-span-1 ${visibleSections.has('team') ? 'animate-scale-in animate-delay-400' : ''}`}>
              <CardHeader className="pb-4">
                <div className="w-32 h-32 mx-auto mb-4 relative overflow-hidden rounded-full border-2 border-primary/20 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                  <img
                    src="/Evy.jpg"
                    alt="Evy Yang, COO of SAIL Lab"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardTitle className="text-xl font-sentient group-hover:text-primary transition-colors">
                  Evy Yang
                </CardTitle>
                <Badge variant="outline" className="w-fit mx-auto mb-2 border-primary/50 text-primary group-hover:bg-primary/10 transition-colors">
                  COO
                </Badge>
                <CardDescription className="font-mono text-foreground/70">
                  University of Tokyo graduate, 5+ years trading experience. Trading systems expert specializing in high-frequency trading infrastructure
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Team Highlights Section */}
        <div className="mb-20" ref={el => sectionRefs.current.expertise = el}>
          <h2 className={`text-4xl font-sentient text-center mb-12 ${visibleSections.has('expertise') ? 'animate-fade-in-up' : ''}`}>Team Expertise</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {teamHighlights.map((team, index) => (
              <Card key={index} className={`bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 hover-lift transition-all duration-300 group ${visibleSections.has('expertise') ? 'animate-slide-in-left' : ''}`} style={{animationDelay: visibleSections.has('expertise') ? `${index * 0.1 + 0.2}s` : '0s'}}>
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2 border-primary/50 text-primary group-hover:bg-primary/10 transition-colors">
                    {team.area}
                  </Badge>
                  <CardTitle className="text-xl font-sentient group-hover:text-primary transition-colors">
                    {team.area}
                  </CardTitle>
                  <CardDescription className="font-mono text-foreground/70">
                    {team.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-mono text-foreground/60">Key Expertise:</p>
                    <p className="font-mono text-sm text-foreground/80">{team.expertise}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Information Section */}
        <div className="mb-20" ref={el => sectionRefs.current.company = el}>
          <Card className={`max-w-4xl mx-auto bg-card/80 backdrop-blur-sm border-border/50 hover-lift ${visibleSections.has('company') ? 'animate-scale-in' : ''}`}>
            <CardHeader className="text-center">
              <CardTitle className={`text-3xl font-sentient ${visibleSections.has('company') ? 'animate-fade-in-up animate-delay-200' : ''}`}>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6 text-center md:text-left">
                <div className={`${visibleSections.has('company') ? 'animate-fade-in-up animate-delay-400' : ''}`}>
                  <h4 className="font-sentient text-primary mb-2">Company Capital</h4>
                  <p className="font-mono text-lg text-foreground/90">¥9.99 million JPY</p>
                </div>
                <div className={`${visibleSections.has('company') ? 'animate-fade-in-up animate-delay-500' : ''}`}>
                  <h4 className="font-sentient text-primary mb-2">Assets Under Management</h4>
                  <p className="font-mono text-lg text-foreground/90">Over ¥100 million JPY</p>
                </div>
              </div>
              <div className={`text-center ${visibleSections.has('company') ? 'animate-fade-in-up animate-delay-600' : ''}`}>
                <p className="font-mono text-foreground/70 leading-relaxed">
                  We manage over ¥100 million JPY across both internal and client portfolios, leveraging our AI system to ensure precise, adaptive financial strategies.
                </p>
              </div>
              <div className={`text-center ${visibleSections.has('company') ? 'animate-fade-in-up animate-delay-700' : ''}`}>
                <h4 className="font-sentient text-primary mb-3">Office Address</h4>
                <div className="font-mono text-sm text-foreground/70 space-y-1">
                  <p>Daiya Gate 5F, Minami-Ikebukuro 1-16-15</p>
                  <p>Toshima City, Tokyo 171-0022, Japan</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center" ref={el => sectionRefs.current.cta = el}>
          <h3 className={`text-3xl font-sentient mb-6 ${visibleSections.has('cta') ? 'animate-fade-in-up' : ''}`}>Ready to Transform Your Financial Operations?</h3>
          <p className={`font-mono text-foreground/70 mb-8 max-w-2xl mx-auto ${visibleSections.has('cta') ? 'animate-fade-in-up animate-delay-200' : ''}`}>
            Discover how our AI-powered solutions can optimize your trading strategies and risk management processes.
          </p>
          <Button
            className={`mx-auto hover-lift ${visibleSections.has('cta') ? 'animate-fade-in-up animate-delay-400' : ''}`}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            [Contact Our Team]
          </Button>
        </div>
        </section>
      </div>
    </div>
  );
}