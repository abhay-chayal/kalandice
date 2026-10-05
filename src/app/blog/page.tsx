import type { Metadata } from "next";
import { BlogIndexView } from "@/components/pages/BlogIndexView";
import { getPublishedPosts } from "@/lib/content/queries";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "Devotionals & Encouraging Words",
  description:
    "Devotional essays from Kalandice Thomas on faith, anxiety, waiting seasons and finding God's peace in quiet hours.",
  path: "/blog",
});

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();
  return <BlogIndexView posts={posts} />;
}
