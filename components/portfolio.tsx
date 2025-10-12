"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { GL } from "./gl";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";

export function Portfolio() {
  const { t } = useLanguage();
  const [hovering, setHovering] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
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
      title: t('portfolio.multiAgentTitle'),
      category: t('portfolio.multiAgentCategory'),
      description: t('portfolio.multiAgentDesc'),
      features: [
        t('portfolio.multiAgentFeature1'),
        t('portfolio.multiAgentFeature2'),
        t('portfolio.multiAgentFeature3'),
        t('portfolio.multiAgentFeature4'),
        t('portfolio.multiAgentFeature5')
      ],
      pricing: {
        starter: "$99/month",
        professional: "$249/month",
        enterprise: "$599/month",
        note: "Contact for Enterprise pricing"
      },
      badge: t('portfolio.popular'),
      link: "/dashboard",
      linkText: "Go to Dashboard"
    },
    {
      title: t('portfolio.neuralNetworkTitle'),
      category: t('portfolio.neuralNetworkCategory'),
      description: t('portfolio.neuralNetworkDesc'),
      features: [
        t('portfolio.neuralNetworkFeature1'),
        t('portfolio.neuralNetworkFeature2'),
        t('portfolio.neuralNetworkFeature3'),
        t('portfolio.neuralNetworkFeature4'),
        t('portfolio.neuralNetworkFeature5')
      ],
      pricing: {
        enterprise: "$120-180k/year",
        note: "Enterprise pricing"
      },
      badge: t('portfolio.enterprise'),
      link: "/insights/backtest-sep-2025",
      linkText: "View Backtest Results"
    },
    {
      title: t('portfolio.communityTitle'),
      category: t('portfolio.communityCategory'),
      description: t('portfolio.communityDesc'),
      features: [
        t('portfolio.communityFeature1'),
        t('portfolio.communityFeature2'),
        t('portfolio.communityFeature3'),
        t('portfolio.communityFeature4'),
        t('portfolio.communityFeature5')
      ],
      pricing: {
        core: "$9/month",
        pro: "$15/month",
        note: "Community access"
      },
      badge: t('portfolio.beta'),
      link: "#",
      linkText: "Join Community",
      isDisabled: true
    }
  ];

  return (
    <div className="min-h-screen relative">
      <GL hovering={hovering} />

      <div className="relative z-10 container mx-auto pt-40 pb-24 px-6">
        <section className="py-20 md:py-32">
          <div className="text-center mb-16" ref={(el) => { sectionRefs.current.header = el; }}>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-mono mb-6 ${isLoaded ? 'animate-fade-in-up' : ''}`}>
              {t('portfolio.title')}
            </h2>
            <p className={`font-mono text-foreground/60 text-lg max-w-2xl mx-auto ${isLoaded ? 'animate-fade-in-up animate-delay-400' : ''}`}>
              {t('portfolio.subtitle')}
            </p>
          </div>

          <div className="mb-20" ref={(el) => { sectionRefs.current.services = el; }}>
            <h2 className={`text-4xl font-mono text-center mb-12 ${visibleSections.has('services') ? 'animate-fade-in-up' : ''}`}>{t('portfolio.coreServices')}</h2>
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
                    <CardTitle className="text-xl font-mono group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="font-mono text-foreground/70 leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-mono text-foreground/60 mb-3">{t('portfolio.keyFeatures')}:</p>
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
                    <div className="w-full space-y-4">
                      <div className="space-y-2">
                        {service.pricing.starter && (
                          <div className="flex justify-between items-center group-hover:scale-105 transition-transform duration-300">
                            <span className="font-mono text-sm text-foreground/70">Starter:</span>
                            <span className="font-mono text-primary font-medium hover-glow">{service.pricing.starter}</span>
                          </div>
                        )}
                        {service.pricing.professional && (
                          <div className="flex justify-between items-center group-hover:scale-105 transition-transform duration-300">
                            <span className="font-mono text-sm text-foreground/70">Professional:</span>
                            <span className="font-mono text-primary font-medium hover-glow">{service.pricing.professional}</span>
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
                      {service.link && (
                        <div className="space-y-2">
                          {service.isDisabled ? (
                            <Button 
                              className="w-full font-mono cursor-not-allowed"
                              variant="secondary"
                              disabled
                            >
                              {service.linkText}
                            </Button>
                          ) : (
                            <Link href={service.link}>
                              <Button 
                                className="w-full font-mono hover-lift"
                                variant="default"
                              >
                                {service.linkText}
                              </Button>
                            </Link>
                          )}
                          {service.isDisabled && (
                            <p className="text-center text-xs font-mono text-foreground/50 italic">
                              (In Development)
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-20" ref={(el) => { sectionRefs.current.solutions = el; }}>
            <Card className={`max-w-4xl mx-auto bg-card/80 backdrop-blur-sm border-border/50 hover-lift ${visibleSections.has('solutions') ? 'animate-scale-in' : ''}`}>
              <CardHeader className="text-center">
                <CardTitle className={`text-3xl font-mono ${visibleSections.has('solutions') ? 'animate-fade-in-up animate-delay-200' : ''}`}>{t('portfolio.customSolutions')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className={`text-lg font-mono text-foreground/90 leading-relaxed mb-6 ${visibleSections.has('solutions') ? 'animate-fade-in-up animate-delay-400' : ''}`}>
                  {t('portfolio.customDesc')}
                </p>
                <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <div className={`p-4 rounded-lg border border-border/30 bg-background/20 hover-lift ${visibleSections.has('solutions') ? 'animate-slide-in-left animate-delay-600' : ''}`}>
                    <h4 className="font-mono text-primary mb-2 hover:text-primary/80 transition-colors">{t('portfolio.regulatoryAI')}</h4>
                    <p className="font-mono text-sm text-foreground/70">{t('portfolio.regulatoryDesc')}</p>
                  </div>
                  <div className={`p-4 rounded-lg border border-border/30 bg-background/20 hover-lift ${visibleSections.has('solutions') ? 'animate-slide-in-right animate-delay-700' : ''}`}>
                    <h4 className="font-mono text-primary mb-2 hover:text-primary/80 transition-colors">{t('portfolio.customAlgorithms')}</h4>
                    <p className="font-mono text-sm text-foreground/70">{t('portfolio.customAlgDesc')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center" ref={(el) => { sectionRefs.current.cta = el; }}>
            <h3 className={`text-3xl font-mono mb-6 ${visibleSections.has('cta') ? 'animate-fade-in-up' : ''}`}>{t('portfolio.ctaTitle')}</h3>
            <p className={`font-mono text-foreground/70 mb-8 max-w-2xl mx-auto ${visibleSections.has('cta') ? 'animate-fade-in-up animate-delay-200' : ''}`}>
              {t('portfolio.ctaDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className={`hover-lift ${visibleSections.has('cta') ? 'animate-fade-in-up animate-delay-400' : ''}`}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                [{t('portfolio.scheduleConsult')}]
              </Button>
              <Button
                variant="default"
                className={`bg-background border-primary/50 text-foreground hover:bg-primary/10 hover-lift ${visibleSections.has('cta') ? 'animate-fade-in-up animate-delay-500' : ''}`}
              >
                [{t('portfolio.viewPricing')}]
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}