// Google Analytics 4 helpers. Every function is a no-op on the server or when
// NEXT_PUBLIC_GA_MEASUREMENT_ID is unset, so callers never need to guard.

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export type AnalyticsEvent =
  | "project_view"
  | "case_study_view"
  | "contact_click"
  | "whatsapp_click"
  | "external_link_click";

export type EventParams = Record<string, string | number | boolean | undefined>;

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

const enabled = () => typeof window !== "undefined" && GA_MEASUREMENT_ID !== "";

// Installs the standard gtag queue and config once. gtag.js (loaded later by
// <GoogleAnalytics />) drains the queue, so calls made before it loads are kept.
function getGtag(): Gtag | undefined {
  if (!enabled()) return undefined;
  if (!window.gtag) {
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtag() {
      // gtag.js expects the `arguments` object itself, not an array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      // Page views are sent manually on App Router navigation.
      send_page_view: false,
      ...(process.env.NODE_ENV === "development" && { debug_mode: true }),
    });
  }
  return window.gtag;
}

export function trackPageView(url: string) {
  getGtag()?.("event", "page_view", {
    page_location: window.location.origin + url,
    page_path: url,
    page_title: document.title,
  });
}

export function trackEvent(name: AnalyticsEvent, params: EventParams = {}) {
  getGtag()?.("event", name, params);
}
