import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { Card, EmptyState, PageHeader, SavedBanner, StatusBadge } from "@/components/admin/ui";
import type { Testimonial } from "@/lib/content/types";

export const metadata: Metadata = { title: "Reader Quotes" };

export default async function TestimonialsAdminPage({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string }> }) {
  const { supabase } = await requireAdmin();
  const { saved, deleted } = await searchParams;
  const { data } = await supabase.from("testimonials").select("*").order("sort_order", { ascending: true });
  const testimonials = (data ?? []) as Testimonial[];

  return (
    <>
      <PageHeader
        title="Reader Quotes"
        description="Kind words from readers, shown on your home page. The section stays hidden until you add at least one."
        action={{ href: "/admin/testimonials/new", label: "+ Add a quote" }}
      />
      <SavedBanner show={saved === "1"}>Saved! Your changes are live on the website.</SavedBanner>
      <SavedBanner show={deleted === "1"}>The quote was deleted.</SavedBanner>

      {testimonials.length === 0 ? (
        <EmptyState>
          No reader quotes yet, so this section is hidden on your website. Add a message someone has sent you about the
          book — with their permission — and it will appear on the home page.
        </EmptyState>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <Card key={t.id}>
              <div className="flex items-center gap-2 mb-2">
                <StatusBadge published={t.published} />
                <span className="text-xs text-[#536458]">
                  {[t.author, t.location].filter(Boolean).join(" • ") || "No name given"}
                </span>
              </div>
              <p className="font-serif-luxury italic text-sm text-[#254631] leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <Link
                href={`/admin/testimonials/${t.id}`}
                className="inline-block mt-4 px-4 py-1.5 rounded-full border border-[#5F8067]/30 text-xs font-semibold text-[#193323] hover:bg-[#193323] hover:text-[#D4AF37]"
              >
                Edit
              </Link>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
