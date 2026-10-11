import type { ReactNode } from "react";

type SectionHeadingProps = {
  children: ReactNode;
  id?: string;
};

export default function SectionHeading({ children, id }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className="font-serif text-3xl font-medium text-neutral-900 sm:text-4xl"
    >
      {children}
    </h2>
  );
}
