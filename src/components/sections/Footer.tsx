import { SITE_PROFILE } from '@/lib/portfolio-data'

const Footer = () => {
  return (
    <footer className="border-t border-border/70 px-6 py-6">
      <div className="mx-auto max-w-6xl text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} {SITE_PROFILE.name}
      </div>
    </footer>
  )
}

export default Footer
