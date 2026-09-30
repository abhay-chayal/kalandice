"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { requestPasswordReset, setPassword, signIn, type AuthState } from "@/app/admin/auth-actions";
import { inputClass } from "./ui";

function Submit({ pending, children }: { pending: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#193323] text-[#D4AF37] font-semibold text-sm hover:bg-[#254631] transition-colors disabled:opacity-60"
    >
      {pending && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}

function Feedback({ state }: { state: AuthState }) {
  if (state.error) {
    return (
      <p role="alert" className="text-sm text-[#A33A26]">
        {state.error}
      </p>
    );
  }
  if (state.notice) {
    return (
      <p role="status" className="text-sm text-[#254631] bg-[#5F8067]/10 rounded-xl px-4 py-3">
        {state.notice}
      </p>
    );
  }
  return null;
}

export function LoginForm({ linkError }: { linkError?: boolean }) {
  const [state, action, pending] = useActionState(signIn, {});
  return (
    <form action={action} className="space-y-4">
      {linkError && !state.error && (
        <p role="alert" className="text-sm text-[#A33A26]">
          That link has expired or was already used. Sign in below, or request a new password reset link.
        </p>
      )}
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm font-semibold text-[#193323]">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-sm font-semibold text-[#193323]">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={inputClass} />
      </div>
      <Feedback state={state} />
      <Submit pending={pending}>{pending ? "Signing in..." : "Sign in"}</Submit>
      <p className="text-center text-sm">
        <Link href="/admin/forgot-password" className="text-[#5F8067] hover:text-[#193323] font-medium">
          Forgot your password?
        </Link>
      </p>
    </form>
  );
}

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(requestPasswordReset, {});
  return (
    <form action={action} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm font-semibold text-[#193323]">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} />
      </div>
      <Feedback state={state} />
      <Submit pending={pending}>{pending ? "Sending..." : "Email me a reset link"}</Submit>
      <p className="text-center text-sm">
        <Link href="/admin/login" className="text-[#5F8067] hover:text-[#193323] font-medium">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}

export function SetPasswordForm() {
  const [state, action, pending] = useActionState(setPassword, {});
  return (
    <form action={action} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-sm font-semibold text-[#193323]">New password</label>
        <input id="password" name="password" type="password" autoComplete="new-password" minLength={8} required className={inputClass} />
        <p className="text-xs text-[#536458]">At least 8 characters. A short phrase is easy to remember and hard to guess.</p>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="confirm" className="block text-sm font-semibold text-[#193323]">Type it again</label>
        <input id="confirm" name="confirm" type="password" autoComplete="new-password" minLength={8} required className={inputClass} />
      </div>
      <Feedback state={state} />
      <Submit pending={pending}>{pending ? "Saving..." : "Save password"}</Submit>
    </form>
  );
}
