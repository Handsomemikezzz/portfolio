import Link from "next/link";
import { PersonalCard } from "@/components/personal-card";
import { SectionHeader } from "@/components/primitives";
import { FeaturedProject } from "@/components/project-card";
import { ProjectGrid } from "@/components/project-grid";
import { BuildLog } from "@/components/build-log";
import { featuredProjects, projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { buildLog } from "@/content/build-log";
import { CapabilityIndex } from "@/components/capability-index";

export default function HomePage() {
  return (
    <>
      <PersonalCard />
      <section
        className="page-section selected-section"
        id="selected-work"
        aria-labelledby="selected-heading"
      >
        <SectionHeader number="01" title="Selected Work" id="selected-heading">
          <span className="section-aside mono">
            SYSTEMS, DECISIONS & EVIDENCE
          </span>
        </SectionHeader>
        {featuredProjects.some(
          (project) => project.status === "Placeholder",
        ) && (
          <p className="seed-notice">
            <span className="accent-dot" /> An archive in the making. Entries
            marked “Placeholder” are waiting for real work.
          </p>
        )}
        <div className="featured-grid">
          {featuredProjects.slice(0, 3).map((project, index) => (
            <FeaturedProject
              project={project}
              key={project.id}
              lead={index === 0}
            />
          ))}
        </div>
      </section>
      <section className="capabilities" aria-labelledby="capabilities-heading">
        <div>
          <span className="mono eyebrow">CURRENT FOCUS</span>
          <h2 id="capabilities-heading">Capabilities, with evidence.</h2>
        </div>
        <CapabilityIndex />
      </section>
      <section
        className="page-section archive-section"
        id="everything"
        aria-labelledby="everything-heading"
      >
        <SectionHeader
          number="02"
          title="Everything I Build"
          id="everything-heading"
        >
          <Link className="text-link" href="/projects">
            Full archive <span aria-hidden="true">↗</span>
          </Link>
        </SectionHeader>
        <p className="section-description">
          Useful things. Curious things. Things that needed to exist.
        </p>
        <ProjectGrid projects={projects} />
      </section>
      <section
        className="page-section"
        id="build-log"
        aria-labelledby="log-heading"
      >
        <SectionHeader number="03" title="Build Log" id="log-heading">
          <span className="section-aside mono">A RECORD OF OUTPUT</span>
        </SectionHeader>
        <p className="section-description">
          Small entries for things made.
          {buildLog.some((entry) => entry.placeholder) &&
            " Sample entries are marked as placeholders."}
        </p>
        <BuildLog />
      </section>
      <section
        className="home-about page-section"
        aria-labelledby="about-heading"
      >
        <div>
          <span className="eyebrow mono">04 / THE PERSON BEHIND THE WORK</span>
          <h2 id="about-heading">
            Always a builder.
            <br />
            <span className="muted">Always curious.</span>
          </h2>
        </div>
        <div>
          <p lang="zh-CN">
            {profile.about.intro}
            {profile.about.description}
          </p>
          <Link className="text-link" href="/about">
            A little more about me <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
