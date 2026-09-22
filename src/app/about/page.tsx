import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/content/profile";
import { journalAbout, journalPrinciples } from "@/content/journal";
import { ProfileLinks } from "@/components/profile-links";
import { WritingList } from "@/components/writing-list";

export const metadata: Metadata = {
  title: "关于我",
  description: "关于 HAONAN，以及这个记录项目、写作、旅行和语言学习的小站。",
};

export default function AboutPage() {
  return (
    <>
      <header className="page-intro about-intro">
        <span className="eyebrow mono">A LITTLE ABOUT ME</span>
        <h1>
          关于我，
          <br />
          和一路上的想法<span className="brand-dot">。</span>
        </h1>
      </header>
      <section className="about-profile" aria-labelledby="about-name">
        <div className="about-id">
          <span className="mono">PERSONAL NOTES / 001</span>
          <div className="id-monogram" aria-hidden="true">
            H<span>.</span>
          </div>
          <h2 id="about-name">{profile.name}</h2>
          <p className="journal-topics">
            {profile.topics.map((topic) => (
              <span key={topic}>{topic}</span>
            ))}
          </p>
        </div>
        <div className="about-copy">
          <span className="eyebrow mono">此刻的我</span>
          <p className="about-lead">{journalAbout.intro}</p>
          <p>{journalAbout.description}</p>
          <p>
            有些想法会做成工具，有些会变成文章，也有些还只停在笔记里。这个小站把它们放在一起，留给以后的自己，也分享给偶然路过的人。
          </p>
          <div className="journal-principles">
            <h3>关于这里</h3>
            <ul>
              {journalPrinciples.map((principle) => (
                <li key={principle}>{principle}</li>
              ))}
            </ul>
          </div>
          <Link className="text-link" href="/#now">
            看看最近在想什么 <span aria-hidden="true">↗</span>
          </Link>
          <div className="about-contact">
            <h3 className="mono">ELSEWHERE / 也在这些地方</h3>
            <ProfileLinks detailed />
          </div>
        </div>
      </section>
      <section
        className="page-section journal-section"
        aria-labelledby="writing-heading"
      >
        <div className="section-header">
          <h2 id="writing-heading" className="journal-section-title">
            写下的片段
          </h2>
          <a
            className="text-link"
            href={profile.blog.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {profile.blog.title} <span aria-hidden="true">↗</span>
            <span className="sr-only">（在新标签页打开）</span>
          </a>
        </div>
        <p className="section-description">{profile.blog.description}</p>
        <WritingList />
        <a
          className="text-link journal-notes-link"
          href={profile.blog.notesUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          还有一些短短的说说 <span aria-hidden="true">↗</span>
          <span className="sr-only">（在新标签页打开）</span>
        </a>
      </section>
      <div className="about-statement">
        <span className="mono">TO BE CONTINUED</span>
        <p>还在路上。</p>
        <span className="muted">以后再翻回来看看。</span>
      </div>
    </>
  );
}
