"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/sanctuary/Navbar";
import { ContactFooter } from "@/components/sanctuary/ContactFooter";
import { AmbientCanvas } from "@/components/sanctuary/AmbientCanvas";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Mic, ArrowUpRight } from "lucide-react";
import { CmsImage } from "@/components/CmsImage";
import { MessageForm } from "@/components/forms/MessageForm";
import type { SiteEvent } from "@/lib/content/types";

export function EventsView({ events }: { events: SiteEvent[] }) {
  const [selectedTab, setSelectedTab] = useState("All");

  const categories = ["All", ...Array.from(new Set(events.map((e) => e.category)))];
  const filteredEvents = selectedTab === "All" ? events : events.filter((e) => e.category === selectedTab);

  return (
    <main className="relative min-h-screen bg-[#FAF7F2] text-[#1C2620]">
      <AmbientCanvas />
      <Navbar />

      {/* Header Banner */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#E5ECE6]/40 to-[#FAF7F2] text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#C9A44C]/30 shadow-xs">
            <Calendar className="w-4 h-4 text-[#C9A44C]" />
            <span className="font-serif-luxury text-xs text-[#193323] font-semibold">Speaking &amp; Poetry Gatherings</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-[#193323]">
            Upcoming Events &amp; Open Mics
          </h1>
          <p className="font-script-poetry text-2xl sm:text-3xl text-[#C9A44C]">
            Gather with us for poetry, encouragement, and fellowship.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedTab(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  selectedTab === cat
                    ? "bg-[#193323] text-[#D4AF37] shadow-md border border-[#C9A44C]/40"
                    : "bg-white text-[#536458] border border-[#5F8067]/15 hover:bg-[#193323]/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Event Cards Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredEvents.map((ev) => (
            <motion.div
              key={ev.id}
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-white border border-[#5F8067]/20 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                {ev.image_url && (
                  <div className="relative h-40 -mx-8 -mt-8 mb-6 rounded-t-3xl overflow-hidden">
                    <CmsImage src={ev.image_url} alt={ev.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                  </div>
                )}
                <span className="inline-block px-3 py-1 rounded-full bg-[#193323]/5 text-[#5F8067] text-[11px] font-semibold mb-4">
                  {ev.category}
                </span>

                <h3 className="font-serif-luxury text-xl font-bold text-[#193323] mb-3">
                  {ev.title}
                </h3>

                <div className="space-y-2 text-xs text-[#536458] mb-4">
                  <p className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#C9A44C]" />
                    <span>{[ev.date_label, ev.time_label].filter(Boolean).join(" • ")}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#5F8067]" />
                    <span>{ev.location}</span>
                  </p>
                </div>

                <p className="text-xs text-[#536458] leading-relaxed">{ev.description}</p>
              </div>

              {ev.link_url ? (
                <a
                  href={ev.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 pt-4 border-t border-[#5F8067]/10 flex items-center justify-between text-xs font-semibold text-[#193323] hover:text-[#C9A44C] transition-colors"
                >
                  <span>RSVP / Details</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C9A44C]" />
                </a>
              ) : (
                <a
                  href="#speaking"
                  className="mt-6 pt-4 border-t border-[#5F8067]/10 flex items-center justify-between text-xs font-semibold text-[#193323] hover:text-[#C9A44C] transition-colors"
                >
                  <span>Ask About This Event</span>
                  <span className="text-[#C9A44C]">→</span>
                </a>
              )}
            </motion.div>
          ))}
        </div>
        {filteredEvents.length === 0 && (
          <p className="text-center text-sm text-[#536458] py-12">
            New gatherings are being planned. Join the newsletter or invite Kalandice to your event below.
          </p>
        )}
      </section>

      {/* Speaking Engagement Booking Form */}
      <section id="speaking" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-24">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#193323] text-[#FAF7F2] border border-[#C9A44C]/30 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4AF37] text-xs font-semibold uppercase">
              <Mic className="w-3.5 h-3.5" />
              <span>Book Kalandice for Your Event</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
              Invite Kalandice to Speak or Host a Poetry Sanctuary Night
            </h2>
            <p className="text-xs text-[#E5ECE6] max-w-xl mx-auto">
              Available for church retreats, university events, women&apos;s conferences, and book club gatherings.
            </p>
          </div>

          <MessageForm
            kind="speaking"
            rows={3}
            messagePlaceholder="Tell us about your event theme, audience size, and expectations..."
            submitLabel="Submit Speaking Request"
          />
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
