import { ImageResponse } from "next/og";

import { profile } from "@/content/site";

export const alt = `${profile.name} — Full-Stack Developer & AI Product Builder`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview in the site's monochrome palette (#121212 / #FAFAFA / #9D9D9D).
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#121212",
          color: "#FAFAFA",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#9D9D9D",
          }}
        >
          <div style={{ width: 48, height: 1, background: "#9D9D9D" }} />
          Portfolio
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -3 }}>
            {profile.name}
          </div>
          <div style={{ marginTop: 16, fontSize: 40, color: "#9D9D9D" }}>
            Full-Stack Developer & AI Product Builder
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#9D9D9D" }}>
          SaaS · AI applications · Automation · React · Next.js · Node.js
        </div>
      </div>
    ),
    size,
  );
}
