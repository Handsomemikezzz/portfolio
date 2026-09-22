import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/content/profile";
import { ProfileLinks } from "@/components/profile-links";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "HAONAN. AI Engineer, Agent Builder, Maker. A little about the person behind the work.",
};

export default function AboutPage() {
  return (
    <>
      <header className="page-intro about-intro">
        <span className="eyebrow mono">THE PERSON BEHIND THE WORK</span>
        <h1>
          Driven by curiosity.
          <br />
          Defined by making<span className="brand-dot">.</span>
        </h1>
      </header>
      <section className="about-profile" aria-labelledby="about-name">
        <div className="about-id">
          <span className="mono">PERSONAL CARD / 001</span>
          <div className="id-monogram" aria-hidden="true">
            H<span>.</span>
          </div>
          <h2 id="about-name">{profile.name}</h2>
          <p className="mono">
            {profile.roles.map((role) => (
              <span key={role} style={{ display: "block" }}>
                {role.toUpperCase()}
              </span>
            ))}
          </p>
        </div>
        <div className="about-copy">
          <span className="eyebrow mono">A SHORT INTRODUCTION</span>
          <p className="about-lead" lang="zh-CN">
            {profile.about.intro}
          </p>
          <p lang="zh-CN">{profile.about.description}</p>
          <p>{profile.introduction}</p>
          <div className="about-focus">
            <h3 className="mono">CAPABILITIES / WITH WORKING EVIDENCE</h3>
            <p>
              See how current project evidence supports my engineering practice.
            </p>
            <Link className="text-link" href="/#capabilities">
              Browse the capability index <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <Link className="button button-dark" href="/projects">
            Explore the work <span aria-hidden="true">↗</span>
          </Link>
          <div className="about-contact">
            <h3 className="mono">ELSEWHERE / CONTACT</h3>
            <ProfileLinks detailed />
          </div>
        </div>
      </section>
      <div className="about-statement">
        <span className="mono">THE GUIDING IDEA</span>
        <p>“I build things.”</p>
        <span className="muted">The work tells the rest of the story.</span>
      </div>
    </>
  );
}
