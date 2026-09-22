import Link from "next/link";
import { capabilities } from "@/content/capabilities";

export function CapabilityIndex() {
  return (
    <ul
      className="capability-index"
      aria-label="Capabilities and evidence"
    >
      {capabilities.map((capability, position) => (
        <li
          className="capability-item"
          data-status={
            capability.status === "Evidence available" ? "evidence" : "next"
          }
          key={capability.id}
        >
          <div className="capability-topline mono">
            <span className="index">
              {String(position + 1).padStart(2, "0")}
            </span>
            <span>{capability.status}</span>
          </div>
          <h3>{capability.title}</h3>
          <p className="capability-description">{capability.description}</p>
          {capability.evidence ? (
            <div className="capability-evidence">
              {capability.evidence.map((item) => (
                <Link
                  href={`/projects/${item.projectSlug}#${item.sectionId}`}
                  key={`${item.projectSlug}#${item.sectionId}`}
                >
                  Aodcast <span>/ {item.label}</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="capability-next">{capability.nextEvidence}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
