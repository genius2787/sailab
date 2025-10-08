"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface Language {
  code: "en" | "zh" | "ja";
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "" },
  { code: "zh", name: "中文", flag: "" },
  { code: "ja", name: "日本語", flag: "" }
];

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang.code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-background/10 text-foreground/70 hover:text-foreground font-mono uppercase text-sm"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden md:inline">{currentLanguage.code.toUpperCase()}</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-40 bg-background/95 backdrop-blur-sm border border-border/40 rounded-lg shadow-lg z-50">
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language)}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-mono hover:bg-background/20 transition-colors duration-150 ${
                  currentLanguage.code === language.code
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground/80'
                }`}
              >
                <span>{language.name}</span>
                {currentLanguage.code === language.code && (
                  <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}