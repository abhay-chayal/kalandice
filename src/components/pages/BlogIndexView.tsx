"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/sanctuary/Navbar";
import { ContactFooter } from "@/components/sanctuary/ContactFooter";
import { AmbientCanvas } from "@/components/sanctuary/AmbientCanvas";
import { motion } from "framer-motion";
import { Search, BookOpen, Clock, ArrowRight } from "lucide-react";
import { CmsImage } from "@/components/CmsImage";
import type { Post } from "@/lib/content/types";
import { formatDate, readTime } from "@/lib/content/format";

export function BlogIndexView({ posts }: { posts: Post[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  const filteredPosts = posts.filter((post) => {
    const matchesCat = selectedCat === "All" || post.category === selectedCat;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <main className="relative min-h-screen bg-[#FAF7F2] text-[#1C2620]">
      <AmbientCanvas />
      <Navbar />

      {/* Header Banner */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#E5ECE6]/40 to-[#FAF7F2] text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#C9A44C]/30 shadow-xs">
            <BookOpen className="w-4 h-4 text-[#C9A44C]" />
            <span className="font-serif-luxury text-xs text-[#193323] font-semibold">Devotional &amp; Encouragement Essays</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-[#193323]">
            Encouraging Words &amp; Devotionals
          </h1>
          <p className="font-script-poetry text-2xl sm:text-3xl text-[#C9A44C]">
            Monthly essays on faith, grace, and creative quiet hours.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mt-6">
            <Search className="w-5 h-5 text-[#536458] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search devotional essays..."
              aria-label="Search devotional essays"
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white border border-[#5F8067]/25 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A44C] shadow-sm text-[#193323]"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  selectedCat === cat
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

      {/* Blog Cards Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.slug}
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-white border border-[#5F8067]/20 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                {post.cover_image && (
                  <div className="relative h-44 -mx-8 -mt-8 mb-6 rounded-t-3xl overflow-hidden">
                    <CmsImage src={post.cover_image} alt={post.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-[#536458] mb-3">
                  <span className="px-3 py-0.5 rounded-full bg-[#5F8067]/10 text-[#254631] font-medium">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3 h-3 text-[#C9A44C]" />
                    {readTime(post.content)}
                  </span>
                </div>

                <h2 className="font-serif-luxury text-xl font-bold text-[#193323] group-hover:text-[#5F8067] transition-colors mb-3">
                  {post.title}
                </h2>

                <p className="text-xs text-[#536458] leading-relaxed mb-4">{post.excerpt}</p>
              </div>

              <div className="pt-4 border-t border-[#5F8067]/10 flex items-center justify-between text-xs font-semibold text-[#193323]">
                <Link href={`/blog/${post.slug}`} className="flex items-center gap-1 text-[#193323] group-hover:text-[#C9A44C] transition-colors">
                  <span>Read Devotional</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] text-[#536458] font-mono">{formatDate(post.published_at)}</span>
              </div>
            </motion.div>
          ))}
        </div>
        {filteredPosts.length === 0 && (
          <p className="text-center text-sm text-[#536458] py-12">
            {posts.length === 0 ? "New devotionals are on the way. Check back soon." : "No devotionals match your search."}
          </p>
        )}
      </section>

      <ContactFooter />
    </main>
  );
}
