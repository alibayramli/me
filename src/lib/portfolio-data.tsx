import type { ReactNode } from "react";
import {
  BellRing,
  Code2,
  Cloud,
  Layers,
  Server,
  TrendingUp,
  Workflow,
  Zap,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
};

export type AboutHighlight = {
  icon: ReactNode;
  title: string;
  description: string;
  keywords: string[];
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

export const ABOUT_HIGHLIGHTS: AboutHighlight[] = [
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Developer platforms",
    description:
      "Internal portals, service catalogs, and workflows that reduce friction for engineering teams.",
    keywords: [
      "Backstage.io",
      "Service Catalogs",
      "Golden Paths",
      "Developer Experience",
    ],
  },
  {
    icon: <Code2 className="h-5 w-5" />,
    title: "Full-stack applications",
    description:
      "Frontend systems, APIs, and backend integrations built with React, Angular, Node.js, and Python.",
    keywords: ["React", "Angular", "Node.js", "Python", "TypeScript"],
  },
  {
    icon: <Cloud className="h-5 w-5" />,
    title: "Delivery and reliability",
    description:
      "CI/CD, cloud infrastructure, Terraform, and observability focused on repeatable delivery and operational clarity.",
    keywords: [
      "GitLab CI/CD",
      "AWS",
      "Terraform",
      "Observability",
      "Automation",
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Platform Engineering",
    icon: <Layers className="w-5 h-5" />,
    skills: [
      "Backstage.io",
      "Internal Developer Platforms",
      "Service Catalogs",
      "Golden Paths",
    ],
    highlight: true,
  },
  {
    title: "Frontend Systems",
    icon: <Code2 className="w-5 h-5" />,
    skills: [
      "React",
      "Angular",
      "TypeScript",
      "State Management",
      "Component Architecture",
      "Responsive UI",
    ],
  },
  {
    title: "Backend and APIs",
    icon: <Server className="w-5 h-5" />,
    skills: ["Node.js", "Python", "PostgreSQL/ORMs", "MongoDB"],
  },
  {
    title: "CI/CD and Automation",
    icon: <Workflow className="w-5 h-5" />,
    skills: [
      "GitLab CI",
      "CI/CD Pipelines",
      "GitHub Actions",
      "Husky",
      "Deployment Automation",
      "Scripting",
      "Build Tooling",
    ],
  },
  {
    title: "Cloud and Infrastructure",
    icon: <Cloud className="w-5 h-5" />,
    skills: [
      "AWS",
      "Terraform",
      "Docker",
      "Docker Compose",
      "Kubernetes",
      "Infrastructure as Code",
      "Environment Management",
      "Cloud Architecture",
    ],
  },
  {
    title: "Observability and Operations",
    icon: <Zap className="w-5 h-5" />,
    skills: [
      "Observability",
      "OpenTelemetry",
      "Prometheus",
      "Grafana",
      "Tempo",
      "Logging",
      "Metrics",
      "Tracing",
      "Monitoring",
      "Incident Debugging",
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
    title: "Platform DevOps Lab",
    description:
      "A full-stack learning lab built around a team task management app, with end-to-end observability, local platform tooling, and Kubernetes starter manifests.",
    role: "Platform / Full-Stack Engineer",
    tech: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Docker Compose",
      "Kubernetes",
      "OpenTelemetry",
      "Prometheus",
      "Grafana",
      "Tempo",
    ],
    links: {
      github: "https://github.com/alibayramli/platform-devops-lab",
    },
    icon: <Cloud className="w-6 h-6" />,
    caseStudy: [
      "Built a TypeScript full-stack app with modular Express services, PostgreSQL, Drizzle ORM, and a React frontend organized by feature domains.",
      "Added end-to-end observability with Prometheus metrics, OpenTelemetry tracing, Tempo, Grafana dashboards, and structured JSON logs.",
      "Created Docker Compose workflows, Makefile shortcuts, CI quality checks, and Kubernetes starter manifests for hands-on platform practice.",
    ],
    coverClass:
      "from-slate-200/78 via-slate-100/50 to-indigo-100/60 border-slate-300/60 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/70 dark:border-slate-800/80",
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
      "from-slate-200/80 via-slate-100/50 to-blue-100/65 border-slate-300/60 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/70 dark:border-slate-800/80",
  },
  {
    title: "FX Notifier",
    description:
      "A Python automation tool that fetches FX rates from Frankfurter API and posts weekday Telegram updates, including derived EUR/AZN rates.",
    role: "Personal Project",
    tech: [
      "Python",
      "Requests",
      "python-telegram-bot",
      "Pytest",
      "GitHub Actions",
    ],
    links: {
      github: "https://github.com/alibayramli/fx-notifier",
    },
    icon: <BellRing className="w-6 h-6" />,
    caseStudy: [
      "Built an FX service layer with config validation and retry/backoff for network resilience.",
      "Implemented deterministic AZN derivation via EUR->USD and a configurable USD->AZN peg.",
      "Automated weekday notifications using scheduled GitHub Actions with secret-based Telegram delivery.",
    ],
    coverClass:
      "from-slate-200/85 via-slate-100/55 to-cyan-100/60 border-slate-300/60 dark:from-slate-900 dark:via-slate-900 dark:to-cyan-950/70 dark:border-slate-800/80",
  },
  {
    title: "Trading.com Platform",
    description:
      "Front-end architecture and development for a leading forex broker's entry into European and Australian markets.",
    role: "Senior Front-End Engineer",
    tech: ["Angular", "NgRx", "i18n", "Material UI", "REST APIs"],
    icon: <TrendingUp className="w-6 h-6" />,
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
      "from-slate-200/80 via-slate-100/50 to-emerald-100/60 border-slate-300/60 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/65 dark:border-slate-800/80",
  },
];
