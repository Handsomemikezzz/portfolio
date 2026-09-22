export type CurrentInterest = {
  id: string;
  title: string;
  description: string;
};

// These are interests and possible experiments, not shipped projects.
export const currentInterests: CurrentInterest[] = [
  {
    id: "agents-with-boundaries",
    title: "有边界的 Agent",
    description:
      "想试着做一个帮我整理资料的 Agent。除了找到答案，也想弄清楚它应该读到哪里、什么时候停下来，以及出错后怎么办。",
  },
  {
    id: "jev-laya-experiments",
    title: "Jev / Laya 小实验",
    description:
      "想拿 Jev 和 Laya 做点小东西。对话里的情绪表达、试卷的快速导览，都是还在考虑的切入口，先挑一个具体问题试试。",
  },
  {
    id: "travel-notes",
    title: "旅行",
    description:
      "也想给旅行留一个位置，记下路上的所见和想法。等有想分享的经历，再慢慢整理成照片和文字。",
  },
  {
    id: "language-learning",
    title: "语言学习",
    description:
      "想把语言学习的过程也留在这里：一个表达、一段自己的讲解，或一次还没说清楚的尝试，都可以成为记录的起点。",
  },
];

export const journalAbout = {
  intro: "我是 HAONAN，一个喜欢把想法做成东西的软件工程师。",
  description:
    "我做了播客创作工具 Aodcast，也在自己的博客里写文章和说说。这里记录项目和写作，也想慢慢加入旅行与语言学习，把做过的东西和变化中的想法串起来。",
};

export const journalPrinciples = [
  "从一个具体问题写起，记下尝试、改变和新的疑问。",
  "做出的东西可以展示，没做完的想法也可以先留一笔。",
  "旧记录可以保留，新的理解继续往下写。",
];
