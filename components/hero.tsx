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

      <div className="pt-32 pb-[800px] sm:pt-64 sm:pb-64 my-auto text-center relative">
        <Pill className={`mb-6 ${isLoaded ? 'animate-fade-in-up' : ''}`}>SAIL LAB</Pill>
        <h1 className={`text-5xl sm:text-6xl md:text-7xl font-mono ${isLoaded ? 'animate-fade-in-up animate-delay-200' : ''}`}>
          AI-Powered <br />
          Financial Innovation
        </h1>
        <p className={`font-mono text-sm sm:text-base text-foreground/60 text-balance mt-8 max-w-[440px] mx-auto ${isLoaded ? 'animate-fade-in-up animate-delay-400' : ''}`}>
          {t('home.subtitle')}
        </p>

        {/* Desktop buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-14 max-sm:hidden">
          <Link href="/dashboard">
            <Button
              className={`hover-lift bg-primary text-primary-foreground hover:bg-primary/90 ${isLoaded ? 'animate-fade-in-up animate-delay-600' : ''}`}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              [Dashboard]
            </Button>
          </Link>
          <Link href="/about">
            <Button
              className={`hover-lift bg-blue-600 text-white hover:bg-blue-700 border-blue-600 ${isLoaded ? 'animate-fade-in-up animate-delay-700' : ''}`}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              [About Us]
            </Button>
          </Link>
          <Link href="/insights/backtest-sep-2025">
            <Button
              className={`hover-lift bg-purple-600 text-white hover:bg-purple-700 border-purple-600 ${isLoaded ? 'animate-fade-in-up animate-delay-800' : ''}`}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              [View Backtest]
            </Button>
          </Link>
          <Link href="/blog">
            <Button
              className={`hover-lift bg-pink-600 text-white hover:bg-pink-700 border-pink-600 ${isLoaded ? 'animate-fade-in-up animate-delay-900' : ''}`}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              [Company News]
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              className={`hover-lift bg-orange-600 text-white hover:bg-orange-700 border-orange-600 ${isLoaded ? 'animate-fade-in-up animate-delay-1000' : ''}`}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              [{t('home.contact')}]
            </Button>
          </Link>
        </div>

        {/* Mobile buttons */}
        <div className="flex flex-col gap-3 items-center mt-14 sm:hidden">
          <Link href="/dashboard">
            <Button
              size="sm"
              className={`hover-lift bg-primary text-primary-foreground hover:bg-primary/90 ${isLoaded ? 'animate-fade-in-up animate-delay-600' : ''}`}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              [Dashboard]
            </Button>
          </Link>
          <Link href="/about">
            <Button
              size="sm"
              className={`hover-lift bg-blue-600 text-white hover:bg-blue-700 border-blue-600 ${isLoaded ? 'animate-fade-in-up animate-delay-700' : ''}`}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              [About Us]
            </Button>
          </Link>
          <Link href="/insights/backtest-sep-2025">
            <Button
              size="sm"
              className={`hover-lift bg-purple-600 text-white hover:bg-purple-700 border-purple-600 ${isLoaded ? 'animate-fade-in-up animate-delay-800' : ''}`}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              [View Backtest]
            </Button>
          </Link>
          <Link href="/blog">
            <Button
              size="sm"
              className={`hover-lift bg-pink-600 text-white hover:bg-pink-700 border-pink-600 ${isLoaded ? 'animate-fade-in-up animate-delay-900' : ''}`}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              [Company News]
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="sm"
              className={`hover-lift bg-orange-600 text-white hover:bg-orange-700 border-orange-600 ${isLoaded ? 'animate-fade-in-up animate-delay-1000' : ''}`}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              [{t('home.contact')}]
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}