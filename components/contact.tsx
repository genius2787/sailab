"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { GL } from "./gl";

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
    title: "CTO",
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
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [focusedField, setFocusedField] = useState<string | null>(null);
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

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      subject: "",
      message: ""
    });
    setIsSubmitting(false);

    // In a real application, you would handle the success/error states
    alert("Thank you for your message! We'll get back to you soon.");
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

      <div className="relative z-10">
        <section id="contact" className="py-20 md:py-32">
          <div className="container">
            {/* Header */}
            <div className="text-center mb-16" ref={el => sectionRefs.current.header = el}>
              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-sentient mb-6 ${isLoaded ? 'animate-fade-in-up' : ''}`}>
                Get in <i className="font-light">Touch</i>
              </h2>
              <p className={`font-mono text-foreground/60 text-lg max-w-2xl mx-auto ${isLoaded ? 'animate-fade-in-up animate-delay-200' : ''}`}>
                Ready to revolutionize your trading strategies with AI?
                Let's discuss how SAIL Lab can drive your financial innovation forward
              </p>
            </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className={`border-border/40 bg-background/30 backdrop-blur-sm hover-lift ${isLoaded ? 'animate-slide-in-left animate-delay-400' : ''}`} ref={el => sectionRefs.current.form = el}>
            <CardHeader>
              <CardTitle className={`text-2xl font-sentient ${visibleSections.has('form') ? 'animate-fade-in-up animate-delay-200' : ''}`}>Send us a Message</CardTitle>
              <CardDescription className={`${visibleSections.has('form') ? 'animate-fade-in-up animate-delay-300' : ''}`}>
                We'd love to hear about your project and discuss how our AI solutions can help
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-mono text-foreground/80 mb-2">
                      Name *
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className={`${errors.name ? "border-red-500" : ""} transition-all duration-300 ${focusedField === "name" ? "ring-2 ring-primary/20 border-primary/50 scale-105" : ""}`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs font-mono mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-mono text-foreground/80 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={`${errors.email ? "border-red-500" : ""} transition-all duration-300 ${focusedField === "email" ? "ring-2 ring-primary/20 border-primary/50 scale-105" : ""}`}
                      placeholder="your.email@company.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs font-mono mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-mono text-foreground/80 mb-2">
                    Company
                  </label>
                  <Input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    onFocus={() => setFocusedField("company")}
                    onBlur={() => setFocusedField(null)}
                    className={`transition-all duration-300 ${focusedField === "company" ? "ring-2 ring-primary/20 border-primary/50 scale-105" : ""}`}
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-foreground/80 mb-2">
                    Subject *
                  </label>
                  <Input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    className={`${errors.subject ? "border-red-500" : ""} transition-all duration-300 ${focusedField === "subject" ? "ring-2 ring-primary/20 border-primary/50 scale-105" : ""}`}
                    placeholder="What can we help you with?"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-xs font-mono mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-mono text-foreground/80 mb-2">
                    Message *
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className={`min-h-32 ${errors.message ? "border-red-500" : ""} transition-all duration-300 ${focusedField === "message" ? "ring-2 ring-primary/20 border-primary/50 scale-105" : ""}`}
                    placeholder="Tell us more about your project, goals, and how we can help..."
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
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6" ref={el => sectionRefs.current.info = el}>
            {/* Office Information */}
            <Card className={`border-border/40 bg-background/30 backdrop-blur-sm hover-lift ${isLoaded ? 'animate-slide-in-right animate-delay-500' : ''}`}>
              <CardHeader>
                <CardTitle className={`text-xl font-sentient ${visibleSections.has('info') ? 'animate-fade-in-up animate-delay-200' : ''}`}>Tokyo Office</CardTitle>
                <CardDescription className={`${visibleSections.has('info') ? 'animate-fade-in-up animate-delay-300' : ''}`}>Visit us at our headquarters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-primary mt-1">📍</div>
                  <div>
                    <p className="font-mono text-sm text-foreground/80">Location</p>
                    <p className="text-foreground">Daiya Gate 5F, Minami-Ikebukuro 1-16-15</p>
                    <p className="text-foreground">Tokyo, Japan</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-primary mt-1">✉️</div>
                  <div>
                    <p className="font-mono text-sm text-foreground/80">Email</p>
                    <a
                      href="mailto:wasedajoe@gmail.com"
                      className="text-primary hover:text-primary/80 transition-colors duration-150"
                    >
                      wasedajoe@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-primary mt-1">📞</div>
                  <div>
                    <p className="font-mono text-sm text-foreground/80">Phone</p>
                    <a
                      href="tel:+81359856245"
                      className="text-primary hover:text-primary/80 transition-colors duration-150"
                    >
                      +81 3-5985-6245
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-primary mt-1">🕒</div>
                  <div>
                    <p className="font-mono text-sm text-foreground/80">Business Hours</p>
                    <p className="text-foreground">Monday - Friday</p>
                    <p className="text-foreground/60">9:00 AM - 6:00 PM JST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Members */}
            <div ref={el => sectionRefs.current.team = el}>
              <h3 className={`text-xl font-sentient mb-6 ${visibleSections.has('team') ? 'animate-fade-in-up' : ''}`}>Meet Our Leadership Team</h3>
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
                          <h4 className="font-sentient text-lg group-hover:text-primary transition-colors">{member.name}</h4>
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
                            href={`mailto:${member.email}`}
                            className="text-primary hover:text-primary/80 transition-colors duration-150 font-mono text-sm"
                          >
                            Contact →
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Response */}
            <Card className={`border-primary/20 bg-primary/5 backdrop-blur-sm hover-lift ${visibleSections.has('team') ? 'animate-scale-in animate-delay-600' : ''}`}>
              <CardContent className="py-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-primary animate-bounce-subtle">⚡</div>
                  <h4 className="font-sentient text-lg">Quick Response</h4>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  We typically respond to inquiries within 24 hours during business days.
                  For urgent matters, please call our office directly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

            {/* Additional Contact Options */}
            <div className="mt-20 text-center" ref={el => sectionRefs.current.social = el}>
              <h3 className={`text-2xl md:text-3xl font-sentient mb-8 ${visibleSections.has('social') ? 'animate-fade-in-up' : ''}`}>
                Other Ways to <i className="font-light">Connect</i>
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="https://linkedin.com/company/sail-lab"
                  className={`flex items-center gap-2 px-6 py-3 border border-border/40 rounded-lg bg-background/30 backdrop-blur-sm hover:border-primary/40 hover:bg-background/50 hover-lift transition-all duration-300 ${visibleSections.has('social') ? 'animate-slide-in-left animate-delay-200' : ''}`}
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                >
                  <span>💼</span>
                  <span className="font-mono text-sm">LinkedIn</span>
                </a>
                <a
                  href="https://github.com/sail-lab"
                  className={`flex items-center gap-2 px-6 py-3 border border-border/40 rounded-lg bg-background/30 backdrop-blur-sm hover:border-primary/40 hover:bg-background/50 hover-lift transition-all duration-300 ${visibleSections.has('social') ? 'animate-fade-in-up animate-delay-300' : ''}`}
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                >
                  <span>🐙</span>
                  <span className="font-mono text-sm">GitHub</span>
                </a>
                <a
                  href="https://twitter.com/sail_lab"
                  className={`flex items-center gap-2 px-6 py-3 border border-border/40 rounded-lg bg-background/30 backdrop-blur-sm hover:border-primary/40 hover:bg-background/50 hover-lift transition-all duration-300 ${visibleSections.has('social') ? 'animate-slide-in-right animate-delay-400' : ''}`}
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                >
                  <span>🐦</span>
                  <span className="font-mono text-sm">Twitter</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}