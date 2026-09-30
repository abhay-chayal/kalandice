import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { deleteBook } from "@/app/admin/actions";
import { PageHeader } from "@/components/admin/ui";
import { BookEditor } from "@/components/admin/editors/BookEditor";
import { DeleteForm } from "@/components/admin/DeleteForm";
import type { Book } from "@/lib/content/types";

export const metadata: Metadata = { title: "Edit book" };

export default async function EditBookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("books").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <>
      <PageHeader title="Edit book" />
      <BookEditor book={data as Book} />
      <div className="mt-10 pt-6 border-t border-[#5F8067]/15">
        <DeleteForm id={id} action={deleteBook} label="Delete this book" confirmMessage="Delete this book permanently? This can't be undone." />
      </div>
    </>
  );
}
