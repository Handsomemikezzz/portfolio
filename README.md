# HAONAN — Notes & Things

一个慢慢生长的个人记录：项目、写作、旅行和语言学习。首页放尝试与想法，项目详情保留制作过程、技术笔记和可核对的资料。

最新内容方向见 [个人记录方向](docs/personal-journal-direction.md)。此前的能力展示与求职规划仅作为历史备忘，不再决定首页组织。

## 本地运行

需要 Node.js 20.9+（推荐 Node.js 24 LTS）。

```bash
npm ci
npm run dev
```

打开 <http://localhost:3000>。

```bash
npm run typecheck # TypeScript 检查
npm run build     # 生产构建，预渲染所有项目
npm start         # 本地预览静态生产构建
npm run check     # 类型检查 + 生产构建
```

无需数据库、CMS 或登录。网站随构建导出为静态文件，Next.js 图片由构建时直接提供，不需要线上 Node.js 服务器。字体、封面和内容均存储在本地；新增内容后，重新构建并部署即可。

## 发布到 Cloudflare Workers

网站已配置 Next.js 静态导出与 Cloudflare Workers Static Assets：`npm run check` 会生成 `out/`，`wrangler.jsonc` 会将其作为静态站点上传。`npm start` 使用 Wrangler 本地预览这个静态构建，`npm run deploy` 则可在已认证的环境手动发布。

连接 GitHub 自动发布时，在 Cloudflare 控制台打开 **Workers & Pages → Create application → Connect GitHub**，选择 `Handsomemikezzz/portfolio`；设置根目录 `/`、生产分支 `main`、构建命令 `npm run check`、部署命令 `npx wrangler deploy`。Wrangler 会读取仓库中的 `wrangler.jsonc` 与 `out/`。代码推送到 `main` 后，Cloudflare 自动构建和部署；账号授权需在 Cloudflare 控制台完成。

首次部署后检查首页、`/projects`、`/projects/aodcast`、刷新详情页、站内图片、报告下载以及未知页面的 404。确认 `workers.dev` 地址可用后，再在同一个 Worker 配置中添加自己的域名。

需要为内容编辑和静态导出保持一致：此站的详情路由都在构建时生成，发布新版必须重新构建。新增依赖时运行 `npm install` 并提交更新后的 `package-lock.json`；不要只推代码而漏掉锁文件。

## 页面与结构

```text
src/
  app/
    page.tsx                    # / 首页
    projects/page.tsx           # /projects 全部作品与分类筛选
    projects/[slug]/page.tsx    # /projects/[slug] 统一详情模板
    about/page.tsx              # /about 个人介绍
    layout.tsx                 # 共用布局、导航和 metadata
    globals.css                # 设计变量、组件样式、响应式规则
    not-found.tsx              # 未知页面/项目的 404 状态
  components/
    personal-card.tsx          # PersonalCard
    project-card.tsx           # ProjectCard、FeaturedProject、ProjectMeta
    project-grid.tsx           # ProjectGrid、CategoryFilter
    project-detail.tsx         # EvaluationPanel、ArchitectureSection 等
    writing-list.tsx           # 精选文章列表
    interest-notes.tsx         # 最近在想的事
    build-log.tsx              # BuildLog
    primitives.tsx             # SectionHeader、PlaceholderNote
    site-header.tsx
    site-footer.tsx
  content/
    schema.ts                  # 类型定义与分类列表
    projects.ts                # 所有项目：通常只需修改这个文件
    aodcast.ts                 # 第一个真实工程案例，可作为长案例范本
    capabilities.ts            # 历史能力映射，仅供内容维护参考
    journal.ts                 # 最近关注、About 简介和记录原则
    writing.ts                 # 已发表文章的标题、日期、简介和链接
    build-log.ts               # 按日期记录项目变化与写作
    profile.ts                 # 姓名、主题、博客与联系入口
public/
  images/                      # 项目封面、截图、架构图
  fonts/                       # 本地 Inter、IBM Plex Mono 与 OFL 授权
```

界面采用暖白 / 黑灰 / 少量橙色，使用本地字体、细边框和简单网格。只有导航高亮、作品分类筛选需要客户端逻辑。没有动画库、图标库、状态库或 Markdown 解析层；文本使用 TypeScript 数据直接维护。

视觉维护约定：Hero 使用编号、超大姓名和细边框形成个人模卡；重点作品采用大图与非对称网格，档案列表使用规则网格。项目状态放在图片外的标注栏，默认完整展示图片。详情页正文最大宽度 720px，段落约 65 字符，手机正文保持 16px。交互只使用短暂的颜色、边框和箭头过渡，触屏始终显示图片入口，尊重 reduced motion。配色、页边距和章节间距统一由 `globals.css` 顶部的 CSS 变量管理。

## 增加一个 Project

1. 将图片放入 `public/images/`，推荐约 1200 × 750，使用 WebP、AVIF、PNG 或 SVG。写入真实的 `alt` 描述。
2. 在 `src/content/projects.ts` 的 `projects` 数组中添加一条数据。`id` 与 `slug` 必须唯一；`slug` 使用小写英文与连字符。
3. 有实际可展示的内容后，将 `status` 改为 `In progress`、`Shipped` 或 `Archived`。如需进入首页“做过的东西”，设置 `featured: true`；最多显示 3 项。`note` 可写当前状态或制作感想，工程数据仍放在详情页。
4. 如需记录一次实际输出，在 `src/content/build-log.ts` 添加条目，并用 `projectSlug` 指向项目。
5. 运行 `npm run check`。页面、分类计数和详情路由会自动更新，不需要新增页面文件。

工程项目最小示例（这仍然是待填写的模板）：

```ts
{
  id: "009",
  slug: "my-next-agent",
  title: "My Next Agent",
  subtitle: "TODO — 用一句话说明它做什么。",
  year: 2026,
  category: "AI",
  format: "Agent",
  kind: "engineering",
  tags: ["Agent systems"],
  featured: false,
  status: "Placeholder",
  cover: {
    src: "/images/agent-system.svg", // 换成自己的真实预览
    alt: "概念占位图，尚未添加真实截图。",
  },
  summary: "TODO — 项目背景、用户与范围。",
  evidence: "TODO — 一个可验证的成果、演示或报告。",
  problem: "TODO — 为什么要做。",
  role: "TODO — 你本人负责什么。",
  howItWorks: "TODO — 从输入到输出的一次完整流程。",
  architecture: {
    description: "TODO — 组件、边界与数据流。",
    // diagram: { src: "/images/your-diagram.svg", alt: "实际系统架构" },
    // steps: [{ title: "组件名称", description: "组件的职责" }],
  },
  hardProblems: [],
  evaluation: {}, // 没有数据时保留为空，不填模拟分数
  learnings: [],
  // demo: { description: "可运行的演示说明", url: "真实的演示地址" },
  // links: { github: "真实仓库地址", website: "真实网站地址", video: "真实视频地址" },
}
```

工程模板固定保留：Overview、Why I Built It、My Role、How It Works、Architecture、Hard Problems、**Evaluation**、Demo、What I Learned、Links。未填写章节显示明确 TODO。Evaluation 与 Architecture 同级，不会因为没有数据而消失。

`evaluation` 可以提供 `summary`、`methodology` 和 `metrics`；每项 metric 包含 `label`、`value`、可选的 `context` 和 `source`（证据链接）。可记录 benchmark size、成功率、回归测试、延迟、成本、tool-call success，或分别添加 Before / After 指标。数据必须来自真实测量；建议在 `context` / `methodology` 写明样本、模型版本、日期、环境与单位。

创意项目使用相同基础字段，改成 `kind: "creative"`，可选填写 `story`、`process`、`demo`、`learnings`、`links`，不需要工程字段：

```ts
{
  id: "008",
  slug: "another-film",
  title: "Another Film",
  subtitle: "TODO — 作品的一句话介绍。",
  year: 2026,
  category: "Video",
  format: "AI video",
  kind: "creative",
  tags: [],
  featured: false,
  status: "Placeholder",
  cover: { src: "/images/short-film.svg", alt: "短片封面的概念占位图。" },
  summary: "TODO — 作品概念与本人贡献。",
  story: "TODO — 创作意图。",
  process: "TODO — 制作过程。",
}
```

`category` 控制筛选（AI / Software / Video / Experiments / Tools），`format` 是自由文本，可填写 Podcast、Utility、Application 等任意形式；两者互相独立。如需增加筛选分类，只修改 `schema.ts` 顶部的 `categories` 即可，按钮和计数自动生成。

`status` 支持 Placeholder / In progress / Shipped / Archived。`publishedProjects` 会排除 Placeholder；页面列表和详情路由都使用这份公开集合。6 个种子条目保留在数据文件里作为编辑参考，不在网站显示或生成详情页。当前公开作品为 Aodcast，时间线使用真实项目变更与已发表文章。

## 第一个真实案例：Aodcast

案例正文在 `src/content/aodcast.ts`，首页和详情页自动读取。它保留历史截图、产品与架构说明、本人确认的职责、具体工程问题、固定源码版本，以及本次实际执行的 22 项定向回归测试。测试使用 mock LLM / TTS 替身，不能当作真实语音质量或端到端成功率。

完整的整理方法、已使用的证据、下一步素材清单见 [项目沉淀指南](docs/project-playbook.md)。公开的原始测试记录在 `public/evidence/aodcast/`；大案例可以仿照 Aodcast 拆成独立数据文件，再从 `projects.ts` 导入。

## 日志与个人信息

沿途记录使用 `YYYY-MM-DD` 日期，自动按月分组并倒序排列。可以记一次项目修改、一篇文章或真实经历；`projectSlug` 链到项目，`href` 可指向公开文章。没有日期依据的计划放到 `journal.ts` 的“最近在想”，不填入时间线。

姓名、主题和联系信息在 `profile.ts`；当前关注、About 简介和记录原则在 `journal.ts`。若要修改 About 页的额外叙述，可编辑 `app/about/page.tsx`。字体和配色在 `globals.css` 顶部集中定义。

精选文章由 `writing.ts` 本地维护，文章正文留在博客。现有条目的标题、日期和链接已与公开 RSS 核对，构建时不请求博客服务；对应的发表记录自动加入时间线。旅行与语言学习目前只展示记录意愿，具体条目等待真实素材。

联系信息统一维护在 `profile.ts` 的 `links` 数组中，每项包含 `label`、`href`、`detail`。页脚展示简洁入口，About 页同时展示完整地址。邮箱使用 `mailto:`，其他外链使用 `https://`。新增简历或作品频道时添加真实链接即可，不需要修改组件；没有地址的条目先不添加。

About 页的博客介绍和文章／说说入口维护在 `profile.ts` 的 `blog` 对象中，页脚 Blog 链接复用同一个地址。新项目方向与需要收集的证据见 [项目方向草案](docs/project-directions.md)；其中尚未实现的规划不作为完成成果展示。

之前的 [内容规划](docs/content-plan.md) 和 [项目方向草案](docs/project-directions.md) 保留作为材料备忘。新的主页以个人记录为主，英语作为语言学习的一部分，不建立能力评级或求职优势模块。waytofree 仍按本人选择排除。

## 可访问性与检查

- 键盘可操作导航、筛选与锚点，提供 skip link 和明显焦点样式。
- 筛选使用 `aria-pressed`，结果数量通过 live region 告知辅助技术。
- 系统启用 reduced motion 时停用滚动动画和过渡。
- 不存在的 slug 返回 404，不呈现空项目。
- 检查 320 / 375 / 390 / 768 / 1024 / 1440px，并测试真实长标题、长链接与中文内容。

框架会自动生成根目录的 `AGENTS.md` / `CLAUDE.md` 作为后续编码工具的版本提示，它们不参与网站运行。
