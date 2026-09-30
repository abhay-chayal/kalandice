import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { PageHeader } from "@/components/admin/ui";
import { ResourceEditor } from "@/components/admin/editors/ResourceEditor";
import type { ResourceKind } from "@/lib/content/types";

export const metadata: Metadata = { title: "New resource" };

const KINDS: ResourceKind[] = ["playlist", "mental_health", "faith"];

export default async function NewResourcePage({ searchParams }: { searchParams: Promise<{ kind?: string }> }) {
  await requireAdmin();
  const { kind } = await searchParams;
  return (
    <>
      <PageHeader title="New resource" />
      <ResourceEditor defaultKind={KINDS.find((k) => k === kind)} />
    </>
  );
}
