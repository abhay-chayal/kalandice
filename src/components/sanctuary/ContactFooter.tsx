"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, Copy, Check, Sparkles } from "lucide-react";
import { MessageForm } from "@/components/forms/MessageForm";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/site";

export function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const email = CONTACT_EMAIL;

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <footer id="contact" className="bg-[#112418] text-[#FAF7F2] pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#C9A44C]/20 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Contact Section Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Left Column: Author Contact Info */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#C9A44C] shadow-lg">
                <Image
                  src="/images/logo.webp"
                  alt="Kalandice Thomas Logo"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif-luxury text-2xl font-bold text-white">
                  Kalandice Thomas
                </h3>
                <p className="font-script-poetry text-sm text-[#C9A44C]">
                  Encouraging Poetics Author &amp; Speaker
                </p>
              </div>
            </div>

            <p className="text-sm text-[#E5ECE6] leading-relaxed max-w-md">
              Have a question, book signing request, speaking invitation, or simply want to send a note of encouragement? Reach out directly via email or social channels.
            </p>

            {/* Email Copy Card */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4 max-w-md">
              <div className="flex items-center gap-3 overflow-hidden">
                <Mail className="w-5 h-5 text-[#C9A44C] shrink-0" />
                <span className="text-xs sm:text-sm font-mono text-white truncate">
                  {email}
                </span>
              </div>
              <button
                onClick={copyEmail}
                className="px-3 py-1.5 rounded-lg bg-[#C9A44C] text-[#193323] font-bold text-xs hover:bg-[#e6ca65] transition-colors flex items-center gap-1 shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 text-[#E5ECE6] hover:bg-[#C9A44C] hover:text-[#193323] transition-colors"
                aria-label="Instagram @encouragingpoetics"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 text-[#E5ECE6] hover:bg-[#C9A44C] hover:text-[#193323] transition-colors"
                aria-label="Facebook @encouragingpoetics"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
            <h4 className="font-serif-luxury text-xl font-bold text-white mb-2">
              Send a Note of Encouragement
            </h4>
            <p className="text-xs text-[#E5ECE6] mb-6">
              Messages are sent directly to Kalandice&apos;s personal inbox.
            </p>

            <MessageForm
              kind="general"
              nameRequired
              rows={3}
              messagePlaceholder="Share your thoughts or prayer request..."
              submitLabel="Send Message to Kalandice"
            />
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8CA793]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C9A44C]" />
            <span className="font-serif-luxury italic text-white">
              &ldquo;The Lord is My Shepherd I Lack Nothing&rdquo; — Psalms 23:1 NIV
            </span>
          </div>

          <p>
            © {new Date().getFullYear()} Kalandice Thomas. All rights reserved. Crafted with peace &amp; faith.
          </p>
        </div>

      </div>
    </footer>
  );
}
