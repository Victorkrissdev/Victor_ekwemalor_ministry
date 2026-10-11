import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import CrossDivider from "@/components/CrossDivider";
import SectionHeading from "@/components/SectionHeading";
import SocialLinks from "@/components/SocialLinks";
import { siteConfig } from "@/lib/site-config";

const description =
  "Share a prayer request, a testimony, a question about faith, or an idea for collaboration.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description,
    url: "/contact",
  },
  twitter: {
    title: `Contact | ${siteConfig.name}`,
    description,
  },
};

export default function ContactPage() {
  const telHref = `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;

  return (
    <>
      <section className="px-6 pt-16 pb-16 text-center sm:pt-24">
        <div className="mx-auto max-w-2xl">
          <h1 className="fade-in font-serif text-5xl font-medium text-neutral-900 sm:text-6xl">
            Get in Touch
          </h1>
          <p className="fade-in fade-in-delay-1 mt-6 text-lg leading-relaxed text-neutral-700">
            Whether you have a prayer request, a testimony to share, a question
            about faith, or an idea for collaboration, I would be glad to hear
            from you.
          </p>
          <p className="fade-in fade-in-delay-2 mt-6 text-sm text-neutral-500 italic">
            &ldquo;Bear ye one another&rsquo;s burdens, and so fulfil the law of
            Christ.&rdquo; &mdash; Galatians 6:2
          </p>
        </div>
      </section>

      <section aria-label="Contact form" className="px-6 pb-20">
        <div className="fade-in fade-in-delay-3 mx-auto max-w-xl">
          <ContactForm />
        </div>
      </section>

      <CrossDivider />

      <section aria-labelledby="other-ways" className="px-6 pt-20 text-center">
        <div className="mx-auto max-w-xl">
          <SectionHeading id="other-ways">Other Ways to Connect</SectionHeading>

          {siteConfig.showContactDetails && (
            <ul className="mt-10 space-y-4 text-neutral-700">
              <li>
                <span className="block text-xs tracking-[0.25em] text-neutral-500 uppercase">
                  Email
                </span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-1 inline-block break-all underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <span className="block text-xs tracking-[0.25em] text-neutral-500 uppercase">
                  Phone
                </span>
                <a
                  href={telHref}
                  className="mt-1 inline-block underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900"
                >
                  {siteConfig.phone}
                </a>
              </li>
            </ul>
          )}

          <div className="mt-10">
            <SocialLinks />
          </div>
        </div>
      </section>
    </>
  );
}
