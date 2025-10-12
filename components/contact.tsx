"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { GL } from "./gl";
import { useLanguage } from "@/contexts/language-context";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

interface TeamMember {
  name: string;
  title: string;
  expertise: string;
  email: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Jayne Yu",
    title: "CEO",
    expertise: "Keio University Law School JD, AI Governance & Legal Affairs specialist",
    email: "jayne@saillab.ai"
  },
  {
    name: "Joe Wang",
    title: "Founder & CTO",
    expertise: "Waseda University PhD, 15+ years AI research, 12 years investment experience",
    email: "joe@saillab.ai"
  },
  {
    name: "Evy Yang",
    title: "COO",
    expertise: "University of Tokyo graduate, 5+ years trading experience",
    email: "evy@saillab.ai"
  }
];

export function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [focusedField, setFocusedField] = useState<string | null>(null);
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

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) newErrors.name = t('contact.nameRequired');
    if (!formData.email.trim()) {
      newErrors.email = t('contact.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.emailInvalid');
    }
    if (!formData.subject.trim()) newErrors.subject = t('contact.subjectRequired');
    if (!formData.message.trim()) newErrors.message = t('contact.messageRequired');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Send email via API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: ""
      });

      alert(t('contact.successMessage') || 'Your message has been sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again or contact us directly at wasedajoe@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen relative">
      <GL hovering={hovering} />

      <div className="relative z-10 container mx-auto pt-40 pb-24 px-6">
        <section id="contact" className="py-20 md:py-32">
          <div>
            {/* Header */}
            <div className="text-center mb-16" ref={(el) => { sectionRefs.current.header = el; }}>
              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-mono mb-6 ${isLoaded ? 'animate-fade-in-up' : ''}`}>
                {t('contact.title')}
              </h2>
              <p className={`font-mono text-foreground/60 text-lg max-w-2xl mx-auto ${isLoaded ? 'animate-fade-in-up animate-delay-400' : ''}`}>
                {t('contact.subtitle')}
              </p>
            </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column: Contact Form and Quick Response */}
          <div className="space-y-6">
            {/* Contact Form */}
            <Card className={`border-border/40 bg-background/30 backdrop-blur-sm hover-lift ${isLoaded ? 'animate-slide-in-left animate-delay-400' : ''}`} ref={(el) => { sectionRefs.current.form = el; }}>
              <CardHeader>
                <CardTitle className={`text-2xl font-mono ${visibleSections.has('form') ? 'animate-fade-in-up animate-delay-200' : ''}`}>{t('contact.sendMessage')}</CardTitle>
                <CardDescription className={`${visibleSections.has('form') ? 'animate-fade-in-up animate-delay-300' : ''}`}>
                  {t('contact.formDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-mono text-foreground/80 mb-2">
                      {t('contact.nameField')} *
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className={`${errors.name ? "border-red-500" : ""} transition-all duration-300 ${focusedField === "name" ? "ring-2 ring-primary/20 border-primary/50 scale-105" : ""}`}
                      placeholder={t('contact.namePlaceholder')}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs font-mono mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-mono text-foreground/80 mb-2">
                      {t('contact.emailField')} *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={`${errors.email ? "border-red-500" : ""} transition-all duration-300 ${focusedField === "email" ? "ring-2 ring-primary/20 border-primary/50 scale-105" : ""}`}
                      placeholder={t('contact.emailPlaceholder')}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs font-mono mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-mono text-foreground/80 mb-2">
                    {t('contact.companyField')}
                  </label>
                  <Input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    onFocus={() => setFocusedField("company")}
                    onBlur={() => setFocusedField(null)}
                    className={`transition-all duration-300 ${focusedField === "company" ? "ring-2 ring-primary/20 border-primary/50 scale-105" : ""}`}
                    placeholder={t('contact.companyPlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-foreground/80 mb-2">
                    {t('contact.subjectField')} *
                  </label>
                  <Input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    className={`${errors.subject ? "border-red-500" : ""} transition-all duration-300 ${focusedField === "subject" ? "ring-2 ring-primary/20 border-primary/50 scale-105" : ""}`}
                    placeholder={t('contact.subjectPlaceholder')}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-xs font-mono mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-mono text-foreground/80 mb-2">
                    {t('contact.messageField')} *
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className={`min-h-32 ${errors.message ? "border-red-500" : ""} transition-all duration-300 ${focusedField === "message" ? "ring-2 ring-primary/20 border-primary/50 scale-105" : ""}`}
                    placeholder={t('contact.messagePlaceholder')}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs font-mono mt-1">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full hover-lift transition-all duration-300"
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                >
                  {isSubmitting ? t('contact.sending') : t('contact.sendMessage')}
                </Button>
              </form>
            </CardContent>
          </Card>

            {/* Quick Response */}
            <Card className={`border-primary/20 bg-primary/5 backdrop-blur-sm hover-lift ${visibleSections.has('form') ? 'animate-scale-in animate-delay-600' : ''}`}>
              <CardContent className="py-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-primary animate-bounce-subtle">⚡</div>
                  <h4 className="font-mono text-lg">{t('contact.quickResponse')}</h4>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                  We typically respond to inquiries within 24 hours during business days. For urgent matters, please call our office directly.
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Feel free to connect with us on{' '}
                  <a 
                    href="https://www.linkedin.com/in/wang1946may7" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors duration-150 underline font-medium"
                  >
                    LinkedIn
                  </a>
                  {' '}as listed on the right.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Contact Information */}
          <div className="space-y-6" ref={(el) => { sectionRefs.current.info = el; }}>
            {/* Office Information */}
            <Card className={`border-border/40 bg-background/30 backdrop-blur-sm hover-lift ${isLoaded ? 'animate-slide-in-right animate-delay-500' : ''}`}>
              <CardHeader>
                <CardTitle className={`text-xl font-mono ${visibleSections.has('info') ? 'animate-fade-in-up animate-delay-200' : ''}`}>{t('contact.tokyoOffice')}</CardTitle>
                <CardDescription className={`font-mono ${visibleSections.has('info') ? 'animate-fade-in-up animate-delay-300' : ''}`}>{t('contact.officeDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-primary mt-1">📍</div>
                  <div>
                    <p className="font-mono text-sm text-foreground/80">{t('contact.location')}</p>
                    <p className="font-mono text-foreground">Sail Lab Co., Ltd</p>
                    <p className="font-mono text-foreground">Daiya Gate 5F</p>
                    <p className="font-mono text-foreground">Minami-Ikebukuro 1-16-15</p>
                    <p className="font-mono text-foreground">Toshima City, Tokyo 171-0022, Japan</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-primary mt-1">✉️</div>
                  <div>
                    <p className="font-mono text-sm text-foreground/80">{t('contact.email')}</p>
                    <a
                      href="mailto:wasedajoe@gmail.com"
                      className="font-mono text-primary hover:text-primary/80 transition-colors duration-150"
                    >
                      wasedajoe@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-primary mt-1">📞</div>
                  <div>
                    <p className="font-mono text-sm text-foreground/80">{t('contact.phone')}</p>
                    <a
                      href="tel:+81359856245"
                      className="font-mono text-primary hover:text-primary/80 transition-colors duration-150"
                    >
                      +81 3-5985-6245
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-primary mt-1">🕒</div>
                  <div>
                    <p className="font-mono text-sm text-foreground/80">{t('contact.businessHours')}</p>
                    <p className="font-mono text-foreground">{t('contact.businessDays')}</p>
                    <p className="font-mono text-foreground/60">{t('contact.businessTime')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Members */}
            <div ref={(el) => { sectionRefs.current.team = el; }}>
              <h3 className={`text-xl font-mono mb-6 ${visibleSections.has('team') ? 'animate-fade-in-up' : ''}`}>{t('contact.meetTeam')}</h3>
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <Card
                    key={member.name}
                    className={`border-border/40 bg-background/30 backdrop-blur-sm hover:border-primary/40 hover:bg-background/50 hover-lift transition-all duration-300 cursor-pointer ${visibleSections.has('team') ? 'animate-slide-in-left' : ''}`}
                    style={{animationDelay: visibleSections.has('team') ? `${index * 0.1 + 0.2}s` : '0s'}}
                    onMouseEnter={() => setHoveredCard(member.name)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <CardContent className="py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 relative overflow-hidden rounded-full border-2 border-primary/20 flex-shrink-0 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                          <img
                            src={`/${member.name.split(' ')[0]}.jpg`}
                            alt={`${member.name}, ${member.title} of SAIL Lab`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-mono text-lg group-hover:text-primary transition-colors">{member.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="font-mono text-xs group-hover:border-primary/50 group-hover:text-primary transition-colors">
                              {member.title}
                            </Badge>
                            <span className="text-sm text-foreground/60 group-hover:text-foreground/80 transition-colors">{member.expertise}</span>
                          </div>
                        </div>
                        <div className={`transition-all duration-300 ${
                          hoveredCard === member.name ? "translate-x-2" : ""
                        }`}>
                          <a
                            href={member.name === "Joe Wang" ? "https://www.linkedin.com/in/wang1946may7" : `mailto:${member.email}`}
                            className="text-primary hover:text-primary/80 transition-colors duration-150 font-mono text-sm"
                            target={member.name === "Joe Wang" ? "_blank" : undefined}
                            rel={member.name === "Joe Wang" ? "noopener noreferrer" : undefined}
                          >
                            {t('contact.contactAction')} →
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

            {/* Additional Contact Options */}
            <div className="mt-20 text-center" ref={(el) => { sectionRefs.current.social = el; }}>
              <h3 className={`text-2xl md:text-3xl font-mono mb-8 ${visibleSections.has('social') ? 'animate-fade-in-up' : ''}`}>
                {t('contact.otherWays')}
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="https://linkedin.com/company/sail-lab"
                  className={`flex items-center gap-2 px-6 py-3 border border-border/40 rounded-lg bg-background/30 backdrop-blur-sm hover:border-primary/40 hover:bg-background/50 hover-lift transition-all duration-300 ${visibleSections.has('social') ? 'animate-slide-in-left animate-delay-200' : ''}`}
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                >
                  <span>💼</span>
                  <span className="font-mono text-sm">{t('contact.linkedin')}</span>
                </a>
                <a
                  href="https://github.com/sail-lab"
                  className={`flex items-center gap-2 px-6 py-3 border border-border/40 rounded-lg bg-background/30 backdrop-blur-sm hover:border-primary/40 hover:bg-background/50 hover-lift transition-all duration-300 ${visibleSections.has('social') ? 'animate-fade-in-up animate-delay-300' : ''}`}
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                >
                  <span>🐙</span>
                  <span className="font-mono text-sm">{t('contact.github')}</span>
                </a>
                <a
                  href="https://twitter.com/sail_lab"
                  className={`flex items-center gap-2 px-6 py-3 border border-border/40 rounded-lg bg-background/30 backdrop-blur-sm hover:border-primary/40 hover:bg-background/50 hover-lift transition-all duration-300 ${visibleSections.has('social') ? 'animate-slide-in-right animate-delay-400' : ''}`}
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                >
                  <span>🐦</span>
                  <span className="font-mono text-sm">{t('contact.twitter')}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}