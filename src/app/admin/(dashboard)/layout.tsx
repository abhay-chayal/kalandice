import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";
import { AuthShell, NotConfiguredNotice } from "@/components/admin/AuthShell";
import { getAdminSession } from "@/lib/auth";
import { signOut } from "@/app/admin/auth-actions";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  if (session.status === "unconfigured") {
    return (
      <AuthShell title="Almost there">
        <NotConfiguredNotice />
      </AuthShell>
    );
  }
  if (session.status === "signed_out") redirect("/admin/login");
  if (session.status === "forbidden") {
    return (
      <AuthShell title="No dashboard access" subtitle={`Signed in as ${session.user.email}`}>
        <p className="text-sm text-[#536458] text-center">
          This account isn&apos;t set up as a website admin. If you think that&apos;s a mistake, contact your developer.
        </p>
        <form action={signOut}>
          <button type="submit" className="w-full py-3 rounded-full border border-[#5F8067]/30 text-sm font-semibold text-[#193323] hover:bg-[#193323]/5">
            Sign out
          </button>
        </form>
      </AuthShell>
    );
  }

  const { count } = await session.supabase
    .from("messages")
    .select("id", { count: "exact", head: true })
    .eq("is_read", false);

  return (
    <>
      <AdminNav email={session.user.email ?? ""} unread={count ?? 0} />
      <main className="lg:pl-64">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 lg:py-12">{children}</div>
      </main>
    </>
  );
}
