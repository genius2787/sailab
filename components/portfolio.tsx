"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Pill } from "./pill";
import { GL } from "./gl";
import { useState, useEffect, useRef } from "react";

export function Portfolio() {
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

  const services = [
    {
      title: "Multi-Agent LLM Analysis",
      category: "Investment Research",
      description: "Investment analysis using collaborative AI agents providing market insights and investment reports",
      features: [
        "Real-time market sentiment analysis",
        "Multi-source data aggregation",
        "Automated research reports",
        "Risk factor identification",
        "Portfolio optimization recommendations"
      ],
      pricing: {
        basic: "$18/month",
        pro: "$39/month",
        note: "Enterprise solutions available"
      },
      badge: "POPULAR"
    },
    {
      title: "Neural Network Quantitative Trading",
      category: "Trading Systems",
      description: "Adaptive neural network trading systems with real-time market optimization",
      features: [
        "Deep learning price prediction",
        "Adaptive strategy optimization",
        "Real-time risk management",
        "Multi-asset class support",
        "High-frequency execution"
      ],
      pricing: {
        enterprise: "$120-180k/year",
        note: "Enterprise pricing"
      },
      badge: "ENTERPRISE"
    },
    {
      title: "AI Trader Community",
      category: "Platform & Education",
      description: "Platform connecting AI traders and investors with strategy sharing and performance analytics",
      features: [
        "Strategy backtesting environment",
        "AI model marketplace",
        "Educational workshops",
        "Peer-to-peer learning",
        "Performance analytics dashboard"
      ],
      pricing: {
        core: "$9/month",
        pro: "$15/month",
        note: "Community access"
      },
      badge: "BETA"
    }
  ];

  const caseStudies = [
    {
      title: "Hedge Fund Risk Optimization",
      result: "35% reduction in portfolio volatility",
      description: "Implemented neural network-based risk management system for $2B AUM hedge fund"
    },
    {
      title: "Investment Bank Trading Alpha",
      result: "2.3x Sharpe ratio improvement",
      description: "Deployed multi-agent LLM analysis for equity research division"
    },
    {
      title: "Pension Fund Portfolio Management",
      result: "180bps annual outperformance",
      description: "Integrated quantitative trading system for long-term asset allocation"
    }
  ];

  return (
    <div className="min-h-screen relative">
      <GL hovering={hovering} />

      <div className="relative z-10 container mx-auto py-24 px-6">
        {/* Header Section */}
        <div className="text-center mb-16" ref={el => sectionRefs.current.header = el}>
          <Pill className={`mb-6 ${isLoaded ? 'animate-fade-in-up' : ''}`}>AI FINANCIAL SOLUTIONS</Pill>
          <h1 className={`text-5xl sm:text-6xl md:text-7xl font-sentient mb-8 ${isLoaded ? 'animate-fade-in-up animate-delay-200' : ''}`}>
            Our <br />
            <i className="font-light">Portfolio</i>
          </h1>
          <p className={`font-mono text-lg text-foreground/80 text-balance max-w-3xl mx-auto leading-relaxed ${isLoaded ? 'animate-fade-in-up animate-delay-400' : ''}`}>
            Comprehensive AI-driven solutions transforming financial services through innovation, automation, and intelligent decision-making
          </p>
        </div>

        {/* Services Section */}
        <div className="mb-20" ref={el => sectionRefs.current.services = el}>
          <h2 className={`text-4xl font-sentient text-center mb-12 ${visibleSections.has('services') ? 'animate-fade-in-up' : ''}`}>Core Services</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 hover-lift transition-all duration-300 group flex flex-col ${visibleSections.has('services') ? 'animate-slide-in-left' : ''}`} style={{animationDelay: visibleSections.has('services') ? `${index * 0.15 + 0.2}s` : '0s'}}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant={service.badge === 'POPULAR' ? 'default' : 'outline'}
                      className={`${service.badge === 'ENTERPRISE' ? 'border-primary/50 text-primary' : ''} group-hover:scale-105 transition-transform duration-300`}
                    >
                      {service.badge}
                    </Badge>
                    <span className="text-xs font-mono text-foreground/60">{service.category}</span>
                  </div>
                  <CardTitle className="text-xl font-sentient group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="font-mono text-foreground/70 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-mono text-foreground/60 mb-3">Key Features:</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="font-mono text-sm text-foreground/80 flex items-start group-hover:text-foreground/90 transition-colors duration-300">
                            <span className="text-primary mr-2 group-hover:animate-bounce-subtle">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="border-t border-border/20 mt-auto">
                  <div className="w-full">
                    <div className="space-y-2">
                      {service.pricing.basic && (
                        <div className="flex justify-between items-center group-hover:scale-105 transition-transform duration-300">
                          <span className="font-mono text-sm text-foreground/70">Basic:</span>
                          <span className="font-mono text-primary font-medium hover-glow">{service.pricing.basic}</span>
                        </div>
                      )}
                      {service.pricing.pro && (
                        <div className="flex justify-between items-center group-hover:scale-105 transition-transform duration-300">
                          <span className="font-mono text-sm text-foreground/70">Pro:</span>
                          <span className="font-mono text-primary font-medium hover-glow">{service.pricing.pro}</span>
                        </div>
                      )}
                      {service.pricing.core && (
                        <div className="flex justify-between items-center group-hover:scale-105 transition-transform duration-300">
                          <span className="font-mono text-sm text-foreground/70">Core:</span>
                          <span className="font-mono text-primary font-medium hover-glow">{service.pricing.core}</span>
                        </div>
                      )}
                      {service.pricing.enterprise && (
                        <div className="flex justify-between items-center group-hover:scale-105 transition-transform duration-300">
                          <span className="font-mono text-sm text-foreground/70">Enterprise:</span>
                          <span className="font-mono text-primary font-medium hover-glow">{service.pricing.enterprise}</span>
                        </div>
                      )}
                      <p className="font-mono text-xs text-foreground/60 pt-2">
                        {service.pricing.note}
                      </p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Case Studies Section */}
        <div className="mb-20" ref={el => sectionRefs.current.studies = el}>
          <h2 className={`text-4xl font-sentient text-center mb-12 ${visibleSections.has('studies') ? 'animate-fade-in-up' : ''}`}>Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <Card key={index} className={`bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 hover-lift transition-all duration-300 group ${visibleSections.has('studies') ? 'animate-slide-in-right' : ''}`} style={{animationDelay: visibleSections.has('studies') ? `${index * 0.1 + 0.2}s` : '0s'}}>
                <CardHeader>
                  <CardTitle className="text-lg font-sentient group-hover:text-primary transition-colors">
                    {study.title}
                  </CardTitle>
                  <div className="text-2xl font-mono text-primary font-bold group-hover:scale-110 transition-transform duration-300">
                    {study.result}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="font-mono text-foreground/70">
                    {study.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Solutions Section */}
        <div className="mb-20" ref={el => sectionRefs.current.solutions = el}>
          <Card className={`max-w-4xl mx-auto bg-card/80 backdrop-blur-sm border-border/50 hover-lift ${visibleSections.has('solutions') ? 'animate-scale-in' : ''}`}>
            <CardHeader className="text-center">
              <CardTitle className={`text-3xl font-sentient ${visibleSections.has('solutions') ? 'animate-fade-in-up animate-delay-200' : ''}`}>Custom AI Financial Solutions</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className={`text-lg font-mono text-foreground/90 leading-relaxed mb-6 ${visibleSections.has('solutions') ? 'animate-fade-in-up animate-delay-400' : ''}`}>
                Beyond our core offerings, we develop bespoke AI solutions tailored to your specific financial challenges.
                From regulatory compliance automation to custom trading algorithms, our team delivers enterprise-grade solutions.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <div className={`p-4 rounded-lg border border-border/30 bg-background/20 hover-lift ${visibleSections.has('solutions') ? 'animate-slide-in-left animate-delay-600' : ''}`}>
                  <h4 className="font-sentient text-primary mb-2 hover:text-primary/80 transition-colors">Regulatory AI</h4>
                  <p className="font-mono text-sm text-foreground/70">Automated compliance monitoring and reporting</p>
                </div>
                <div className={`p-4 rounded-lg border border-border/30 bg-background/20 hover-lift ${visibleSections.has('solutions') ? 'animate-slide-in-right animate-delay-700' : ''}`}>
                  <h4 className="font-sentient text-primary mb-2 hover:text-primary/80 transition-colors">Custom Algorithms</h4>
                  <p className="font-mono text-sm text-foreground/70">Proprietary trading strategy development</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center" ref={el => sectionRefs.current.cta = el}>
          <h3 className={`text-3xl font-sentient mb-6 ${visibleSections.has('cta') ? 'animate-fade-in-up' : ''}`}>Ready to Accelerate Your Financial AI Journey?</h3>
          <p className={`font-mono text-foreground/70 mb-8 max-w-2xl mx-auto ${visibleSections.has('cta') ? 'animate-fade-in-up animate-delay-200' : ''}`}>
            Schedule a consultation to explore how our AI solutions can transform your financial operations and drive sustainable growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className={`hover-lift ${visibleSections.has('cta') ? 'animate-fade-in-up animate-delay-400' : ''}`}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              [Schedule Consultation]
            </Button>
            <Button
              variant="default"
              className={`bg-background border-primary/50 text-foreground hover:bg-primary/10 hover-lift ${visibleSections.has('cta') ? 'animate-fade-in-up animate-delay-500' : ''}`}
            >
              [View Pricing Details]
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}