import type { Metadata } from "next";
import ButtonLink from "@/components/ButtonLink";
import Cross from "@/components/Cross";
import CrossDivider from "@/components/CrossDivider";
import FadeIn from "@/components/FadeIn";
import Scripture from "@/components/Scripture";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";

const description =
  "A born-again servant of Jesus Christ, saved by grace and called to proclaim the gospel to the ends of the earth.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description,
    url: "/about",
  },
  twitter: {
    title: `About | ${siteConfig.name}`,
    description,
  },
};

// Statement of faith. Edit the bullet points here.
const beliefs = [
  {
    text: "There is one God, eternally existing as Father, Son and Holy Spirit.",
    reference: "Matthew 28:19",
  },
  {
    text: "Jesus Christ is the Son of God. He died for our sins and rose again on the third day.",
    reference: "1 Corinthians 15:3-4",
  },
  {
    text: "Salvation is by grace, through faith in Jesus Christ alone.",
    reference: "Ephesians 2:8",
  },
  {
    text: "The Bible is the inspired Word of God.",
    reference: "2 Timothy 3:16",
  },
  {
    text: "The Holy Spirit empowers believers to live for Christ and to be His witnesses.",
    reference: "Acts 1:8",
  },
  {
    text: "Jesus Christ will return.",
    reference: "Acts 1:11",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Heading and opening statement */}
      <section className="px-6 pt-16 pb-20 text-center sm:pt-24">
        <div className="mx-auto max-w-2xl">
          <h1 className="fade-in font-serif text-5xl font-medium text-neutral-900 sm:text-6xl">
            About Me
          </h1>
          <p className="fade-in fade-in-delay-1 mt-8 font-serif text-2xl leading-relaxed text-neutral-700 sm:text-3xl">
            A born-again servant of Jesus Christ, saved by grace and called to
            proclaim the gospel of our Lord Jesus Christ to the ends of the
            earth.
          </p>
        </div>
      </section>

      <CrossDivider />

      {/* My Story */}
      <section aria-labelledby="story" className="px-6 py-20 sm:py-24">
        <FadeIn className="mx-auto max-w-2xl">
          <SectionHeading id="story">My Story</SectionHeading>
          {/*
            ✏️ MY STORY: edit your testimony here.
            Each paragraph sits between <p ...> and </p>. To add another
            paragraph, copy a whole <p>...</p> block and paste it underneath.
          */}
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-neutral-700">
            <p>
              I was once deep in the world, living for myself and caught up in
              gangsterism.
            </p>
            <p>
              In 2021, I encountered Jesus Christ, and it changed everything. He
              gave me a new heart, a new life and a new purpose.
            </p>
            <p>
              Today, as His servant, my mission is to make Jesus known, so that
              others can experience the same life and joy I have found in
              Christ. If He could reach me, He can reach you.
            </p>
          </div>
          <Scripture
            text="Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new."
            reference="2 Corinthians 5:17"
            className="mt-12 text-center"
          />
          <p className="mt-12 text-right font-serif text-xl text-neutral-800 italic">
            Victor Nnamdi, your brother in Christ
          </p>
        </FadeIn>
      </section>

      {/* What I Believe */}
      <section
        aria-labelledby="believe"
        className="bg-neutral-50 px-6 py-20 sm:py-24"
      >
        <FadeIn className="mx-auto max-w-2xl">
          <SectionHeading id="believe">What I Believe</SectionHeading>
          <ul className="mt-10 space-y-6">
            {beliefs.map((belief) => (
              <li key={belief.reference} className="flex gap-4">
                <Cross className="mt-1 h-5 w-3 shrink-0 text-neutral-400" />
                <p className="leading-relaxed text-neutral-700">
                  {belief.text}{" "}
                  <span className="text-sm whitespace-nowrap text-neutral-500">
                    ({belief.reference})
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      {/* My Purpose */}
      <section aria-labelledby="purpose" className="px-6 py-20 sm:py-24">
        <FadeIn className="mx-auto max-w-2xl">
          <SectionHeading id="purpose">My Purpose</SectionHeading>
          <p className="mt-8 text-lg leading-relaxed text-neutral-700">
            My purpose is simple: to make Jesus known through storytelling. I
            use my voice and the stories of Scripture to point people to Him,
            not to myself. If one person sees Jesus more clearly through
            something I have made, then it has been worth it.
          </p>
          <div className="mt-12 space-y-12 text-center">
            <Scripture
              text={siteConfig.keyVerse.text}
              reference={siteConfig.keyVerse.reference}
            />
            <CrossDivider />
            <Scripture
              text="Go ye into all the world, and preach the gospel to every creature."
              reference="Mark 16:15"
            />
          </div>
        </FadeIn>
      </section>

      {/* Closing call */}
      <section className="px-6 pt-8 pb-4">
        <FadeIn className="mx-auto max-w-2xl border border-neutral-200 px-6 py-14 text-center sm:px-12">
          <p className="font-serif text-2xl leading-relaxed text-neutral-900 sm:text-3xl">
            If my content has touched you, I&rsquo;d love to hear from you.
          </p>
          <div className="mt-8">
            <ButtonLink href="/contact">Get in Touch</ButtonLink>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
