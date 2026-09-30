import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createSessionClient } from "@/lib/supabase/server";

// Landing point for links in Supabase emails (invite, password reset).
// Supports the token_hash links from the email templates in SETUP.md, and the
// PKCE ?code= links Supabase sends by default.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const code = searchParams.get("code");

  // Only allow redirects inside the admin area, never to another site.
  const nextParam = searchParams.get("next") ?? "";
  const next = nextParam.startsWith("/admin") ? nextParam : "/admin/set-password";

  const supabase = await createSessionClient();
  let ok = false;

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    ok = !error;
  } else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    ok = !error;
  }

  return NextResponse.redirect(new URL(ok ? next : "/admin/login?error=link", origin));
}
