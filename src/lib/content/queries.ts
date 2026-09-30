import "server-only";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/server";
import { fallbackBooks, fallbackEvents, fallbackPosts, fallbackResources, fallbackTestimonials } from "./fallback";
import type { Book, Post, Resource, ResourceGroups, SiteEvent, Testimonial } from "./types";

export type { ResourceGroups };

// Public read helpers. RLS on the anon key only returns published rows; the
// explicit published filter is kept so intent is obvious and indexes are used.
// On error we log and fall back to the built-in content rather than break the page.

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export async function getPublishedPosts(): Promise<Post[]> {
  if (!isSupabaseConfigured) return fallbackPosts;
  const { data, error } = await createPublicClient()
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false, nullsFirst: false });
  if (error) {
    console.error("getPublishedPosts", error.message);
    return fallbackPosts;
  }
  return data as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!isSupabaseConfigured) return fallbackPosts.find((p) => p.slug === slug) ?? null;
  const { data, error } = await createPublicClient()
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) {
    console.error("getPostBySlug", error.message);
    return null;
  }
  return data as Post | null;
}

// Events without a date are always shown; dated events disappear the day after they happen.
export async function getUpcomingEvents(): Promise<SiteEvent[]> {
  if (!isSupabaseConfigured) return fallbackEvents;
  const { data, error } = await createPublicClient()
    .from("events")
    .select("*")
    .eq("published", true)
    .or(`event_date.is.null,event_date.gte.${todayISO()}`)
    .order("sort_order", { ascending: true })
    .order("event_date", { ascending: true, nullsFirst: false });
  if (error) {
    console.error("getUpcomingEvents", error.message);
    return fallbackEvents;
  }
  return data as SiteEvent[];
}

export async function getBooks(): Promise<Book[]> {
  if (!isSupabaseConfigured) return fallbackBooks;
  const { data, error } = await createPublicClient()
    .from("books")
    .select("*")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("getBooks", error.message);
    return fallbackBooks;
  }
  return data as Book[];
}

// The featured book leads the home page and /book; if none is flagged, the first one does.
export async function getFeaturedBook(): Promise<{ featured: Book | null; others: Book[] }> {
  const books = await getBooks();
  const featured = books.find((b) => b.featured) ?? books[0] ?? null;
  return { featured, others: books.filter((b) => b !== featured) };
}



export async function getResources(): Promise<ResourceGroups> {
  let rows: Resource[] = fallbackResources;
  if (isSupabaseConfigured) {
    const { data, error } = await createPublicClient()
      .from("resources")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error) console.error("getResources", error.message);
    else rows = data as Resource[];
  }
  return {
    playlist: rows.filter((r) => r.kind === "playlist"),
    mental_health: rows.filter((r) => r.kind === "mental_health"),
    faith: rows.filter((r) => r.kind === "faith"),
  };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured) return fallbackTestimonials;
  const { data, error } = await createPublicClient()
    .from("testimonials")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("getTestimonials", error.message);
    return fallbackTestimonials;
  }
  return data as Testimonial[];
}
