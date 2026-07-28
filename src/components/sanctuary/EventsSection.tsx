"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Mic, BookOpen, Clock, Sparkles } from "lucide-react";

export function EventsSection() {
  const events = [
    {
      type: "Book Signing & Poetry Hour",
      title: "Encouraging Poetics Sanctuary Launch",
      location: "Dallas, Texas • Grace Community Center",
      date: "Autumn 2026",
      desc: "Join Kalandice for an intimate evening of poetry readings, prayer fellowship, and signed copies.",
    },
    {
      type: "Open Mic & Reflection",
      title: "Finding Hope Through Poetics",
      location: "Texas Woman's University Alumni Hall",
      date: "Spring 2027",
      desc: "An open sanctuary night discussing mental health, faith, and poetry in seasons of waiting.",
    },
    {
      type: "Virtual Speaking Event",
      title: "Trusting God in Seasons of Uncertainty",
      location: "Online Zoom Fellowship",
      date: "Monthly Sanctuary Session",
      desc: "Interactive virtual gathering focused on scripture affirmations and emotional encouragement.",
    },
  ];

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
          {events.map((event, idx) => (
            <motion.div
              key={event.title}
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-white border border-[#5F8067]/20 shadow-sm hover:shadow-xl transition-all relative flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#193323]/5 text-[#5F8067] text-[11px] font-semibold mb-4">
                  {event.type}
                </span>

                <h3 className="font-serif-luxury text-xl font-bold text-[#193323] mb-3">
                  {event.title}
                </h3>

                <div className="space-y-2 text-xs text-[#536458] mb-4">
                  <p className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#C9A44C]" />
                    <span>{event.date}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#5F8067]" />
                    <span>{event.location}</span>
                  </p>
                </div>

                <p className="text-xs text-[#536458] leading-relaxed">
                  {event.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#5F8067]/10 flex items-center justify-between text-xs font-semibold text-[#193323]">
                <span>RSVP / Event Details</span>
                <span className="text-[#C9A44C]">→</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
