import Link from "next/link";
import { ProfileLinks } from "./profile-links";

export function SiteFooter() {
  return (
    <footer className="site-footer container">
      <div>
        <Link href="/" className="footer-name">
          HAONAN<span className="brand-dot">.</span>
        </Link>
        <p>留下一些做过的东西，和沿途的想法。</p>
        <ProfileLinks />
      </div>
      <div className="footer-right">
        <span className="mono">STILL EXPLORING.</span>
        <a href="#top">
          回到顶部 <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
