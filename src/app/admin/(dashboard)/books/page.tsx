import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { CmsImage } from "@/components/CmsImage";
import { Card, EmptyState, PageHeader, SavedBanner, StatusBadge } from "@/components/admin/ui";
import type { Book } from "@/lib/content/types";

export const metadata: Metadata = { title: "Books" };

export default async function BooksAdminPage({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string }> }) {
  const { supabase } = await requireAdmin();
  const { saved, deleted } = await searchParams;
  const { data } = await supabase
    .from("books")
    .select("*")
    .order("featured", { ascending: false })
    .order("sort_order", { ascending: true });
  const books = (data ?? []) as Book[];

  return (
    <>
      <PageHeader
        title="Books"
        description="Your featured book appears on the home page and the Book page. Add upcoming books to show them on the bookshelf."
        action={{ href: "/admin/books/new", label: "+ Add a book" }}
      />
      <SavedBanner show={saved === "1"}>Saved! Your changes are live on the website.</SavedBanner>
      <SavedBanner show={deleted === "1"}>The book was deleted.</SavedBanner>

      {books.length === 0 ? (
        <EmptyState>No books yet. Click “Add a book” to add one.</EmptyState>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {books.map((book) => (
            <Card key={book.id} className="flex gap-4">
              <div className="relative w-20 h-28 rounded-lg overflow-hidden bg-[#E5ECE6] shrink-0">
                {book.cover_image && <CmsImage src={book.cover_image} alt="" fill sizes="80px" className="object-cover" />}
              </div>
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex flex-wrap gap-1.5">
                  <StatusBadge published={book.published} />
                  {book.featured && <span className="px-2.5 py-0.5 rounded-full bg-[#193323] text-[#D4AF37] text-xs font-semibold">Featured</span>}
                  {book.status === "coming_soon" && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#C9A44C]/20 text-[#7A5E16] text-xs font-semibold">Coming soon</span>
                  )}
                </div>
                <p className="font-serif-luxury text-lg font-bold text-[#193323] truncate">{book.title}</p>
                <Link
                  href={`/admin/books/${book.id}`}
                  className="inline-block px-4 py-1.5 rounded-full border border-[#5F8067]/30 text-xs font-semibold text-[#193323] hover:bg-[#193323] hover:text-[#D4AF37]"
                >
                  Edit
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
