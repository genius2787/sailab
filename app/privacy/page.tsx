"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GL } from "@/components/gl";
import { Shield, Lock, Eye, Database, Mail, Phone, FileText, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function PrivacyPolicy() {
  const { t } = useLanguage();
  const [hovering, setHovering] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

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

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Database,
      content: [
        "Personal Information: Name, email address, phone number, and payment information when you create an account or use our services.",
        "Trading Data: Investment preferences, trading history, portfolio information, and risk tolerance assessments.",
        "Technical Data: IP addresses, browser information, device identifiers, and usage analytics to improve our AI systems.",
        "AI Analysis Data: Market sentiment inputs, trading patterns, and algorithm performance metrics used to enhance our models."
      ]
    },
    {
      id: "data-usage",
      title: "How We Use Your Data",
      icon: Eye,
      content: [
        "Service Provision: To provide AI-powered trading analysis, portfolio management, and investment recommendations.",
        "AI Model Training: To improve our machine learning algorithms and enhance prediction accuracy (anonymized data only).",
        "Communication: To send service updates, trading alerts, market insights, and respond to your inquiries.",
        "Security & Compliance: To detect fraud, ensure platform security, and comply with financial regulations.",
        "Analytics: To analyze platform usage and improve user experience through data-driven insights."
      ]
    },
    {
      id: "data-sharing",
      title: "Data Sharing & Disclosure",
      icon: Shield,
      content: [
        "Third-Party Services: We may share data with trusted partners for payment processing, cloud storage, and analytics services.",
        "Legal Requirements: We may disclose information when required by law, court orders, or regulatory authorities.",
        "Business Transfers: In case of merger, acquisition, or sale, your data may be transferred as part of business assets.",
        "Consent-Based Sharing: We may share anonymized, aggregated data for research purposes with your explicit consent.",
        "No Sale of Personal Data: We do not sell your personal information to third parties for marketing purposes."
      ]
    },
    {
      id: "data-security",
      title: "Data Security & Protection",
      icon: Lock,
      content: [
        "Encryption: All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption standards.",
        "Access Controls: Strict role-based access controls ensure only authorized personnel can access your data.",
        "Regular Audits: We conduct regular security audits and penetration testing to identify and address vulnerabilities.",
        "Incident Response: We have comprehensive incident response procedures to handle any potential data breaches.",
        "Financial Grade Security: Our security measures meet or exceed financial industry standards and regulations."
      ]
    },
    {
      id: "user-rights",
      title: "Your Privacy Rights",
      icon: FileText,
      content: [
        "Access: You have the right to request access to your personal data and receive a copy of the information we hold.",
        "Correction: You can request correction of any inaccurate or incomplete personal information.",
        "Deletion: You may request deletion of your personal data, subject to legal and regulatory requirements.",
        "Portability: You have the right to receive your data in a structured, machine-readable format.",
        "Objection: You can object to certain types of data processing, including automated decision-making.",
        "Withdrawal: You may withdraw consent for data processing where consent is the legal basis."
      ]
    },
    {
      id: "cookies",
      title: "Cookies & Tracking",
      icon: Eye,
      content: [
        "Essential Cookies: Required for platform functionality, security, and user authentication.",
        "Analytics Cookies: Used to understand user behavior and improve our services (can be disabled).",
        "Performance Cookies: Help us optimize platform performance and AI model efficiency.",
        "Cookie Controls: You can manage cookie preferences through your browser settings or our cookie preference center.",
        "Third-Party Cookies: Some third-party services may set cookies for analytics and service provision."
      ]
    }
  ];

  return (
    <div className="min-h-screen relative bg-background">
      <GL hovering={hovering} />

      <div className="relative z-10 container mx-auto pt-32 pb-12 px-6">
        {/* Header */}
        <div className="text-center mb-16" ref={el => sectionRefs.current.header = el}>
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-foreground mb-6 ${isLoaded ? 'animate-fade-in-up' : ''}`}>
            {t('privacy.title')}
          </h1>
          <p className={`text-lg text-foreground/70 font-mono max-w-3xl mx-auto ${isLoaded ? 'animate-fade-in-up animate-delay-200' : ''}`}>
            {t('privacy.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 font-mono">
              {t('privacy.lastUpdated')}
            </Badge>
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30 font-mono">
              GDPR Compliant
            </Badge>
          </div>
        </div>

        {/* Quick Summary */}
        <Card className="mb-12 bg-card/60 backdrop-blur-sm border-border/40" ref={el => sectionRefs.current.summary = el}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl font-mono">
              <Shield className="h-6 w-6 text-primary" />
              Privacy Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold font-mono text-green-500">Data Protection</h4>
                    <p className="text-sm text-foreground/70 font-mono">Bank-level encryption and security measures protect your financial data.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Eye className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold font-mono text-blue-500">Transparency</h4>
                    <p className="text-sm text-foreground/70 font-mono">Clear disclosure of what data we collect and how it's used for AI analysis.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Database className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold font-mono text-purple-500">User Control</h4>
                    <p className="text-sm text-foreground/70 font-mono">Full control over your data with easy access, correction, and deletion rights.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold font-mono text-amber-500">Compliance</h4>
                    <p className="text-sm text-foreground/70 font-mono">Full compliance with GDPR, CCPA, and financial industry regulations.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card
              key={section.id}
              className={`bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 transition-all duration-300 ${visibleSections.has(section.id) ? 'animate-fade-in-up' : ''}`}
              ref={el => sectionRefs.current[section.id] = el}
              style={{animationDelay: visibleSections.has(section.id) ? `${index * 0.1}s` : '0s'}}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl font-mono">
                  <section.icon className="h-5 w-5 text-primary" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3 font-mono text-foreground/80 leading-relaxed">
                      <span className="text-primary mt-2 flex-shrink-0">•</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Information */}
        <Card className="mt-12 bg-card/60 backdrop-blur-sm border-border/40" ref={el => sectionRefs.current.contact = el}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl font-mono">
              <Mail className="h-5 w-5 text-primary" />
              Contact & Data Protection Officer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold font-mono text-foreground">Privacy Inquiries</h4>
                <div className="space-y-2 text-sm font-mono text-foreground/80">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>privacy@saillab.ai</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold font-mono text-foreground">Data Protection Officer</h4>
                <div className="space-y-2 text-sm font-mono text-foreground/80">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>dpo@saillab.ai</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Response within 30 days</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-background/20 rounded-lg border border-border/30">
              <p className="text-xs text-foreground/60 font-mono leading-relaxed">
                For data subject requests, please include your full name, email address associated with your account,
                and a detailed description of your request. We may require additional verification for security purposes.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-border/20">
          <p className="text-sm text-foreground/60 font-mono">
            This Privacy Policy was last updated on January 1, 2025. We may update this policy from time to time.
            We will notify you of any significant changes via email or platform notification.
          </p>
          <p className="text-xs text-foreground/50 font-mono mt-4">
            © 2025 SAIL Lab. All rights reserved. |
            <span className="text-primary hover:text-primary/80 cursor-pointer ml-1">Terms of Service</span> |
            <span className="text-primary hover:text-primary/80 cursor-pointer ml-1">Cookie Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}