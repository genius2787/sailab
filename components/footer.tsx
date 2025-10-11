import Link from "next/link";
import { Logo } from "./logo";

export const Footer = () => {
  return (
    <footer className="bg-background/95 backdrop-blur-sm border-t border-border/40 mt-auto">
      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Logo className="w-[60px]" />
            </Link>
            <p className="font-mono text-foreground/60 text-sm leading-relaxed mb-4">
              SAIL Lab is a Tokyo-based AI financial technology company offering innovative solutions for quants systems, investment analysis, and trading automation.
            </p>
            <div className="font-mono text-xs text-foreground/50">
              <p>Daiya Gate 5F</p>
              <p>Minami-Ikebukuro 1-16-15</p>
              <p>Tokyo, Japan</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-mono text-blue-400 font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {["About", "Portfolio", "Insights", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors duration-150"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-mono text-blue-400 font-bold mb-4">Services</h3>
            <ul className="space-y-2 font-mono text-sm text-foreground/60">
              <li>Multi-Agent LLM Analysis</li>
              <li>Neural Network Trading</li>
              <li>AI Trader Community</li>
              <li>Custom AI Solutions</li>
              <li>Risk Management</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 mt-8 border-t border-border/20">
          <div className="font-mono text-xs text-foreground/50 mb-4 md:mb-0">
            © 2025 SAIL Lab. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="font-mono text-xs text-foreground/50 hover:text-foreground/70 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-mono text-xs text-foreground/50 hover:text-foreground/70 transition-colors"
            >
              Terms of Service
            </Link>
            <div className="font-mono text-xs text-foreground/40">
              Built with ❤️ in Tokyo
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};