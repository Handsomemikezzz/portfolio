export const categories = [
  "All",
  "AI",
  "Software",
  "Video",
  "Experiments",
  "Tools",
] as const;
export type Category = Exclude<(typeof categories)[number], "All">;
export type ProjectStatus =
  "Placeholder" | "In progress" | "Shipped" | "Archived";

export type Cover = { src: string; alt: string; caption?: string };
export type ProjectLinks = {
  github?: string;
  website?: string;
  video?: string;
};
export type EvaluationMetric = {
  label: string;
  value: string;
  context?: string;
  // A metric can link directly to a reproducible report or benchmark.
  source?: string;
};
export type Evaluation = {
  summary?: string;
  methodology?: string;
  metrics?: EvaluationMetric[];
};
export type Architecture = {
  description: string;
  diagram?: Cover;
  steps?: { title: string; description: string }[];
};

type ProjectBase = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  year: number;
  category: Category;
  // Free text so new formats (Podcast, Utility, etc.) need no UI changes.
  format: string;
  tags: string[];
  featured: boolean;
  status: ProjectStatus;
  cover: Cover;
  summary: string;
  evidence?: string;
  demo?: { description: string; url?: string; image?: Cover };
  learnings?: string[];
  links?: ProjectLinks;
};

export type EngineeringProject = ProjectBase & {
  kind: "engineering";
  problem?: string;
  role?: string;
  howItWorks?: string;
  architecture?: Architecture;
  hardProblems?: { title: string; description: string }[];
  evaluation?: Evaluation;
};

export type CreativeProject = ProjectBase & {
  kind: "creative";
  story?: string;
  process?: string;
};

export type Project = EngineeringProject | CreativeProject;

export type BuildLogEntry = {
  date: string; // ISO date, newest first in the UI
  title: string;
  detail: string;
  projectSlug?: string;
  placeholder?: boolean;
};
