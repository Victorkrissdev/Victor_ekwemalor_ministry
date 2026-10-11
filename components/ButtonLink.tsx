import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
};

const base =
  "inline-flex min-h-12 items-center justify-center px-8 text-sm tracking-[0.15em] uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900";

const variants = {
  solid: "bg-neutral-900 text-white hover:bg-neutral-700",
  outline:
    "border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white",
};

export default function ButtonLink({
  href,
  children,
  variant = "solid",
}: ButtonLinkProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </Link>
  );
}
