import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { deleteEvent } from "@/app/admin/actions";
import { PageHeader } from "@/components/admin/ui";
import { EventEditor } from "@/components/admin/editors/EventEditor";
import { DeleteForm } from "@/components/admin/DeleteForm";
import type { SiteEvent } from "@/lib/content/types";

export const metadata: Metadata = { title: "Edit event" };

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("events").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <>
      <PageHeader title="Edit event" />
      <EventEditor event={data as SiteEvent} />
      <div className="mt-10 pt-6 border-t border-[#5F8067]/15">
        <DeleteForm id={id} action={deleteEvent} label="Delete this event" confirmMessage="Delete this event permanently? This can't be undone." />
      </div>
    </>
  );
}
