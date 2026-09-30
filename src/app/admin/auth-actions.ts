"use server";

import { redirect } from "next/navigation";
import { createSessionClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { SITE_URL } from "@/lib/site";

export type AuthState = { error?: string; notice?: string };

export async function signIn(_prev: AuthState, formData: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured) return { error: "The admin dashboard isn't connected to Supabase yet." };

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Please enter your email and password." };

  const supabase = await createSessionClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "That email and password don't match. Please try again." };

  redirect("/admin");
}

export async function signOut() {
  if (isSupabaseConfigured) {
    const supabase = await createSessionClient();
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}

export async function requestPasswordReset(_prev: AuthState, formData: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured) return { error: "The admin dashboard isn't connected to Supabase yet." };

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email) return { error: "Please enter your email." };

  const supabase = await createSessionClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${SITE_URL}/auth/confirm?next=/admin/set-password`,
  });
  if (error) console.error("resetPasswordForEmail", error.message);

  // Same message either way, so the form can't be used to discover which emails have accounts.
  return { notice: "If that email has access to the dashboard, a reset link is on its way. Check your inbox (and spam folder)." };
}

export async function setPassword(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  if (password.length < 8) return { error: "Please use at least 8 characters." };
  if (password !== confirm) return { error: "The two passwords don't match." };

  const supabase = await createSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "This link has expired. Please request a new password reset email." };

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return {
      error:
        error.message.includes("different from the old")
          ? "Please choose a password you haven't used before."
          : "Couldn't save your password. Please try again.",
    };
  }

  redirect("/admin?welcome=1");
}
