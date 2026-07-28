"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, HeartHandshake, ChevronDown, Sparkles, Sun } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden hero-sunbeam-bg">
      {/* Background Soft Glow & Rays */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#C9A44C]/15 via-[#5F8067]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Floating Foliage Accent Elements */}
      <div className="absolute top-16 left-10 w-24 h-24 rounded-full bg-[#5F8067]/10 blur-xl animate-float-leaf pointer-events-none" />
      <div className="absolute bottom-20 right-12 w-32 h-32 rounded-full bg-[#C9A44C]/10 blur-2xl animate-float-slow pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center flex flex-col items-center z-20">
        {/* Author Logo Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative group mb-6"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#C9A44C] via-[#5F8067] to-[#C9A44C] opacity-50 blur-sm group-hover:opacity-80 transition duration-500" />
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-[#FAF7F2]">
            <Image
              src="/images/logo.png"
              alt="Encouraging Poetics Brand Vision Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Scripture Spotlight Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[#C9A44C]/30 shadow-sm mb-6"
        >
          <Sun className="w-4 h-4 text-[#C9A44C] animate-spin-slow" />
          <span className="font-serif-luxury italic text-xs sm:text-sm text-[#193323] font-medium">
            &ldquo;The Lord is My Shepherd I Lack Nothing&rdquo;
          </span>
          <span className="text-[11px] font-mono text-[#C9A44C] font-semibold tracking-wider">
            Psalm 23:1 NIV
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#193323] leading-tight mb-4"
        >
          Encouraging Poetics
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-script-poetry text-2xl sm:text-4xl text-[#C9A44C] max-w-2xl mx-auto mb-6 tracking-wide"
        >
          Finding Hope. Healing Through Faith. One Poem At A Time.
        </motion.p>

        {/* Emotional Sanctuary Arc Visual Pathway */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full max-w-xl mx-auto my-6 px-4 py-3 rounded-2xl bg-[#193323]/5 border border-[#5F8067]/15 backdrop-blur-sm"
        >
          <p className="text-[11px] uppercase tracking-widest text-[#536458] font-semibold mb-2">
            The Digital Sanctuary Journey
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 text-xs sm:text-sm font-medium text-[#193323]">
            <span className="px-2.5 py-1 rounded-lg bg-white/70 shadow-xs border border-[#5F8067]/10 text-rose-800">
              Pain
            </span>
            <span className="text-[#C9A44C]">↓</span>
            <span className="px-2.5 py-1 rounded-lg bg-white/70 shadow-xs border border-[#5F8067]/10 text-amber-800">
              Hope
            </span>
            <span className="text-[#C9A44C]">↓</span>
            <span className="px-2.5 py-1 rounded-lg bg-white/70 shadow-xs border border-[#5F8067]/10 text-emerald-800">
              Healing
            </span>
            <span className="text-[#C9A44C]">↓</span>
            <span className="px-2.5 py-1 rounded-lg bg-white/70 shadow-xs border border-[#5F8067]/10 text-teal-800">
              Faith
            </span>
            <span className="text-[#C9A44C]">↓</span>
            <span className="px-2.5 py-1 rounded-lg bg-white/70 shadow-xs border border-[#5F8067]/10 text-indigo-800">
              Encouragement
            </span>
            <span className="text-[#C9A44C]">↓</span>
            <span className="px-2.5 py-1 rounded-lg bg-[#193323] text-[#D4AF37] shadow-sm font-semibold">
              Action
            </span>
          </div>
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4"
        >
          <a
            href="#book"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#193323] text-[#FAF7F2] font-medium text-sm tracking-wide shadow-xl shadow-[#193323]/20 hover:bg-[#254631] hover:scale-105 transition-all duration-300 ring-2 ring-[#C9A44C]/30"
          >
            <BookOpen className="w-4 h-4 text-[#C9A44C]" />
            <span>Read the Book</span>
          </a>
          <a
            href="#journey"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/80 backdrop-blur-md text-[#193323] border border-[#5F8067]/25 font-medium text-sm tracking-wide shadow-sm hover:bg-white hover:border-[#193323] transition-all duration-300"
          >
            <HeartHandshake className="w-4 h-4 text-[#5F8067]" />
            <span>Learn My Story</span>
          </a>
        </motion.div>
      </div>

      {/* Smooth Scroll Indicator */}
      <motion.a
        href="#journey"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#536458] hover:text-[#193323] transition-colors"
      >
        <span className="text-[10px] uppercase tracking-widest font-semibold">
          Scroll to Enter Sanctuary
        </span>
        <ChevronDown className="w-4 h-4 text-[#C9A44C]" />
      </motion.a>
    </section>
  );
}
