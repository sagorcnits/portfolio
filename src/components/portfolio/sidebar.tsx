"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { navItems, profile } from "@/content/site"
import { SocialLinks } from "./social-links"
import { useActiveSection } from "./use-active-section"

const sectionIds = navItems.map((item) => item.id)

function Intro() {
  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-tight md:text-[2.5rem] lg:text-5xl">
        <a href="#top">{profile.name}</a>
      </h1>
      <ul className="mt-5 space-y-1 text-[0.95rem] text-foreground/80">
        {profile.roles.map((role) => (
          <li key={role}>{role}</li>
        ))}
      </ul>
      <p className="mt-8 max-w-xs text-[0.95rem] leading-relaxed">{profile.statement}</p>
    </div>
  )
}

// Below md: compact sticky bar whose menu opens a full-height section list.
function MobileNav({ active }: { active: string }) {
  const [open, setOpen] = useState(false)
  const activeLabel = navItems.find((item) => item.id === active)?.label

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    const close = () => window.innerWidth >= 768 && setOpen(false)
    document.documentElement.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    window.addEventListener("resize", close)
    return () => {
      document.documentElement.style.overflow = ""
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("resize", close)
    }
  }, [open])

  return (
    <div className="sticky top-0 z-40 -mx-6 md:hidden">
      <div className="relative z-10 flex h-14 items-center justify-between gap-4 border-b border-border bg-background/90 px-6 backdrop-blur-md">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="min-w-0 truncate text-sm font-semibold tracking-tight"
        >
          {profile.name}
        </a>
        <div className="flex shrink-0 items-center gap-3">
          {activeLabel && !open && (
            <span className="text-[0.65rem] font-medium tracking-[0.2em] text-muted-foreground uppercase">
              {activeLabel}
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2"
          >
            {open ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
          </Button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "absolute inset-x-0 top-full flex h-[calc(100dvh-3.5rem)] flex-col justify-between bg-background px-6 pt-10 pb-10 transition-all duration-500 ease-out",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        )}
      >
        <nav aria-label="Sections">
          <ul className="border-b border-border">
            {navItems.map((item, i) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    className="flex items-baseline gap-5 border-t border-border py-5"
                  >
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "text-2xl font-medium tracking-tight transition-colors duration-300",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="space-y-5">
          <SocialLinks />
          <p className="text-xs tracking-wide">{profile.location}</p>
        </div>
      </div>
    </div>
  )
}

// Desktop/tablet: sticky left column. Mobile: intro in flow plus a compact sticky top bar.
// One <header> for both so the page has a single <h1>.
export function Sidebar() {
  const active = useActiveSection(sectionIds)

  return (
    <>
      <MobileNav active={active} />

      <header className="pt-14 pb-4 md:sticky md:top-0 md:flex md:h-dvh md:w-[36%] md:shrink-0 md:flex-col md:justify-between md:py-16 lg:w-[40%] lg:py-24">
        <div>
          <Intro />
          <nav aria-label="Sections" className="mt-16 hidden md:block lg:mt-20">
            <ul className="space-y-4">
              {navItems.map((item) => {
                const isActive = active === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className="group flex items-center gap-4 py-1"
                    >
                      <span
                        className={cn(
                          "h-px transition-all duration-500 ease-out",
                          isActive
                            ? "w-14 bg-foreground"
                            : "w-7 bg-muted-foreground/50 group-hover:w-14 group-hover:bg-foreground"
                        )}
                      />
                      <span
                        className={cn(
                          "text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300",
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground group-hover:text-foreground"
                        )}
                      >
                        {item.label}
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
        <div className="mt-8 space-y-5 md:mt-0">
          <SocialLinks />
          <p className="hidden text-xs tracking-wide md:block">{profile.location}</p>
        </div>
      </header>
    </>
  )
}
