import type { Project } from "./schema";
import { aodcast } from "./aodcast";

// Real case studies can live in their own data file; the remaining seeds are placeholders.
export const projects: Project[] = [
  aodcast,
  {
    id: "001",
    slug: "agent-system",
    title: "Agent System",
    subtitle: "A place for the system, the decisions, and the traces.",
    year: 2026,
    category: "AI",
    format: "Agent",
    kind: "engineering",
    tags: ["Agent systems", "Tool use"],
    featured: false,
    status: "Placeholder",
    cover: {
      src: "/images/agent-system.svg",
      alt: "Concept illustration of an agent loop connecting input, reasoning, tools, and output. Not an implemented architecture.",
      caption: "Concept illustration · replace with a real system preview",
    },
    summary:
      "TODO — Introduce a real agent system: who it serves, the task it performs, and what you built.",
    evidence: "TODO — Add a reproducible task trace or demo.",
    problem:
      "TODO — Describe the concrete workflow that was difficult before this project, and why an agent was a useful approach.",
    role: "TODO — Explain your ownership, collaborators, and the parts you personally designed and implemented.",
    howItWorks:
      "TODO — Walk through one real task from user input to the final result. Include tool selection, state, and failure recovery.",
    architecture: {
      description:
        "TODO — Document the actual components, data flow, persistence choices, and boundaries. The cover is only a concept illustration.",
    },
    hardProblems: [
      {
        title: "TODO — Name an engineering tradeoff",
        description:
          "Describe the failure, alternatives considered, the decision you made, and evidence that it helped.",
      },
    ],
    evaluation: {},
    demo: {
      description:
        "TODO — Add a runnable demo, recorded walkthrough, or task trace.",
    },
    learnings: [
      "TODO — Record what changed your understanding and what you would build differently.",
    ],
  },
  {
    id: "002",
    slug: "agent-evaluation",
    title: "Agent Evaluation",
    subtitle: "Making agent behavior observable and testable.",
    year: 2026,
    category: "AI",
    format: "Evaluation harness",
    kind: "engineering",
    tags: ["Evaluation", "Regression testing"],
    featured: true,
    status: "Placeholder",
    cover: {
      src: "/images/agent-evaluation.svg",
      alt: "Concept illustration of an evaluation matrix with unmeasured cases. No benchmark results are represented.",
      caption: "Concept illustration · no measured results",
    },
    summary:
      "TODO — Describe an evaluation harness you built, the agent behavior it checks, and how it fits into development.",
    evidence: "TODO — Add benchmark methodology and measured results.",
    problem:
      "TODO — Explain which regressions were difficult to detect and why existing checks were insufficient.",
    role: "TODO — Document your work on case design, scoring, instrumentation, or reporting.",
    howItWorks:
      "TODO — Explain how test cases run, how results are scored, and how failures are reviewed.",
    evaluation: {},
  },
  {
    id: "003",
    slug: "personal-information-inbox",
    title: "Personal Information Inbox",
    subtitle: "A home for information worth coming back to.",
    year: 2026,
    category: "Software",
    format: "Application",
    kind: "engineering",
    tags: ["AI applications", "Product engineering"],
    featured: true,
    status: "Placeholder",
    cover: {
      src: "/images/personal-inbox.svg",
      alt: "Wireframe concept of an information inbox with unfilled source cards. Not a working product screenshot.",
      caption: "Wireframe concept · replace with an actual product screenshot",
    },
    summary:
      "TODO — Introduce your information inbox, its actual users, and the workflow it supports.",
    evidence: "TODO — Add a working workflow or product walkthrough.",
    problem:
      "TODO — Describe the information problem and the smallest useful workflow you chose to build.",
    role: "TODO — Describe your product and engineering responsibilities.",
  },
  {
    id: "004",
    slug: "ai-short-film",
    title: "AI Short Film",
    subtitle: "An exploration in generated moving images.",
    year: 2026,
    category: "Video",
    format: "AI video",
    kind: "creative",
    tags: ["Moving image", "Generative AI"],
    featured: false,
    status: "Placeholder",
    cover: {
      src: "/images/short-film.svg",
      alt: "Abstract black and white film frame, a placeholder for a future short film.",
    },
    summary:
      "TODO — Add the film’s premise, your creative contribution, and the finished work.",
    story: "TODO — Describe the idea or feeling behind the film.",
    process:
      "TODO — Share your process, from concept and storyboard to generation, editing, and sound.",
  },
  {
    id: "005",
    slug: "podcast-generator",
    title: "Podcast Generator",
    subtitle: "An experiment in turning ideas into audio.",
    year: 2026,
    category: "Tools",
    format: "Audio tool",
    kind: "creative",
    tags: ["Audio", "Creative tooling"],
    featured: false,
    status: "Placeholder",
    cover: {
      src: "/images/podcast.svg",
      alt: "Abstract waveform illustration, a placeholder for a podcast generator.",
    },
    summary:
      "TODO — Explain the actual tool or audio piece and add a sample listeners can try.",
    process:
      "TODO — Describe the source material, generation process, and editorial decisions.",
  },
  {
    id: "006",
    slug: "small-experiment",
    title: "Small Experiment",
    subtitle: "A little room for an unexpected idea.",
    year: 2026,
    category: "Experiments",
    format: "Creative experiment",
    kind: "creative",
    tags: ["Exploration"],
    featured: false,
    status: "Placeholder",
    cover: {
      src: "/images/experiment.svg",
      alt: "Geometric grid study with an orange square, a placeholder for a creative experiment.",
    },
    summary:
      "TODO — Give this experiment a name, explain the question, and show what you made.",
  },
];

// Keep seed templates as editing references, outside the public archive and routes.
export const publishedProjects = projects.filter(
  (project) => project.status !== "Placeholder",
);
export const featuredProjects = publishedProjects.filter(
  (project) => project.featured,
);
export function getProject(slug: string) {
  return publishedProjects.find((project) => project.slug === slug);
}
