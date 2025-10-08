"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "@/contexts/language-context";

export const Header = () => {
  const navItems = [
    { key: "about", label: "About", href: "/about" },
    { key: "portfolio", label: "Portfolio", href: "/portfolio" },
    { key: "insights", label: "Insights", href: "/insights" },
    { key: "blog", label: "Blog", href: "/blog" },
    { key: "contact", label: "Contact", href: "/contact" },
    { key: "dashboard", label: "Dashboard", href: "/dashboard" }
  ];

  return (
    <div className="fixed z-50 pt-8 md:pt-14 top-0 left-0 w-full bg-background/95 backdrop-blur-sm border-b border-border/20">
      <header className="flex items-center container relative">
        <div className="flex-1">
          <Link href="/" className="inline-block ml-12">
            <Logo className="w-[50px] md:w-[60px]" />
          </Link>
        </div>
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-x-10 lg:flex">
          {navItems.map((item) => (
            <Link
              className="uppercase inline-block font-mono text-foreground/60 hover:text-foreground/100 duration-150 transition-colors ease-out"
              href={item.href}
              key={item.key}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex-1 flex justify-end">
          <LanguageSwitcher />
        </div>
        <MobileMenu className="mr-12" />
      </header>
    </div>
  );
};