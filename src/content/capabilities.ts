export type CapabilityEvidence = {
  projectSlug: string;
  sectionId: string;
  label: string;
};

export type Capability = {
  id: string;
  title: string;
  description: string;
  status: "Evidence available" | "Next to document";
  evidence?: CapabilityEvidence[];
  nextEvidence?: string;
};

// Capabilities are an index into work, not self-assessed skill ratings.
export const capabilities: Capability[] = [
  {
    id: "ai-product-engineering",
    title: "AI Product Engineering",
    description:
      "Shape a multi-step AI workflow into an editable product with clear states and a complete user journey.",
    status: "Evidence available",
    evidence: [
      {
        projectSlug: "aodcast",
        sectionId: "how-it-works",
        label: "Podcast creation flow",
      },
    ],
  },
  {
    id: "workflow-reliability",
    title: "Workflow Reliability",
    description:
      "Protect versioned work when people edit inputs, cancel long jobs, or start a newer render.",
    status: "Evidence available",
    evidence: [
      {
        projectSlug: "aodcast",
        sectionId: "hard-problems",
        label: "Render safety & recovery",
      },
      {
        projectSlug: "aodcast",
        sectionId: "evaluation",
        label: "Regression evidence",
      },
    ],
  },
  {
    id: "engineering-evaluation",
    title: "Engineering Evaluation",
    description:
      "Turn important system invariants into reproducible regression checks; separate them from model-quality evaluation.",
    status: "Evidence available",
    evidence: [
      {
        projectSlug: "aodcast",
        sectionId: "evaluation",
        label: "22 focused tests & methodology",
      },
    ],
  },
  {
    id: "agent-systems",
    title: "Agent System Construction",
    description:
      "Show a real task plan, tool-use trace, and a recovery path that another person can inspect.",
    status: "Next to document",
    nextEvidence:
      "Add an Agent project with a reproducible task trace. The current Aodcast case documents an AI creation workflow, but does not claim autonomous tool selection or agent task-success results.",
  },
];
