import Link from "next/link";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

export const Header = () => {
  return (
    <div className="fixed z-50 pt-8 md:pt-14 top-0 left-0 w-full">
      <header className="flex items-center container relative">
        <div className="flex-1">
          <Link href="/">
            <Logo className="w-[50px] md:w-[60px]" />
          </Link>
        </div>
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-x-10 lg:flex">
          {["About", "Portfolio", "Insights", "Blog", "Contact", "Dashboard"].map((item) => (
            <Link
              className="uppercase inline-block font-mono text-foreground/60 hover:text-foreground/100 duration-150 transition-colors ease-out"
              href={`/${item.toLowerCase()}`}
              key={item}
            >
              {item}
            </Link>
          ))}
        </nav>
        <div className="flex-1 flex justify-end">
          <Link className="uppercase hidden lg:inline transition-colors ease-out duration-150 font-mono text-primary hover:text-primary/80" href="/#sign-in">
            Sign In
          </Link>
        </div>
        <MobileMenu />
      </header>
    </div>
  );
};
