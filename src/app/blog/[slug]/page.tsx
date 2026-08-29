"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/sanctuary/Navbar";
import { ContactFooter } from "@/components/sanctuary/ContactFooter";
import { AmbientCanvas } from "@/components/sanctuary/AmbientCanvas";
import { blogPosts } from "../page";
import { ArrowLeft, Clock, Calendar, Quote, Share2, Sparkles, Heart } from "lucide-react";

export default function BlogPostDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const post = blogPosts.find((p) => p.slug === slug) || blogPosts[0];

  return (
    <main className="relative min-h-screen bg-[#FAF7F2] text-[#1C2620]">
      <AmbientCanvas />
      <Navbar />

      <article className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#5F8067] hover:text-[#193323] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Devotionals</span>
        </Link>

        {/* Post Metadata Header */}
        <div className="space-y-4 text-center">
          <span className="px-3.5 py-1 rounded-full bg-[#193323] text-[#D4AF37] text-xs font-semibold">
            {post.category}
          </span>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#193323] leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-center gap-4 text-xs text-[#536458] font-mono pt-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#C9A44C]" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#5F8067]" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Scripture Spotlight Banner */}
        <div className="p-6 rounded-2xl bg-white border border-[#C9A44C]/40 shadow-xs text-center">
          <p className="font-serif-luxury italic text-base text-[#193323]">&ldquo;{post.scripture}&rdquo;</p>
        </div>

        {/* Full Essay Content */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#5F8067]/20 shadow-md space-y-6 text-[#254631] text-base leading-relaxed font-serif-luxury">
          <p>
            When we wake up to the quiet early light of morning, our hearts are often presented with a choice: will we carry yesterday&apos;s heavy anxieties, or will we step softly into the Shepherd&apos;s quiet pastures?
          </p>

          <p>
            Living in a fast-moving world can be precarious. Worry tells us to grip tighter, to scramble for answers, and to control outcomes. But Jesus invites us into a radically different posture—unclasping our hands and casting all our anxiety onto Him, because He cares for us with an unending, unwavering love.
          </p>

          <blockquote className="p-6 rounded-2xl bg-[#193323] text-[#FAF7F2] font-serif-luxury italic text-lg shadow-inner">
            &ldquo;The Lord is my shepherd; I lack nothing. He makes me lie down in green pastures, He leads me beside quiet waters, He refreshes my soul.&rdquo;
          </blockquote>

          <p>
            Whatever waiting season or anxiety you are facing today, remember that your roots are growing deep in God&apos;s grace. Take a slow breath, rest your spirit in His promises, and trust that He is preparing something beautiful in His perfect timing.
          </p>
        </div>

        {/* Author Bio Footer Block */}
        <div className="p-6 rounded-2xl bg-white border border-[#5F8067]/15 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-[#C9A44C]">
            <Image src="/images/logo.png" alt="Kalandice Thomas" fill className="object-cover" />
          </div>
          <div>
            <p className="font-serif-luxury font-bold text-sm text-[#193323]">Written by Kalandice Thomas</p>
            <p className="text-xs text-[#536458]">Author of Encouraging Poetics • TWU Graduate • Encouragement Minister</p>
          </div>
        </div>
      </article>

      <ContactFooter />
    </main>
  );
}
