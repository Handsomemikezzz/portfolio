"use client";

import { useState } from "react";
import { categories, type Project } from "@/content/schema";
import { ProjectCard } from "./project-card";

type Filter = (typeof categories)[number];

export function CategoryFilter({
  selected,
  onChange,
  projects,
}: {
  selected: Filter;
  onChange: (category: Filter) => void;
  projects: Project[];
}) {
  return (
    <div
      className="category-filter"
      role="group"
      aria-label="Filter projects by category"
    >
      {categories
        .filter(
          (category) =>
            category === "All" ||
            projects.some((project) => project.category === category),
        )
        .map((category) => {
          const count =
            category === "All"
              ? projects.length
              : projects.filter((p) => p.category === category).length;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={selected === category}
              onClick={() => onChange(category)}
            >
              {category === "All" ? "全部" : category}
              <span className="filter-count mono">
                {String(count).padStart(2, "0")}
              </span>
            </button>
          );
        })}
    </div>
  );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Filter>("All");
  const visibleProjects =
    selected === "All"
      ? projects
      : projects.filter((project) => project.category === selected);
  return (
    <div className="project-browser">
      <CategoryFilter
        selected={selected}
        onChange={setSelected}
        projects={projects}
      />
      <p className="sr-only" role="status">
        {visibleProjects.length} {selected === "All" ? "total" : selected}{" "}
        projects
      </p>
      <div className="project-grid">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {visibleProjects.length === 0 && (
        <p className="empty-state">这里还没有记录，留给下一次尝试。</p>
      )}
    </div>
  );
}
