import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { PageHeader } from "@/components/admin/ui";
import { BookEditor } from "@/components/admin/editors/BookEditor";

export const metadata: Metadata = { title: "Add a book" };

export default async function NewBookPage() {
  await requireAdmin();
  return (
    <>
      <PageHeader title="Add a book" />
      <BookEditor />
    </>
  );
}
