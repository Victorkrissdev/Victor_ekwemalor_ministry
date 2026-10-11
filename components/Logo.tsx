import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

type LogoProps = {
  /** Width and height in pixels */
  size: number;
  priority?: boolean;
};

/**
 * Shows your logo from /public/logo.png.
 * If that file does not exist yet, a simple placeholder (circle, cross and "VE") is shown.
 */
export default function Logo({ size, priority = false }: LogoProps) {
  const hasLogo = fs.existsSync(path.join(process.cwd(), "public", "logo.png"));

  if (hasLogo) {
    return (
      <span
        className="relative block shrink-0"
        style={{ width: size, height: size }}
      >
        <Image
          src="/logo.png"
          alt={`${siteConfig.name} logo`}
          fill
          sizes={`${size}px`}
          priority={priority}
          className="object-contain"
        />
      </span>
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
      className="shrink-0 text-neutral-900"
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
