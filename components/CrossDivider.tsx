import Cross from "./Cross";

/** A thin line with a small cross in the middle, used between sections. */
export default function CrossDivider() {
  return (
    <div className="mx-auto flex max-w-xs items-center gap-4 px-6 text-neutral-400">
      <span className="h-px flex-1 bg-neutral-200" />
      <Cross className="h-6 w-4" />
      <span className="h-px flex-1 bg-neutral-200" />
    </div>
  );
}
