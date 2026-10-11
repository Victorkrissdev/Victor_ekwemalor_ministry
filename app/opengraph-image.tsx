import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

// The preview image shown when your link is shared on WhatsApp, Facebook, X, etc.
export const alt = `${siteConfig.name}: ${siteConfig.motto}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          color: "#171717",
          padding: "80px",
          textAlign: "center",
        }}
      >
        {/* Thin cross */}
        <div style={{ position: "relative", width: 48, height: 72, display: "flex" }}>
          <div style={{ position: "absolute", left: 23, top: 0, width: 2, height: 72, background: "#737373" }} />
          <div style={{ position: "absolute", left: 4, top: 20, width: 40, height: 2, background: "#737373" }} />
        </div>
        <div style={{ marginTop: 48, fontSize: 64, lineHeight: 1.2, maxWidth: 950 }}>
          {siteConfig.motto}
        </div>
        <div style={{ marginTop: 36, fontSize: 30, color: "#525252", fontStyle: "italic" }}>
          {`“${siteConfig.keyVerse.text}” · ${siteConfig.keyVerse.reference}`}
        </div>
        <div
          style={{
            marginTop: 56,
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#737373",
          }}
        >
          {`${siteConfig.name} · ${siteConfig.hashtag}`}
        </div>
      </div>
    ),
    size,
  );
}
