import type { ReactNode } from "react";
import {
  Code2,
  Cloud,
  Layers,
  Cpu,
  Globe,
  Server,
  Workflow,
  Zap,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type SkillCategory = {
  title: string;
  icon: ReactNode;
  skills: string[];
  highlight?: boolean;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  tech: string[];
  highlight?: boolean;
};

export type ProjectLink = {
  live?: string;
  github?: string;
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  title: string;
  description: string;
  role: string;
  tech: string[];
  links?: ProjectLink;
  icon: ReactNode;
  company?: string;
  caseStudy: string[];
  metrics?: ProjectMetric[];
  image?: string;
  coverClass: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const STATS: Stat[] = [
  { value: "8+", label: "Years Experience" },
  { value: "15K+", label: "Users Served at Scale" },
  { value: "40%", label: "Manual Effort Reduced" },
  { value: "10+", label: "Enterprise Clients" },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "IDP & Platform Engineering",
    icon: <Layers className="w-5 h-5" />,
    skills: [
      "Backstage.io",
      "Azure AI Services",
      "Docker",
      "CI/CD Pipelines",
      "GitLab CI",
    ],
    highlight: true,
  },
  {
    title: "Frontend Development",
    icon: <Code2 className="w-5 h-5" />,
    skills: [
      "React",
      "Angular",
      "TypeScript",
      "NgRx",
      "Material UI",
      "Tailwind CSS",
      "i18n",
    ],
  },
  {
    title: "Backend & Database",
    icon: <Server className="w-5 h-5" />,
    skills: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "Knex.js",
      "REST APIs",
      "MongoDB",
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: <Cloud className="w-5 h-5" />,
    skills: ["AWS", "Docker", "Jenkins", "GitHub", "GitLab"],
  },
  {
    title: "Testing & Quality",
    icon: <Zap className="w-5 h-5" />,
    skills: ["Jest", "Jasmine", "Cypress", "Karma", "AG Grid"],
  },
  {
    title: "Methodologies",
    icon: <Workflow className="w-5 h-5" />,
    skills: [
      "Scrum",
      "Kanban",
      "Agile",
      "Architecture Design",
      "Team Leadership",
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    company: "XM.com",
    role: "Full-Stack Developer",
    period: "2023 - Present",
    location: "Remote",
    description:
      "Leading IDP initiatives and full-stack development for a global forex broker.",
    achievements: [
      "Integrated Backstage.io into internal tools, built custom plugin with Azure AI Services for catalog entity validations",
      "Reduced manual review time through intelligent automation",
      "Launched trading.com as Senior Angular Developer, facilitating entry into Europe & Australia markets",
      "Built front-end systems serving thousands of traders globally",
    ],
    tech: [
      "Backstage.io",
      "React",
      "Node.js",
      "Azure AI",
      "PostgreSQL",
      "Angular",
      "i18n",
    ],
    highlight: true,
  },
  {
    company: "Morgan Stanley",
    role: "Front-End Developer",
    period: "2021 - 2022",
    location: "Budapest, Hungary",
    description:
      "Modernized legacy financial applications for enterprise-scale user base.",
    achievements: [
      "Transformed legacy desktop apps into modern web solutions",
      "Refined interfaces for 15,000+ users, boosting productivity for brokers and teams",
      "Implemented responsive data grids and real-time trading interfaces",
    ],
    tech: ["Angular", "RxJS", "SCSS", "AG Grid", "Karma/Jasmine", "Jenkins"],
  },
  {
    company: "EDM Designer",
    role: "Full-Stack Developer (Freelance)",
    period: "2019 - 2021",
    location: "Remote",
    description:
      "Built email marketing dashboard with significant performance improvements.",
    achievements: [
      "Streamlined email dashboard for template styling, enhancing UX and flexibility",
      "Reduced generation time by 40%, speeding up campaign delivery",
      "Implemented cloud storage integration for asset management",
    ],
    tech: ["Vue.js", "Vuex", "Vuetify", "Node.js", "MongoDB", "AWS S3"],
  },
  {
    company: "ExxonMobil",
    role: "Full-Stack Developer",
    period: "2018 - 2019",
    location: "Budapest, Hungary",
    description:
      "Developed internal UI kits and website builder for enterprise use.",
    achievements: [
      "Developed UI kits via AngularJS and jQuery to standardize internal website builder",
      "Achieved 15% reduction in project costs and 25% decrease in delivery times",
      "Integrated SharePoint APIs for seamless content management",
    ],
    tech: [
      "AngularJS",
      "jQuery",
      "Bootstrap",
      "SharePoint APIs",
      "Agile/Scrum",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Fitness Tracker CRM",
    description:
      "A comprehensive CRM web application for tracking fitness goals with admin support, multi-language support, and real-time data synchronization.",
    role: "Product Engineer",
    tech: [
      "Angular",
      "Angular Material",
      "Tailwind CSS",
      "Firebase",
      "Transloco",
    ],
    links: {
      live: "https://ali-fitness-tracker.vercel.app/",
      github: "https://github.com/alibayramli/fitness-tracker",
    },
    icon: <Globe className="w-6 h-6" />,
    caseStudy: [
      "Designed role-based dashboards for coaches and admins.",
      "Implemented real-time updates for goal tracking and progress reporting.",
      "Built a localization layer to support multi-language onboarding flows.",
    ],
    metrics: [
      { label: "Time-to-insight", value: "-35%" },
      { label: "Coach adoption", value: "+22%" },
    ],
    coverClass:
      "from-sky-500/20 via-cyan-500/10 to-blue-600/20 border-sky-500/30",
  },
  {
    title: "Backstage.io IDP Integration",
    description:
      "Custom Backstage.io plugin development with Azure AI Services integration for automated catalog entity validation and developer portal optimization.",
    role: "Platform Engineer",
    tech: ["Backstage.io", "React", "Node.js", "Azure AI", "TypeScript"],
    icon: <Layers className="w-6 h-6" />,
    company: "XM.com",
    caseStudy: [
      "Delivered custom Backstage plugins for service catalog governance.",
      "Automated validations to reduce manual review load.",
      "Improved developer portal discoverability for internal services.",
    ],
    metrics: [
      { label: "Manual review", value: "-40%" },
      { label: "Catalog coverage", value: "+60%" },
    ],
    coverClass:
      "from-indigo-500/20 via-purple-500/10 to-fuchsia-500/20 border-purple-500/30",
  },
  {
    title: "Trading.com Platform",
    description:
      "Front-end architecture and development for a leading forex broker's entry into European and Australian markets.",
    role: "Senior Front-End Engineer",
    tech: ["Angular", "NgRx", "i18n", "Material UI", "REST APIs"],
    icon: <Cpu className="w-6 h-6" />,
    company: "XM.com",
    caseStudy: [
      "Led UI architecture for a multi-region rollout.",
      "Implemented state management patterns for high-frequency updates.",
      "Delivered i18n-ready UX for rapid market expansion.",
    ],
    metrics: [
      { label: "Release cycles", value: "-25%" },
      { label: "Latency", value: "-18%" },
    ],
    coverClass:
      "from-emerald-500/20 via-teal-500/10 to-green-500/20 border-emerald-500/30",
  },
];
