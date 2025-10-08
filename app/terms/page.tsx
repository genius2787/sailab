"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GL } from "@/components/gl";
import { useLanguage } from "@/contexts/language-context";
import {
  FileText,
  AlertTriangle,
  Scale,
  DollarSign,
  Shield,
  Users,
  Gavel,
  Ban,
  Eye,
  Clock,
  Mail,
  Phone
} from "lucide-react";

export default function TermsOfService() {
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
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: FileText,
      content: [
        "By accessing or using SAIL Lab's AI trading platform, you agree to be bound by these Terms of Service.",
        "These terms constitute a legally binding agreement between you and SAIL Lab Inc.",
        "If you do not agree with any part of these terms, you must not use our services.",
        "We reserve the right to modify these terms at any time with 30 days' notice to users.",
        "Continued use of the platform after changes constitutes acceptance of the new terms."
      ]
    },
    {
      id: "services",
      title: "AI Trading Services Description",
      icon: Shield,
      content: [
        "SAIL Lab provides AI-powered trading analysis, market insights, and investment research tools.",
        "Our multi-agent AI systems offer trading recommendations based on machine learning algorithms.",
        "Services include portfolio analysis, risk assessment, market sentiment analysis, and automated trading signals.",
        "Platform features may include real-time data feeds, backtesting tools, and performance analytics.",
        "We continuously update and improve our AI models to enhance prediction accuracy and user experience."
      ]
    },
    {
      id: "eligibility",
      title: "User Eligibility & Account Requirements",
      icon: Users,
      content: [
        "You must be at least 18 years old and legally capable of entering into binding contracts.",
        "You must provide accurate, current, and complete information during registration.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You must comply with all applicable laws and regulations in your jurisdiction.",
        "Professional traders and institutional clients may have additional verification requirements.",
        "We reserve the right to refuse service or terminate accounts that violate these terms."
      ]
    },
    {
      id: "financial-disclaimers",
      title: "Financial Disclaimers & Investment Risks",
      icon: AlertTriangle,
      content: [
        "IMPORTANT: All AI-generated trading recommendations are for informational purposes only and do not constitute financial advice.",
        "Trading and investing involve substantial risk of loss, including the potential loss of all invested capital.",
        "Past performance of our AI models does not guarantee future results or investment success.",
        "You should consult with qualified financial advisors before making investment decisions.",
        "AI predictions and market analysis may be inaccurate due to market volatility and unforeseen events.",
        "You acknowledge that you are solely responsible for your investment decisions and their consequences."
      ]
    },
    {
      id: "fees-payments",
      title: "Fees, Payments & Billing",
      icon: DollarSign,
      content: [
        "Subscription fees are charged monthly or annually based on your selected plan.",
        "All fees are non-refundable except as required by applicable consumer protection laws.",
        "Fee changes will be communicated at least 30 days in advance via email notification.",
        "Failure to pay fees may result in suspension or termination of your account access.",
        "Enterprise clients may have custom pricing agreements with different payment terms.",
        "You are responsible for all taxes associated with your use of our services."
      ]
    },
    {
      id: "data-usage",
      title: "Data Usage & AI Model Training",
      icon: Eye,
      content: [
        "We may use anonymized trading data and platform usage analytics to improve our AI models.",
        "Your personal trading strategies and specific investment decisions remain confidential.",
        "Aggregated, non-identifying market data may be used for research and algorithm enhancement.",
        "You retain ownership of your personal data and can request deletion subject to legal requirements.",
        "Our AI systems learn from market patterns but do not access your private financial accounts.",
        "Data usage is governed by our Privacy Policy and applicable data protection regulations."
      ]
    },
    {
      id: "prohibited-activities",
      title: "Prohibited Activities",
      icon: Ban,
      content: [
        "Using the platform for illegal activities, money laundering, or financing prohibited transactions.",
        "Attempting to reverse engineer, hack, or compromise our AI algorithms or security systems.",
        "Sharing account credentials with unauthorized third parties or creating multiple accounts.",
        "Using automated systems to overwhelm our servers or extract large amounts of data.",
        "Violating securities laws, insider trading regulations, or market manipulation rules.",
        "Engaging in activities that could harm other users or damage our platform's reputation."
      ]
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property Rights",
      icon: Scale,
      content: [
        "All AI algorithms, software, and proprietary technology are owned by SAIL Lab Inc.",
        "You receive a limited, non-exclusive license to use our platform for personal or business trading.",
        "You may not copy, modify, distribute, or create derivative works from our proprietary systems.",
        "User-generated content may be used by SAIL Lab for platform improvement with proper attribution.",
        "Trademarks, logos, and brand names are protected intellectual property of SAIL Lab.",
        "Any unauthorized use of our intellectual property may result in legal action."
      ]
    },
    {
      id: "limitation-liability",
      title: "Limitation of Liability",
      icon: Gavel,
      content: [
        "SAIL Lab's total liability for any claims shall not exceed the fees paid by you in the 12 months preceding the claim.",
        "We are not liable for indirect, consequential, or punitive damages arising from platform use.",
        "We do not guarantee uninterrupted service and are not liable for temporary outages or technical issues.",
        "Trading losses resulting from AI recommendations or platform use are solely your responsibility.",
        "Force majeure events, including market crashes or regulatory changes, limit our liability.",
        "Some jurisdictions may not allow certain liability limitations, which may not apply to you."
      ]
    },
    {
      id: "termination",
      title: "Account Termination",
      icon: Clock,
      content: [
        "You may terminate your account at any time by contacting customer support.",
        "We may terminate or suspend accounts for violation of terms, non-payment, or suspicious activity.",
        "Upon termination, you lose access to all platform features and any remaining subscription benefits.",
        "We will provide reasonable notice before termination except in cases of serious violations.",
        "Data retention after termination is governed by our Privacy Policy and legal requirements.",
        "Certain provisions of these terms survive termination, including intellectual property and liability clauses."
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
            {t('terms.title')}
          </h1>
          <p className={`text-lg text-foreground/70 font-mono max-w-3xl mx-auto ${isLoaded ? 'animate-fade-in-up animate-delay-200' : ''}`}>
            {t('terms.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 font-mono">
              {t('terms.effectiveDate')}
            </Badge>
            <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/30 font-mono">
              {t('terms.version')}
            </Badge>
          </div>
        </div>

        {/* Important Notice */}
        <Card className="mb-12 bg-gradient-to-r from-red-500/10 to-amber-500/10 backdrop-blur-sm border-red-500/30" ref={el => sectionRefs.current.notice = el}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl font-mono text-red-400">
              <AlertTriangle className="h-6 w-6" />
              {t('terms.riskNotice')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="font-mono text-red-300 font-semibold">
                {t('terms.highRiskWarning')}
              </p>
              <ul className="space-y-2 text-sm font-mono text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>AI predictions are not guarantees and may be incorrect due to market volatility</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>You could lose all or more than your initial investment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Past performance does not indicate future results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Only invest money you can afford to lose</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Terms Sections */}
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

        {/* Governing Law */}
        <Card className="mt-12 bg-card/60 backdrop-blur-sm border-border/40" ref={el => sectionRefs.current.law = el}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl font-mono">
              <Scale className="h-5 w-5 text-primary" />
              Governing Law & Dispute Resolution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold font-mono text-foreground mb-2">Jurisdiction</h4>
                <p className="text-sm font-mono text-foreground/80">
                  These Terms are governed by the laws of Delaware, United States, without regard to conflict of law principles.
                  Any disputes shall be resolved through binding arbitration in Delaware or through Delaware state courts.
                </p>
              </div>
              <div>
                <h4 className="font-semibold font-mono text-foreground mb-2">Regulatory Compliance</h4>
                <p className="text-sm font-mono text-foreground/80">
                  SAIL Lab operates under applicable financial services regulations including SEC, CFTC, and state securities laws.
                  International users must comply with their local financial regulations and trading restrictions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mt-8 bg-card/60 backdrop-blur-sm border-border/40" ref={el => sectionRefs.current.contact = el}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl font-mono">
              <Mail className="h-5 w-5 text-primary" />
              Legal Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold font-mono text-foreground">Legal Inquiries</h4>
                <div className="space-y-2 text-sm font-mono text-foreground/80">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>legal@saillab.ai</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold font-mono text-foreground">Company Address</h4>
                <div className="text-sm font-mono text-foreground/80">
                  <p>SAIL Lab Inc.</p>
                  <p>1234 Innovation Drive</p>
                  <p>San Francisco, CA 94105</p>
                  <p>United States</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-border/20">
          <p className="text-sm text-foreground/60 font-mono">
            These Terms of Service were last updated on January 1, 2025. We may update these terms from time to time.
            Significant changes will be communicated via email with 30 days' notice.
          </p>
          <p className="text-xs text-foreground/50 font-mono mt-4">
            © 2025 SAIL Lab Inc. All rights reserved. |
            <span className="text-primary hover:text-primary/80 cursor-pointer ml-1">Privacy Policy</span> |
            <span className="text-primary hover:text-primary/80 cursor-pointer ml-1">Cookie Policy</span> |
            <span className="text-primary hover:text-primary/80 cursor-pointer ml-1">Risk Disclosure</span>
          </p>
        </div>
      </div>
    </div>
  );
}