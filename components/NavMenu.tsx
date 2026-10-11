"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const linkBase =
  "text-sm tracking-[0.15em] uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900";

export default function NavMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu with the Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav aria-label="Main">
      {/* Desktop and tablet links */}
      <ul className="hidden items-center gap-10 sm:flex">
        {links.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`${linkBase} ${
                  active
                    ? "text-neutral-900 underline decoration-1 underline-offset-8"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Mobile hamburger button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="-mr-2 flex h-11 w-11 items-center justify-center text-neutral-900 focus-visible:outline-2 focus-visible:outline-neutral-900 sm:hidden"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          className="h-6 w-6"
          aria-hidden="true"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 8h16M4 16h16" />
          )}
        </svg>
      </button>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-neutral-100 bg-white sm:hidden"
      >
        <ul className="flex flex-col px-5 py-4">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`${linkBase} flex min-h-12 items-center ${
                    active ? "text-neutral-900" : "text-neutral-500"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
