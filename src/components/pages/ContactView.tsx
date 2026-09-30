"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/sanctuary/Navbar";
import { ContactFooter } from "@/components/sanctuary/ContactFooter";
import { AmbientCanvas } from "@/components/sanctuary/AmbientCanvas";
import { Mail, Copy, Check, Heart, HelpCircle, ChevronDown } from "lucide-react";
import { MessageForm } from "@/components/forms/MessageForm";
import { InstagramIcon, FacebookIcon } from "@/components/sanctuary/ContactFooter";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/site";

export function ContactView() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "prayer">("general");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const email = CONTACT_EMAIL;

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const faqs = [
    {
      q: "Where can I purchase Encouraging Poetics?",
      a: "Encouraging Poetics is available worldwide in Paperback on Amazon. You can also request an autographed copy directly through our contact form.",
    },
    {
      q: "Is Kalandice available for speaking engagements and book signings?",
      a: "Yes! Kalandice is available for church retreats, university campus events, open mics, women's conferences, and virtual fellowship gatherings.",
    },
    {
      q: "Are prayer requests confidential?",
      a: "Yes, 100%. All prayer requests submitted through the Prayer Box are kept completely confidential and held in personal prayer.",
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#FAF7F2] text-[#1C2620]">
      <AmbientCanvas />
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#E5ECE6]/40 to-[#FAF7F2] text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#C9A44C]/30 shadow-xs">
            <Heart className="w-4 h-4 text-[#C9A44C]" />
            <span className="font-serif-luxury text-xs text-[#193323] font-semibold">Sanctuary Contact &amp; Prayer Box</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-[#193323]">
            Reach Out &amp; Connect
          </h1>
          <p className="font-script-poetry text-2xl sm:text-3xl text-[#C9A44C]">
            We are cheering you on in faith and prayer.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Author Contact Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-[#5F8067]/20 shadow-md space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#C9A44C]">
                  <Image src="/images/logo.webp" alt="Kalandice Logo" fill sizes="56px" className="object-cover" />
                </div>
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-[#193323]">Kalandice Thomas</h3>
                  <p className="font-script-poetry text-xs text-[#C9A44C]">Encouraging Poetics Author</p>
                </div>
              </div>

              <p className="text-xs text-[#536458] leading-relaxed">
                Whether you have a question about the book, an event invitation, or want to share how the poetry touched your heart, feel free to send a note.
              </p>

              {/* Email Copy Box */}
              <div className="p-4 rounded-2xl bg-[#193323]/5 border border-[#5F8067]/15 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-[#C9A44C] shrink-0" />
                  <span className="text-xs font-mono text-[#193323] truncate">{email}</span>
                </div>
                <button
                  onClick={copyEmail}
                  className="px-3 py-1.5 rounded-lg bg-[#193323] text-[#D4AF37] font-bold text-xs hover:bg-[#254631] transition-colors shrink-0 flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#536458]">Follow along:</span>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram @encouragingpoetics"
                  className="p-2.5 rounded-full bg-[#193323]/5 text-[#193323] hover:bg-[#C9A44C] transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Encouraging Poetics"
                  className="p-2.5 rounded-full bg-[#193323]/5 text-[#193323] hover:bg-[#C9A44C] transition-colors"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* FAQ Accordion Box */}
            <div className="p-6 rounded-3xl bg-white border border-[#5F8067]/15 shadow-sm space-y-4">
              <h4 className="font-serif-luxury font-bold text-base text-[#193323] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C9A44C]" />
                <span>Frequently Asked Questions</span>
              </h4>

              <div className="space-y-2">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-[#5F8067]/10 pb-2">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full text-left font-medium text-xs text-[#193323] flex items-center justify-between py-2"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-[#C9A44C] transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === idx && (
                      <p className="text-[11px] text-[#536458] leading-relaxed pt-1 pb-2">{faq.a}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dual Form (General Inquiry vs Confidential Prayer Box) */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-[#193323] text-[#FAF7F2] border border-[#C9A44C]/30 shadow-2xl space-y-6">
            
            {/* Form Toggle Tabs */}
            <div className="flex rounded-full bg-white/10 p-1">
              <button
                onClick={() => setActiveTab("general")}
                className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeTab === "general" ? "bg-[#C9A44C] text-[#193323] shadow-md" : "text-[#FAF7F2] hover:text-white"
                }`}
              >
                General Note / Inquiry
              </button>
              <button
                onClick={() => setActiveTab("prayer")}
                className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeTab === "prayer" ? "bg-[#C9A44C] text-[#193323] shadow-md" : "text-[#FAF7F2] hover:text-white"
                }`}
              >
                Confidential Prayer Box 🙏
              </button>
            </div>

            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-white mb-1">
                {activeTab === "general" ? "Send a Note to Kalandice" : "Confidential Prayer Request"}
              </h3>
              <p className="text-xs text-[#E5ECE6]">
                {activeTab === "general"
                  ? "Share your thoughts, book club invitation, or encouragement note."
                  : "Your prayer request is kept strictly private and held in personal prayer."}
              </p>
            </div>

            {/* key resets the form when switching tabs */}
            <MessageForm
              key={activeTab}
              kind={activeTab}
              namePlaceholder={activeTab === "prayer" ? "Your Name (Optional)" : "Your Name"}
              nameRequired={activeTab === "general"}
              messagePlaceholder={
                activeTab === "general"
                  ? "Share your message or inquiry..."
                  : "Write your confidential prayer request here..."
              }
              submitLabel={activeTab === "general" ? "Send Message" : "Submit Prayer Request"}
            />

          </div>

        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
