"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="site-header container">
      <Link href="/" className="wordmark" aria-label="HAONAN home">
        H<span className="brand-dot">.</span>
      </Link>
      <span className="header-label mono">PERSONAL ARCHIVE</span>
      <nav aria-label="Main navigation">
        {[
          { href: "/", label: "Home" },
          { href: "/projects", label: "Work" },
          { href: "/about", label: "About" },
        ].map(({ href, label }) => {
          const active =
            href === "/" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
