import Link from "next/link";
import { profile } from "@/content/profile";

export function PersonalCard() {
  return (
    <section className="personal-card" aria-labelledby="identity">
      <div className="hero-kicker mono">
        <span>
          <span className="card-index">001 /</span> A PERSONAL BUILDER CARD
        </span>
        <span>INDEPENDENT BY CURIOSITY</span>
      </div>
      <div className="identity-grid">
        <div className="identity-name">
          <h1 id="identity">
            {profile.name}
            <span className="name-period">.</span>
          </h1>
          <span className="identity-caption mono">
            LESS TALK. MORE THINGS BUILT.
          </span>
        </div>
        <div className="identity-description">
          <p className="roles">
            {profile.roles.map((role) => (
              <span key={role}>
                <span className="role-index mono" aria-hidden="true">
                  0{profile.roles.indexOf(role) + 1}
                </span>
                {role}
              </span>
            ))}
          </p>
          <p className="hero-intro">{profile.introduction}</p>
        </div>
      </div>
      <div className="hero-bottom">
        <div className="hero-actions">
          <a className="button button-dark" href="#selected-work">
            Selected Work <span aria-hidden="true">↓</span>
          </a>
          <Link className="text-link" href="/projects">
            Everything I Build <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <span className="hero-footnote mono">
          <span className="accent-dot" /> AN OPEN-ENDED PRACTICE
        </span>
      </div>
    </section>
  );
}
