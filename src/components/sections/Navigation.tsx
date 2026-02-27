import { useEffect, useState } from "react";
import { Laptop, Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/portfolio-data";

type NavigationProps = {
  themeMode: "light" | "dark" | "system";
  resolvedTheme: "light" | "dark";
  onToggleTheme: () => void;
};

const Navigation = ({
  themeMode,
  resolvedTheme,
  onToggleTheme,
}: NavigationProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const nextThemeLabel =
    themeMode === "system"
      ? "dark"
      : themeMode === "dark"
        ? "light"
        : "system";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-3" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-xl font-bold text-gradient">
          AB
        </a>
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            className="rounded-full border border-border/70"
            aria-label={`Switch to ${nextThemeLabel} theme`}
            onClick={onToggleTheme}
          >
            {themeMode === "system" ? (
              <Laptop className="h-4 w-4" />
            ) : resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
            <a href="#contact">Hire Me</a>
          </Button>
          <button
            type="button"
            className="md:hidden p-2 rounded-lg border border-white/10 bg-white/5 text-foreground hover:bg-white/10 transition-colors"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-haspopup="menu"
            aria-controls="mobile-nav"
            aria-expanded={menuOpen ? "true" : "false"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-4">
          <div className="flex flex-col gap-4 glass rounded-2xl p-4">
            <Button
              type="button"
              variant="ghost"
              className="justify-start px-2"
              onClick={onToggleTheme}
            >
              {themeMode === "system" ? (
                <Laptop className="h-4 w-4" />
              ) : resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              {themeMode === "system"
                ? "Theme: System"
                : resolvedTheme === "dark"
                  ? "Theme: Dark"
                  : "Theme: Light"}
            </Button>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
