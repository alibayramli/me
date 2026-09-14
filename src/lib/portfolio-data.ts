import { createElement, type ComponentType, type ReactNode } from 'react'
import { Code2, Layers, Server, Workflow } from 'lucide-react'
import siteContent from '@/content/site-content.json'

type IconKey = 'code' | 'layers' | 'server' | 'workflow'

const iconMap: Record<IconKey, ComponentType<{ className?: string }>> = {
  code: Code2,
  layers: Layers,
  server: Server,
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
  availability: string
  contactHeadline: string
  location: string
  email: string
  linkedin: string
  github: string
  siteUrl: string
  resumePdf: string
  profileImage: string
  resumePdfUrl: string
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
  skills: string[]
}

export type Experience = {
  company: string
  role: string
  period: string
  location: string
  bullets: string[]
  tech: string[]
  proofMetric: ProofMetric
}

export type ProjectLink = {
  live?: string
  github?: string
}

export type Project = {
  title: string
  description: string
  tech: string[]
  links?: ProjectLink
  caseStudy: string[]
}

export const SITE_PROFILE: SiteProfile = {
  ...siteContent.profile,
  resumePdfUrl: withBasePath(siteContent.profile.resumePdf),
  profileImageUrl: withBasePath(siteContent.profile.profileImage),
}

export const NAV_ITEMS: NavItem[] = siteContent.navigation

export const PROOF_METRICS: ProofMetric[] = siteContent.experiences.map(
  (experience) => experience.proofMetric,
)

export const SKILL_CATEGORIES: SkillCategory[] = siteContent.skillCategories.map((category) => ({
  ...category,
  icon: renderIcon(category.icon, 'h-5 w-5'),
}))

export const EXPERIENCES: Experience[] = siteContent.experiences

export const PROJECTS: Project[] = siteContent.projects
