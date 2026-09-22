import type { BuildLogEntry } from "./schema";
import { writing } from "./writing";

// Dated project changes and published writing share one small timeline.
export const buildLog: BuildLogEntry[] = [
  {
    date: "2026-09-21",
    title: "给 Aodcast 留下一份制作记录",
    detail:
      "把流程、设计和一次代码验证整理在一起，也记下目前还缺少的演示材料。",
    projectSlug: "aodcast",
  },
  {
    date: "2026-08-22",
    title: "让 Aodcast 围绕脚本展开",
    detail:
      "把脚本、声音选择和音频操作放进同一个工作区。对应源码记录：a49d2fe。",
    projectSlug: "aodcast",
  },
  ...writing.map((post) => ({
    date: post.date,
    title: `写下《${post.title}》`,
    detail: post.description,
    href: post.url,
  })),
];
