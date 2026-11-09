import { experiences, navigation, profile, projects } from '@/content/site-content.json'

export const withBasePath = (assetPath: string) =>
  `${import.meta.env.BASE_URL}${assetPath.replace(/^\/+/, '')}`

type NavItem = {
  label: string
  href: string
}

type SiteProfile = {
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

type Experience = {
  company: string
  role: string
  period: string
  location: string
  bullets: string[]
  tech: string[]
}

type ProjectLink = {
  live?: string
  github?: string
}

type Project = {
  title: string
  description: string
  tech: string[]
  links?: ProjectLink
  caseStudy: string[]
}

export const SITE_PROFILE: SiteProfile = {
  ...profile,
  resumePdfUrl: withBasePath(profile.resumePdf),
  profileImageUrl: withBasePath(profile.profileImage),
}

export const NAV_ITEMS: NavItem[] = navigation

// Keep consecutive roles at the same employer together, in career order.
export const EXPERIENCE_GROUPS = experiences.reduce<{ company: string; roles: Experience[] }[]>(
  (groups, experience) => {
    const previous = groups.at(-1)
    if (previous?.company === experience.company) {
      previous.roles.push(experience)
    } else {
      groups.push({ company: experience.company, roles: [experience] })
    }
    return groups
  },
  [],
)

export const PROJECTS: Project[] = projects
