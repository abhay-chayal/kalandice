"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, Clock } from "lucide-react";
import type { SiteEvent } from "@/lib/content/types";

export function EventsSection({ events }: { events: SiteEvent[] }) {
  if (events.length === 0) return null;

  return (
    <section id="events" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#193323]/10 text-[#193323] text-xs font-semibold uppercase tracking-widest mb-3">
            <Calendar className="w-3.5 h-3.5 text-[#C9A44C]" />
            <span>Speaking &amp; Poetry Gatherings</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#193323] leading-tight mb-4">
            Upcoming Events &amp; Open Mics
          </h2>
          <p className="text-[#536458] text-base">
            Gather with us in person or online for poetry readings, encouragement, and community fellowship.
          </p>
        </div>

        {/* Timeline Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.slice(0, 3).map((event) => (
            <motion.div
              key={event.id}
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-white border border-[#5F8067]/20 shadow-sm hover:shadow-xl transition-all relative flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#193323]/5 text-[#4A6B52] text-[11px] font-semibold mb-4">
                  {event.category}
                </span>

                <h3 className="font-serif-luxury text-xl font-bold text-[#193323] mb-3">
                  {event.title}
                </h3>

                <div className="space-y-2 text-xs text-[#536458] mb-4">
                  <p className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#C9A44C]" />
                    <span>{[event.date_label, event.time_label].filter(Boolean).join(" • ")}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#5F8067]" />
                    <span>{event.location}</span>
                  </p>
                </div>

                <p className="text-xs text-[#536458] leading-relaxed">
                  {event.description}
                </p>
              </div>

              <Link
                href="/events"
                className="mt-6 pt-4 border-t border-[#5F8067]/10 flex items-center justify-between text-xs font-semibold text-[#193323] hover:text-[#C9A44C] transition-colors"
              >
                <span>See Event Details</span>
                <span className="text-[#7A5E16]">→</span>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
