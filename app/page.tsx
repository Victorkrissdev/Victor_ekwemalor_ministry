import ButtonLink from "@/components/ButtonLink";
import Cross from "@/components/Cross";
import CrossDivider from "@/components/CrossDivider";
import FadeIn from "@/components/FadeIn";
import Logo from "@/components/Logo";
import Scripture from "@/components/Scripture";
import SectionHeading from "@/components/SectionHeading";
import SocialLinks from "@/components/SocialLinks";
import { siteConfig } from "@/lib/site-config";

// The three cards in the "What I Share" section. Edit the text here.
const shares = [
  {
    title: "Bible Stories Retold",
    text: "Timeless stories from Scripture, told afresh so the Word comes alive and points you to Jesus.",
  },
  {
    title: "Testimonies of Faith",
    text: "Real stories of lives changed by the grace and power of Jesus Christ.",
  },
  {
    title: "Daily Encouragement",
    text: "Short words of hope and truth to keep your eyes on Jesus through every season.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 pt-16 pb-20 text-center sm:pt-24 sm:pb-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <div className="fade-in">
            <Logo size={160} priority />
          </div>
          <h1 className="fade-in fade-in-delay-1 mt-10 font-serif text-4xl leading-tight font-medium text-balance text-neutral-900 sm:text-6xl">
            {siteConfig.motto}
          </h1>
          <Scripture
            text={siteConfig.keyVerse.text}
            reference={siteConfig.keyVerse.reference}
            className="fade-in fade-in-delay-2 mt-8"
          />
          <div className="fade-in fade-in-delay-3 mt-12 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <ButtonLink href="/about">My Story</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Get in Touch
            </ButtonLink>
          </div>
        </div>
      </section>

      <CrossDivider />

      {/* Why I Do This */}
      <section aria-labelledby="why" className="px-6 py-20 sm:py-28">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <SectionHeading id="why">Why I Do This</SectionHeading>
          <p className="mt-8 text-lg leading-relaxed text-neutral-700">
            Stories have always carried truth. Jesus Himself taught in
            parables. Through voiceover storytelling and film, I retell the
            message of the gospel so that people do not simply hear about Jesus,
            but encounter Him: His love, His sacrifice and His power to make all
            things new. Every video is made for one purpose, that He would be
            seen.
          </p>
          <p className="mt-8 text-sm text-neutral-500 italic">
            &ldquo;So then faith cometh by hearing, and hearing by the word of
            God.&rdquo; &mdash; Romans 10:17
          </p>
        </FadeIn>
      </section>

      {/* What I Share */}
      <section
        aria-labelledby="share"
        className="bg-neutral-50 px-6 py-20 sm:py-28"
      >
        <FadeIn className="mx-auto max-w-5xl">
          <div className="text-center">
            <SectionHeading id="share">What I Share</SectionHeading>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {shares.map((item) => (
              <li
                key={item.title}
                className="flex flex-col items-center border border-neutral-200 bg-white px-8 py-10 text-center"
              >
                <Cross className="h-6 w-4 text-neutral-400" />
                <h3 className="mt-5 font-serif text-2xl text-neutral-900">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-neutral-600">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      {/* Witnesses in John */}
      <section aria-labelledby="witnesses" className="px-6 py-20 sm:py-28">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <SectionHeading id="witnesses">Witnesses in John</SectionHeading>
          <p className="mt-6 text-neutral-600">
            Like John the Baptist, I am simply a witness, pointing to the Light.
          </p>
          <Scripture
            text="The same came for a witness, to bear witness of the Light, that all men through him might believe."
            reference="John 1:7"
            className="mt-12"
          />
          <div className="my-12">
            <CrossDivider />
          </div>
          <Scripture
            text="But these are written, that ye might believe that Jesus is the Christ, the Son of God; and that believing ye might have life through his name."
            reference="John 20:31"
          />
        </FadeIn>
      </section>

      {/* Follow the Journey */}
      <section
        aria-labelledby="follow"
        className="bg-neutral-50 px-6 py-20 sm:py-28"
      >
        <FadeIn className="mx-auto max-w-2xl text-center">
          <SectionHeading id="follow">Follow the Journey</SectionHeading>
          <p className="mt-6 text-neutral-600">
            New stories are shared regularly. Follow along, and share them with
            someone who needs to hear about Jesus.
          </p>
          <div className="mt-10 text-left">
            <SocialLinks variant="list" />
          </div>
        </FadeIn>
      </section>

      {/* Closing line */}
      <section className="px-6 pt-20 text-center">
        <FadeIn className="flex flex-col items-center gap-4">
          <Cross className="h-8 w-5 text-neutral-400" />
          <p className="font-serif text-3xl tracking-wide text-neutral-900">
            {siteConfig.hashtag}
          </p>
          <p className="text-xs tracking-[0.25em] text-neutral-500 uppercase">
            {siteConfig.location}
          </p>
        </FadeIn>
      </section>
    </>
  );
}
