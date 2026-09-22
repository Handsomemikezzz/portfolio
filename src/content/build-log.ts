import type { BuildLogEntry } from "./schema";

// Replace these examples with dated, verifiable outputs. No sample metrics.
export const buildLog: BuildLogEntry[] = [
  {
    date: "2026-09-21",
    title: "Verified Aodcast’s rendering invariants",
    detail:
      "22 focused regression tests passed with mocked LLM/TTS providers. Command, source snapshot and raw output are recorded in the case study.",
    projectSlug: "aodcast",
  },
  {
    date: "2026-09-21",
    title: "Agent evaluation harness",
    detail: "TODO — Add an actual output and link to the evaluation report.",
    projectSlug: "agent-evaluation",
    placeholder: true,
  },
  {
    date: "2026-09-21",
    title: "Personal Inbox MVP",
    detail: "TODO — Document a shipped workflow and its demo.",
    projectSlug: "personal-information-inbox",
    placeholder: true,
  },
  {
    date: "2026-09-21",
    title: "An AI short film",
    detail: "TODO — Add the completed film and production notes.",
    projectSlug: "ai-short-film",
    placeholder: true,
  },
];
