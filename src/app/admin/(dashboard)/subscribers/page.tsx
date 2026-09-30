import type { Metadata } from "next";
import { Download, Trash2 } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { deleteSubscriber } from "@/app/admin/actions";
import { ActionButton } from "@/components/admin/client";
import { Card, EmptyState, PageHeader } from "@/components/admin/ui";
import { formatDate } from "@/lib/content/format";
import type { Subscriber } from "@/lib/content/types";

export const metadata: Metadata = { title: "Subscribers" };

export default async function SubscribersPage() {
  const { supabase } = await requireAdmin();
  const { data, count } = await supabase
    .from("subscribers")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .limit(1000);
  const subscribers = (data ?? []) as Subscriber[];

  return (
    <>
      <PageHeader
        title="Newsletter Subscribers"
        description="People who signed up for your monthly encouragement letter. Download the list to import it into Mailchimp, Flodesk, or Gmail."
      />

      <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="font-serif-luxury text-3xl font-bold text-[#193323]">{count ?? 0}</p>
          <p className="text-sm text-[#536458]">total subscribers</p>
        </div>
        {/* Plain link on purpose: it's a file download, not a page */}
        <a
          href="/admin/subscribers/export"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#193323] text-[#D4AF37] font-semibold text-sm hover:bg-[#254631]"
        >
          <Download className="w-4 h-4" />
          Download spreadsheet (CSV)
        </a>
      </Card>

      {subscribers.length === 0 ? (
        <EmptyState>No subscribers yet. They&apos;ll appear here when people sign up on the home page.</EmptyState>
      ) : (
        <Card className="!p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#FAF7F2] text-left text-xs uppercase tracking-wider text-[#536458]">
              <tr>
                <th className="px-5 py-3 font-semibold">Email</th>
                <th className="px-5 py-3 font-semibold hidden sm:table-cell">Joined</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s.id} className="border-t border-[#5F8067]/10">
                  <td className="px-5 py-3 text-[#193323] break-all">{s.email}</td>
                  <td className="px-5 py-3 text-[#536458] hidden sm:table-cell whitespace-nowrap">{formatDate(s.created_at)}</td>
                  <td className="px-5 py-3 text-right">
                    <form action={deleteSubscriber}>
                      <input type="hidden" name="id" value={s.id} />
                      <ActionButton variant="danger" title="Remove subscriber" confirmMessage={`Remove ${s.email} from the list?`}>
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Remove</span>
                      </ActionButton>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </>
  );
}
