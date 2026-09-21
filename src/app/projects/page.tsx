import type { Metadata } from "next";
import { ProjectGrid } from "@/components/project-grid";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Everything I Build",
  description:
    "An open-ended archive of AI agents, software, tools, videos, and experiments by HAONAN.",
};

export default function ProjectsPage() {
  const placeholderCount = projects.filter(
    (project) => project.status === "Placeholder",
  ).length;
  return (
    <>
      <header className="page-intro">
        <span className="eyebrow mono">
          THE COMPLETE ARCHIVE / {String(projects.length).padStart(2, "0")}{" "}
          ENTRIES
        </span>
        <h1>
          Everything
          <br />I Build<span className="brand-dot">.</span>
        </h1>
        <p>
          A home for the useful, the curious, and the experimental.
          <br />
          Different formats. The same instinct to make things.
        </p>
      </header>
      <section className="archive-page" aria-label="Project archive">
        <h2 className="sr-only">Project collection</h2>
        {placeholderCount > 0 && (
          <p className="seed-notice">
            <span className="accent-dot" /> {placeholderCount}{" "}
            {placeholderCount === 1 ? "entry is" : "entries are"} marked as
            placeholders, waiting for real work.
          </p>
        )}
        <ProjectGrid projects={projects} />
      </section>
    </>
  );
}
