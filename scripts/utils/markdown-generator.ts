import { type PromptRecord, type SortedPromptData } from "./cms-client.js";
import { SUPPORTED_LANGUAGES, t } from "./i18n.js";

const REPO = "awesome-seedance-2.5-prompts";
const REPO_URL = "https://github.com/AtlasCloudAI/awesome-seedance-2.5-prompts";
const UTM = `?utm_source=github&utm_campaign=${REPO}`;

function buildCategoryAnchor(index: number): string {
  return `category-${index + 1}`;
}

function buildLocalePrefix(locale: string): string {
  return locale === "en" ? "" : `/${locale}`;
}

function buildPromptLibraryUrl(locale: string): string {
  return `https://www.atlascloud.ai${buildLocalePrefix(locale)}/seedance-2.5-prompt${UTM}`;
}

function buildModelUrl(locale: string): string {
  return `https://www.atlascloud.ai${buildLocalePrefix(locale)}/models/bytedance/seedance-2.5/text-to-video${UTM}`;
}

function renderBadges(promptCount: number): string {
  return [
    "[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)",
    `[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)`,
    `[![GitHub stars](https://img.shields.io/github/stars/AtlasCloudAI/awesome-seedance-2.5-prompts?style=social)](${REPO_URL})`,
    `[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](${REPO_URL}/pulls)`,
    `[![Prompts](https://img.shields.io/badge/prompts-${promptCount}%2B-blue.svg)](${REPO_URL})`,
  ].join("\n");
}

function renderSupportedModels(): string {
  return [
    "## 🧩 Supported Models",
    "",
    "- 🎬 **Video** — Seedance 2.5 · Seedance 2.0 · Seedance 2.0 Mini · Kling 3 · Sora 2 · Veo 3.1 · HappyHorse 1 · Grok Imagine 1.5 · Wan 2.7",
    "- 🎨 **Image** — Seedream 5.0 Pro · Nano Banana 2/Pro · GPT Image 2 · Flux 2 · Seedream 5",
    "- 🧊 **3D** — Seed3D 2.0 · Hunyuan 3D Pro · Hunyuan 3D Rapid",
    "- 💬 **LLM** — Claude · GPT · DeepSeek · MiniMax · Kimi · GLM · Qwen",
    "- 🔊 **Audio** — Grok TTS",
    `- 📚 **Explore more** — [300+ models »](https://www.atlascloud.ai/models${UTM})`,
    "",
  ].join("\n");
}

function renderRunAnyPrompt(): string {
  return [
    "## ▶ Run any prompt via Atlas Cloud",
    "",
    "**Skill (recommended):** Install [atlas-cloud-skills](https://github.com/AtlasCloudAI/atlas-cloud-skills) in Claude Code, Codex, or Gemini CLI, then just ask it to generate any prompt from this collection.",
    "",
    "**CLI:** Prefer the terminal? Use [atlascloud-cli](https://github.com/AtlasCloudAI/cli) to run prompts directly.",
    "",
    `**[→ Get your free Atlas Cloud API key](https://www.atlascloud.ai/console/api-keys${UTM})**`,
    "",
  ].join("\n");
}

function renderMoreTools(): string {
  return [
    "## More Atlas Cloud Tools",
    "",
    "- [atlascloud-cli](https://github.com/AtlasCloudAI/cli) — run prompts from your terminal.",
    "- 🔌 [MCP Server](https://github.com/AtlasCloudAI/mcp-server) — connect Atlas Cloud to any MCP client.",
    "- [atlas-cloud-skills](https://github.com/AtlasCloudAI/atlas-cloud-skills) — skills for Claude Code, Codex, and Gemini CLI.",
    "- [atlascloud_comfyui](https://github.com/AtlasCloudAI/atlascloud_comfyui) — ComfyUI nodes for Atlas Cloud.",
    "- [n8n-nodes-atlascloud](https://github.com/AtlasCloudAI/n8n-nodes-atlascloud) — n8n automation nodes.",
    "- [Discord](https://discord.gg/MWmMr4q9es) — join the community.",
    `- [Website](https://www.atlascloud.ai${UTM}) — explore all models and docs.`,
    "",
  ].join("\n");
}

function renderContents(data: SortedPromptData, locale: string): string {
  const lines = ["## 📖 Contents", ""];
  // 模拟 GitHub 锚点：emoji/标点被删、空格转 -，不 trim（emoji 前缀留下前导 -）
  const anchor = (heading: string) =>
    heading
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  lines.push(`- [🌐 ${t("viewInGallery", locale)}](#${anchor("🌐 " + t("viewInGallery", locale))})`);
  lines.push("- [🧩 Supported Models](#-supported-models)");
  lines.push("- [▶ Run any prompt via Atlas Cloud](#-run-any-prompt-via-atlas-cloud)");
  lines.push(`- [📊 ${t("stats", locale)}](#${anchor("📊 " + t("stats", locale))})`);
  lines.push(`- [🏷️ ${t("browseByCategory", locale)}](#${anchor("🏷️ " + t("browseByCategory", locale))})`);
  lines.push(`- [🔥 ${t("featuredPrompts", locale)}](#${anchor("🔥 " + t("featuredPrompts", locale))})`);
  lines.push(`- [📋 ${t("allPrompts", locale)}](#${anchor("📋 " + t("allPrompts", locale))})`);
  lines.push("- [More Atlas Cloud Tools](#more-atlas-cloud-tools)");
  lines.push(`- [📄 ${t("license", locale)}](#${anchor("📄 " + t("license", locale))})`);
  lines.push("");
  return lines.join("\n");
}

function renderLanguageNavigation(currentLocale: string): string {
  const badges = SUPPORTED_LANGUAGES.map((lang) => {
    const isCurrent = lang.code === currentLocale;
    const color = isCurrent ? "brightgreen" : "lightgrey";
    const text = isCurrent ? t("current", currentLocale) : t("view", currentLocale);
    return `[![${lang.name}](https://img.shields.io/badge/${encodeURIComponent(lang.name)}-${encodeURIComponent(text)}-${color})](${REPO_URL}/blob/main/${lang.readmeFileName})`;
  }).join(" ");

  return `${badges}\n\n---\n`;
}

function renderPrompt(prompt: PromptRecord, index: number, locale: string): string {
  const lines = [
    `### No. ${index + 1}: ${prompt.title}`,
    "",
    `- **${t("category", locale)}:** \`${prompt.category}\``,
    `- **${t("source", locale)}:** \`${prompt.source_platform}\``,
    `- **${t("author", locale)}:** ${prompt.author_name}`,
    `- **${t("language", locale)}:** \`${prompt.language}\``,
  ];

  if (prompt.video_url) {
    lines.push(`- **${t("video", locale)}:** [${t("view", locale)}](${prompt.video_url})`);
    lines.push("");
    lines.push(`<video src="${prompt.video_url}" controls muted playsinline width="720"></video>`);
  }

  if (prompt.source_link) {
    lines.push(`- **${t("sourceLink", locale)}:** [${t("view", locale)}](${prompt.source_link})`);
  }

  lines.push(
    "",
    `#### ${t("description", locale)}`,
    "",
    prompt.description,
    "",
    `#### ${t("prompt", locale)}`,
    "",
    "```text",
    prompt.prompt,
    "```",
    ""
  );

  return lines.join("\n");
}

function renderModelIntro(locale: string): string {
  if (locale === "zh") {
    return [
      "## 🤔 Seedance 2.5 模型简介",
      "",
      "Seedance 2.5 是 Seedance 2.0 的重大升级，带来三大提升：① 30 秒原生输出（从 15 秒翻倍），完整场景一镜到底、无需拼接；② 最多 50 个全模态参考素材（图片 / 视频 / 音频），同类最大参考容量，精准的参考驱动创作；③ 灵活的局部编辑，可单独替换背景、产品或主体而不破坏画面其余部分。延续 2.0 的多模态音画生成，叠加约 20% 的提示词遵循提升与原生 4K，特别适合参考驱动、复杂运镜、情绪表演、音乐卡点和视频改写等任务。",
      "",
      "- 建议先明确主体、场景、动作，再补充镜头语言、节奏和风格细节。",
      "- 涉及参考图、参考视频或配音时，提示词里可以直接使用 `@image1`、`@video1`、`@audio1` 这样的占位符。",
      "- 更长的 30 秒时长适合完整叙事、连续运镜与音画同步；4K 原生输出适合高清成片和商业交付。",
      "- 适合广告短片、剧情延展、运镜练习、角色一致性、MV、音画同步和创意特效类题材。",
      "",
      "### 推荐写法",
      "",
      "- 主体: 先写清主角、物体或产品。",
      "- 动作: 说明发生了什么，以及环境如何响应。",
      "- 运镜: 补充推拉摇移、环绕、跟拍、俯拍、特写等镜头指令。",
      "- 风格: 加入电影光影、材质、氛围、节奏、色彩和音频信息。",
      "",
    ].join("\n");
  }

  if (locale === "zh-TW") {
    return [
      "## 🤔 Seedance 2.5 模型簡介",
      "",
      "Seedance 2.5 是 Seedance 2.0 的重大升級，帶來三大提升：① 30 秒原生輸出（從 15 秒翻倍），完整場景一鏡到底、無需拼接；② 最多 50 個全模態參考素材（圖片 / 影片 / 音訊），同類最大參考容量，精準的參考驅動創作；③ 靈活的局部編輯，可單獨替換背景、產品或主體而不破壞畫面其餘部分。延續 2.0 的多模態音畫生成，疊加約 20% 的提示詞遵循提升與原生 4K，特別適合參考驅動、複雜運鏡、情緒表演、音樂卡點與影片改寫等任務。",
      "",
      "- 建議先明確主體、場景與動作，再補充鏡頭語言、節奏與風格細節。",
      "- 涉及參考圖、參考影片或配音時，提示詞中可以直接使用 `@image1`、`@video1`、`@audio1` 這類佔位符。",
      "- 更長的 30 秒時長適合完整敘事、連續運鏡與音畫同步；4K 原生輸出適合高清成片與商業交付。",
      "- 適合廣告短片、劇情延展、運鏡練習、角色一致性、MV、音畫同步與創意特效類題材。",
      "",
      "### 推薦寫法",
      "",
      "- 主體: 先寫清主角、物體或產品。",
      "- 動作: 說明發生了什麼，以及環境如何回應。",
      "- 運鏡: 補充推拉搖移、環繞、跟拍、俯拍、特寫等鏡頭指令。",
      "- 風格: 加入電影光影、材質、氛圍、節奏、色彩與音訊資訊。",
      "",
    ].join("\n");
  }

  return [
    "## 🤔 Seedance 2.5 Overview",
    "",
    "Seedance 2.5 is a major upgrade to Seedance 2.0 with three big gains: 30-second native clips (up from 15s) for complete scenes without stitching; up to 50 multimodal references (image / video / audio) — the largest reference capacity in its class — for precise reference-driven control; and flexible region editing to swap backgrounds, products or subjects without breaking the rest of the shot. It keeps 2.0's multimodal audio-video generation, adds ~20% better prompt adherence and native 4K — great for reference-driven shots, advanced camera language, emotional acting, beat sync, and video remix.",
    "",
    "- Start with a clear subject, scene, and action, then add camera movement, pacing, mood, and style details.",
    "- When using references, keep placeholders like `@image1`, `@video1`, and `@audio1` explicit in the prompt.",
    "- The longer 30s duration suits full narratives, continuous camera moves, and audio sync; native 4K output suits high-res finals and commercial delivery.",
    "- Great for ad creatives, narrative extension, consistency control, MV production, cinematic effects, and stylized short-form storytelling.",
    "",
    "### Recommended Structure",
    "",
    "- Subject: define the main character, object, or product.",
    "- Action: describe what happens and how the environment reacts.",
    "- Camera: add dolly, pan, orbit, tracking, aerial, or close-up directions.",
    "- Style: include lighting, texture, pace, mood, color, and audio cues.",
    "",
  ].join("\n");
}

export function generateMarkdown(data: SortedPromptData, locale: string): string {
  const now = new Date().toISOString();
  const lines: string[] = [];
  const promptsByCategory = new Map<string, PromptRecord[]>();

  for (const prompt of data.all) {
    const categoryPrompts = promptsByCategory.get(prompt.category) || [];
    categoryPrompts.push(prompt);
    promptsByCategory.set(prompt.category, categoryPrompts);
  }

  lines.push(`# 🎬 ${t("title", locale)}`);
  lines.push("");
  lines.push(renderBadges(data.stats.total));
  lines.push("");
  lines.push(`> ${t("subtitle", locale)}`);
  lines.push("");
  lines.push(`> ${t("copyright", locale)}`);
  lines.push("");
  lines.push(renderLanguageNavigation(locale));
  lines.push(renderContents(data, locale));
  lines.push(`## 🌐 ${t("viewInGallery", locale)}`);
  lines.push("");
  lines.push(`- ${t("promptLibrary", locale)}: [${t("view", locale)}](${buildPromptLibraryUrl(locale)})`);
  lines.push(`- ${t("modelPage", locale)}: [${t("view", locale)}](${buildModelUrl(locale)})`);
  lines.push("");
  lines.push(renderSupportedModels());
  lines.push(renderRunAnyPrompt());
  lines.push(renderModelIntro(locale));
  lines.push(`## 📊 ${t("stats", locale)}`);
  lines.push("");
  lines.push(`| ${t("metric", locale)} | ${t("count", locale)} |`);
  lines.push("|--------|-------|");
  lines.push(`| ${t("totalPrompts", locale)} | **${data.stats.total}** |`);
  lines.push(`| ${t("categories", locale)} | **${data.categoryCounts.length}** |`);
  lines.push(`| ${t("previewVideos", locale)} | **${data.stats.videos}** |`);
  lines.push(`| ${t("lastUpdated", locale)} | **${now}** |`);
  lines.push("");
  lines.push(`## 🏷️ ${t("browseByCategory", locale)}`);
  lines.push("");

  data.categoryCounts.forEach((item, index) => {
    const anchor = buildCategoryAnchor(index);
    lines.push(`- [\`${item.category}\`](#${anchor}): **${item.count}**`);
  });

  lines.push("");
  lines.push(`## 🔥 ${t("featuredPrompts", locale)}`);
  lines.push("");
  data.featured.forEach((prompt, index) => lines.push(renderPrompt(prompt, index, locale)));
  lines.push(`## 📋 ${t("allPrompts", locale)}`);
  lines.push("");

  data.categoryCounts.forEach((item, index) => {
    const anchor = buildCategoryAnchor(index);
    const prompts = promptsByCategory.get(item.category) || [];
    lines.push(`<a id="${anchor}"></a>`);
    lines.push("");
    lines.push(`### ${item.category} (${prompts.length})`);
    lines.push("");
    prompts.forEach((prompt, promptIndex) => lines.push(renderPrompt(prompt, promptIndex, locale)));
  });

  lines.push(`## ${t("localUsage", locale)}`);
  lines.push("");
  lines.push("```bash");
  lines.push("npm install");
  lines.push("npm run build-all");
  lines.push("```");
  lines.push("");
  lines.push(renderMoreTools());
  lines.push(`## 📄 ${t("license", locale)}`);
  lines.push("");
  lines.push("[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)");
  lines.push("");
  lines.push(`> ${t("autoGenerated", locale)} ${now}`);
  lines.push("");

  return lines.join("\n");
}
