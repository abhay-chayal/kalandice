"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, BookOpen, Star, Sparkles, ShieldCheck, Heart, ArrowUpRight } from "lucide-react";

export function BookSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="book" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#E5ECE6]/40 to-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* 3D Book Mockup Card */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              animate={{
                rotateY: isHovered ? -12 : 0,
                rotateX: isHovered ? 6 : 0,
                scale: isHovered ? 1.03 : 1,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative group cursor-pointer perspective-1000"
            >
              {/* Gold Glow Aura */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#C9A44C]/30 via-[#5F8067]/20 to-[#C9A44C]/30 rounded-3xl blur-2xl group-hover:opacity-100 transition duration-500 opacity-60" />

              {/* Book Frame */}
              <div className="relative w-[280px] sm:w-[340px] h-[420px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 bg-[#FAF7F2] flex flex-col justify-between p-2">
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-inner">
                  <Image
                    src="/images/book-cover.png"
                    alt="Encouraging Poetics Book Cover"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Subtle Spine Highlight */}
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/40 via-white/10 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Interactive Hover Badge */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#193323] text-[#D4AF37] text-xs font-semibold shadow-lg border border-[#C9A44C]/40 flex items-center gap-1.5 whitespace-nowrap">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Encouraging Poetics • Available on Amazon</span>
              </div>
            </motion.div>
          </div>

          {/* Book Information & Purchase Details */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A44C]/15 text-[#8C6D1F] text-xs font-semibold tracking-wider uppercase">
              <Star className="w-3.5 h-3.5 text-[#C9A44C] fill-[#C9A44C]" />
              <span>Published Poetry Collection</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#193323] leading-tight">
              Encouraging Poetics
            </h2>

            <p className="font-script-poetry text-2xl text-[#C9A44C]">
              By Kalandice Thomas
            </p>

            <div className="p-4 rounded-2xl bg-white border border-[#5F8067]/20 shadow-xs">
              <p className="font-serif-luxury italic text-xs sm:text-sm text-[#193323]">
                &ldquo;The Lord is my shepherd, I lack nothing&rdquo; — Psalms 23:1 NIV
              </p>
            </div>

            <p className="text-[#536458] text-base leading-relaxed">
              Living in this world can be precarious. <em>Encouraging Poetics</em> is a heartfelt collection written to walk with you through seasons of anxiety, fear, worry, depression, waiting, and navigating love. Each poem is an invitation to pause, breathe, and remember God&apos;s unending, unwavering grace.
            </p>

            {/* Included Themes Tags */}
            <div>
              <p className="text-xs uppercase tracking-widest text-[#536458] font-semibold mb-3">
                Poetic Themes &amp; Reflections Included:
              </p>
              <div className="flex flex-wrap gap-2">
                {["Overcoming Anxiety", "Finding Hope", "Trusting in Waiting", "Faith & Grace", "Emotional Healing", "Peace of Mind"].map((theme) => (
                  <span
                    key={theme}
                    className="px-3 py-1.5 rounded-full bg-[#193323]/5 border border-[#5F8067]/20 text-xs font-medium text-[#193323]"
                  >
                    ✨ {theme}
                  </span>
                ))}
              </div>
            </div>

            {/* Purchase CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a
                href="https://a.co/d/07wOG0Ln"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#193323] text-[#FAF7F2] font-semibold text-sm shadow-xl shadow-[#193323]/25 hover:bg-[#254631] hover:scale-105 transition-all duration-300 ring-2 ring-[#C9A44C]/40 group"
              >
                <ShoppingCart className="w-4 h-4 text-[#C9A44C]" />
                <span>Buy Copy on Amazon</span>
                <ArrowUpRight className="w-4 h-4 text-[#C9A44C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <div className="flex items-center gap-2 text-xs text-[#536458] justify-center sm:justify-start">
                <ShieldCheck className="w-4 h-4 text-[#5F8067]" />
                <span>Verified Amazon Paperback Delivery</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
