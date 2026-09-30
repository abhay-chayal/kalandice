import "server-only";
import { redirect } from "next/navigation";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSessionClient } from "@/lib/supabase/server";

export type AdminSession =
  | { status: "unconfigured" }
  | { status: "signed_out" }
  | { status: "forbidden"; user: User }
  | { status: "ok"; user: User; supabase: SupabaseClient };

// getUser() validates the session with Supabase (unlike getSession(), which only
// decodes the cookie), and is_admin() checks the admin_users allow-list.
export async function getAdminSession(): Promise<AdminSession> {
  if (!isSupabaseConfigured) return { status: "unconfigured" };

  const supabase = await createSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { status: "signed_out" };

  const { data: isAdmin, error } = await supabase.rpc("is_admin");
  if (error || !isAdmin) return { status: "forbidden", user };

  return { status: "ok", user, supabase };
}

// Use at the top of every admin page and server action. Server actions are
// public endpoints, so the layout's check alone is not enough.
export async function requireAdmin() {
  const session = await getAdminSession();
  if (session.status !== "ok") redirect("/admin/login");
  return session;
}
