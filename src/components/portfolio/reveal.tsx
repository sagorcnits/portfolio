"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

// Fades children in with a slight upward translate the first time they enter the viewport.
// `as` keeps list markup valid (e.g. render the <li> itself inside a <ul>).
// `eager` is for above-the-fold content: a CSS-only fade on load, so it never waits for hydration (LCP).
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  eager = false,
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: "div" | "li"
  eager?: boolean
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || eager) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [eager])

  return (
    <Tag
      ref={ref}
      data-visible={visible || undefined}
      data-eager={eager || undefined}
      style={eager ? { animationDelay: `${delay}ms` } : { transitionDelay: `${delay}ms` }}
      className={cn("reveal", className)}
    >
      {children}
    </Tag>
  )
}
