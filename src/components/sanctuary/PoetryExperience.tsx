"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Bookmark, Volume2, X, Feather, Share2, Check } from "lucide-react";
import confetti from "canvas-confetti";

interface Poem {
  id: string;
  title: string;
  category: "Healing & Peace" | "Anxiety & Fear" | "Faith & Trust" | "Love & Waiting";
  excerpt: string;
  fullContent: string[];
  reflection: string;
  affirmation: string;
  scripture: string;
}

const poemsData: Poem[] = [
  {
    id: "poem-1",
    title: "Quiet Waters of Psalm 23",
    category: "Healing & Peace",
    excerpt: "When the noise of the world grows loud and deep, He leads my heart to quiet streams where weary spirits sleep...",
    fullContent: [
      "When the noise of the world grows loud and deep,",
      "He leads my heart to quiet streams where weary spirits sleep.",
      "The shepherd knows the path I cannot see,",
      "In green pastures, His peace surrounds me.",
      "I lack no good thing in His sacred care,",
      "Every heavy burden lifted into prayer."
    ],
    reflection: "Where in your life are you holding on to noise instead of stepping into God's quiet pastures?",
    affirmation: "I am fully provided for. My soul rests in the Shepherd's loving guidance.",
    scripture: "The Lord is my shepherd, I lack nothing. — Psalm 23:1 NIV"
  },
  {
    id: "poem-2",
    title: "Surrendering Anxiety at Dawn",
    category: "Anxiety & Fear",
    excerpt: "Morning sunbeams cut through yesterday's heavy mist, No worry can remain where His gentle mercy is kissed...",
    fullContent: [
      "Morning sunbeams cut through yesterday's heavy mist,",
      "No worry can remain where His gentle mercy is kissed.",
      "Hands unclasped from control and fear,",
      "Knowing the Lord of comfort is standing near.",
      "Breath in peace, release the strain,",
      "His love washes over every hidden pain."
    ],
    reflection: "Take three slow breaths right now. Release your worries to God with every exhale.",
    affirmation: "I release anxiety into God's hands. His perfect love casts out all fear.",
    scripture: "Cast all your anxiety on Him because He cares for you. — 1 Peter 5:7"
  },
  {
    id: "poem-3",
    title: "Trusting the Season of Waiting",
    category: "Faith & Trust",
    excerpt: "Roots grow deep in the silence underground, Long before the blooming flower is ever found...",
    fullContent: [
      "Roots grow deep in the silence underground,",
      "Long before the blooming flower is ever found.",
      "Do not mistake delay for a promise denied,",
      "The Master Gardener works faithfully by your side.",
      "In every season of waiting, faith takes wings,",
      "Trusting in the joy that tomorrow brings."
    ],
    reflection: "Reflect on how past seasons of waiting built strength you carry today.",
    affirmation: "My waiting is not wasted. God is preparing something beautiful in His timing.",
    scripture: "They that wait upon the Lord shall renew their strength. — Isaiah 40:31"
  },
  {
    id: "poem-4",
    title: "Unwavering Love Unfolds",
    category: "Love & Waiting",
    excerpt: "Like a butterfly stretching wings in early spring light, True love patiently awaits the appointed flight...",
    fullContent: [
      "Like a butterfly stretching wings in early spring light,",
      "True love patiently awaits the appointed flight.",
      "God guards your heart with tenderness and care,",
      "Every silent prayer answered beyond compare.",
      "Pure, unconditional, holy and true,",
      "The unending love of Jesus embraces you."
    ],
    reflection: "How can you practice giving and receiving Christ-centered love today?",
    affirmation: "I am deeply loved, cherished, and held by Jesus.",
    scripture: "We love because He first loved us. — 1 John 4:19"
  }
];

export function PoetryExperience() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activePoem, setActivePoem] = useState<Poem | null>(null);
  const [savedPoemIds, setSavedPoemIds] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ["All", "Healing & Peace", "Anxiety & Fear", "Faith & Trust", "Love & Waiting"];

  const filteredPoems = selectedCategory === "All"
    ? poemsData
    : poemsData.filter((p) => p.category === selectedCategory);

  const toggleSavePoem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedPoemIds.includes(id)) {
      setSavedPoemIds(savedPoemIds.filter((item) => item !== id));
    } else {
      setSavedPoemIds([...savedPoemIds, id]);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#C9A44C", "#5F8067", "#FAF7F2"]
      });
    }
  };

  return (
    <section id="poetics" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#193323]/10 text-[#193323] text-xs font-semibold uppercase tracking-widest mb-3">
            <Feather className="w-3.5 h-3.5 text-[#C9A44C]" />
            <span>Interactive Poetry Sanctuary</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#193323] leading-tight mb-4">
            Words for the Weary &amp; Hopeful Soul
          </h2>
          <p className="text-[#536458] text-base">
            Click any poem card below to enter full sanctuary focus mode with meditation prompts and scripture affirmations.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-[#193323] text-[#D4AF37] shadow-md border border-[#C9A44C]/40"
                    : "bg-white text-[#536458] border border-[#5F8067]/15 hover:bg-[#193323]/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Poem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPoems.map((poem) => {
            const isSaved = savedPoemIds.includes(poem.id);
            return (
              <motion.div
                key={poem.id}
                layout
                whileHover={{ y: -4 }}
                onClick={() => setActivePoem(poem)}
                className="p-8 rounded-3xl bg-white border border-[#5F8067]/20 shadow-sm hover:shadow-xl transition-all cursor-pointer relative flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#5F8067]/10 text-[#254631] text-[11px] font-medium">
                      {poem.category}
                    </span>
                    <button
                      onClick={(e) => toggleSavePoem(poem.id, e)}
                      className={`p-2 rounded-full transition-colors ${
                        isSaved ? "bg-[#C9A44C]/20 text-[#C9A44C]" : "text-[#536458] hover:bg-[#193323]/5"
                      }`}
                      title={isSaved ? "Saved to your Sanctuary" : "Save Affirmation"}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? "fill-[#C9A44C]" : ""}`} />
                    </button>
                  </div>

                  <h3 className="font-serif-luxury text-2xl font-bold text-[#193323] group-hover:text-[#5F8067] transition-colors mb-3">
                    {poem.title}
                  </h3>

                  <p className="font-serif-luxury italic text-sm text-[#536458] leading-relaxed mb-6">
                    &ldquo;{poem.excerpt}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#5F8067]/10 flex items-center justify-between text-xs text-[#193323] font-medium">
                  <span className="flex items-center gap-1.5 text-[#C9A44C]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Enter Sanctuary View</span>
                  </span>
                  <span className="text-[#536458] group-hover:translate-x-1 transition-transform">
                    Read Full Poem →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Expanded Poem Sanctuary Modal */}
      <AnimatePresence>
        {activePoem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setActivePoem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 sm:p-10 rounded-3xl bg-[#FAF7F2] border-2 border-[#C9A44C]/30 shadow-2xl"
            >
              <button
                onClick={() => setActivePoem(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white text-[#193323] hover:bg-[#193323] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="px-3 py-1 rounded-full bg-[#193323] text-[#D4AF37] text-xs font-semibold">
                {activePoem.category}
              </span>

              <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#193323] mt-4 mb-6">
                {activePoem.title}
              </h3>

              {/* Full Poem Stanzas */}
              <div className="space-y-3 font-serif-luxury italic text-base sm:text-lg text-[#254631] leading-relaxed mb-8 p-6 rounded-2xl bg-white border border-[#5F8067]/15">
                {activePoem.fullContent.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>

              {/* Reflection & Affirmation Box */}
              <div className="space-y-4 mb-8">
                <div className="p-4 rounded-2xl bg-[#193323]/5 border border-[#5F8067]/15">
                  <p className="text-xs uppercase tracking-wider text-[#C9A44C] font-semibold mb-1">
                    🌱 Quiet Reflection Prompt:
                  </p>
                  <p className="text-sm text-[#193323] font-medium">
                    {activePoem.reflection}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#193323] text-[#FAF7F2]">
                  <p className="text-xs uppercase tracking-wider text-[#C9A44C] font-semibold mb-1">
                    ✨ Daily Affirmation:
                  </p>
                  <p className="font-serif-luxury text-sm text-white">
                    {activePoem.affirmation}
                  </p>
                  <p className="text-[11px] text-[#C9A44C] font-mono mt-2">
                    {activePoem.scripture}
                  </p>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between">
                <button
                  onClick={(e) => toggleSavePoem(activePoem.id, e)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#193323] text-[#D4AF37] text-xs font-semibold shadow-md"
                >
                  <Bookmark className="w-4 h-4 fill-[#D4AF37]" />
                  <span>Save Affirmation</span>
                </button>
                <button
                  onClick={() => setActivePoem(null)}
                  className="text-xs font-medium text-[#536458] hover:text-[#193323]"
                >
                  Close Sanctuary Mode
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
