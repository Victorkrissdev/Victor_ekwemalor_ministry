type ScriptureProps = {
  text: string;
  reference: string;
  className?: string;
};

/** A Bible verse (KJV) with its reference. */
export default function Scripture({
  text,
  reference,
  className = "",
}: ScriptureProps) {
  return (
    <figure className={className}>
      <blockquote className="font-serif text-2xl leading-snug text-neutral-800 italic sm:text-3xl">
        &ldquo;{text}&rdquo;
      </blockquote>
      <figcaption className="mt-4 text-xs tracking-[0.25em] text-neutral-500 uppercase">
        {reference} <span className="sr-only">King James Version</span>
        <span aria-hidden="true">&middot; KJV</span>
      </figcaption>
    </figure>
  );
}
