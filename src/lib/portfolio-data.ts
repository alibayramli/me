import { createElement, type ComponentType, type ReactNode } from 'react'
import { BellRing, Code2, Layers, Server, TrendingUp, Workflow } from 'lucide-react'
import siteContent from '@/content/site-content.json'

type IconKey = 'bell' | 'code' | 'layers' | 'server' | 'trending' | 'workflow'

const iconMap: Record<IconKey, ComponentType<{ className?: string }>> = {
  bell: BellRing,
  code: Code2,
  layers: Layers,
  server: Server,
  trending: TrendingUp,
  workflow: Workflow,
}

export const withBasePath = (assetPath: string) =>
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
  resumeTech?: string[]
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
  featured?: boolean
  homepageOrder?: number
}

export const SITE_PROFILE: SiteProfile = {
  ...siteContent.profile,
  resumePdfUrl: withBasePath(siteContent.profile.resumePdf),
  resumeDocxUrl: withBasePath(siteContent.profile.resumeDocx),
  profileImageUrl: withBasePath(siteContent.profile.profileImage),
}

export const NAV_ITEMS: NavItem[] = siteContent.navigation

export const PROOF_METRICS: ProofMetric[] = siteContent.proofMetrics

export const SKILL_CATEGORIES: SkillCategory[] = siteContent.skillCategories.map((category) => ({
  ...category,
  icon: renderIcon(category.icon, 'h-5 w-5'),
}))

export const EXPERIENCES: Experience[] = siteContent.experiences

export const PROJECTS: Project[] = siteContent.projects.map((project) => ({
  ...project,
  icon: renderIcon(project.icon, 'h-6 w-6'),
}))
