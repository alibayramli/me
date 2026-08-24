import { useEffect, useState, useSyncExternalStore } from 'react'
import { Download, Menu, Moon, Sun, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trackAnalyticsEvent } from '@/lib/analytics'
import { NAV_ITEMS, SITE_PROFILE, withBasePath } from '@/lib/portfolio-data'

type NavigationProps = {
  page: 'blog' | 'home'
}

type Theme = 'dark' | 'light'

const THEME_STORAGE_KEY = 'portfolio-theme'
const THEME_CHANGE_EVENT = 'portfolio-theme-change'

const subscribeToTheme = (callback: () => void) => {
  window.addEventListener(THEME_CHANGE_EVENT, callback)
  window.addEventListener('storage', callback)

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, callback)
    window.removeEventListener('storage', callback)
  }
}

const getThemeSnapshot = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light'

const getServerThemeSnapshot = (): Theme => 'light'

const Navigation = ({ page }: NavigationProps) => {
  const [scrolled, setScrolled] = useState(false)
  const [heroNameVisible, setHeroNameVisible] = useState(page === 'home')
  const [menuOpen, setMenuOpen] = useState(false)
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot)
  const nextThemeLabel = theme === 'dark' ? 'light' : 'dark'
  const showBrand = page === 'blog' || !heroNameVisible
  const navItems =
    page === 'home'
      ? NAV_ITEMS
      : [
          { label: 'Home', href: '' },
          { label: 'Blog Posts', href: 'blog/' },
        ]
  const mobileNavItems =
    page === 'home' ? [{ label: 'Home', href: '#main-content' }, ...navItems] : navItems
  const brandHref = page === 'home' ? '#main-content' : withBasePath('')
  const resolveHref = (href: string) => {
    if (href.startsWith('#')) {
      return page === 'home' ? href : `${withBasePath('')}${href}`
    }

    return withBasePath(href)
  }
  const toggleTheme = () => {
    const nextTheme: Theme = getThemeSnapshot() === 'dark' ? 'light' : 'dark'

    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT))
  }

  const renderThemeToggle = () => (
    <Button
      type="button"
      size="icon-sm"
      variant="ghost"
      className="rounded-full border border-border/75 bg-background/70"
      aria-label={`Switch to ${nextThemeLabel} theme`}
      onClick={toggleTheme}
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (page !== 'home') {
      return
    }

    const heroName = document.getElementById('hero-name')

    if (!heroName) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroNameVisible(entry.isIntersecting)
      },
      {
        rootMargin: '-88px 0px 0px 0px',
        threshold: 0.1,
      },
    )

    observer.observe(heroName)

    return () => observer.disconnect()
  }, [page])

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-border/70 bg-background/88 py-3 backdrop-blur-xl' : 'py-5'
      }`}
    >
      <div className="mx-auto hidden w-full max-w-6xl items-center px-6 md:flex">
        <div className="min-w-0 basis-0 flex-1">
          {showBrand ? (
            <a href={brandHref} className="inline-flex min-w-0 max-w-full text-foreground">
              <div className="truncate text-base font-semibold">{SITE_PROFILE.name}</div>
            </a>
          ) : null}
        </div>

        <div className="flex flex-none items-center justify-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={resolveHref(item.href)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex basis-0 flex-1 items-center justify-end gap-2">
          <Button size="sm" asChild>
            <a
              href={SITE_PROFILE.resumePdfUrl}
              download
              onClick={() =>
                trackAnalyticsEvent('resume-download', {
                  format: 'pdf',
                  placement: 'navigation-desktop',
                })
              }
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
          </Button>
          {renderThemeToggle()}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-6 md:hidden">
        <div className="min-w-0 flex-1">
          {showBrand ? (
            <a href={brandHref} className="block text-foreground">
              <span className="block truncate text-sm font-semibold">{SITE_PROFILE.name}</span>
            </a>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button size="sm" asChild>
            <a
              href={SITE_PROFILE.resumePdfUrl}
              download
              onClick={() =>
                trackAnalyticsEvent('resume-download', {
                  format: 'pdf',
                  placement: 'navigation-mobile',
                })
              }
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
          </Button>
          {renderThemeToggle()}

          <button
            type="button"
            className="rounded-lg border border-border/75 bg-background/70 p-2 text-foreground transition-colors hover:bg-accent/70"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-controls="mobile-nav"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={menuOpen ? 'overflow-hidden md:hidden' : 'hidden'}
        aria-hidden={!menuOpen}
      >
        <div className="px-6 pb-6 pt-4">
          <div className="flex flex-col gap-3 rounded-3xl border border-border/75 bg-background/92 p-4 backdrop-blur-xl">
            <div className="flex flex-col gap-4 pt-1">
              {mobileNavItems.map((item) => (
                <a
                  key={`${item.label}-${item.href}`}
                  href={resolveHref(item.href)}
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
  )
}

export default Navigation
