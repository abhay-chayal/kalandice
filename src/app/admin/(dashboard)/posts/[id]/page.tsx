import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { deletePost } from "@/app/admin/actions";
import { PageHeader } from "@/components/admin/ui";
import { PostEditor } from "@/components/admin/editors/PostEditor";
import { DeleteForm } from "@/components/admin/DeleteForm";
import type { Post } from "@/lib/content/types";

export const metadata: Metadata = { title: "Edit post" };

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const [{ data: post }, { data: cats }] = await Promise.all([
    supabase.from("posts").select("*").eq("id", id).maybeSingle(),
    supabase.from("posts").select("category"),
  ]);
  if (!post) notFound();
  const categories = Array.from(new Set((cats ?? []).map((r) => r.category as string)));

  return (
    <>
      <PageHeader title="Edit post" />
      <PostEditor post={post as Post} categories={categories} />
      <div className="mt-10 pt-6 border-t border-[#5F8067]/15">
        <DeleteForm id={id} action={deletePost} label="Delete this post" confirmMessage="Delete this post permanently? This can't be undone." />
      </div>
    </>
  );
}
