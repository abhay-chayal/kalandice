import type { Metadata } from "next";
import { BlogIndexView } from "@/components/pages/BlogIndexView";
import { getPublishedPosts } from "@/lib/content/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Devotionals & Encouraging Words",
  description:
    "Devotional essays from Kalandice Thomas on faith, anxiety, waiting seasons, and finding God's peace in quiet hours.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();
  return <BlogIndexView posts={posts} />;
}
