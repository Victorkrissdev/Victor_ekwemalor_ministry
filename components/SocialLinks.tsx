import type { ReactNode } from "react";
import { siteConfig, type SocialPlatform } from "@/lib/site-config";

const labels: Record<SocialPlatform, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  facebook: "Facebook",
  x: "X (Twitter)",
  youtube: "YouTube",
};

const icons: Record<SocialPlatform, ReactNode> = {
  instagram: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </>
  ),
  tiktok: (
    <path d="M21 7.917v4.034a9.948 9.948 0 0 1-5-1.951v4.5a6.5 6.5 0 1 1-8-6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" />
  ),
  facebook: (
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  ),
  x: (
    <>
      <path d="M4 4l11.733 16H20L8.267 4z" />
      <path d="M4 20l6.768-6.768M13.228 10.772L20 4" />
    </>
  ),
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9l5 3-5 3z" />
    </>
  ),
};

type SocialLinksProps = {
  /** "icons" = small round icons, "list" = icons with names */
  variant?: "icons" | "list";
};

export default function SocialLinks({ variant = "icons" }: SocialLinksProps) {
  const entries = Object.entries(siteConfig.social) as [SocialPlatform, string][];

  if (variant === "list") {
    return (
      <ul className="grid gap-3 sm:grid-cols-2">
        {entries.map(([platform, url]) => (
          <li key={platform}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center gap-4 border border-neutral-200 px-5 py-3 text-neutral-800 transition-colors duration-300 hover:border-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            >
              <Icon platform={platform} />
              <span>{labels[platform]}</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex flex-wrap items-center justify-center gap-2">
      {entries.map(([platform, url]) => (
        <li key={platform}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${labels[platform]} (opens in a new tab)`}
            className="flex h-11 w-11 items-center justify-center rounded-full text-neutral-600 transition-colors duration-300 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
          >
            <Icon platform={platform} />
          </a>
        </li>
      ))}
    </ul>
  );
}

function Icon({ platform }: { platform: SocialPlatform }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
      focusable="false"
    >
      {icons[platform]}
    </svg>
  );
}
