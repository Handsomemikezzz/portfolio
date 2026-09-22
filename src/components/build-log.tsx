import Link from "next/link";
import { buildLog } from "@/content/build-log";
import type { BuildLogEntry } from "@/content/schema";

export function BuildLog() {
  const groups = new Map<string, BuildLogEntry[]>();
  [...buildLog]
    .sort((a, b) => b.date.localeCompare(a.date))
    .forEach((entry) => {
      const month = entry.date.slice(0, 7);
      groups.set(month, [...(groups.get(month) ?? []), entry]);
    });
  return (
    <div className="build-log">
      {[...groups].map(([month, entries]) => (
        <div className="log-month" key={month}>
          <h3 className="mono">
            <time dateTime={month}>
              {new Date(`${month}-01T00:00:00Z`).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
                timeZone: "UTC",
              })}
            </time>
          </h3>
          <ol>
            {entries.map((entry, index) => (
              <li key={`${entry.date}-${index}`}>
                <div className="log-entry-heading">
                  {entry.projectSlug || entry.href ? (
                    <Link
                      href={
                        entry.projectSlug
                          ? `/projects/${entry.projectSlug}`
                          : entry.href!
                      }
                      target={
                        !entry.projectSlug && entry.href?.startsWith("https://")
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        !entry.projectSlug && entry.href?.startsWith("https://")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {entry.title}
                      <span aria-hidden="true">↗</span>
                    </Link>
                  ) : (
                    <span>{entry.title}</span>
                  )}
                  {entry.placeholder && (
                    <span className="status-label mono">Placeholder</span>
                  )}
                </div>
                <p>{entry.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      ))}
      {!buildLog.length && (
        <p className="empty-state">下一段故事，从这里开始。</p>
      )}
    </div>
  );
}
