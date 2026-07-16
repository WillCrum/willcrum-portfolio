// Shared skill/filter taxonomy — used by both the Work and Archive page
// intros (and their tag-filter pills), so the list only needs updating once.
export const SKILL_TAGS = [
  "UI",
  "UX",
  "agentic dev",
  "design systems",
  "user research",
  "visual design",
  "AI/ML",
  "0->1",
];

// Archive-only additions — older grad-school work spans a wider range of
// disciplines than the Work page's tags cover. Kept separate so these never
// leak onto the Work page's own filter pills.
export const ARCHIVE_TAGS = [
  ...SKILL_TAGS,
  "writing",
  "speculative design",
  "industrial design",
  "experiential design",
  "service design",
  "policy design",
];
