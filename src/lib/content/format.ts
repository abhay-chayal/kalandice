export function formatDate(iso: string | null | undefined) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    timeZone: "UTC",
  });
}

export function readTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// Post bodies are plain text: blank lines separate paragraphs, a line starting
// with "## " is a subheading and "> " is a highlighted quote.
export type ContentBlock = { type: "p" | "h2" | "quote"; text: string };

export function parseContent(content: string): ContentBlock[] {
  return content
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("## ")) return { type: "h2", text: block.slice(3).trim() };
      if (block.startsWith(">")) {
        return {
          type: "quote",
          text: block
            .split("\n")
            .map((line) => line.replace(/^>\s?/, ""))
            .join("\n"),
        };
      }
      return { type: "p", text: block };
    });
}
