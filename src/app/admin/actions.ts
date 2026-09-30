"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/content/format";

type ActionState = { error?: string };

// ---------------------------------------------------------------------------
// Form helpers
// ---------------------------------------------------------------------------

function str(fd: FormData, name: string, max = 500) {
  return String(fd.get(name) ?? "").trim().slice(0, max);
}

function bool(fd: FormData, name: string) {
  return fd.get(name) === "on";
}

function int(fd: FormData, name: string) {
  const n = Number.parseInt(str(fd, name), 10);
  return Number.isFinite(n) ? n : 0;
}

class InvalidInput extends Error {}

// Links end up in href/src attributes, so only allow web (and mail) URLs —
// never javascript: or data: URLs.
function url(fd: FormData, name: string, label: string, { allowLocal = false, allowMailto = false } = {}) {
  const value = str(fd, name, 2000);
  if (!value) return null;
  if (allowLocal && value.startsWith("/") && !value.startsWith("//")) return value;
  if (allowMailto && value.startsWith("mailto:")) return value;
  try {
    const parsed = new URL(value);
    if (parsed.protocol === "https:" || parsed.protocol === "http:") return parsed.toString();
  } catch {
    // fall through
  }
  throw new InvalidInput(`${label} must be a full web address starting with https://`);
}

function dateOrNull(fd: FormData, name: string) {
  const value = str(fd, name, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null;
}

// Every page reads CMS content, so refresh the whole site after any change.
function refreshSite() {
  revalidatePath("/", "layout");
}

function friendlyDbError(error: { code?: string; message: string }, what: string) {
  console.error(`save ${what}`, error.message);
  if (error.code === "23505") return "Another item already uses this web address (slug). Please choose a different one.";
  return `Couldn't save the ${what}. Please try again.`;
}

async function run(what: string, fn: () => Promise<string | void>): Promise<ActionState> {
  try {
    const error = await fn();
    if (error) return { error };
  } catch (err) {
    if (err instanceof InvalidInput) return { error: err.message };
    throw err; // includes Next's redirect signal
  }
  return {};
}

// ---------------------------------------------------------------------------
// Blog posts
// ---------------------------------------------------------------------------

export async function savePost(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const id = str(fd, "id");

  const result = await run("post", async () => {
    const title = str(fd, "title", 200);
    if (!title) return "Please add a title.";

    const slug = slugify(str(fd, "slug", 100) || title);
    if (!slug) return "Please add a web address (slug) using letters or numbers.";

    const published = bool(fd, "published");
    const chosenDate = dateOrNull(fd, "published_at");

    const row = {
      title,
      slug,
      category: str(fd, "category", 60) || "Encouragement",
      excerpt: str(fd, "excerpt", 400),
      scripture: str(fd, "scripture", 300),
      content: str(fd, "content", 100_000),
      cover_image: url(fd, "cover_image", "Cover image", { allowLocal: true }),
      published,
      // Keep a chosen date; otherwise stamp the first time it goes live.
      published_at: chosenDate ? `${chosenDate}T12:00:00Z` : published ? new Date().toISOString() : null,
    };

    const { error } = id
      ? await supabase.from("posts").update(row).eq("id", id)
      : await supabase.from("posts").insert(row);
    if (error) return friendlyDbError(error, "post");
  });
  if (result.error) return result;

  refreshSite();
  redirect("/admin/posts?saved=1");
}

export async function deletePost(fd: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("posts").delete().eq("id", str(fd, "id"));
  refreshSite();
  redirect("/admin/posts?deleted=1");
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

export async function saveEvent(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const id = str(fd, "id");

  const result = await run("event", async () => {
    const title = str(fd, "title", 200);
    if (!title) return "Please add a title.";

    const row = {
      title,
      category: str(fd, "category", 60) || "Gathering",
      location: str(fd, "location", 200),
      date_label: str(fd, "date_label", 100),
      time_label: str(fd, "time_label", 100),
      event_date: dateOrNull(fd, "event_date"),
      description: str(fd, "description", 2000),
      link_url: url(fd, "link_url", "RSVP link"),
      image_url: url(fd, "image_url", "Event image", { allowLocal: true }),
      sort_order: int(fd, "sort_order"),
      published: bool(fd, "published"),
    };

    const { error } = id
      ? await supabase.from("events").update(row).eq("id", id)
      : await supabase.from("events").insert(row);
    if (error) return friendlyDbError(error, "event");
  });
  if (result.error) return result;

  refreshSite();
  redirect("/admin/events?saved=1");
}

export async function deleteEvent(fd: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("events").delete().eq("id", str(fd, "id"));
  refreshSite();
  redirect("/admin/events?deleted=1");
}

// ---------------------------------------------------------------------------
// Books
// ---------------------------------------------------------------------------

export async function saveBook(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const id = str(fd, "id");

  const result = await run("book", async () => {
    const title = str(fd, "title", 200);
    if (!title) return "Please add a title.";

    const status = str(fd, "status") === "coming_soon" ? "coming_soon" : "available";
    const featured = bool(fd, "featured");
    const row = {
      title,
      subtitle: str(fd, "subtitle", 200),
      description: str(fd, "description", 5000),
      scripture: str(fd, "scripture", 300),
      cover_image: url(fd, "cover_image", "Cover image", { allowLocal: true }),
      buy_url: url(fd, "buy_url", "Purchase link"),
      buy_label: str(fd, "buy_label", 80) || "Buy Now",
      themes: str(fd, "themes", 2000)
        .split(/\n|,/)
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 20),
      status,
      featured,
      sort_order: int(fd, "sort_order"),
      published: bool(fd, "published"),
    };

    const saved = id
      ? await supabase.from("books").update(row).eq("id", id).select("id").single()
      : await supabase.from("books").insert(row).select("id").single();
    if (saved.error) return friendlyDbError(saved.error, "book");

    // Only one book can lead the home page.
    if (featured) {
      await supabase.from("books").update({ featured: false }).neq("id", saved.data.id).eq("featured", true);
    }
  });
  if (result.error) return result;

  refreshSite();
  redirect("/admin/books?saved=1");
}

export async function deleteBook(fd: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("books").delete().eq("id", str(fd, "id"));
  refreshSite();
  redirect("/admin/books?deleted=1");
}

// ---------------------------------------------------------------------------
// Resources
// ---------------------------------------------------------------------------

const RESOURCE_KINDS = ["playlist", "mental_health", "faith"] as const;

export async function saveResource(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const id = str(fd, "id");

  const result = await run("resource", async () => {
    const title = str(fd, "title", 200);
    if (!title) return "Please add a title.";
    const link = url(fd, "url", "Link", { allowMailto: true });
    if (!link) return "Please add the link visitors should open.";

    const kindValue = str(fd, "kind");
    const kind = RESOURCE_KINDS.find((k) => k === kindValue) ?? "mental_health";

    const row = {
      kind,
      title,
      description: str(fd, "description", 1000),
      url: link,
      tag: str(fd, "tag", 60),
      sort_order: int(fd, "sort_order"),
      published: bool(fd, "published"),
    };

    const { error } = id
      ? await supabase.from("resources").update(row).eq("id", id)
      : await supabase.from("resources").insert(row);
    if (error) return friendlyDbError(error, "resource");
  });
  if (result.error) return result;

  refreshSite();
  redirect("/admin/resources?saved=1");
}

export async function deleteResource(fd: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("resources").delete().eq("id", str(fd, "id"));
  refreshSite();
  redirect("/admin/resources?deleted=1");
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export async function saveTestimonial(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const id = str(fd, "id");

  const result = await run("reader quote", async () => {
    const quote = str(fd, "quote", 1000);
    if (!quote) return "Please add the reader's words.";

    const rating = Math.min(5, Math.max(0, int(fd, "rating")));
    const row = {
      quote,
      author: str(fd, "author", 120),
      location: str(fd, "location", 120),
      rating,
      sort_order: int(fd, "sort_order"),
      published: bool(fd, "published"),
    };

    const { error } = id
      ? await supabase.from("testimonials").update(row).eq("id", id)
      : await supabase.from("testimonials").insert(row);
    if (error) return friendlyDbError(error, "reader quote");
  });
  if (result.error) return result;

  refreshSite();
  redirect("/admin/testimonials?saved=1");
}

export async function deleteTestimonial(fd: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("testimonials").delete().eq("id", str(fd, "id"));
  refreshSite();
  redirect("/admin/testimonials?deleted=1");
}

// ---------------------------------------------------------------------------
// Messages & subscribers (not shown publicly, so no site refresh needed)
// ---------------------------------------------------------------------------

export async function setMessageRead(fd: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("messages").update({ is_read: fd.get("is_read") === "true" }).eq("id", str(fd, "id"));
  revalidatePath("/admin", "layout");
}

export async function deleteMessage(fd: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("messages").delete().eq("id", str(fd, "id"));
  revalidatePath("/admin", "layout");
}

export async function deleteSubscriber(fd: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("subscribers").delete().eq("id", str(fd, "id"));
  revalidatePath("/admin/subscribers");
}
