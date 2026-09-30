import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { formatDate } from "@/lib/content/format";
import { Card, EmptyState, PageHeader, SavedBanner, StatusBadge } from "@/components/admin/ui";
import type { Post } from "@/lib/content/types";

export const metadata: Metadata = { title: "Blog Posts" };

export default async function PostsPage({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string }> }) {
  const { supabase } = await requireAdmin();
  const { saved, deleted } = await searchParams;
  const { data } = await supabase
    .from("posts")
    .select("id, slug, title, category, published, published_at, updated_at")
    .order("published", { ascending: true })
    .order("published_at", { ascending: false, nullsFirst: true });
  const posts = (data ?? []) as Pick<Post, "id" | "slug" | "title" | "category" | "published" | "published_at" | "updated_at">[];

  return (
    <>
      <PageHeader title="Blog Posts" description="Devotionals and essays shown on the Devotionals page." action={{ href: "/admin/posts/new", label: "+ New post" }} />
      <SavedBanner show={saved === "1"}>Saved! Your changes are live on the website.</SavedBanner>
      <SavedBanner show={deleted === "1"}>The post was deleted.</SavedBanner>

      {posts.length === 0 ? (
        <EmptyState>No posts yet. Click “New post” to write your first one.</EmptyState>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <Card key={post.id} className="!p-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <StatusBadge published={post.published} />
                    <span className="text-xs text-[#536458]">{post.category}</span>
                  </div>
                  <Link href={`/admin/posts/${post.id}`} className="font-serif-luxury text-lg font-bold text-[#193323] hover:text-[#5F8067]">
                    {post.title}
                  </Link>
                  <p className="text-xs text-[#536458] mt-0.5">
                    {post.published ? `Published ${formatDate(post.published_at)}` : `Last edited ${formatDate(post.updated_at)}`}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {post.published && (
                    <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#536458] hover:text-[#193323]">
                      View
                    </a>
                  )}
                  <Link href={`/admin/posts/${post.id}`} className="px-4 py-1.5 rounded-full border border-[#5F8067]/30 text-xs font-semibold text-[#193323] hover:bg-[#193323] hover:text-[#D4AF37]">
                    Edit
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
