import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS, SITE_PROFILE } from "@/lib/portfolio-data";

type NavigationProps = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

const Navigation = ({ theme, onToggleTheme }: NavigationProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [heroNameVisible, setHeroNameVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const nextThemeLabel = theme === "dark" ? "light" : "dark";
  const showBrand = !heroNameVisible;

  const renderThemeToggle = () => (
    <Button
      type="button"
      size="icon-sm"
      variant="ghost"
      className="rounded-full border border-border/75 bg-background/70"
      aria-label={`Switch to ${nextThemeLabel} theme`}
      onClick={onToggleTheme}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const heroName = document.getElementById("hero-name");

    if (!heroName) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroNameVisible(entry.isIntersecting);
      },
      {
        rootMargin: "-88px 0px 0px 0px",
        threshold: 0.1,
      },
    );

    observer.observe(heroName);

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/70 bg-background/88 py-3 backdrop-blur-xl"
          : "py-5"
      }`}
    >
      <div className="mx-auto hidden w-full max-w-6xl items-center px-6 md:flex">
        <div className="min-w-0 basis-0 flex-1">
          <a
            href="#main-content"
            aria-hidden={!showBrand}
            tabIndex={showBrand ? undefined : -1}
            className={`inline-flex min-w-0 max-w-full text-foreground transition-all duration-300 ${
              showBrand
                ? "translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-1 opacity-0"
            }`}
          >
            <div className="truncate text-base font-semibold">
              {SITE_PROFILE.name}
            </div>
          </a>
        </div>

        <div className="flex flex-none items-center justify-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex basis-0 flex-1 justify-end">
          {renderThemeToggle()}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl items-center justify-end gap-2 px-6 md:hidden">
        {renderThemeToggle()}

        <button
          type="button"
          className="rounded-lg border border-border/75 bg-background/70 p-2 text-foreground transition-colors hover:bg-accent/70"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-haspopup="menu"
          aria-controls="mobile-nav"
          aria-expanded={menuOpen ? "true" : "false"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-4">
          <div className="flex flex-col gap-3 rounded-3xl border border-border/75 bg-background/92 p-4 backdrop-blur-xl">
            <Button
              type="button"
              variant="ghost"
              className="justify-start px-3 text-sm"
              onClick={onToggleTheme}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              {theme === "dark" ? "Theme: Dark" : "Theme: Light"}
            </Button>

            <div className="flex flex-col gap-4 pt-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
