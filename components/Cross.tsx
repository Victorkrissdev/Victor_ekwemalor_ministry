type CrossProps = {
  className?: string;
};

/** A thin, simple line cross used as a quiet design accent. */
export default function Cross({ className = "h-6 w-4" }: CrossProps) {
  return (
    <svg
      viewBox="0 0 16 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <line x1="8" y1="1" x2="8" y2="23" />
      <line x1="2" y1="7" x2="14" y2="7" />
    </svg>
  );
}
