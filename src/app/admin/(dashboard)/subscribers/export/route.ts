import { getAdminSession } from "@/lib/auth";

// Escape for CSV, and neutralise leading =,+,-,@ so spreadsheet apps don't run it as a formula.
function csvCell(value: string) {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET() {
  const session = await getAdminSession();
  if (session.status !== "ok") return new Response("Not authorized", { status: 401 });

  const { data, error } = await session.supabase
    .from("subscribers")
    .select("email, source, created_at")
    .order("created_at", { ascending: true });
  if (error) return new Response("Could not load subscribers", { status: 500 });

  const rows = [
    ["email", "source", "subscribed_at"],
    ...(data ?? []).map((s) => [s.email as string, s.source as string, s.created_at as string]),
  ];
  const csv = rows.map((r) => r.map(csvCell).join(",")).join("\r\n");
  const date = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="encouraging-poetics-subscribers-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
