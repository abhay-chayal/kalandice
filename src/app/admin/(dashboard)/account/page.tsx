import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { signOut } from "@/app/admin/auth-actions";
import { Card, PageHeader } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Account" };

export default async function AccountPage() {
  const { user } = await requireAdmin();

  return (
    <>
      <PageHeader title="Account" />
      <div className="space-y-4 max-w-xl">
        <Card className="space-y-1">
          <p className="text-xs uppercase tracking-wider text-[#536458] font-semibold">Signed in as</p>
          <p className="text-lg text-[#193323] font-semibold break-all">{user.email}</p>
        </Card>

        <Card className="space-y-3">
          <h2 className="font-serif-luxury text-lg font-bold text-[#193323]">Password</h2>
          <p className="text-sm text-[#536458]">Choose a new password for this dashboard. Your email password is not affected.</p>
          <Link
            href="/admin/set-password"
            className="inline-block px-5 py-2.5 rounded-full border border-[#5F8067]/30 text-sm font-semibold text-[#193323] hover:bg-[#193323] hover:text-[#D4AF37]"
          >
            Change password
          </Link>
        </Card>

        <Card className="space-y-3">
          <h2 className="font-serif-luxury text-lg font-bold text-[#193323]">Need help?</h2>
          <p className="text-sm text-[#536458]">
            If something on the website isn&apos;t working, contact your developer with a screenshot and a short note about what you were
            trying to do.
          </p>
        </Card>

        <form action={signOut}>
          <button type="submit" className="px-5 py-2.5 rounded-full text-sm font-semibold text-[#A33A26] hover:bg-[#A33A26]/10">
            Sign out
          </button>
        </form>
      </div>
    </>
  );
}
