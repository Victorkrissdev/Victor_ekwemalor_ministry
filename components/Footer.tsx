import { siteConfig } from "@/lib/site-config";
import Cross from "./Cross";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-neutral-100 bg-neutral-50">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-16 text-center">
        <Cross className="h-8 w-5 text-neutral-400" />
        <p className="mt-6 font-serif text-xl leading-relaxed text-neutral-800 sm:text-2xl">
          {siteConfig.motto}
        </p>
        <p className="mt-4 text-sm text-neutral-600">
          &ldquo;{siteConfig.keyVerse.text}&rdquo; &mdash;{" "}
          {siteConfig.keyVerse.reference}
        </p>
        <div className="mt-8">
          <SocialLinks />
        </div>
        <p className="mt-8 text-xs tracking-wide text-neutral-500">
          &copy; {year} {siteConfig.name}. To God be the glory.
        </p>
      </div>
    </footer>
  );
}
