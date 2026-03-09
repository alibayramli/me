import { createElement, type ComponentType, type ReactNode } from 'react'
import {
  BellRing,
  Boxes,
  Cloud,
  Code2,
  Gauge,
  Layers,
  Server,
  Sparkles,
  TrendingUp,
  Workflow,
  Zap,
} from 'lucide-react'
import siteContent from '@/content/site-content.json'

type IconKey =
  | 'bell'
  | 'box'
  | 'cloud'
  | 'code'
  | 'gauge'
  | 'layers'
  | 'server'
  | 'sparkles'
  | 'trending'
  | 'workflow'
  | 'zap'

const iconMap: Record<IconKey, ComponentType<{ className?: string }>> = {
  bell: BellRing,
  box: Boxes,
  cloud: Cloud,
  code: Code2,
  gauge: Gauge,
  layers: Layers,
  server: Server,
  sparkles: Sparkles,
  trending: TrendingUp,
  workflow: Workflow,
  zap: Zap,
}

const withBase = (assetPath: string) =>
  `${import.meta.env.BASE_URL}${assetPath.replace(/^\/+/, '')}`

const renderIcon = (icon: string, className: string) => {
  const Icon = iconMap[(icon as IconKey) || 'layers'] ?? Layers
  return createElement(Icon, { className })
}

export type NavItem = {
  label: string
  href: string
}

export type SiteProfile = {
  name: string
  title: string
  headline: string
  summary: string
  heroCapabilities: string[]
  availability: string
  contactHeadline: string
  location: string
  remote: string
  email: string
  linkedin: string
  github: string
  siteUrl: string
  resumePdf: string
  resumeDocx: string
  profileImage: string
  languages: string[]
  resumePdfUrl: string
  resumeDocxUrl: string
  profileImageUrl: string
}

export type ProofMetric = {
  value: string
  label: string
  note: string
}

export type HeroFocusItem = {
  icon: ReactNode
  eyebrow: string
  title: string
  description: string
}

export type AboutCard = {
  icon: ReactNode
  eyebrow: string
  title: string
  description: string
  points: string[]
}

export type AboutSection = {
  eyebrow: string
  title: string
  paragraphs: string[]
  cards: AboutCard[]
}

export type SkillCategory = {
  title: string
  icon: ReactNode
  summary: string
  skills: string[]
  highlight?: boolean
}

export type Experience = {
  company: string
  role: string
  shortRole: string
  period: string
  location: string
  description: string
  impact: string
  achievements: string[]
  tech: string[]
  highlight?: boolean
}

export type ProjectLink = {
  live?: string
  github?: string
}

export type ProjectMetric = {
  label: string
  value: string
}

export type Project = {
  title: string
  description: string
  label: string
  result: string
  tech: string[]
  links?: ProjectLink
  icon: ReactNode
  company?: string
  caseStudy: string[]
  metrics?: ProjectMetric[]
}

export const SITE_PROFILE: SiteProfile = {
  ...siteContent.profile,
  resumePdfUrl: withBase(siteContent.profile.resumePdf),
  resumeDocxUrl: withBase(siteContent.profile.resumeDocx),
  profileImageUrl: withBase(siteContent.profile.profileImage),
}

export const NAV_ITEMS: NavItem[] = siteContent.navigation

export const PROOF_METRICS: ProofMetric[] = siteContent.proofMetrics

export const HERO_FOCUS: HeroFocusItem[] = siteContent.heroFocus.map((item) => ({
  ...item,
  icon: renderIcon(item.icon, 'h-5 w-5'),
}))

export const ABOUT_SECTION: AboutSection = {
  ...siteContent.about,
  cards: siteContent.about.cards.map((card) => ({
    ...card,
    icon: renderIcon(card.icon, 'h-5 w-5'),
  })),
}

export const SKILL_CATEGORIES: SkillCategory[] = siteContent.skillCategories.map((category) => ({
  ...category,
  icon: renderIcon(category.icon, 'h-5 w-5'),
}))

export const EXPERIENCES: Experience[] = siteContent.experiences

export const PROJECTS: Project[] = siteContent.projects.map((project) => ({
  ...project,
  icon: renderIcon(project.icon, 'h-6 w-6'),
}))
