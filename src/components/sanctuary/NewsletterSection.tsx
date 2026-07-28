"use client";

import React, { useState } from "react";
import { Send, Sparkles, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#C9A44C", "#5F8067", "#FAF7F2"],
    });
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#193323] text-[#FAF7F2] relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#C9A44C]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#D4AF37] border border-[#C9A44C]/30 text-xs font-semibold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Monthly Encouragement Sanctuary</span>
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
          Receive Monthly Words of Hope &amp; Prayer
        </h2>

        <p className="text-[#E5ECE6] text-base max-w-xl mx-auto mb-8">
          Join Kalandice&apos;s quiet circle. Receive fresh poetry excerpts, scripture reflection prompts, and encouraging prayers delivered softly to your inbox once a month.
        </p>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-white/10 border border-[#C9A44C]/40 inline-flex items-center gap-3 text-[#D4AF37] max-w-md mx-auto">
            <CheckCircle2 className="w-6 h-6 shrink-0" />
            <span className="text-sm font-medium text-left">
              Welcome to the sanctuary circle! Check your inbox for your first encouragement note.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              className="w-full px-5 py-4 rounded-full bg-white/90 text-[#193323] placeholder-[#536458] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A44C]"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C9A44C] text-[#193323] font-bold text-sm hover:bg-[#e6ca65] transition-all shadow-lg shrink-0 flex items-center justify-center gap-2"
            >
              <span>Subscribe</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
