import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { PageHeader } from "@/components/admin/ui";
import { EventEditor } from "@/components/admin/editors/EventEditor";

export const metadata: Metadata = { title: "New event" };

export default async function NewEventPage() {
  await requireAdmin();
  return (
    <>
      <PageHeader title="New event" />
      <EventEditor />
    </>
  );
}
