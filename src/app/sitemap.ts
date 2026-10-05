import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPublishedPosts, getUpcomingEvents } from "@/lib/content/queries";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, events] = await Promise.all([getPublishedPosts(), getUpcomingEvents()]);

  // Pages that change when the CMS changes get a fresher lastmod than the static ones.
  const newestPost = posts[0]?.updated_at ?? new Date().toISOString();
  const newestEvent = events[0] ? new Date().toISOString() : undefined;

  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, priority: 1, changeFrequency: "weekly", lastModified: newestPost },
    { url: `${SITE_URL}/book`, priority: 0.9, changeFrequency: "monthly", lastModified: newestPost },
    { url: `${SITE_URL}/about`, priority: 0.8, changeFrequency: "yearly" },
    { url: `${SITE_URL}/poetics`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${SITE_URL}/blog`, priority: 0.8, changeFrequency: "weekly", lastModified: newestPost },
    { url: `${SITE_URL}/events`, priority: 0.7, changeFrequency: "weekly", lastModified: newestEvent },
    { url: `${SITE_URL}/resources`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${SITE_URL}/contact`, priority: 0.6, changeFrequency: "yearly" },
  ];

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updated_at,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...pages, ...postUrls];
}
