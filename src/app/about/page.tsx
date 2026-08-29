"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/sanctuary/Navbar";
import { ContactFooter } from "@/components/sanctuary/ContactFooter";
import { AmbientCanvas } from "@/components/sanctuary/AmbientCanvas";
import { motion } from "framer-motion";
import { GraduationCap, Feather, Coffee, Heart, Sparkles, Download, Quote, Compass, BookOpen } from "lucide-react";

export default function AboutPage() {
  const galleryImages = [
    { src: "/images/author-reading-field.png", title: "Quiet Reflection in Nature", caption: "Seeking peace and clarity in God's creation" },
    { src: "/images/author-butterfly-mural.png", title: "Embracing Transformation", caption: "Standing with the vibrant butterfly mural" },
    { src: "/images/author-hallway.png", title: "Sharing Encouraging Poetics", caption: "Holding her published book in Dallas archways" },
    { src: "/images/author-butterfly-portrait.png", title: "Artistic Joy & Hope", caption: "Celebrating faith and creative expression" },
    { src: "/images/author-reading-field.png", title: "Seasons of Prayer", caption: "Grounded in God's word through life's transitions" },
  ];

  const [activePhoto, setActivePhoto] = useState(galleryImages[0]);

  return (
    <main className="relative min-h-screen bg-[#FAF7F2] text-[#1C2620]">
      <AmbientCanvas />
      <Navbar />

      {/* Hero Header Banner */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#E5ECE6]/40 to-[#FAF7F2] text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#C9A44C]/30 shadow-xs mb-4"
          >
            <Compass className="w-4 h-4 text-[#C9A44C]" />
            <span className="font-serif-luxury italic text-xs text-[#193323]">
              &ldquo;The Lord is my shepherd, I lack nothing&rdquo;
            </span>
            <span className="text-[10px] font-mono text-[#C9A44C] font-semibold">Psalm 23:1</span>
          </motion.div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-[#193323] leading-tight mb-4">
            The Author&apos;s Heart &amp; Testimony
          </h1>
          <p className="font-script-poetry text-2xl sm:text-3xl text-[#C9A44C] max-w-2xl mx-auto">
            A blend of honesty, kindness, quiet strength, and unwavering faith.
          </p>
        </div>
      </section>

      {/* Main Bio Story Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Featured Photo */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative h-[420px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src={activePhoto.src}
                alt={activePhoto.title}
                fill
                className="object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#193323]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-serif-luxury font-bold text-lg">{activePhoto.title}</p>
                <p className="text-xs text-[#E5ECE6]">{activePhoto.caption}</p>
              </div>
            </div>

            {/* Thumbnail Selector */}
            <div className="grid grid-cols-5 gap-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhoto(img)}
                  className={`relative h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    activePhoto.src === img.src && activePhoto.title === img.title
                      ? "border-[#C9A44C] scale-105 shadow-md"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img.src} alt={img.title} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Full Narrative Bio */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#193323]/10 text-[#193323] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A44C]" />
              <span>About Kalandice Thomas</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#193323] leading-tight">
              Speaking Life into Every Space She Enters
            </h2>

            <p className="text-[#536458] text-base leading-relaxed">
              Kalandice is grounded in prayer. She wants the absolute best for others, offering heartfelt advice and encouragement that uplifts. Her sincerity is unmistakable—felt in her words, her prayers, and her bright, contagious smile that sparks joy in every room.
            </p>

            <p className="text-[#536458] text-base leading-relaxed">
              A proud graduate of <strong>Texas Woman&apos;s University</strong>, creativity flows through her hair, her art, and her words. She loves exploring new cuisines, writing, adorable animals, a warm cup of tea, and the whimsical magic of Studio Ghibli films.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-[#5F8067]/15 shadow-xs">
                <GraduationCap className="w-5 h-5 text-[#C9A44C] mb-2" />
                <h4 className="font-serif-luxury font-bold text-sm text-[#193323]">Texas Woman&apos;s University</h4>
                <p className="text-xs text-[#536458]">Academic excellence &amp; lifelong dedication to uplifting others.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#5F8067]/15 shadow-xs">
                <Coffee className="w-5 h-5 text-[#C9A44C] mb-2" />
                <h4 className="font-serif-luxury font-bold text-sm text-[#193323]">Tea &amp; Studio Ghibli</h4>
                <p className="text-xs text-[#536458]">Finding whimsical magic in quiet mornings and simple joys.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Author Statement Quote Card */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#193323] text-[#FAF7F2] shadow-2xl border border-[#C9A44C]/30 relative overflow-hidden">
          <Quote className="w-12 h-12 text-[#C9A44C]/30 mb-4" />
          <blockquote className="font-serif-luxury text-xl sm:text-2xl leading-relaxed italic text-white mb-6">
            &ldquo;I wrote this poetry book to share my truth and encourage anyone walking through similar life struggles—whether it&apos;s anxiety, fear, worry, stress, depression, loss, figuring out love, waiting, or simply trying to navigate life. Living in this world can be precarious. Even so, the Lord called me to write and to trust Him through seasons of uncertainty and anticipation.&rdquo;
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-[#C9A44C] overflow-hidden relative">
              <Image src="/images/logo.png" alt="Kalandice Logo" fill className="object-cover" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Kalandice Thomas</p>
              <p className="font-script-poetry text-xs text-[#C9A44C]">Author &amp; Encouragement Minister</p>
            </div>
          </div>
        </div>
      </section>

      {/* Press & Media Kit Download Card */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="p-8 rounded-3xl bg-white border border-[#5F8067]/20 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h3 className="font-serif-luxury text-xl font-bold text-[#193323]">Press &amp; Media Kit</h3>
            <p className="text-xs text-[#536458]">Download Kalandice&apos;s high-res headshots, official bio, and book cover assets for events.</p>
          </div>
          <a
            href="mailto:kalandice.poetics@gmail.com?subject=Press%20Kit%20Request"
            className="px-6 py-3 rounded-full bg-[#193323] text-[#D4AF37] font-semibold text-xs flex items-center gap-2 hover:bg-[#254631] transition-all shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Request Press Kit</span>
          </a>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
