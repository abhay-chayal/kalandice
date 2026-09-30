"use client";

import React, { startTransition, useActionState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { submitMessage, type FormState } from "@/app/actions/forms";
import type { MessageKind } from "@/lib/content/types";

const initialState: FormState = { status: "idle", message: "" };

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-[#8CA793] text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A44C]";

interface Props {
  kind: MessageKind;
  submitLabel: string;
  messagePlaceholder: string;
  namePlaceholder?: string;
  nameRequired?: boolean;
  rows?: number;
}

// Dark-panel form used by the contact page, footer and speaking request box.
// Submits to the submitMessage server action (saved in Supabase + emailed).
export function MessageForm({
  kind,
  submitLabel,
  messagePlaceholder,
  namePlaceholder = "Your Name",
  nameRequired = false,
  rows = 4,
}: Props) {
  const [state, formAction, pending] = useActionState(submitMessage, initialState);

  if (state.status === "success") {
    return (
      <div role="status" className="p-6 rounded-2xl bg-white/10 border border-[#C9A44C]/40 flex items-center gap-3 text-[#D4AF37]">
        <CheckCircle2 className="w-6 h-6 shrink-0" />
        <span className="text-xs text-left">{state.message}</span>
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        // Dispatch manually instead of <form action> so a failed send doesn't clear what they wrote.
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => formAction(formData));
      }}
    >
      <input type="hidden" name="kind" value={kind} />
      {/* Honeypot: hidden from people, tempting for bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {kind === "speaking" ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="organization" type="text" placeholder="Organization / Church Name" aria-label="Organization or church name" required maxLength={200} className={inputClass} />
            <input name="email" type="email" placeholder="Contact Email" aria-label="Contact email" required maxLength={200} className={inputClass} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="location" type="text" placeholder="Event Location (City, State / Virtual)" aria-label="Event location" required maxLength={200} className={inputClass} />
            <input name="event_date" type="text" placeholder="Estimated Date (e.g. November 2026)" aria-label="Estimated date" required maxLength={200} className={inputClass} />
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="name" type="text" placeholder={namePlaceholder} aria-label="Your name" required={nameRequired} maxLength={200} className={inputClass} />
          <input name="email" type="email" placeholder="Your Email" aria-label="Your email" required maxLength={200} className={inputClass} />
        </div>
      )}

      <textarea name="message" rows={rows} placeholder={messagePlaceholder} aria-label="Message" required maxLength={5000} className={inputClass} />

      {state.status === "error" && (
        <p role="alert" className="text-xs text-[#F5C2B8]">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3.5 rounded-xl bg-[#C9A44C] text-[#193323] font-bold text-xs hover:bg-[#e6ca65] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        <span>{pending ? "Sending..." : submitLabel}</span>
      </button>
    </form>
  );
}
