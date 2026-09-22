import Image from "next/image";
import type { ReactNode } from "react";
import type { Architecture, Evaluation, Project } from "@/content/schema";
import { PlaceholderNote } from "./primitives";

export function DetailSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      className="detail-section"
      id={id}
      aria-labelledby={`${id}-heading`}
    >
      <div className="detail-section-label">
        <span className="index">{number}</span>
        <h2 id={`${id}-heading`}>{title}</h2>
      </div>
      <div className="detail-section-body">{children}</div>
    </section>
  );
}

export function DetailText({
  text,
  fallback,
}: {
  text?: string;
  fallback?: string;
}) {
  if (!text) return <PlaceholderNote>{fallback}</PlaceholderNote>;
  return (
    <p className={text.startsWith("TODO") ? "todo-text" : undefined}>{text}</p>
  );
}

export function ArchitectureSection({
  architecture,
}: {
  architecture?: Architecture;
}) {
  return (
    <>
      <DetailText
        text={architecture?.description}
        fallback="TODO — Add the actual components, boundaries, and data flow."
      />
      {architecture?.diagram && (
        <figure className="architecture-image">
          <Image
            src={architecture.diagram.src}
            alt={architecture.diagram.alt}
            width={architecture.diagram.width ?? 1200}
            height={architecture.diagram.height ?? 750}
            sizes="(max-width: 700px) 100vw, 70vw"
          />
          {architecture.diagram.caption && (
            <figcaption>{architecture.diagram.caption}</figcaption>
          )}
        </figure>
      )}
      {architecture?.steps && (
        <ol className="architecture-steps">
          {architecture.steps.map((step, i) => (
            <li key={step.title}>
              <span className="index">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}

export function EvaluationPanel({ evaluation }: { evaluation?: Evaluation }) {
  const metrics = evaluation?.metrics ?? [];
  return (
    <>
      {evaluation?.summary && <DetailText text={evaluation.summary} />}
      {metrics.length > 0 ? (
        <dl className="evaluation-metrics">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="mono">{metric.label}</dt>
              <dd>
                <span className="metric-value">{metric.value}</span>
                {metric.context && <p>{metric.context}</p>}
                {metric.source && (
                  <a
                    className="text-link"
                    href={metric.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View evidence ↗
                  </a>
                )}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <div className="evaluation-empty">
          <span className="mono">MEASUREMENTS / NOT YET RECORDED</span>
          <h3>Evidence belongs here.</h3>
          <p>
            No benchmark results have been added. There are no estimated or
            sample scores.
          </p>
          <p className="evaluation-prompt">
            TODO — Add benchmark size, task success, regression tests, latency,
            cost, or tool-call success, with methodology and sources.
          </p>
        </div>
      )}
      {evaluation?.methodology && (
        <div className="evaluation-method">
          <h3>Methodology</h3>
          <p>{evaluation.methodology}</p>
        </div>
      )}
    </>
  );
}

export function DemoSection({ project }: { project: Project }) {
  return (
    <>
      <DetailText
        text={project.demo?.description}
        fallback="TODO — Add a demo, recording, or artifact that someone can inspect."
      />
      {project.demo?.image && (
        <Image
          className="demo-image"
          src={project.demo.image.src}
          alt={project.demo.image.alt}
          width={project.demo.image.width ?? 1200}
          height={project.demo.image.height ?? 750}
        />
      )}
      {project.demo?.url && (
        <a
          href={project.demo.url}
          className="button button-dark"
          target="_blank"
          rel="noopener noreferrer"
        >
          {project.demo.linkLabel ?? "Open demo"}{" "}
          <span aria-hidden="true">↗</span>
        </a>
      )}
    </>
  );
}

export function ProjectLinks({ project }: { project: Project }) {
  const links = Object.entries(project.links ?? {}).filter(([, href]) =>
    Boolean(href),
  );
  const labels: Record<string, string> = {
    github: "Source on GitHub",
    website: "Visit website",
    video: "Watch video",
  };
  const references = project.references ?? [];
  return links.length || references.length ? (
    <>
      <div className="project-external-links">
        {links.map(([kind, href]) => (
          <a
            className="text-link"
            key={kind}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {labels[kind] ?? kind}
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
      {references.length > 0 && (
        <div className="evidence-references">
          <h3>Evidence & source notes</h3>
          <ul>
            {references.map((reference) => (
              <li key={reference.url}>
                <a
                  href={reference.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {reference.label}
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  ) : (
    <PlaceholderNote>
      TODO — Add a repository, live website, or video link. No links have been
      published yet.
    </PlaceholderNote>
  );
}
