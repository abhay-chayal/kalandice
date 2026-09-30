import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { PageHeader } from "@/components/admin/ui";
import { TestimonialEditor } from "@/components/admin/editors/TestimonialEditor";

export const metadata: Metadata = { title: "Add a reader quote" };

export default async function NewTestimonialPage() {
  await requireAdmin();
  return (
    <>
      <PageHeader title="Add a reader quote" />
      <TestimonialEditor />
    </>
  );
}
