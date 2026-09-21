import type { ReactNode } from "react";

export function SectionHeader({
  number,
  title,
  children,
  id,
}: {
  number: string;
  title: string;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <div className="section-header">
      <div className="section-heading">
        <span className="index">{number}</span>
        <h2 id={id}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

export function PlaceholderNote({ children }: { children?: ReactNode }) {
  return (
    <p className="placeholder-note">
      <span className="note-marker" aria-hidden="true">
        ↳
      </span>
      {children ?? "TODO — This section is waiting for real project details."}
    </p>
  );
}
