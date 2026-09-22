import Link from "next/link";
import { profile } from "@/content/profile";

export function PersonalCard() {
  return (
    <section className="personal-card journal-hero" aria-labelledby="identity">
      <div className="hero-kicker mono">
        <span>
          <span className="card-index">001 /</span> NOTES FROM HAONAN
        </span>
        <span>一个慢慢生长的小站</span>
      </div>
      <div className="identity-grid">
        <div className="identity-name">
          <h1 id="identity">
            {profile.name}
            <span className="name-period">.</span>
          </h1>
          <span className="identity-caption mono">
            MAKING ROOM
            <br />
            FOR CURIOSITY.
          </span>
        </div>
        <div className="identity-description">
          <p className="journal-topics">
            {profile.topics.map((topic) => (
              <span key={topic}>{topic}</span>
            ))}
          </p>
          <p className="hero-intro">{profile.introduction}</p>
        </div>
      </div>
      <div className="hero-bottom">
        <div className="hero-actions">
          <a className="button button-dark" href="#selected-work">
            看看做过的东西 <span aria-hidden="true">↓</span>
          </a>
          <Link className="text-link" href="/#writing">
            读一读我的文字 <span aria-hidden="true">↓</span>
          </Link>
        </div>
        <span className="hero-footnote mono">
          <span className="accent-dot" /> 未完待续
        </span>
      </div>
    </section>
  );
}
