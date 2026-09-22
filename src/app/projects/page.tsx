import type { Metadata } from "next";
import { ProjectGrid } from "@/components/project-grid";
import { publishedProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "做过的东西",
  description: "HAONAN 做过的工具、软件和小实验，以及它们的制作过程。",
};

export default function ProjectsPage() {
  return (
    <>
      <header className="page-intro">
        <span className="eyebrow mono">
          THINGS I MADE / {String(publishedProjects.length).padStart(2, "0")}
        </span>
        <h1>
          做过的东西<span className="brand-dot">。</span>
        </h1>
        <p>
          有些已经能用，有些还在打磨。
          <br />
          把尝试和制作过程，一起留在这里。
        </p>
      </header>
      <section className="archive-page" aria-label="作品集">
        <h2 className="sr-only">作品列表</h2>
        <ProjectGrid projects={publishedProjects} />
      </section>
    </>
  );
}
