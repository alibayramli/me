import { SITE_PROFILE } from '@/lib/portfolio-data'

type FooterProps = {
  page?: 'blog' | 'home'
}

const Footer = ({ page = 'home' }: FooterProps) => {
  return (
    <footer data-page={page} className="border-t border-border/70 px-6 py-6">
      <div className="mx-auto max-w-6xl text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} {SITE_PROFILE.name}
      </div>
    </footer>
  )
}

export default Footer
