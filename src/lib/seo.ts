import { experience, profile, socials, techStack } from "@/content/site";

// Production origin for canonical URLs, sitemap, robots, Open Graph and JSON-LD.
// Set NEXT_PUBLIC_SITE_URL (e.g. https://sagorhossain.dev) in the deployment environment.
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://example.com"),
);

export const seo = {
  title: "Sagor Hossain — Full-Stack Developer & AI Product Builder",
  shortTitle: "Sagor Hossain",
  description:
    "Full-stack TypeScript developer and Co-Founder of Octarnal. I build SaaS products, AI-powered applications, automation and APIs with React, Next.js and Node.js.",
  keywords: [
    "Sagor Hossain",
    "Full Stack Developer",
    "MERN Stack Developer",
    "TypeScript Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "SaaS Development",
    "AI-powered applications",
    "API development",
  ],
};

const absolute = (path: string) => new URL(path, siteUrl).toString();

const personId = absolute("/#person");
const websiteId = absolute("/#website");
const current = experience[0];

// One @graph so Person, WebSite and ProfilePage reference each other instead of duplicating.
export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      url: absolute("/"),
      jobTitle: "Full-Stack Developer",
      description: profile.statement,
      email: profile.email,
      worksFor: {
        "@type": "Organization",
        name: current.org,
      },
      hasOccupation: {
        "@type": "Occupation",
        name: current.role,
      },
      knowsAbout: techStack.flatMap((row) => row.items),
      sameAs: [
        socials.github,
        socials.linkedin,
        socials.x,
        socials.facebook,
        socials.instagram,
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: absolute("/"),
      name: profile.name,
      description: seo.description,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": absolute("/#webpage"),
      url: absolute("/"),
      name: seo.title,
      description: seo.description,
      inLanguage: "en",
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
      mainEntity: { "@id": personId },
    },
  ],
};
