import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/server";

// Called daily by the Vercel cron in vercel.json. Supabase pauses free-plan
// projects after a week without database activity; one tiny query prevents that.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!isSupabaseConfigured) return Response.json({ ok: false, reason: "supabase not configured" });

  const { error } = await createPublicClient().from("posts").select("id", { head: true, count: "exact" });
  return Response.json({ ok: !error });
}
