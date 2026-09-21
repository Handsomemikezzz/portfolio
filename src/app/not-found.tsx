import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-intro not-found">
      <span className="eyebrow mono">404 / NOT IN THE ARCHIVE</span>
      <h1>
        Nothing built
        <br />
        here. Yet<span className="brand-dot">.</span>
      </h1>
      <p>
        This project or page doesn’t exist. The rest of the archive is right
        here.
      </p>
      <Link className="button button-dark" href="/projects">
        Back to all work <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
