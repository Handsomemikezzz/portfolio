const blog = {
  title: "Haonan’s Blog",
  url: "https://hn-blog-seven.vercel.app/",
  notesUrl: "https://hn-blog-seven.vercel.app/thoughts/",
  description:
    "记录关于 AI、工作与生活的思考，也留下一些简短的随笔。这里是作品之外，了解我的另一个入口。",
};

export const profile = {
  name: "HAONAN",
  roles: ["AI Engineer", "Agent Builder", "Maker"],
  introduction:
    "I build AI agents, software, experiments, and things I find interesting.",
  about: {
    intro: "我是一个喜欢构建东西的软件工程师。",
    description:
      "主要关注 AI Agent、Evaluation 和 AI-native products，同时也会做各种自己感兴趣的软件、视频和实验。",
  },
  blog,
  // Public links shared by the footer and About page. Add only real destinations.
  links: [
    {
      label: "GitHub",
      href: "https://github.com/Handsomemikezzz",
      detail: "@Handsomemikezzz",
    },
    {
      label: "Email",
      href: "mailto:cxh1210@mail.ustc.edu.cn",
      detail: "cxh1210@mail.ustc.edu.cn",
    },
    {
      label: "Blog",
      href: blog.url,
      detail: blog.title,
    },
  ],
};
