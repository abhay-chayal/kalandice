import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { PageHeader } from "@/components/admin/ui";
import { PostEditor } from "@/components/admin/editors/PostEditor";

export const metadata: Metadata = { title: "New post" };

export default async function NewPostPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("posts").select("category");
  const categories = Array.from(new Set((data ?? []).map((r) => r.category as string)));

  return (
    <>
      <PageHeader title="New post" />
      <PostEditor categories={categories} />
    </>
  );
}
