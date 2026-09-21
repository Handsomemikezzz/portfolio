import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import {
  ArchitectureSection,
  DemoSection,
  DetailSection,
  DetailText,
  EvaluationPanel,
  ProjectLinks,
} from "@/components/project-detail";
import { PlaceholderNote } from "@/components/primitives";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.subtitle };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const engineering = project.kind === "engineering";
  const sections = engineering
    ? [
        "Overview",
        "Why I Built It",
        "My Role",
        "How It Works",
        "Architecture",
        "Hard Problems",
        "Evaluation",
        "Demo",
        "What I Learned",
        "Links",
      ]
    : ["Overview", "The Idea", "Process", "Demo", "What I Learned", "Links"];
  const sectionId = (title: string) => title.toLowerCase().replaceAll(" ", "-");
  const sectionProps = (title: string) => ({
    id: sectionId(title),
    title,
    number: String(sections.indexOf(title) + 1).padStart(2, "0"),
  });
  return (
    <>
      <header className="project-intro">
        <Link className="back-link mono" href="/projects">
          <span aria-hidden="true">←</span> ALL WORK
        </Link>
        <div className="project-title-row">
          <span className="eyebrow mono">
            {project.category} / {project.format}
          </span>
          <span className="status-label mono">{project.status}</span>
        </div>
        <h1>
          {project.title}
          <span className="brand-dot">.</span>
        </h1>
        <p className="detail-subtitle">{project.subtitle}</p>
        <dl className="detail-meta">
          <div>
            <dt>YEAR</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>TYPE</dt>
            <dd>{engineering ? "Engineering project" : "Creative project"}</dd>
          </div>
          <div>
            <dt>FOCUS</dt>
            <dd>{project.tags.join(" / ")}</dd>
          </div>
        </dl>
      </header>
      {project.status === "Placeholder" && (
        <aside className="detail-placeholder">
          <span className="mono">WORK IN PLACEHOLDER FORM</span>
          <p>
            This is a project template, not a claim of completed work. TODO
            sections, concept previews, and empty measurements are waiting for
            real evidence.
          </p>
        </aside>
      )}
      <figure className="detail-cover">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          width={1200}
          height={750}
          loading="eager"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
        {project.cover.caption && (
          <figcaption className="mono">{project.cover.caption}</figcaption>
        )}
      </figure>
      <div className="project-case-study">
        <nav className="case-study-nav" aria-label="On this page">
          <span className="mono">IN THIS PROJECT</span>
          {sections.map((title, index) => (
            <a href={`#${sectionId(title)}`} key={title}>
              <span className="index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {title}
            </a>
          ))}
        </nav>
        <div className="case-study-content">
          <DetailSection {...sectionProps("Overview")}>
            <DetailText text={project.summary} />
            {project.evidence && (
              <div className="detail-evidence">
                <span className="eyebrow mono">KEY EVIDENCE</span>
                <DetailText text={project.evidence} />
              </div>
            )}
          </DetailSection>
          {engineering ? (
            <>
              <DetailSection {...sectionProps("Why I Built It")}>
                <DetailText
                  text={project.problem}
                  fallback="TODO — Describe the actual problem, who faced it, and why it mattered."
                />
              </DetailSection>
              <DetailSection {...sectionProps("My Role")}>
                <DetailText
                  text={project.role}
                  fallback="TODO — Explain your contribution and the scope you owned."
                />
              </DetailSection>
              <DetailSection {...sectionProps("How It Works")}>
                <DetailText
                  text={project.howItWorks}
                  fallback="TODO — Walk through one real workflow, from input to output."
                />
              </DetailSection>
              <DetailSection {...sectionProps("Architecture")}>
                <ArchitectureSection architecture={project.architecture} />
              </DetailSection>
              <DetailSection {...sectionProps("Hard Problems")}>
                {project.hardProblems?.length ? (
                  project.hardProblems.map((problem) => (
                    <div className="hard-problem" key={problem.title}>
                      <h3>{problem.title}</h3>
                      <p>{problem.description}</p>
                    </div>
                  ))
                ) : (
                  <PlaceholderNote>
                    TODO — Describe the engineering challenges, decisions, and
                    tradeoffs.
                  </PlaceholderNote>
                )}
              </DetailSection>
              <DetailSection {...sectionProps("Evaluation")}>
                <EvaluationPanel evaluation={project.evaluation} />
              </DetailSection>
            </>
          ) : (
            <>
              <DetailSection {...sectionProps("The Idea")}>
                <DetailText
                  text={project.story}
                  fallback="TODO — Share the question, inspiration, or story behind the work."
                />
              </DetailSection>
              <DetailSection {...sectionProps("Process")}>
                <DetailText
                  text={project.process}
                  fallback="TODO — Share how you made it and the choices that shaped the result."
                />
              </DetailSection>
            </>
          )}
          <DetailSection {...sectionProps("Demo")}>
            <DemoSection project={project} />
          </DetailSection>
          <DetailSection {...sectionProps("What I Learned")}>
            {project.learnings?.length ? (
              <ul className="learning-list">
                {project.learnings.map((learning) => (
                  <li key={learning}>{learning}</li>
                ))}
              </ul>
            ) : (
              <PlaceholderNote>
                TODO — Record what you learned and what you would change next
                time.
              </PlaceholderNote>
            )}
          </DetailSection>
          <DetailSection {...sectionProps("Links")}>
            <ProjectLinks project={project} />
          </DetailSection>
        </div>
      </div>
      <div className="project-end">
        <span className="mono">THERE’S MORE IN THE ARCHIVE.</span>
        <Link href="/projects">
          Everything I Build <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </>
  );
}
