// Single source of truth for portfolio copy. Edit content here, not in components.

export const profile = {
  name: "Sagor Hossain",
  roles: ["Full-Stack Developer", "AI & SaaS Builder", "Future Tech Entrepreneur"],
  statement:
    "I build modern web applications, AI-powered products, and automation systems for ambitious businesses.",
  location: "Bangladesh · Working worldwide",
  email: "sagor.official.pb@gmail.com",
};

// TODO: confirm LinkedIn and X handles.
export const socials = {
  github: "https://github.com/sagorcnits",
  linkedin: "https://www.linkedin.com/in/",
  x: "https://x.com/",
  email: `mailto:${profile.email}`,
};

export const navItems = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
] as const;

export const about = {
  lead: "Hi, I'm Sagor — a full-stack developer and product builder focused on creating modern SaaS products, AI-powered platforms, and automation systems.",
  paragraphs: [
    "I design and ship end-to-end products: typed frontends in React and Next.js, service-oriented backends in Node.js and NestJS, and data layers built to grow with the business behind them.",
    "My approach is product-first. Before writing code I want to understand the problem, the people it affects, and what success looks like — then I build the smallest thing that proves it, and iterate toward something durable.",
    "Lately most of my work sits where software meets AI: language-model integrations, agents that take real actions, and automation pipelines that remove repetitive work from a team's day.",
    "I work closely with founders and growing businesses, often from the first whiteboard sketch to production, turning rough ideas into reliable, production-ready software.",
  ],
};

export type Project = {
  name: string;
  description: string;
  stack: string[];
  year: string;
  href?: string;
};

// TODO: verify project list, years and links.
export const projects: Project[] = [
  {
    name: "FindProfessional",
    description: "Professional discovery and directory platform.",
    stack: ["NestJS", "MongoDB", "React", "Cloudinary"],
    year: "2026",
  },
  {
    name: "FlowSync AI",
    description: "Project management SaaS with AI task automation and team collaboration.",
    stack: ["Next.js", "NestJS", "PostgreSQL", "OpenAI"],
    year: "2025",
  },
  {
    name: "AutoPilot CRM",
    description: "CRM with AI lead scoring, email automation and intelligent follow-ups.",
    stack: ["Next.js", "Express", "MySQL", "Prisma"],
    year: "2025",
  },
  {
    name: "OmniStore",
    description: "Headless e-commerce platform with real-time inventory and analytics.",
    stack: ["React", "Node.js", "MongoDB", "Stripe"],
    year: "2024",
  },
  {
    name: "PulseMetrics",
    description: "Real-time SaaS analytics with custom dashboards and cohort analysis.",
    stack: ["Next.js", "NestJS", "PostgreSQL", "D3.js"],
    year: "2024",
  },
];

// TODO: verify roles, organisations and dates.
export const experience = [
  {
    period: "2023 — Present",
    org: "Octarnal",
    role: "Co-Founder & COO",
    description:
      "Building AI-powered SaaS products, automation systems, and custom software solutions. Leading product strategy and engineering operations.",
  },
  {
    period: "2023 — 2024",
    org: "Independent",
    role: "Full-Stack Developer",
    description:
      "Built production-grade web applications for international clients, from API design to deployment.",
  },
  {
    period: "2022 — 2023",
    org: "Tech Agency",
    role: "Backend Engineer",
    description:
      "Designed REST APIs and managed PostgreSQL and MongoDB data layers for multi-tenant SaaS products.",
  },
  {
    period: "2021 — 2022",
    org: "Startup Studio",
    role: "Frontend Developer",
    description:
      "Crafted React interfaces, built component libraries, and optimised Core Web Vitals.",
  },
];

export const services = [
  {
    title: "Full-Stack Development",
    description: "Complete web applications, from interface to infrastructure, built on a typed modern stack.",
  },
  {
    title: "SaaS Product Development",
    description: "Multi-tenant products with auth, billing, roles and the admin tooling teams actually need.",
  },
  {
    title: "AI Integration",
    description: "Language models, agents and retrieval woven into existing products without a rewrite.",
  },
  {
    title: "Business Automation",
    description: "Pipelines that connect your tools and take repetitive, error-prone work off people's desks.",
  },
  {
    title: "API & Backend Architecture",
    description: "Clean, documented APIs and services designed for reliability and long-term change.",
  },
  {
    title: "Technical Product Development",
    description: "Hands-on technical partnership for founders — scoping, MVPs and the road to scale.",
  },
];

export const techStack = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "NestJS", "Express", "GraphQL"] },
  { category: "Database", items: ["PostgreSQL", "Prisma", "MongoDB", "MySQL"] },
  { category: "Infrastructure", items: ["Docker", "Linux", "CI/CD", "Cloud"] },
  { category: "AI", items: ["AI APIs", "AI Agents", "Automation", "Prompt Engineering"] },
];

export const philosophy = ["I don't just build software.", "I build products that solve real problems."];
