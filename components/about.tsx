"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Pill } from "./pill";
import { Button } from "./ui/button";
import { GL } from "./gl";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/language-context";

export function About() {
  const { t } = useLanguage();
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

  const teamHighlights = [
    {
      area: t('about.aiGovernance'),
      description: t('about.aiGovernanceDesc'),
      expertise: t('about.aiGovernanceExpertise')
    },
    {
      area: t('about.aiResearch'),
      description: t('about.aiResearchDesc'),
      expertise: t('about.aiResearchExpertise')
    },
    {
      area: t('about.tradingSystems'),
      description: t('about.tradingSystemsDesc'),
      expertise: t('about.tradingSystemsExpertise')
    }
  ];

  const values = [
    {
      title: t('about.innovation'),
      description: t('about.innovationDesc')
    },
    {
      title: t('about.precision'),
      description: t('about.precisionDesc')
    },
    {
      title: t('about.reliability'),
      description: t('about.reliabilityDesc')
    }
  ];

  return (
    <div className="min-h-screen relative">
      <GL hovering={hovering} />

      <div className="relative z-10 container mx-auto pt-40 pb-24 px-6">
        <section className="py-20 md:py-32">
          {/* Header Section */}
          <div className="text-center mb-16" ref={(el) => { sectionRefs.current.header = el; }}>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-mono mb-6 ${isLoaded ? 'animate-fade-in-up animate-delay-200' : ''}`}>
            {t('about.title')}
          </h2>
          <p className={`font-mono text-sm text-foreground/60 mb-4 ${isLoaded ? 'animate-fade-in-up animate-delay-300' : ''}`}>
            株式会社セール・ラボ
          </p>
          <p className={`font-mono text-foreground/60 text-lg max-w-2xl mx-auto ${isLoaded ? 'animate-fade-in-up animate-delay-400' : ''}`}>
            {t('about.subtitle')}
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-20" ref={(el) => { sectionRefs.current.mission = el; }}>
          <Card className={`max-w-4xl mx-auto bg-card/80 backdrop-blur-sm border-border/50 hover-lift ${visibleSections.has('mission') ? 'animate-scale-in' : ''}`}>
            <CardHeader className="text-center">
              <CardTitle className={`text-3xl font-mono ${visibleSections.has('mission') ? 'animate-fade-in-up animate-delay-200' : ''}`}>{t('about.mission')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-xl font-mono text-foreground/90 text-center leading-relaxed mb-6 ${visibleSections.has('mission') ? 'animate-fade-in-up animate-delay-400' : ''}`}>
                {t('about.missionText1')}
              </p>
              <p className={`text-lg font-mono text-foreground/80 text-center leading-relaxed ${visibleSections.has('mission') ? 'animate-fade-in-up animate-delay-600' : ''}`}>
                {t('about.missionText2')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <div className="mb-20" ref={(el) => { sectionRefs.current.team = el; }}>
          <h2 className={`text-4xl font-mono text-center mb-12 ${visibleSections.has('team') ? 'animate-fade-in-up' : ''}`}>{t('about.team')}</h2>
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
                  {t('about.jayneDesc')}
                </CardDescription>
                <div className="mt-4">
                  <a
                    href="https://www.linkedin.com/in/jayne-yu-synovaw/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors duration-150 font-mono text-sm group-hover:translate-x-1 transition-transform duration-300 inline-block"
                  >
                    Connect on LinkedIn →
                  </a>
                </div>
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
                  Founder & CTO
                </Badge>
                <CardDescription className="font-mono text-foreground/70">
                  {t('about.joeDesc')}
                </CardDescription>
                <div className="mt-4">
                  <a
                    href="https://www.linkedin.com/in/wang1946may7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors duration-150 font-mono text-sm group-hover:translate-x-1 transition-transform duration-300 inline-block"
                  >
                    Connect on LinkedIn →
                  </a>
                </div>
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
                  {t('about.evyDesc')}
                </CardDescription>
                <div className="mt-4">
                  <a
                    href="https://www.linkedin.com/in/evy-yang-086b24375/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors duration-150 font-mono text-sm group-hover:translate-x-1 transition-transform duration-300 inline-block"
                  >
                    Connect on LinkedIn →
                  </a>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Team Highlights Section */}
        <div className="mb-20" ref={(el) => { sectionRefs.current.expertise = el; }}>
          <h2 className={`text-4xl font-mono text-center mb-12 ${visibleSections.has('expertise') ? 'animate-fade-in-up' : ''}`}>{t('about.teamExpertise')}</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {teamHighlights.map((team, index) => (
              <Card key={index} className={`bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 hover-lift transition-all duration-300 group ${visibleSections.has('expertise') ? 'animate-slide-in-left' : ''}`} style={{animationDelay: visibleSections.has('expertise') ? `${index * 0.1 + 0.2}s` : '0s'}}>
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2 border-primary/50 text-primary group-hover:bg-primary/10 transition-colors font-mono">
                    {team.area}
                  </Badge>
                  <CardTitle className="text-xl font-mono group-hover:text-primary transition-colors">
                    {team.area}
                  </CardTitle>
                  <CardDescription className="font-mono text-foreground/70">
                    {team.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-mono text-foreground/60">{t('about.keyExpertise')}:</p>
                    <p className="font-mono text-sm text-foreground/80">{team.expertise}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Information Section */}
        <div className="mb-20" ref={(el) => { sectionRefs.current.company = el; }}>
          <Card className={`max-w-4xl mx-auto bg-card/80 backdrop-blur-sm border-border/50 hover-lift ${visibleSections.has('company') ? 'animate-scale-in' : ''}`}>
            <CardHeader className="text-center">
              <CardTitle className={`text-3xl font-mono ${visibleSections.has('company') ? 'animate-fade-in-up animate-delay-200' : ''}`}>{t('about.companyInfo')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6 text-center">
                <div className={`${visibleSections.has('company') ? 'animate-fade-in-up animate-delay-400' : ''}`}>
                  <h4 className="font-mono text-primary mb-2">{t('about.companyCapital')}</h4>
                  <p className="font-mono text-lg text-foreground/90">¥9.99 million JPY</p>
                </div>
                <div className={`${visibleSections.has('company') ? 'animate-fade-in-up animate-delay-500' : ''}`}>
                  <h4 className="font-mono text-primary mb-2">{t('about.assetsUnderManagement')}</h4>
                  <p className="font-mono text-lg text-foreground/90">{t('about.assetsAmount')}</p>
                </div>
              </div>
              <div className={`text-center ${visibleSections.has('company') ? 'animate-fade-in-up animate-delay-600' : ''}`}>
                <p className="font-mono text-foreground/70 leading-relaxed">
                  {t('about.assetsDescription')}
                </p>
              </div>
              <div className={`text-center ${visibleSections.has('company') ? 'animate-fade-in-up animate-delay-700' : ''}`}>
                <h4 className="font-mono text-primary mb-3">{t('about.officeAddress')}</h4>
                <div className="font-mono text-sm text-foreground/70 space-y-1">
                  <p>Daiya Gate 5F, Minami-Ikebukuro 1-16-15</p>
                  <p>Toshima City, Tokyo 171-0022, Japan</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center" ref={(el) => { sectionRefs.current.cta = el; }}>
          <h3 className={`text-3xl font-mono mb-6 ${visibleSections.has('cta') ? 'animate-fade-in-up' : ''}`}>{t('about.ctaTitle')}</h3>
          <p className={`font-mono text-foreground/70 mb-8 max-w-2xl mx-auto ${visibleSections.has('cta') ? 'animate-fade-in-up animate-delay-200' : ''}`}>
            {t('about.ctaDescription')}
          </p>
          <Button
            className={`mx-auto hover-lift ${visibleSections.has('cta') ? 'animate-fade-in-up animate-delay-400' : ''}`}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            [{t('about.contactTeam')}]
          </Button>
        </div>
        </section>
      </div>
    </div>
  );
}