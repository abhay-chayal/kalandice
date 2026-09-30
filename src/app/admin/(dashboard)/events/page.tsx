import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { formatDate } from "@/lib/content/format";
import { Card, EmptyState, PageHeader, SavedBanner, StatusBadge } from "@/components/admin/ui";
import type { SiteEvent } from "@/lib/content/types";

export const metadata: Metadata = { title: "Events" };

export default async function EventsAdminPage({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string }> }) {
  const { supabase } = await requireAdmin();
  const { saved, deleted } = await searchParams;
  const { data } = await supabase
    .from("events")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("event_date", { ascending: true, nullsFirst: false });
  const events = (data ?? []) as SiteEvent[];
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <PageHeader title="Events" description="Book signings, open mics, and speaking engagements." action={{ href: "/admin/events/new", label: "+ New event" }} />
      <SavedBanner show={saved === "1"}>Saved! Your changes are live on the website.</SavedBanner>
      <SavedBanner show={deleted === "1"}>The event was deleted.</SavedBanner>

      {events.length === 0 ? (
        <EmptyState>No events yet. Click “New event” to add one.</EmptyState>
      ) : (
        <div className="space-y-3">
          {events.map((ev) => {
            const past = ev.event_date !== null && ev.event_date < today;
            return (
              <Card key={ev.id} className="!p-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-5">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <StatusBadge published={ev.published} />
                      {past && <span className="px-2.5 py-0.5 rounded-full bg-[#536458]/15 text-[#536458] text-xs font-semibold">Past — hidden</span>}
                      <span className="text-xs text-[#536458]">{ev.category}</span>
                    </div>
                    <Link href={`/admin/events/${ev.id}`} className="font-serif-luxury text-lg font-bold text-[#193323] hover:text-[#5F8067]">
                      {ev.title}
                    </Link>
                    <p className="text-xs text-[#536458] mt-0.5">
                      {[ev.date_label || (ev.event_date ? formatDate(ev.event_date) : ""), ev.location].filter(Boolean).join(" • ")}
                    </p>
                  </div>
                  <Link
                    href={`/admin/events/${ev.id}`}
                    className="self-start sm:self-center px-4 py-1.5 rounded-full border border-[#5F8067]/30 text-xs font-semibold text-[#193323] hover:bg-[#193323] hover:text-[#D4AF37]"
                  >
                    Edit
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
