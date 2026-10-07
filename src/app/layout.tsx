import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";

import { profile } from "@/content/site";
import { seo, siteUrl } from "@/lib/seo";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: seo.title,
    template: `%s — ${profile.name}`,
  },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title: seo.title,
    description: seo.description,
    locale: "en_US",
    firstName: "Sagor",
    lastName: "Hossain",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    creator: "@sagor4917",
  },
};

export const viewport: Viewport = {
  themeColor: "#121212",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} dark h-full antialiased`}
    >
      <head>
        {/* Without JS the IntersectionObserver never fires; show <Reveal> content immediately. */}
        <noscript>
          <style>{".reveal{opacity:1;transform:none}"}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col overflow-x-clip">{children}</body>
    </html>
  );
}
