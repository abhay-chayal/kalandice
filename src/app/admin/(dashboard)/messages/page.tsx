import type { Metadata } from "next";
import Link from "next/link";
import { Check, Mail, Trash2 } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { deleteMessage, setMessageRead } from "@/app/admin/actions";
import { ActionButton } from "@/components/admin/client";
import { Card, EmptyState, PageHeader } from "@/components/admin/ui";
import type { Message, MessageKind } from "@/lib/content/types";

export const metadata: Metadata = { title: "Messages" };

const KIND_LABELS: Record<MessageKind, { label: string; className: string }> = {
  general: { label: "Message", className: "bg-[#5F8067]/15 text-[#254631]" },
  prayer: { label: "Prayer request", className: "bg-[#C9A44C]/20 text-[#7A5E16]" },
  speaking: { label: "Speaking invitation", className: "bg-[#193323] text-[#D4AF37]" },
};

const FILTERS = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "general", label: "Messages" },
  { key: "prayer", label: "Prayer" },
  { key: "speaking", label: "Speaking" },
];

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Chicago" });
}

export default async function MessagesPage({ searchParams }: { searchParams: Promise<{ filter?: string }> }) {
  const { supabase } = await requireAdmin();
  const { filter = "all" } = await searchParams;

  let query = supabase.from("messages").select("*").order("created_at", { ascending: false }).limit(200);
  if (filter === "unread") query = query.eq("is_read", false);
  else if (filter === "general" || filter === "prayer" || filter === "speaking") query = query.eq("kind", filter);
  const { data } = await query;
  const messages = (data ?? []) as Message[];

  return (
    <>
      <PageHeader
        title="Messages"
        description="Everything sent through the contact form, prayer box, and speaking request form. Prayer requests are private — only you can see them."
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => (
          <Link
            key={f.key}
            href={f.key === "all" ? "/admin/messages" : `/admin/messages?filter=${f.key}`}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              filter === f.key ? "bg-[#193323] text-[#D4AF37] border-[#193323]" : "border-[#5F8067]/30 text-[#193323] hover:bg-[#193323]/5"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {messages.length === 0 ? (
        <EmptyState>No messages here yet.</EmptyState>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => {
            const kind = KIND_LABELS[m.kind];
            return (
              <Card key={m.id} className={m.is_read ? "opacity-80" : "border-[#C9A44C]/60"}>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {!m.is_read && <span className="w-2 h-2 rounded-full bg-[#C9A44C]" aria-label="Unread" />}
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${kind.className}`}>{kind.label}</span>
                  <span className="text-xs text-[#536458]">{formatWhen(m.created_at)}</span>
                </div>

                <div className="text-sm text-[#193323] space-y-0.5 mb-3">
                  <p className="font-semibold">
                    {m.name || m.organization || "Anonymous"}{" "}
                    <a href={`mailto:${m.email}`} className="font-normal text-[#5F8067] hover:underline">
                      &lt;{m.email}&gt;
                    </a>
                  </p>
                  {m.kind === "speaking" && (
                    <p className="text-xs text-[#536458]">
                      {[m.organization, m.location, m.event_date].filter(Boolean).join(" • ")}
                    </p>
                  )}
                </div>

                <p className="text-sm text-[#254631] whitespace-pre-line leading-relaxed">{m.message}</p>

                <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-[#5F8067]/10">
                  <a
                    href={`mailto:${m.email}?subject=${encodeURIComponent("Re: your message to Kalandice")}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#193323] text-[#D4AF37] text-xs font-semibold hover:bg-[#254631]"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Reply by email
                  </a>
                  <form action={setMessageRead}>
                    <input type="hidden" name="id" value={m.id} />
                    <input type="hidden" name="is_read" value={m.is_read ? "false" : "true"} />
                    <ActionButton>
                      <Check className="w-3.5 h-3.5" />
                      {m.is_read ? "Mark unread" : "Mark read"}
                    </ActionButton>
                  </form>
                  <form action={deleteMessage}>
                    <input type="hidden" name="id" value={m.id} />
                    <ActionButton variant="danger" confirmMessage="Delete this message permanently?">
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </ActionButton>
                  </form>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
