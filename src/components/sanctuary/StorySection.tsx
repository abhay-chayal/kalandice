"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Heart, Sparkles, Coffee, GraduationCap, Feather, Compass } from "lucide-react";

export function StorySection() {
  const storyPoints = [
    {
      icon: GraduationCap,
      title: "Grounded in Purpose",
      text: "A proud graduate of Texas Woman's University, Kalandice combines academic dedication with a heart committed to uplifting others.",
    },
    {
      icon: Feather,
      title: "Creativity & Artistry",
      text: "Creativity flows through her hair, her art, and her words. She finds beauty in writing, exploring new cuisines, and magical Studio Ghibli films.",
    },
    {
      icon: Coffee,
      title: "Quiet Strength & Joy",
      text: "Grounded in prayer, her warmth and contagious smile bring a refreshing, peaceful energy into every room she enters.",
    },
    {
      icon: Heart,
      title: "Natural Peacemaker",
      text: "Dedicated and driven, she embraces harmony without diminishing her convictions—cheering on everyone walking through season transitions.",
    },
  ];

  return (
    <section id="journey" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] relative overflow-hidden">
      {/* Background Subtle Leaf Pattern Accent */}
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#193323]/10 text-[#193323] text-xs font-semibold uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5 text-[#C9A44C]" />
            <span>The Author&apos;s Journey</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#193323] leading-tight mb-4">
            A Story Written in Quiet Strength &amp; Faith
          </h2>
          <p className="text-[#536458] text-base sm:text-lg max-w-2xl mx-auto">
            Discover how personal struggles turned into poetic sanctuary, offering hope to anyone navigating anxiety, fear, and life&apos;s waiting seasons.
          </p>
        </div>

        {/* Visual Storytelling Grid with PDF Images */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Main Photo Gallery */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 relative">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl border-4 border-white"
            >
              <Image
                src="/images/author-reading-field.png"
                alt="Kalandice Thomas reading in nature"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#193323]/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium">
                🌿 Seeking peace in God&apos;s creation
              </div>
            </motion.div>

            <div className="flex flex-col gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative h-44 sm:h-48 rounded-3xl overflow-hidden shadow-lg border-4 border-white"
              >
                <Image
                  src="/images/author-butterfly-mural.png"
                  alt="Kalandice at butterfly mural"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-white text-[11px] font-medium">
                  🦋 Transformation &amp; Joy
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative h-44 sm:h-48 rounded-3xl overflow-hidden shadow-lg border-4 border-white"
              >
                <Image
                  src="/images/author-hallway.png"
                  alt="Kalandice Thomas holding Encouraging Poetics"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-white text-[11px] font-medium">
                  📖 Sharing Her Truth
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bio Story Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h3 className="font-serif-luxury text-2xl font-bold text-[#193323]">
              Meet Kalandice Thomas
            </h3>
            <p className="text-[#536458] text-sm sm:text-base leading-relaxed">
              Kalandice is a blend of honesty, kindness, and quiet strength. Grounded in prayer, she speaks life into those around her with a bright, contagious smile that brings a refreshing energy into every space.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {storyPoints.map((point) => (
                <div
                  key={point.title}
                  className="p-4 rounded-2xl bg-white border border-[#5F8067]/15 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#193323]/10 flex items-center justify-center text-[#193323] mb-3">
                    <point.icon className="w-4 h-4 text-[#C9A44C]" />
                  </div>
                  <h4 className="font-serif-luxury text-sm font-bold text-[#193323] mb-1">
                    {point.title}
                  </h4>
                  <p className="text-xs text-[#536458] leading-relaxed">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Author Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-8 sm:p-12 rounded-3xl bg-[#193323] text-[#FAF7F2] shadow-2xl border border-[#C9A44C]/30 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#C9A44C]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          <Quote className="w-12 h-12 text-[#C9A44C]/30 mb-4" />

          <blockquote className="font-serif-luxury text-lg sm:text-2xl leading-relaxed italic text-[#FAF7F2] mb-6 relative z-10">
            &ldquo;I wrote this poetry book to share my truth and encourage anyone walking through similar life struggles—whether it&apos;s anxiety, fear, worry, stress, depression, loss, figuring out love, waiting, or simply trying to navigate life... My prayer is that these words open your heart and eyes to the unending, unwavering love Jesus has for you.&rdquo;
          </blockquote>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#C9A44C] relative">
              <Image
                src="/images/logo.png"
                alt="Kalandice"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-serif-luxury font-bold text-base text-white">
                Kalandice Thomas
              </p>
              <p className="font-script-poetry text-sm text-[#C9A44C]">
                Author of Encouraging Poetics
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
