"use server";

import { createServiceClient } from "@/lib/supabase/server";
import { sendNotification } from "@/lib/email";
import type { MessageKind } from "@/lib/content/types";

export type FormState = { status: "idle" | "success" | "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(formData: FormData, name: string, max = 200) {
  return String(formData.get(name) ?? "").trim().slice(0, max);
}

const SUBJECTS: Record<MessageKind, string> = {
  general: "New message from your website",
  prayer: "New confidential prayer request",
  speaking: "New speaking invitation",
};

export async function submitMessage(_prev: FormState, formData: FormData): Promise<FormState> {
  // Hidden "website" field: real visitors never see or fill it, bots usually do.
  if (field(formData, "website")) return { status: "success", message: "Thank you!" };

  const kindRaw = field(formData, "kind");
  const kind: MessageKind = kindRaw === "prayer" || kindRaw === "speaking" ? kindRaw : "general";
  const entry = {
    kind,
    name: field(formData, "name"),
    email: field(formData, "email").toLowerCase(),
    organization: field(formData, "organization"),
    location: field(formData, "location"),
    event_date: field(formData, "event_date"),
    message: field(formData, "message", 5000),
  };

  if (!EMAIL_RE.test(entry.email)) return { status: "error", message: "Please enter a valid email address." };
  if (entry.message.length < 2) return { status: "error", message: "Please write a short message." };
  if (kind === "speaking" && !entry.organization) {
    return { status: "error", message: "Please tell us your organization or church name." };
  }

  const db = createServiceClient();
  let saved = false;
  if (db) {
    const { error } = await db.from("messages").insert(entry);
    if (error) console.error("messages insert", error.message);
    else saved = true;
  }

  const details = [
    entry.name && `Name: ${entry.name}`,
    `Email: ${entry.email}`,
    entry.organization && `Organization: ${entry.organization}`,
    entry.location && `Location: ${entry.location}`,
    entry.event_date && `Date: ${entry.event_date}`,
  ].filter(Boolean);

  const emailed = await sendNotification({
    subject: SUBJECTS[kind],
    text: [
      details.join("\n"),
      entry.message,
      "— Sent from the Encouraging Poetics website. You can also read this in your admin dashboard under Messages.",
    ].join("\n\n"),
    replyTo: entry.email,
  });

  if (!saved && !emailed) {
    return {
      status: "error",
      message: "Sorry, your message couldn't be sent right now. Please email kalandice.poetics@gmail.com directly.",
    };
  }

  const thanks: Record<MessageKind, string> = {
    general: "Thank you! Your message has been sent to Kalandice.",
    prayer: "Thank you for sharing your prayer request. You are held in prayer and faith.",
    speaking: "Thank you! Your speaking request has been sent to Kalandice's team.",
  };
  return { status: "success", message: thanks[kind] };
}

export async function subscribe(_prev: FormState, formData: FormData): Promise<FormState> {
  if (field(formData, "website")) return { status: "success", message: "Welcome!" };

  const email = field(formData, "email").toLowerCase();
  if (!EMAIL_RE.test(email)) return { status: "error", message: "Please enter a valid email address." };

  const db = createServiceClient();
  if (!db) {
    return { status: "error", message: "Sign-ups aren't open just yet. Please check back soon." };
  }

  // ignoreDuplicates: signing up twice is a success, not an error or a leak of who's subscribed.
  const { error } = await db
    .from("subscribers")
    .upsert({ email, source: field(formData, "source") || "website" }, { onConflict: "email", ignoreDuplicates: true });

  if (error) {
    console.error("subscribers upsert", error.message);
    return { status: "error", message: "Something went wrong. Please try again in a moment." };
  }
  return { status: "success", message: "You're in! Watch your inbox for monthly words of hope." };
}
