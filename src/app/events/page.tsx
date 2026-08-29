"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/sanctuary/Navbar";
import { ContactFooter } from "@/components/sanctuary/ContactFooter";
import { AmbientCanvas } from "@/components/sanctuary/AmbientCanvas";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Mic, BookOpen, Send, Sparkles, CheckCircle2 } from "lucide-react";

export default function EventsPage() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const events = [
    {
      category: "Book Signing",
      title: "Encouraging Poetics Sanctuary Launch",
      location: "Dallas, Texas • Grace Community Center",
      date: "Autumn 2026",
      time: "6:30 PM - 8:30 PM CST",
      desc: "Join Kalandice for an intimate evening of poetry readings, prayer fellowship, and autographed copies.",
    },
    {
      category: "Open Mic",
      title: "Finding Hope Through Poetics",
      location: "Texas Woman's University Alumni Hall",
      date: "Spring 2027",
      time: "5:00 PM - 7:00 PM CST",
      desc: "An open sanctuary night discussing mental health, faith, and poetry in seasons of waiting.",
    },
    {
      category: "Virtual Fellowship",
      title: "Trusting God in Seasons of Uncertainty",
      location: "Online Zoom Sanctuary Fellowship",
      date: "Monthly Sanctuary Session",
      time: "7:00 PM - 8:15 PM CST",
      desc: "Interactive virtual gathering focused on scripture affirmations and emotional encouragement.",
    },
  ];

  const filteredEvents = selectedTab === "All" ? events : events.filter((e) => e.category === selectedTab);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

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
            {["All", "Book Signing", "Open Mic", "Virtual Fellowship"].map((cat) => (
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
          {filteredEvents.map((ev, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-white border border-[#5F8067]/20 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#193323]/5 text-[#5F8067] text-[11px] font-semibold mb-4">
                  {ev.category}
                </span>

                <h3 className="font-serif-luxury text-xl font-bold text-[#193323] mb-3">
                  {ev.title}
                </h3>

                <div className="space-y-2 text-xs text-[#536458] mb-4">
                  <p className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#C9A44C]" />
                    <span>{ev.date} • {ev.time}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#5F8067]" />
                    <span>{ev.location}</span>
                  </p>
                </div>

                <p className="text-xs text-[#536458] leading-relaxed">{ev.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#5F8067]/10 flex items-center justify-between text-xs font-semibold text-[#193323]">
                <span>RSVP / Details</span>
                <span className="text-[#C9A44C]">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Speaking Engagement Booking Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
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

          {bookingSubmitted ? (
            <div className="p-6 rounded-2xl bg-white/10 border border-[#C9A44C]/40 flex items-center gap-3 text-[#D4AF37] max-w-md mx-auto">
              <CheckCircle2 className="w-6 h-6 shrink-0" />
              <span className="text-xs text-left">
                Thank you! Your speaking request has been sent to Kalandice&apos;s team.
              </span>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Organization / Church Name"
                  required
                  className="px-4 py-3 rounded-xl bg-white/10 text-white placeholder-[#8CA793] text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A44C]"
                />
                <input
                  type="email"
                  placeholder="Contact Email"
                  required
                  className="px-4 py-3 rounded-xl bg-white/10 text-white placeholder-[#8CA793] text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A44C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Event Location (City, State / Virtual)"
                  required
                  className="px-4 py-3 rounded-xl bg-white/10 text-white placeholder-[#8CA793] text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A44C]"
                />
                <input
                  type="text"
                  placeholder="Estimated Date (e.g. November 2026)"
                  required
                  className="px-4 py-3 rounded-xl bg-white/10 text-white placeholder-[#8CA793] text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A44C]"
                />
              </div>

              <textarea
                rows={3}
                placeholder="Tell us about your event theme, audience size, and expectations..."
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-[#8CA793] text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A44C]"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#C9A44C] text-[#193323] font-bold text-xs hover:bg-[#e6ca65] transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Speaking Request</span>
              </button>
            </form>
          )}
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
