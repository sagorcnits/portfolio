import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  about,
  experience,
  philosophy,
  profile,
  projects,
  services,
  socials,
  techStack,
  type Project,
} from "@/content/site";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

const pad = (n: number) => String(n).padStart(2, "0");

function Section({
  id,
  index,
  label,
  children,
  className,
  eager,
}: {
  id: string;
  index?: string;
  label: string;
  children: ReactNode;
  className?: string;
  eager?: boolean;
}) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("py-20 md:py-24 lg:py-28", className)}
    >
      <Reveal eager={eager}>
        <h2 className="mb-12 flex items-center gap-4 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase md:mb-14">
          {index && (
            <span aria-hidden="true" className="tabular-nums text-foreground">
              {index}
            </span>
          )}
          <span aria-hidden="true" className="h-px w-8 bg-border" />
          <span id={headingId}>{label}</span>
        </h2>
      </Reveal>
      {children}
    </section>
  );
}

export function About() {
  return (
    <Section
      id="about"
      index="01"
      label="About"
      className="pt-12 md:pt-16 lg:pt-24"
      eager
    >
      <Reveal eager>
        <p className="text-2xl leading-snug font-medium tracking-tight text-foreground md:text-[1.75rem] lg:text-[2rem] lg:leading-[1.3]">
          {about.lead}
        </p>
      </Reveal>
      <div className="mt-12 grid gap-6 md:ml-[12%] lg:max-w-xl">
        {about.paragraphs.map((text, i) => (
          <Reveal key={i} delay={i * 60} eager>
            <p className="text-[1.0625rem] leading-relaxed">{text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const isLive = project.liveUrl.length > 0;
  const Tag = isLive ? "a" : "div";
  return (
    <Tag
      {...(isLive
        ? {
            href: project.liveUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": `${project.name} — visit live site (opens in new tab)`,
          }
        : {})}
      className="group relative grid grid-cols-[2.25rem_1fr_auto] gap-x-4 gap-y-2 border-t border-border py-7 transition-transform duration-500 ease-out hover:translate-x-1.5 md:grid-cols-[3rem_1fr_auto] md:gap-x-6 md:py-8"
    >
      <span
        aria-hidden="true"
        className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-foreground/50 transition-transform duration-700 ease-out group-hover:scale-x-100"
      />
      <span className="pt-1.5 text-xs tabular-nums text-muted-foreground">
        {pad(index + 1)}
      </span>
      <div className="min-w-0">
        <h3 className="text-xl font-medium wrap-break-word text-foreground/85 transition-colors duration-300 group-hover:text-foreground md:text-2xl">
          {project.name}
        </h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed">
          {project.description}
        </p>
        <p className="mt-4 text-xs tracking-wide text-muted-foreground/80">
          {project.stack.join("  ·  ")}
        </p>
      </div>
      <div className="flex flex-col items-end justify-between gap-4 pt-1.5">
        <span className="text-xs tabular-nums text-muted-foreground">
          {project.year}
        </span>
        {isLive && (
          <ArrowUpRight
            aria-hidden="true"
            strokeWidth={1.5}
            className="size-5 text-muted-foreground transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
          />
        )}
      </div>
    </Tag>
  );
}

export function Work() {
  return (
    <Section id="work" index="02" label="Selected Work">
      <ul className="border-b border-border">
        {projects.map((project, i) => (
          <Reveal as="li" key={project.name} delay={i * 50}>
            <ProjectRow project={project} index={i} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

export function Experience() {
  return (
    <Section id="experience" index="03" label="Experience">
      <ol className="space-y-12 md:space-y-14">
        {experience.map((item, i) => (
          <Reveal
            as="li"
            key={item.org + item.period}
            delay={i * 50}
            className="grid gap-3 lg:grid-cols-[10rem_1fr] lg:gap-8"
          >
            <span className="pt-1 text-xs tracking-[0.15em] text-muted-foreground uppercase tabular-nums">
              {item.period}
            </span>
            <div className="border-l border-border pl-6 md:pl-8">
              <h3 className="text-lg font-medium md:text-xl">{item.org}</h3>
              <p className="mt-1 text-sm text-foreground/75">{item.role}</p>
              <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed">
                {item.description}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export function Services() {
  return (
    <Section id="services" index="04" label="Services">
      <ul className="border-b border-border">
        {services.map((service, i) => (
          <Reveal as="li" key={service.title} delay={i * 40}>
            <div className="group grid gap-2 border-t border-border py-6 transition-transform duration-500 ease-out hover:translate-x-1.5 xl:grid-cols-[1fr_1fr] xl:items-baseline xl:gap-8">
              <h3 className="flex items-baseline gap-4 text-lg font-medium text-foreground/85 transition-colors duration-300 group-hover:text-foreground md:text-xl">
                <span className="text-xs tabular-nums text-muted-foreground">
                  {pad(i + 1)}
                </span>
                {service.title}
              </h3>
              <p className="pl-8 text-sm leading-relaxed text-muted-foreground/70 transition-colors duration-300 group-hover:text-muted-foreground xl:pl-0">
                {service.description}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

export function TechStack() {
  return (
    <Section id="stack" index="05" label="Tech Stack">
      <dl className="border-b border-border">
        {techStack.map((row, i) => (
          <Reveal
            key={row.category}
            delay={i * 40}
            className="grid gap-2 border-t border-border py-5 lg:grid-cols-[10rem_1fr] lg:gap-8"
          >
            <dt className="pt-0.5 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              {row.category}
            </dt>
            <dd className="flex flex-wrap gap-x-3 gap-y-1 text-[1.0625rem] text-foreground">
              {row.items.map((item, j) => (
                <span key={item} className="flex items-center gap-3">
                  {j > 0 && (
                    <span aria-hidden="true" className="text-muted-foreground/50">
                      ·
                    </span>
                  )}
                  {item}
                </span>
              ))}
            </dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}

export function Philosophy() {
  return (
    <section aria-label="Philosophy" className="py-24 md:py-32 lg:py-40">
      <Reveal>
        <blockquote className="text-[clamp(1.875rem,9vw,2.25rem)] leading-[1.1] font-medium tracking-tight md:text-5xl lg:text-6xl">
          <p className="text-muted-foreground">{philosophy[0]}</p>
          <p className="mt-2 text-foreground md:ml-[14%]">{philosophy[1]}</p>
        </blockquote>
      </Reveal>
      <Reveal delay={120}>
        <div className="mt-12 flex items-center gap-4 md:ml-[14%]">
          <span className="h-px w-12 bg-foreground/40" />
          <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
            {profile.name}
          </span>
        </div>
      </Reveal>
    </section>
  );
}

const contactLinks = [
  { label: "Email", value: profile.email, href: socials.email },
  { label: "LinkedIn", value: "Connect", href: socials.linkedin },
  { label: "GitHub", value: "Follow", href: socials.github },
  { label: "X", value: "Follow", href: socials.x },
  { label: "Facebook", value: "Connect", href: socials.facebook },
  { label: "Instagram", value: "Follow", href: socials.instagram },
];

export function Contact() {
  return (
    <Section id="contact" index="06" label="Contact" className="pb-28 md:pb-20">
      <Reveal>
        <p className="font-heading text-[clamp(2rem,10vw,2.5rem)] leading-[1.05] font-medium tracking-tight text-foreground md:text-6xl lg:text-7xl">
          <span className="block text-muted-foreground">
            Have a product idea?
          </span>
          <span className="block">Let&apos;s build it.</span>
        </p>
      </Reveal>

      <Reveal delay={100}>
        <a
          href={socials.email}
          className={cn(
            buttonVariants({ size: "lg" }),
            "group/cta mt-12 h-12 gap-3 rounded-full px-7 text-[0.95rem]",
          )}
        >
          Let&apos;s Work Together
          <ArrowRight
            aria-hidden="true"
            className="transition-transform duration-300 group-hover/cta:translate-x-1"
          />
        </a>
      </Reveal>

      <Reveal delay={160}>
        <ul className="mt-16 border-b border-border">
          {contactLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-6 border-t border-border py-5"
              >
                <span className="shrink-0 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  {link.label}
                </span>
                <span className="flex min-w-0 items-center gap-3 text-foreground/85 transition-colors duration-300 group-hover:text-foreground">
                  <span className="truncate">{link.value}</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <footer className="mt-24 flex flex-col gap-2 text-xs text-muted-foreground md:flex-row md:justify-between">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>Designed &amp; built with Next.js</span>
      </footer>
    </Section>
  );
}
