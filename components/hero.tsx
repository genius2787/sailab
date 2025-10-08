"use client";

import Link from "next/link";
import { GL } from "./gl";
import { Pill } from "./pill";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/language-context";

export function Hero() {
  const { t } = useLanguage();
  const [hovering, setHovering] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex flex-col h-svh justify-between">
      <GL hovering={hovering} />

      <div className="pb-16 mt-auto text-center relative">
        <Pill className={`mb-6 ${isLoaded ? 'animate-fade-in-up' : ''}`}>SAIL LAB</Pill>
        <h1 className={`text-5xl sm:text-6xl md:text-7xl font-mono ${isLoaded ? 'animate-fade-in-up animate-delay-200' : ''}`}>
          AI-Powered <br />
          Financial Innovation
        </h1>
        <p className={`font-mono text-sm sm:text-base text-foreground/60 text-balance mt-8 max-w-[440px] mx-auto ${isLoaded ? 'animate-fade-in-up animate-delay-400' : ''}`}>
          {t('home.subtitle')}
        </p>

        <Link className="contents max-sm:hidden" href="/contact">
          <Button
            className={`mt-14 hover-lift ${isLoaded ? 'animate-fade-in-up animate-delay-600' : ''}`}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
[{t('home.contact')}]
          </Button>
        </Link>
        <Link className="contents sm:hidden" href="/contact">
          <Button
            size="sm"
            className={`mt-14 hover-lift ${isLoaded ? 'animate-fade-in-up animate-delay-600' : ''}`}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
[{t('home.contact')}]
          </Button>
        </Link>
      </div>
    </div>
  );
}