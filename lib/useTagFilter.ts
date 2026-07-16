import { useMemo, useState } from "react";

/** Multi-tag AND filter: an item passes once every selected tag is present
 * in its own `tags` array. Shared by the Work and Archive pages. */
export function useTagFilter<T extends { tags: string[] }>(items: T[]) {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  function toggleTag(tag: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  }

  function resetTags() {
    setSelectedTags(new Set());
  }

  const visibleItems = useMemo(() => {
    if (selectedTags.size === 0) return items;
    return items.filter((item) =>
      [...selectedTags].every((tag) => item.tags.includes(tag)),
    );
  }, [items, selectedTags]);

  return { selectedTags, toggleTag, resetTags, visibleItems };
}
