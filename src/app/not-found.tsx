import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { navItems, profile } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  // Next.js adds `noindex` to 404 responses itself.
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-7xl flex-col justify-center px-6 py-24 md:px-10 lg:px-16">
      <p className="text-xs font-medium tracking-[0.2em] uppercase">
        Error 404
      </p>
      <h1 className="mt-6 text-[2.5rem] leading-[1.05] font-medium md:text-6xl">
        <span className="block text-muted-foreground">
          This page doesn&apos;t exist.
        </span>
        <span className="block">Let&apos;s get you back.</span>
      </h1>
      <Link
        href="/"
        className={cn(
          buttonVariants({ size: "lg" }),
          "group/cta mt-12 h-12 w-fit gap-3 rounded-full px-7 text-[0.95rem]",
        )}
      >
        Back to {profile.name}&apos;s portfolio
        <ArrowRight
          aria-hidden="true"
          className="transition-transform duration-300 group-hover/cta:translate-x-1"
        />
      </Link>
      <nav aria-label="Portfolio sections" className="mt-16">
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={`/#${item.id}`}
                className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase transition-colors duration-300 hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
