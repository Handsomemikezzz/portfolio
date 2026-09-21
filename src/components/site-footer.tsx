import Link from "next/link";
import { ProfileLinks } from "./profile-links";

export function SiteFooter() {
  return (
    <footer className="site-footer container">
      <div>
        <Link href="/" className="footer-name">
          HAONAN<span className="brand-dot">.</span>
        </Link>
        <p>A growing collection of things I build.</p>
        <ProfileLinks />
      </div>
      <div className="footer-right">
        <span className="mono">BUILT WITH INTENTION.</span>
        <a href="#top">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
