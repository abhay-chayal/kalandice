import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { deleteResource } from "@/app/admin/actions";
import { PageHeader } from "@/components/admin/ui";
import { ResourceEditor } from "@/components/admin/editors/ResourceEditor";
import { DeleteForm } from "@/components/admin/DeleteForm";
import type { Resource } from "@/lib/content/types";

export const metadata: Metadata = { title: "Edit resource" };

export default async function EditResourcePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("resources").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <>
      <PageHeader title="Edit resource" />
      <ResourceEditor resource={data as Resource} />
      <div className="mt-10 pt-6 border-t border-[#5F8067]/15">
        <DeleteForm id={id} action={deleteResource} label="Delete this resource" confirmMessage="Delete this resource permanently? This can't be undone." />
      </div>
    </>
  );
}
