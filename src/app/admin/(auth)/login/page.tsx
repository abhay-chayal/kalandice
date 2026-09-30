import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell, NotConfiguredNotice } from "@/components/admin/AuthShell";
import { LoginForm } from "@/components/admin/AuthForms";
import { getAdminSession } from "@/lib/auth";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const session = await getAdminSession();
  if (session.status === "ok") redirect("/admin");
  const { error } = await searchParams;

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to manage your website.">
      {session.status === "unconfigured" ? <NotConfiguredNotice /> : <LoginForm linkError={error === "link"} />}
    </AuthShell>
  );
}
