import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { deleteTestimonial } from "@/app/admin/actions";
import { PageHeader } from "@/components/admin/ui";
import { TestimonialEditor } from "@/components/admin/editors/TestimonialEditor";
import { DeleteForm } from "@/components/admin/DeleteForm";
import type { Testimonial } from "@/lib/content/types";

export const metadata: Metadata = { title: "Edit reader quote" };

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("testimonials").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <>
      <PageHeader title="Edit reader quote" />
      <TestimonialEditor testimonial={data as Testimonial} />
      <div className="mt-10 pt-6 border-t border-[#5F8067]/15">
        <DeleteForm id={id} action={deleteTestimonial} label="Delete this quote" confirmMessage="Delete this quote permanently? This can't be undone." />
      </div>
    </>
  );
}
