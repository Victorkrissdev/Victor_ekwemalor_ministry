import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import Logo from "./Logo";
import NavMenu from "./NavMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-100 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900"
        >
          <Logo size={36} variant="icon" priority />
          <span className="font-serif text-lg tracking-wide text-neutral-900">
            {siteConfig.name}
          </span>
        </Link>
        <NavMenu />
      </div>
    </header>
  );
}
