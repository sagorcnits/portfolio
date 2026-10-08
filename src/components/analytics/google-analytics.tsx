"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { Suspense, useEffect, useRef } from "react";

import {
  GA_MEASUREMENT_ID,
  trackEvent,
  trackPageView,
  type AnalyticsEvent,
  type EventParams,
} from "@/lib/analytics";

// Sends one page_view per App Router URL (path + query). Hash-only changes
// (in-page section links) are intentionally not page views.
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastUrl = useRef<string | null>(null);

  useEffect(() => {
    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    // Guards against Strict Mode's double effect and re-renders with the same URL.
    if (lastUrl.current === url) return;
    lastUrl.current = url;
    trackPageView(url);
  }, [pathname, searchParams]);

  return null;
}

// Where on the page a link lives: explicit data-analytics-location, else the
// enclosing section id, else the sidebar header.
function locationOf(el: Element) {
  const tagged = el.closest<HTMLElement>("[data-analytics-location]");
  if (tagged) return tagged.dataset.analyticsLocation;
  const section = el.closest("section[id]");
  if (section) return section.id;
  if (el.closest("header")) return "sidebar";
  return "page";
}

// Classifies a link click: data-analytics-event wins, otherwise inferred from href.
function eventFor(a: HTMLAnchorElement): AnalyticsEvent | null {
  const explicit = a.dataset.analyticsEvent;
  if (explicit) return explicit as AnalyticsEvent;
  if (a.hostname === "wa.me" || a.hostname.endsWith("whatsapp.com")) {
    return "whatsapp_click";
  }
  if (a.protocol === "mailto:" || a.protocol === "tel:") return "contact_click";
  if (/^https?:$/.test(a.protocol) && a.host !== window.location.host) {
    return "external_link_click";
  }
  return null;
}

// Extra params from data-analytics-* attributes, e.g.
// data-analytics-project-name="X" → { project_name: "X" }.
function paramsFrom(a: HTMLAnchorElement): EventParams {
  const params: EventParams = {};
  for (const [key, value] of Object.entries(a.dataset)) {
    if (!key.startsWith("analytics") || key === "analyticsEvent") continue;
    if (key === "analyticsLocation") continue;
    const name = key
      .slice("analytics".length)
      .replace(/[A-Z]/g, (c, i: number) => (i ? "_" : "") + c.toLowerCase());
    params[name] = value;
  }
  return params;
}

// One delegated listener tracks every link on the page, so components stay
// server components and only need data attributes for extra context.
function useLinkClickTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!(a instanceof HTMLAnchorElement)) return;
      const name = eventFor(a);
      if (!name) return;
      const text = (a.getAttribute("aria-label") ?? a.textContent ?? "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 100);
      trackEvent(name, {
        link_url: a.href,
        link_text: text,
        location: locationOf(a),
        ...paramsFrom(a),
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);
}

function LinkClickTracker() {
  useLinkClickTracking();
  return null;
}

export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`}
        strategy="afterInteractive"
      />
      {/* useSearchParams needs a Suspense boundary to keep the page static. */}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      <LinkClickTracker />
    </>
  );
}
