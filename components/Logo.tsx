import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

type LogoProps = {
  /** Height in pixels (the width follows the image's shape) */
  size: number;
  /** "full" = full logo, "icon" = cross-only icon (used in the navigation bar) */
  variant?: "full" | "icon";
  /** Use "light" on dark backgrounds to show the white logo */
  tone?: "dark" | "light";
  priority?: boolean;
};

function publicFileExists(file: string) {
  return fs.existsSync(path.join(process.cwd(), "public", file));
}

/** Reads a PNG's real width and height so the logo keeps its shape. */
function pngSize(file: string): { width: number; height: number } {
  const header = Buffer.alloc(24);
  const fd = fs.openSync(path.join(process.cwd(), "public", file), "r");
  try {
    fs.readSync(fd, header, 0, 24, 0);
  } finally {
    fs.closeSync(fd);
  }
  return { width: header.readUInt32BE(16), height: header.readUInt32BE(20) };
}

/**
 * Shows your logo from the /public folder:
 *   logo.png        full logo, black (for white backgrounds)
 *   logo-white.png  full logo, white (for dark backgrounds)
 *   logo-icon.png   cross only (used in the navigation bar)
 * If a file is missing, the next best one is used, and if none exist a simple
 * placeholder (circle, cross and "VE") is shown.
 */
export default function Logo({
  size,
  variant = "full",
  tone = "dark",
  priority = false,
}: LogoProps) {
  const fullLogo = tone === "light" ? "logo-white.png" : "logo.png";
  const candidates =
    variant === "icon" && tone === "dark"
      ? ["logo-icon.png", fullLogo]
      : [fullLogo];
  const file = candidates.find(publicFileExists);

  if (file) {
    const { width, height } = pngSize(file);
    return (
      <Image
        src={`/${file}`}
        alt={`${siteConfig.name} logo`}
        width={width}
        height={height}
        priority={priority}
        sizes={`${Math.ceil((size * width) / height) * 2}px`}
        className="w-auto shrink-0 object-contain"
        style={{ height: size, maxWidth: "100%" }}
      />
    );
  }

  return <LogoPlaceholder size={size} />;
}

function LogoPlaceholder({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={`${siteConfig.name} logo`}
      className="shrink-0 text-current"
    >
      <circle
        cx="50"
        cy="50"
        r="47"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line x1="50" y1="16" x2="50" y2="46" />
        <line x1="41" y1="25" x2="59" y2="25" />
      </g>
      <text
        x="50"
        y="74"
        textAnchor="middle"
        fill="currentColor"
        fontSize="24"
        letterSpacing="3"
        style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
      >
        VE
      </text>
    </svg>
  );
}
