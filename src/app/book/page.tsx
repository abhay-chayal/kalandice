"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/sanctuary/Navbar";
import { ContactFooter } from "@/components/sanctuary/ContactFooter";
import { AmbientCanvas } from "@/components/sanctuary/AmbientCanvas";
import { motion } from "framer-motion";
import { BookOpen, ShoppingCart, Star, ShieldCheck, Sparkles, ArrowRight, Heart, Bookmark, CheckCircle2 } from "lucide-react";

export default function BookPage() {
  const [activeExcerpt, setActiveExcerpt] = useState(0);

  const excerpts = [
    {
      chapter: "Chapter 1: Healing & Peace",
      title: "Quiet waters of Psalms 23",
      stanzas: [
        "When the noise of the world grows loud and deep,",
        "He leads my heart to quiet streams",
        "The shepherd knows the path I cannot see,",
        "In green pastures His peace surrounds me.",
        "I lack no good thing in His sacred care,",
        "Every heavy burden lifted into prayer.",
      ],
      reflection: "Where in your life are you holding on to noise instead of stepping into God's quiet pastures?",
    },
    {
      chapter: "Chapter 2: Overcoming Anxiety",
      title: "Surrendering Anxiety: Poem Rewritten",
      stanzas: [
        "As the Morning sunbeams cut through yesterday's heavy dew,",
        "No worry can remain where His gentle presence is anew.",
        "Hands unclasped from anxiety and fear,",
        "Knowing the Lord of comfort is standing near.",
        "Breath in peace, release the strain,",
        "His love washes over every hidden pain.",
      ],
      reflection: "Take three slow breaths right now. Release your worries to God with every exhale.",
    },
    {
      chapter: "Chapter 3: Trusting in Waiting",
      title: "Trusting the Season of Waiting",
      stanzas: [
        "Roots grow deep in silence underground,",
        "Long before a blooming flower is found.",
        "Do not mistake delay for a promise denied,",
        "For we have a trustworthy gardener by our side,",
        "faithfully working in every season",
        "know that you can trust and lean on Him.",
      ],
      reflection: "Reflect on how past seasons of waiting built strength you carry today.",
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#FAF7F2] text-[#1C2620]">
      <AmbientCanvas />
      <Navbar />

      {/* Header Banner */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#E5ECE6]/40 to-[#FAF7F2] text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#C9A44C]/30 shadow-xs mb-4">
            <Star className="w-4 h-4 text-[#C9A44C] fill-[#C9A44C]" />
            <span className="font-serif-luxury text-xs text-[#193323] font-semibold">Published Poetry Collection</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-[#193323] leading-tight mb-4">
            Encouraging Poetics
          </h1>
          <p className="font-script-poetry text-2xl sm:text-3xl text-[#C9A44C] max-w-2xl mx-auto">
            By Kalandice Thomas
          </p>
        </div>
      </section>

      {/* Main 3D Book & Purchase Showcase */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* 3D Book Display */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              whileHover={{ rotateY: -10, rotateX: 5, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative w-[300px] sm:w-[360px] h-[450px] sm:h-[520px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-[#FAF7F2] p-2"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-inner">
                <Image
                  src="/images/book-cover.png"
                  alt="Encouraging Poetics Book Cover"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>

          {/* Book Details & Purchase Options */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-4 rounded-2xl bg-white border border-[#5F8067]/20 shadow-xs">
              <p className="font-serif-luxury italic text-sm text-[#193323]">
                &ldquo;The Lord is my shepherd, I lack nothing&rdquo; — Psalms 23:1 NIV
              </p>
            </div>

            <h2 className="font-serif-luxury text-3xl font-bold text-[#193323]">
              A Sanctuary Companion for Quiet Hours
            </h2>

            <p className="text-[#536458] text-base leading-relaxed">
              Living in this world can be precarious. <em>Encouraging Poetics</em> is a published collection of heartfelt poetry written to walk with you through seasons of anxiety, fear, worry, stress, depression, waiting, and navigating love. Each poem opens your heart and eyes to the unending, unwavering love Jesus has for you.
            </p>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-[#536458] font-semibold">Included Sanctuary Themes:</p>
              <div className="flex flex-wrap gap-2">
                {["Inspirational", "Overcoming Anxiety", "Finding Hope in Loss", "Trusting in Seasons of Waiting", "Faith & Unwavering Grace", "Emotional Comfort"].map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-[#193323]/5 border border-[#5F8067]/20 text-xs font-medium text-[#193323]">
                    ✨ {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Purchase Hub Box */}
            <div className="p-6 rounded-3xl bg-[#193323] text-[#FAF7F2] border border-[#C9A44C]/30 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif-luxury text-lg font-bold text-white">Order Your Copy Today</h3>
                  <p className="text-xs text-[#E5ECE6]">Available worldwide in Paperback on Amazon.</p>
                </div>
                <span className="text-xs font-bold text-[#D4AF37] px-3 py-1 rounded-full bg-white/10">Official Listing</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="https://a.co/d/07wOG0Ln"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-full bg-[#C9A44C] text-[#193323] font-bold text-xs hover:bg-[#e6ca65] transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Buy Paperback on Amazon</span>
                </a>
                <a
                  href="mailto:kalandice.poetics@gmail.com?subject=Autographed%20Book%20Order"
                  className="px-6 py-3.5 rounded-full bg-white/10 text-white font-semibold text-xs border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Request Signed Copy</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Interactive Excerpt & Chapter Previewer */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#5F8067]">Inside the Book</span>
          <h2 className="font-serif-luxury text-3xl font-bold text-[#193323] mt-1">Sample Chapter Excerpts</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Chapter Tabs */}
          <div className="md:col-span-4 flex flex-col gap-2">
            {excerpts.map((ex, idx) => (
              <button
                key={idx}
                onClick={() => setActiveExcerpt(idx)}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  activeExcerpt === idx
                    ? "bg-[#193323] text-[#FAF7F2] border-[#C9A44C]/40 shadow-md"
                    : "bg-white text-[#536458] border-[#5F8067]/15 hover:bg-[#193323]/5"
                }`}
              >
                <p className="text-[11px] font-mono uppercase text-[#C9A44C]">{ex.chapter}</p>
                <p className="font-serif-luxury font-bold text-sm mt-0.5">{ex.title}</p>
              </button>
            ))}
          </div>

          {/* Excerpt Stanzas Card */}
          <div className="md:col-span-8 p-8 rounded-3xl bg-white border border-[#5F8067]/20 shadow-md space-y-6">
            <div>
              <span className="text-xs font-semibold text-[#5F8067] uppercase">{excerpts[activeExcerpt].chapter}</span>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#193323] mt-1">{excerpts[activeExcerpt].title}</h3>
            </div>

            <div className="space-y-2 font-serif-luxury italic text-lg text-[#254631] p-6 rounded-2xl bg-[#FAF7F2] border border-[#5F8067]/10">
              {excerpts[activeExcerpt].stanzas.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-[#193323]/5 border border-[#5F8067]/15">
              <p className="text-xs font-semibold uppercase text-[#C9A44C]">🌱 Quiet Reflection Prompt:</p>
              <p className="text-xs text-[#193323] font-medium mt-1">{excerpts[activeExcerpt].reflection}</p>
            </div>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
