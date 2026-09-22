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
      <span className="header-label mono">NOTES & THINGS</span>
      <nav aria-label="Main navigation">
        {[
          { href: "/", label: "首页" },
          { href: "/projects", label: "作品" },
          { href: "/about", label: "关于" },
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
