import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/schema";

export function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="project-meta mono">
      <span>
        {project.category} <span className="meta-divider">/</span>{" "}
        {project.format}
      </span>
      <span>{project.year}</span>
      <span className="sr-only">Status: {project.status}</span>
    </div>
  );
}

export function ProjectCard({
  project,
  featured = false,
  lead = false,
}: {
  project: Project;
  featured?: boolean;
  lead?: boolean;
}) {
  return (
    <article
      className={`project-card${featured ? " featured-project" : ""}${lead ? " lead-project" : ""}`}
    >
      <div className="project-plate">
        <div className="plate-caption mono" aria-hidden="true">
          <span className="plate-number">
            {project.id} <span>/ {featured ? "SELECTED WORK" : "ARCHIVE"}</span>
          </span>
          <span>{project.status}</span>
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="project-cover-link"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="project-cover">
            <Image
              src={project.cover.src}
              alt=""
              fill
              loading={lead ? "eager" : "lazy"}
              sizes={
                lead
                  ? "(max-width: 1000px) 100vw, 66vw"
                  : "(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 45vw"
              }
            />
            <span className="cover-arrow" aria-hidden="true">
              ↗
            </span>
          </div>
        </Link>
      </div>
      <div className="project-card-content">
        <ProjectMeta project={project} />
        <h3>
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className="project-subtitle">{project.subtitle}</p>
        {featured && (
          <p className="project-evidence">
            <span className="evidence-label mono">EVIDENCE</span>
            {project.evidence ??
              "TODO — Add a verifiable result, artifact, or demonstration."}
          </p>
        )}
        <Link href={`/projects/${project.slug}`} className="project-link">
          View project <span aria-hidden="true">↗</span>
          <span className="sr-only">: {project.title}</span>
        </Link>
      </div>
    </article>
  );
}

export function FeaturedProject({
  project,
  lead = false,
}: {
  project: Project;
  lead?: boolean;
}) {
  return <ProjectCard project={project} featured lead={lead} />;
}
