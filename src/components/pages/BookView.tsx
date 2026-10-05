"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/sanctuary/Navbar";
import { ContactFooter } from "@/components/sanctuary/ContactFooter";
import { AmbientCanvas } from "@/components/sanctuary/AmbientCanvas";
import { motion } from "framer-motion";
import { BookOpen, ShoppingCart, Star, Sparkles, ArrowUpRight } from "lucide-react";
import { CmsImage } from "@/components/CmsImage";
import { CONTACT_EMAIL } from "@/lib/site";
import type { Book } from "@/lib/content/types";

export function BookView({ book, others }: { book: Book | null; others: Book[] }) {
  const [activeExcerpt, setActiveExcerpt] = useState(0);

  const excerpts = [
    {
      chapter: "Chapter 1: Healing & Peace",
      title: "Quiet waters of Psalm 23",
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

  const comingSoon = book?.status === "coming_soon";

  return (
    <main className="relative min-h-screen bg-[#FAF7F2] text-[#1C2620]">
      <AmbientCanvas />
      <Navbar />

      {/* Header Banner */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#E5ECE6]/40 to-[#FAF7F2] text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#C9A44C]/30 shadow-xs mb-4">
            <Star className="w-4 h-4 text-[#C9A44C] fill-[#C9A44C]" />
            <span className="font-serif-luxury text-xs text-[#193323] font-semibold">
              {comingSoon ? "Coming Soon" : "Published Poetry Collection"}
            </span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-[#193323] leading-tight mb-4">
            {book?.title ?? "Books by Kalandice Thomas"}
          </h1>
          {book?.subtitle && (
            <p className="font-script-poetry text-2xl sm:text-3xl text-[#7A5E16] max-w-2xl mx-auto">
              {book.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Main 3D Book & Purchase Showcase */}
      {book && (
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
                  {book.cover_image && (
                    <CmsImage
                      src={book.cover_image}
                      alt={`${book.title} book cover`}
                      fill
                      sizes="(min-width: 640px) 360px, 300px"
                      className="object-cover"
                      priority
                    />
                  )}
                </div>
              </motion.div>
            </div>

            {/* Book Details & Purchase Options */}
            <div className="lg:col-span-7 space-y-6">
              {book.scripture && (
                <div className="p-4 rounded-2xl bg-white border border-[#5F8067]/20 shadow-xs">
                  <p className="font-serif-luxury italic text-sm text-[#193323]">{book.scripture}</p>
                </div>
              )}

              <h2 className="font-serif-luxury text-3xl font-bold text-[#193323]">
                A Sanctuary Companion for Quiet Hours
              </h2>

              <p className="text-[#536458] text-base leading-relaxed whitespace-pre-line">{book.description}</p>

              {book.themes.length > 0 && (
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-widest text-[#536458] font-semibold">Included Sanctuary Themes:</p>
                  <div className="flex flex-wrap gap-2">
                    {book.themes.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full bg-[#193323]/5 border border-[#5F8067]/20 text-xs font-medium text-[#193323]">
                        ✨ {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Purchase Hub Box */}
              <div className="p-6 rounded-3xl bg-[#193323] text-[#FAF7F2] border border-[#C9A44C]/30 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-serif-luxury text-lg font-bold text-white">
                      {comingSoon ? "Coming Soon" : "Order Your Copy Today"}
                    </h3>
                    <p className="text-xs text-[#E5ECE6]">
                      {comingSoon
                        ? "Join the newsletter to hear the moment it's released."
                        : "Available now through the official listing."}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#D4AF37] px-3 py-1 rounded-full bg-white/10 shrink-0">Official Listing</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  {book.buy_url && (
                    <a
                      href={book.buy_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3.5 rounded-full bg-[#C9A44C] text-[#193323] font-bold text-xs hover:bg-[#e6ca65] transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>{book.buy_label}</span>
                    </a>
                  )}
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=Autographed%20Book%20Order`}
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
      )}

      {/* Interactive Excerpt & Chapter Previewer */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#4A6B52]">Inside the Book</span>
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
                <p className={`text-[11px] font-mono uppercase ${activeExcerpt === idx ? "text-[#D4AF37]" : "text-[#7A5E16]"}`}>{ex.chapter}</p>
                <p className="font-serif-luxury font-bold text-sm mt-0.5">{ex.title}</p>
              </button>
            ))}
          </div>

          {/* Excerpt Stanzas Card */}
          <div className="md:col-span-8 p-8 rounded-3xl bg-white border border-[#5F8067]/20 shadow-md space-y-6">
            <div>
              <span className="text-xs font-semibold text-[#4A6B52] uppercase">{excerpts[activeExcerpt].chapter}</span>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#193323] mt-1">{excerpts[activeExcerpt].title}</h3>
            </div>

            <div className="space-y-2 font-serif-luxury italic text-lg text-[#254631] p-6 rounded-2xl bg-[#FAF7F2] border border-[#5F8067]/10">
              {excerpts[activeExcerpt].stanzas.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-[#193323]/5 border border-[#5F8067]/15">
              <p className="text-xs font-semibold uppercase text-[#7A5E16]">🌱 Quiet Reflection Prompt:</p>
              <p className="text-xs text-[#193323] font-medium mt-1">{excerpts[activeExcerpt].reflection}</p>
            </div>
          </div>
        </div>
      </section>

      {/* More Books / Future Releases */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#4A6B52]">The Bookshelf</span>
          <h2 className="font-serif-luxury text-3xl font-bold text-[#193323] mt-1">More from Kalandice</h2>
        </div>

        {others.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {others.map((b) => (
              <div key={b.id} className="p-6 rounded-3xl bg-white border border-[#5F8067]/20 shadow-sm flex flex-col gap-4">
                <div className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden bg-[#E5ECE6]">
                  {b.cover_image ? (
                    <CmsImage
                      src={b.cover_image}
                      alt={`${b.title} book cover`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-[#5F8067]/40" />
                    </div>
                  )}
                  {b.status === "coming_soon" && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#193323] text-[#D4AF37] text-[11px] font-semibold">
                      Coming Soon
                    </span>
                  )}
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="font-serif-luxury text-xl font-bold text-[#193323]">{b.title}</h3>
                  {b.subtitle && <p className="font-script-poetry text-lg text-[#7A5E16]">{b.subtitle}</p>}
                  <p className="text-xs text-[#536458] leading-relaxed whitespace-pre-line">{b.description}</p>
                </div>
                {b.buy_url && (
                  <a
                    href={b.buy_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#193323] text-[#FAF7F2] font-semibold text-xs hover:bg-[#254631] transition-all"
                  >
                    <span>{b.buy_label}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#C9A44C]" />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-dashed border-[#C9A44C]/50 text-center space-y-3">
            <Sparkles className="w-6 h-6 text-[#C9A44C] mx-auto" />
            <h3 className="font-serif-luxury text-xl font-bold text-[#193323]">New words are being written</h3>
            <p className="text-sm text-[#536458] max-w-lg mx-auto">
              Future collections from Kalandice will appear here. Join the monthly encouragement letter to be the first to hear about new releases.
            </p>
            <Link
              href="/#newsletter"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#193323] text-[#D4AF37] font-semibold text-xs hover:bg-[#254631] transition-all"
            >
              Join the Newsletter
            </Link>
          </div>
        )}
      </section>

      <ContactFooter />
    </main>
  );
}
