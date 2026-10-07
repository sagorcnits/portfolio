// Single source of truth for portfolio copy. Edit content here, not in components.

export const profile = {
  name: "Sagor Hossain",
  roles: ["Co-Founder @ Octarnal."],
  statement:
    "I help businesses turn ideas into scalable SaaS products, AI-powered automation, and custom web platforms—built to solve real problems and drive growth.",
  location: "Bangladesh · Working worldwide",
  email: "sagor.official.pb@gmail.com",
};

export const socials = {
  github: "https://github.com/sagorcnits",
  linkedin: "https://www.linkedin.com/in/sagor-hossain-web-dev",
  x: "https://x.com/sagor4917",
  whatsapp: "https://wa.me/8801852024152",
  facebook: "https://www.facebook.com/sagor.hossain.407337/",
  instagram: "https://www.instagram.com/sagor_hossain_web/",
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
    "I help startups turn ideas into working SaaS products — without the six-month build cycle.",
    "As Co-Founder & COO at Octarnal, I lead the design and delivery of AI-powered platforms, automation systems, and custom web applications for founders and businesses who need software that actually ships.",
    "Most of my clients come to me with one of three problems: a product idea and no technical team, an existing app that can't scale, or a business drowning in manual work that should be automated. I handle all three end-to-end — architecture, build, deployment, and the parts nobody warns you about.",
    "I work closely with founders and growing businesses, often from the first whiteboard sketch to production, turning rough ideas into reliable, production-ready software — typically in TypeScript, with React and Next.js on the front end and Node.js and NestJS behind clean, well-documented APIs.",
  ],
};

export interface Project {
  name: string;
  description: string;
  stack: string[];
  year: string;
  /** Live website. Leave "" until the project is deployed — the row then renders without a link. */
  liveUrl: string;
}

// TODO: verify project list and years; add liveUrl for the remaining projects.
export const projects: Project[] = [
  {
    name: "Elorva",
    description: "Bangladesh's Premier Luxury Perfume Destination",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Tanstack"],
    year: "2025",
    liveUrl: "https://www.elorvabd.com/",
  },
  {
    name: "Veterati",
    description:
      "A multi-tenant mentorship SaaS platform connecting U.S. service members, veterans, and spouses with trusted mentors—while giving organizations the tools to manage communities, mentorship programs, scheduling, and sessions from a unified dashboard.",
    stack: ["Next.js", "React.js", "PHP", "PostgreSQL", "OpenAI"],
    year: "2025",
    liveUrl: "https://veterati.net/",
  },
  {
    name: "Career Leo",
    description:
      "An AI-powered career SaaS that helps professionals build stronger resumes, prepare for interviews, and discover job opportunities tailored to their skills and career goals.",
    stack: ["React", "Next.js", "Nest.js", "PostgreSQL", "OpenAI"],
    year: "2026",
    liveUrl: "https://careerleo.com/",
  },
  {
    name: "FindProfessional",
    description: "Professional discovery and directory platform.",
    stack: ["NestJS", "MongoDB", "React", "Cloudinary"],
    year: "2026",
    liveUrl: "https://findprofessional.site",
  },
];

// TODO: verify roles, organisations and dates.
export const experience = [
  {
    period: "2024 — Present",
    org: "Octarnal",
    role: "Co-Founder & COO",
    description:
      "Building AI-powered SaaS products, automation systems, and custom software solutions. Leading product strategy and engineering operations.",
  },
  {
    period: "2024 — 2024",
    org: "Web Makers Inc.",
    role: "Senior Frontend Engineer",
    description:
      "Built and delivered production-grade web applications for international clients, focusing on scalability, performance, and exceptional user experiences.",
  },
  {
    period: "2023 — 2024",
    org: "Softeins Lab",
    role: "Senior Frontend Engineer",
    description:
      "Led the development of scalable SaaS interfaces using React, Next.js, and TypeScript, building reusable component systems, integrating APIs, and delivering performant, responsive user experiences.",
  },
];

export const services = [
  {
    title: "Full-Stack Development",
    description:
      "Complete web applications, from interface to infrastructure, built on a typed modern stack.",
  },
  {
    title: "SaaS Product Development",
    description:
      "Multi-tenant products with auth, billing, roles and the admin tooling teams actually need.",
  },
  {
    title: "AI Integration",
    description:
      "Language models, agents and retrieval woven into existing products without a rewrite.",
  },
  {
    title: "Business Automation",
    description:
      "Pipelines that connect your tools and take repetitive, error-prone work off people's desks.",
  },
  {
    title: "API & Backend Architecture",
    description:
      "Clean, documented APIs and services designed for reliability and long-term change.",
  },
  {
    title: "Technical Product Development",
    description:
      "Hands-on technical partnership for founders — scoping, MVPs and the road to scale.",
  },
];

export const techStack = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  { category: "Backend", items: ["Node.js", "NestJS", "Express", "GraphQL"] },
  { category: "Database", items: ["PostgreSQL", "Prisma", "MongoDB", "MySQL"] },
  { category: "Infrastructure", items: ["Docker", "Linux", "CI/CD", "Cloud"] },
  {
    category: "AI",
    items: ["AI APIs", "AI Agents", "Automation", "Prompt Engineering"],
  },
];

export const philosophy = [
  "I don't just build software.",
  "I build products that solve real problems.",
];
