import type { EngineeringProject } from "./schema";

// This case study is tied to a reviewed source snapshot, not a live CI claim.
const snapshot =
  "https://github.com/Handsomemikezzz/Aodcast/tree/cf23be5455c23c968d26f4e859d34fd57b08f7f5";
const source = snapshot.replace("/tree/", "/blob/");

export const aodcast: EngineeringProject = {
  id: "007",
  slug: "aodcast",
  title: "Aodcast",
  subtitle: "From a rough idea to a podcast you can revise.",
  year: 2026,
  category: "AI",
  format: "Desktop application",
  kind: "engineering",
  tags: ["AI workflows", "Local-first", "Audio generation"],
  featured: true,
  status: "In progress",
  contentLanguage: "zh-CN",
  cover: {
    src: "/images/aodcast/episodes-2026-06.jpg",
    width: 1024,
    height: 733,
    alt: "Aodcast 早期 Episodes 列表界面，原图中的节目名称已经模糊处理。侧栏仍使用早期 Studio 导航。",
    caption:
      "ARCHIVE / JUN 2026 — 真实历史界面，节目名称已在原图中模糊处理；不代表当前版本的导航。",
  },
  summary:
    "Aodcast 是一个本地优先的 macOS 播客创作应用。用户可以从一个想法开始访谈，也可以导入 Markdown，再生成和编辑脚本、选择声音、试听并导出音频。\n\n工程重点在于把生成过程做成可以修改、追踪和验证的产品：脚本有版本，语音计划绑定具体文本，音频分段保存，每次成片都有对应的渲染记录。\n\n目前是源码级 alpha，尚非经过完整加固的桌面发行版。本案例基于 2026-08-27 的 cf23be5 源码快照，测试证据采集于 2026-09-21。",
  evidence:
    "22/22 focused regression tests passed · mocked LLM/TTS · 21 SEP 2026",
  problem:
    "一次播客创作会跨越素材、脚本、声音与音频生成。只要用户修改一句话、切换声音或取消任务，就需要回答：当前音频来自哪个版本？是否仍然有效？失败后能否保留之前的成片？\n\nAodcast 围绕这条可反复修改的创作流程组织产品，把脚本作为中心工作区，将声音选择和音频状态放在创作上下文中。",
  role: "这是我的个人项目。我负责产品设计与主要开发，并使用 AI 编程工具辅助。\n\n案例展示的是应用流程、桌面端与 Python runtime 的集成，以及生成过程中的状态和产物管理。我使用第三方 LLM、TTS 模型和 MLX 等框架，完成应用层的集成与产品流程。",
  howItWorks:
    "01 / 输入一个主题，通过访谈补充内容；或导入 Markdown 作为版本化的来源快照。\n\n02 / 生成可编辑的脚本。选定的脚本文本进入 Speech Director，形成绑定文本 hash 的 Speech Plan，记录分段、停顿和表达指导。\n\n03 / 选择 Speaker Reference 和语音 provider，先做短片段试听，再进行完整渲染。provider adapter 负责翻译模型能力与参数。\n\n04 / 分段音频按 Render Manifest 装配为 WAV。发布前重新检查脚本、声音与当前 render，避免旧任务覆盖新状态；MP3 按需导出。",
  architecture: {
    description:
      "桌面界面通过 localhost HTTP bridge 调用 Python runtime。业务编排与 provider 实现分离，生成产物保存在本地，并通过 hash 和版本引用关联。以下是依据源码整理的职责边界。",
    steps: [
      {
        title: "React + Tauri / 创作工作区",
        description:
          "Episodes、脚本编辑、声音选择和音频操作。桌面壳负责窗口与 runtime 生命周期，业务流程交给 Python。",
      },
      {
        title: "HTTP bridge / 任务契约",
        description:
          "统一 request_state、进度、取消与轮询；run_token 区分同一任务的新旧运行，避免过期结果回写。",
      },
      {
        title: "Python orchestration / 生成流程",
        description:
          "访谈与脚本生成、Speech Director、分段渲染和音频装配。Speech Plan 与 Render Manifest 保存可检查的中间结构。",
      },
      {
        title: "Provider adapters / 模型边界",
        description:
          "接入本地 MLX TTS 和远程兼容接口，显式区分原生支持、近似支持与不支持的语音能力。",
      },
      {
        title: "Local artifacts / 版本与产物",
        description:
          "保存来源、脚本、声音引用、不可变音频分段和渲染记录；发布成片时重新检查当前状态，保留此前可用的音频。",
      },
    ],
  },
  hardProblems: [
    {
      title: "渲染结束时，用户可能已经改了脚本",
      description:
        "长任务从一个快照开始，但不能直接把这个快照写回当前项目。publish_render 在提交前重新读取项目，核对 script hash、active render 和 Speaker Reference，只更新渲染拥有的字段。对应回归测试验证了渲染期间编辑脚本时，旧结果不能覆盖新文本。",
    },
    {
      title: "一次局部重生成，不应丢掉整段音频的上下文",
      description:
        "局部重生成覆盖目标片段及相邻片段，外部片段复用已有产物。复用前校验音频 hash；新的窗口与装配都成功后才替换当前 render。测试检查 B/C/D 的替换、外部片段复用，以及被篡改的音频被拒绝。",
    },
    {
      title: "切换模型时，声音身份与表达控制不能混在一起",
      description:
        "Speaker Reference 描述谁在说话，Speech Plan 描述如何表达，adapter 承担模型特有的翻译。测试替身验证了声音引用的传递与上下文分离，但这不等于已经证明真实模型具有一致的音色或自然度。",
    },
  ],
  evaluation: {
    summary:
      "先验证可确定的工程行为，再单独评估生成质量。本次实际执行了 4 个测试模块，覆盖语音计划、音频装配、长任务状态和播客渲染，共 22 个测试，全部通过。\n\n这是一组有明确范围的回归检查，不是全仓库测试结论，也不是面向真实用户的任务成功率。",
    metrics: [
      {
        label: "Focused regression tests",
        value: "22 / 22",
        context: "2026-09-21 实际运行；使用 mock LLM 与正弦波 TTS 替身。",
        source: "/evidence/aodcast/regression-2026-09-21.txt",
      },
      {
        label: "Test modules",
        value: "4",
        context:
          "Speech Plan 5 项 · Audio Assembly 4 项 · Long Task State 4 项 · Podcast Rendering 9 项。",
        source: `${snapshot}/services/python-core/tests`,
      },
    ],
    methodology:
      "环境：Python 3.13.2，macOS / Apple Silicon。源码：cf23be5455c23c968d26f4e859d34fd57b08f7f5，执行前工作树干净。\n\n测试在临时目录中运行，不使用个人节目或声音素材。LLM 使用 mock provider，TTS 被替换为生成正弦波的测试实现。可下载完整命令与原始输出，复现相同范围的检查。\n\n尚未测量：真实模型的语音自然度、说话人相似度、端到端任务成功率、生成延迟与成本。本次也未重新运行完整桌面创作流程；测试耗时不应当作产品生成速度。",
  },
  demo: {
    description:
      "页面顶部保留了仓库中 2026 年 6 月的真实 Episodes 截图，展示项目已有的界面材料。当前版本已转向以脚本为中心的 Episode Workspace，因此不能把这张历史截图视为当前功能演示。\n\n现在可以通过公开仓库查看源码与本地运行步骤。访谈和脚本 smoke test 支持 mock LLM；真实音频仍需要本地模型或已配置的语音 provider。\n\n待补充的演示材料：一段使用可公开素材录制的「Markdown → 脚本编辑 → 试听 → 导出」视频，以及对应的真实音频样例。音频和录屏准备好后，可以在这里继续补充。",
    url: `${source}/README.zh-CN.md#快速启动`,
    linkLabel: "查看本地运行步骤",
  },
  learnings: [
    "从这套实现中可以提炼出一个设计原则：生成结果应当保留来源和版本关系，否则用户修改输入后，很难判断旧产物是否仍可使用。",
    "长任务的完成与发布需要分开处理。计算成功不代表结果仍然适合写回，最后一次状态校验是产品一致性的一部分。",
    "确定性回归测试与生成质量评估需要分别记录。前者可以验证不会错误覆盖数据，后者仍需要真实模型、固定样本和人工听评。",
  ],
  links: { github: "https://github.com/Handsomemikezzz/Aodcast" },
  references: [
    { label: "Reviewed source · cf23be5", url: snapshot },
    {
      label: "Render publication guard",
      url: `${source}/services/python-core/app/storage/project_store.py#L463`,
    },
    {
      label: "Rendering regression cases",
      url: `${source}/services/python-core/tests/test_podcast_rendering.py`,
    },
    {
      label: "Long-task regression cases",
      url: `${source}/services/python-core/tests/test_long_task_state.py`,
    },
    {
      label: "Full verification record · 21 SEP 2026",
      url: "/evidence/aodcast/regression-2026-09-21.txt",
    },
  ],
};
