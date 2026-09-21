import { profile } from "@/content/profile";

export function ProfileLinks({ detailed = false }: { detailed?: boolean }) {
  return (
    <nav
      className={`profile-links${detailed ? " profile-links-detailed" : ""}`}
      aria-label="Contact and external profiles"
    >
      {profile.links.map((link) => {
        const external = link.href.startsWith("https://");
        return (
          <a
            key={link.href}
            href={link.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
          >
            <span className="profile-link-label">
              {link.label}
              <span aria-hidden="true">↗</span>
            </span>
            {detailed && (
              <span className="profile-link-detail">{link.detail}</span>
            )}
            {external && <span className="sr-only"> (opens in a new tab)</span>}
          </a>
        );
      })}
    </nav>
  );
}
