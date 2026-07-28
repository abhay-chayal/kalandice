"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Heart, Quote } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Reading Encouraging Poetics felt like taking a deep breath after holding it for months. Kalandice's words pointed me right back to God's peace during my hardest season of anxiety.",
      author: "Sarah M.",
      location: "Dallas, TX",
    },
    {
      quote: "Every poem reads like a soft prayer. The reflection prompts opened my eyes to how deeply Jesus cares for us in quiet waiting.",
      author: "Rachel K.",
      location: "Houston, TX",
    },
    {
      quote: "A true sanctuary in book form. Beautiful, sincere, and deeply comforting. I gift this book to everyone going through life transitions.",
      author: "Jessica T.",
      location: "Austin, TX",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#E5ECE6]/30 to-[#FAF7F2]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#193323]/10 text-[#193323] text-xs font-semibold uppercase tracking-widest mb-3">
            <Heart className="w-3.5 h-3.5 text-[#C9A44C]" />
            <span>Reader Reflections</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#193323] leading-tight mb-4">
            Encouragement Received
          </h2>
          <p className="text-[#536458] text-base">
            See how readers have found comfort, healing, and renewed faith through these poetry sanctuary pages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.author}
              whileHover={{ y: -4 }}
              className="p-8 rounded-3xl bg-white border border-[#5F8067]/20 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#C9A44C] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A44C]" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-[#C9A44C]/20 mb-2" />
                <p className="font-serif-luxury italic text-sm text-[#254631] leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#5F8067]/10 flex items-center justify-between text-xs">
                <span className="font-bold text-[#193323]">{t.author}</span>
                <span className="text-[#536458]">{t.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
