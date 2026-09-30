import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/admin/AuthShell";
import { SetPasswordForm } from "@/components/admin/AuthForms";
import { getAdminSession } from "@/lib/auth";

export const metadata: Metadata = { title: "Choose a password" };

// Reached from the invite / reset email (via /auth/confirm, which signs the
// person in) or from Account → Change password.
export default async function SetPasswordPage() {
  const session = await getAdminSession();
  if (session.status === "signed_out" || session.status === "unconfigured") redirect("/admin/login");

  return (
    <AuthShell title="Choose your password" subtitle={`Signed in as ${session.user.email}`}>
      <SetPasswordForm />
    </AuthShell>
  );
}
