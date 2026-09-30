import type { Metadata } from "next";
import { AuthShell } from "@/components/admin/AuthShell";
import { ForgotPasswordForm } from "@/components/admin/AuthForms";

export const metadata: Metadata = { title: "Reset password" };

export default function ForgotPasswordPage() {
  return (
    <AuthShell title="Reset your password" subtitle="We'll email you a secure link to choose a new password.">
      <ForgotPasswordForm />
    </AuthShell>
  );
}
