import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { Card, EmptyState, PageHeader, SavedBanner, StatusBadge } from "@/components/admin/ui";
import { RESOURCE_KIND_LABELS } from "@/components/admin/editors/ResourceEditor";
import type { Resource, ResourceKind } from "@/lib/content/types";

export const metadata: Metadata = { title: "Resources" };

export default async function ResourcesAdminPage({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string }> }) {
  const { supabase } = await requireAdmin();
  const { saved, deleted } = await searchParams;
  const { data } = await supabase.from("resources").select("*").order("sort_order", { ascending: true });
  const resources = (data ?? []) as Resource[];

  return (
    <>
      <PageHeader
        title="Resources"
        description="Spotify playlists, mental health support, and faith links shown on the home page and the Resources page."
        action={{ href: "/admin/resources/new", label: "+ New resource" }}
      />
      <SavedBanner show={saved === "1"}>Saved! Your changes are live on the website.</SavedBanner>
      <SavedBanner show={deleted === "1"}>The resource was deleted.</SavedBanner>

      <div className="space-y-10">
        {(Object.keys(RESOURCE_KIND_LABELS) as ResourceKind[]).map((kind) => {
          const items = resources.filter((r) => r.kind === kind);
          return (
            <section key={kind} className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-serif-luxury text-xl font-bold text-[#193323]">{RESOURCE_KIND_LABELS[kind]}</h2>
                <Link href={`/admin/resources/new?kind=${kind}`} className="text-sm font-semibold text-[#5F8067] hover:text-[#193323]">
                  + Add
                </Link>
              </div>
              {items.length === 0 ? (
                <EmptyState>Nothing here yet.</EmptyState>
              ) : (
                items.map((r) => (
                  <Card key={r.id} className="!p-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-5">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <StatusBadge published={r.published} />
                          {r.tag && <span className="text-xs text-[#536458]">{r.tag}</span>}
                        </div>
                        <Link href={`/admin/resources/${r.id}`} className="font-serif-luxury text-lg font-bold text-[#193323] hover:text-[#5F8067]">
                          {r.title}
                        </Link>
                        <p className="text-xs text-[#536458] truncate">{r.url}</p>
                      </div>
                      <Link
                        href={`/admin/resources/${r.id}`}
                        className="self-start sm:self-center px-4 py-1.5 rounded-full border border-[#5F8067]/30 text-xs font-semibold text-[#193323] hover:bg-[#193323] hover:text-[#D4AF37]"
                      >
                        Edit
                      </Link>
                    </div>
                  </Card>
                ))
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
