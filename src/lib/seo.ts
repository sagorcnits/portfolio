import {
  experience,
  profile,
  projects,
  socials,
  techStack,
} from "@/content/site";

// Production origin for canonical URLs, sitemap, robots, Open Graph and JSON-LD.
// Fixed on purpose: previews and local dev must never leak into SEO metadata.
export const siteUrl = new URL("https://sagorhossain.site");

export const seo = {
  title: "Sagor Hossain — Full-Stack Developer & SaaS Builder",
  shortTitle: "Sagor Hossain",
  tagline: "Full-Stack Developer & SaaS Builder",
  description:
    "Full-stack developer and Co-Founder of Octarnal. I build scalable SaaS products, AI-powered applications, automation systems and web platforms with React, Next.js and Node.js.",
  keywords: [
    "Sagor Hossain",
    "Full-Stack Developer",
    "SaaS Developer",
    "AI-powered applications",
    "Automation systems",
    "TypeScript Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Octarnal",
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
        url: "https://www.octarnal.com/",
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
      author: { "@id": personId },
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
      hasPart: { "@id": absolute("/#work") },
    },
    {
      "@type": "ItemList",
      "@id": absolute("/#work"),
      name: "Selected Work",
      itemListElement: projects.map((project, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          name: project.name,
          description: project.description,
          ...(project.liveUrl && { url: project.liveUrl }),
          dateCreated: project.year,
          keywords: project.stack.join(", "),
          creator: { "@id": personId },
        },
      })),
    },
  ],
};
