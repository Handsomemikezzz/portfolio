import Link from "next/link";
import { PersonalCard } from "@/components/personal-card";
import { SectionHeader } from "@/components/primitives";
import { FeaturedProject } from "@/components/project-card";
import { WritingList } from "@/components/writing-list";
import { InterestNotes } from "@/components/interest-notes";
import { BuildLog } from "@/components/build-log";
import { featuredProjects } from "@/content/projects";
import { profile } from "@/content/profile";
import { journalAbout } from "@/content/journal";

export default function HomePage() {
  return (
    <>
      <PersonalCard />
      <section
        className="page-section selected-section"
        id="selected-work"
        aria-labelledby="selected-heading"
      >
        <SectionHeader number="01" title="做过的东西" id="selected-heading">
          <Link className="text-link" href="/projects">
            逛逛作品集 <span aria-hidden="true">↗</span>
          </Link>
        </SectionHeader>
        <p className="section-description">从一个小念头开始，边做边改。</p>
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
      <section
        className="page-section journal-section"
        id="writing"
        aria-labelledby="writing-heading"
      >
        <SectionHeader number="02" title="写下的片段" id="writing-heading">
          <a
            href={profile.blog.url}
            className="text-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            去博客看看 <span aria-hidden="true">↗</span>
            <span className="sr-only">（在新标签页打开）</span>
          </a>
        </SectionHeader>
        <p className="section-description">
          有时是做东西的体会，有时只是当下的想法。
        </p>
        <WritingList />
      </section>
      <section
        className="page-section journal-section"
        id="now"
        aria-labelledby="now-heading"
      >
        <span id="capabilities" className="anchor-alias" aria-hidden="true" />
        <SectionHeader number="03" title="最近在想" id="now-heading">
          <span className="section-aside mono">OPEN QUESTIONS</span>
        </SectionHeader>
        <p className="section-description">
          还没有答案，也还没有完成。先给好奇心留个位置。
        </p>
        <InterestNotes />
      </section>
      <section
        className="page-section journal-section"
        id="build-log"
        aria-labelledby="log-heading"
      >
        <SectionHeader number="04" title="一些脚印" id="log-heading">
          <span className="section-aside mono">ALONG THE WAY</span>
        </SectionHeader>
        <p className="section-description">
          做过的改动，写过的文字，回头还能找到。
        </p>
        <BuildLog />
      </section>
      <section
        className="home-about page-section"
        aria-labelledby="about-heading"
      >
        <div>
          <span className="eyebrow mono">05 / A LITTLE ABOUT ME</span>
          <h2 id="about-heading">
            慢慢探索，
            <br />
            <span className="muted">也慢慢记录。</span>
          </h2>
        </div>
        <div>
          <p>{journalAbout.intro}</p>
          <Link className="text-link" href="/about">
            关于我和这个小站 <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
