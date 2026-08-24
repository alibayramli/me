import AnimatedBackground from '@/components/sections/AnimatedBackground'
import Contact from '@/components/sections/Contact'
import Experience from '@/components/sections/Experience'
import Footer from '@/components/sections/Footer'
import Hero from '@/components/sections/Hero'
import Impact from '@/components/sections/Impact'
import Navigation from '@/components/sections/Navigation'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Blog from '@/components/sections/Blog'
import type { BlogPostSummary } from '@/lib/blog-types'

type AppProps = {
  posts: BlogPostSummary[]
}

function App({ posts }: AppProps) {
  return (
    <div className="relative isolate min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-full focus:bg-primary focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <AnimatedBackground />
      <Navigation page="home" />
      <main id="main-content">
        <Hero />
        <Impact />
        <Experience />
        <Projects />
        <Skills />
        {posts.length > 0 ? <Blog posts={posts} /> : null}
        <Contact />
      </main>
      <Footer page="home" />
    </div>
  )
}

export default App
