import "server-only";
import { CONTACT_EMAIL } from "@/lib/site";

// Sends a notification through Resend's HTTP API. Returns false (never throws)
// when email isn't configured or the send fails, so a form can still succeed
// as long as the submission was saved.
export async function sendNotification(opts: { subject: string; text: string; replyTo?: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM ?? "Encouraging Poetics <onboarding@resend.dev>",
        to: [process.env.NOTIFY_EMAIL ?? CONTACT_EMAIL],
        subject: opts.subject,
        text: opts.text,
        reply_to: opts.replyTo,
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend request failed", err);
    return false;
  }
}
