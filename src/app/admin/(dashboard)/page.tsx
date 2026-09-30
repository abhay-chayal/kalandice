import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, CalendarDays, HeartHandshake, Mail, MessageSquareQuote, NotebookPen, Users } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { Card, SavedBanner } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Dashboard" };

export default async function AdminHome({ searchParams }: { searchParams: Promise<{ welcome?: string }> }) {
  const { supabase, user } = await requireAdmin();
  const { welcome } = await searchParams;

  const head = { count: "exact" as const, head: true };
  const [posts, drafts, events, books, resources, quotes, unread, subscribers] = (
    await Promise.all([
      supabase.from("posts").select("id", head).eq("published", true),
      supabase.from("posts").select("id", head).eq("published", false),
      supabase.from("events").select("id", head).eq("published", true),
      supabase.from("books").select("id", head),
      supabase.from("resources").select("id", head).eq("published", true),
      supabase.from("testimonials").select("id", head).eq("published", true),
      supabase.from("messages").select("id", head).eq("is_read", false),
      supabase.from("subscribers").select("id", head),
    ])
  ).map((r) => r.count ?? 0);

  const tiles = [
    { href: "/admin/posts", label: "Published posts", value: posts, note: drafts ? `${drafts} draft${drafts === 1 ? "" : "s"}` : "No drafts", icon: NotebookPen },
    { href: "/admin/events", label: "Live events", value: events, note: "Shown on Events", icon: CalendarDays },
    { href: "/admin/books", label: "Books", value: books, note: "Featured + upcoming", icon: BookOpen },
    { href: "/admin/resources", label: "Resources", value: resources, note: "Playlists, support, faith", icon: HeartHandshake },
    { href: "/admin/testimonials", label: "Reader quotes", value: quotes, note: quotes ? "Shown on the home page" : "Section hidden until you add one", icon: MessageSquareQuote },
    { href: "/admin/messages", label: "Unread messages", value: unread, note: "Contact, prayer, speaking", icon: Mail },
    { href: "/admin/subscribers", label: "Newsletter subscribers", value: subscribers, note: "Download as a spreadsheet", icon: Users },
  ];

  const firstName = (user.user_metadata?.name as string | undefined)?.split(" ")[0];

  return (
    <div className="space-y-10">
      <SavedBanner show={welcome === "1"}>Your password is saved. Welcome to your dashboard!</SavedBanner>

      <div>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#193323]">
          Welcome{firstName ? `, ${firstName}` : ""} 🌿
        </h1>
        <p className="text-sm text-[#536458] mt-1">Everything you change here appears on your website within a few seconds.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tiles.map(({ href, label, value, note, icon: Icon }) => (
          <Link key={href} href={href} className="group">
            <Card className="h-full transition-shadow group-hover:shadow-md">
              <div className="flex items-start justify-between">
                <p className="text-sm font-medium text-[#536458]">{label}</p>
                <Icon className="w-5 h-5 text-[#C9A44C]" />
              </div>
              <p className="font-serif-luxury text-4xl font-bold text-[#193323] mt-2">{value}</p>
              <p className="text-xs text-[#536458] mt-1">{note}</p>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <h2 className="font-serif-luxury text-xl font-bold text-[#193323] mb-4">Quick actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { href: "/admin/posts/new", label: "Write a new post" },
            { href: "/admin/events/new", label: "Add an event" },
            { href: "/admin/books", label: "Update book details" },
            { href: "/admin/messages", label: "Read messages" },
          ].map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="px-4 py-2 rounded-full border border-[#5F8067]/30 text-sm font-semibold text-[#193323] hover:bg-[#193323] hover:text-[#D4AF37] transition-colors"
            >
              {a.label}
            </Link>
          ))}
        </div>
      </Card>

      <Card className="bg-[#FAF7F2]">
        <h2 className="font-serif-luxury text-lg font-bold text-[#193323] mb-2">Good to know</h2>
        <ul className="text-sm text-[#536458] space-y-1.5 list-disc pl-5">
          <li>Anything saved as a <strong>Draft</strong> stays hidden from visitors until you tick “Published”.</li>
          <li>Events with a date disappear from the website automatically the day after they happen.</li>
          <li>Photos are resized automatically when you upload them — phone pictures are fine.</li>
        </ul>
      </Card>
    </div>
  );
}
