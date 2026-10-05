"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/sanctuary/Navbar";
import { ContactFooter } from "@/components/sanctuary/ContactFooter";
import { AmbientCanvas } from "@/components/sanctuary/AmbientCanvas";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Feather, Sparkles, Bookmark, X } from "lucide-react";
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

const poemsLibrary: Poem[] = [
  {
    id: "p1",
    title: "Quiet waters of Psalm 23",
    category: "Healing & Peace",
    excerpt: "When the noise of the world grows loud and deep, He leads my heart to quiet streams...",
    fullContent: [
      "When the noise of the world grows loud and deep,",
      "He leads my heart to quiet streams",
      "The shepherd knows the path I cannot see,",
      "In green pastures His peace surrounds me.",
      "I lack no good thing in His sacred care,",
      "Every heavy burden lifted into prayer."
    ],
    reflection: "Where in your life are you holding on to noise instead of stepping into God's quiet pastures?",
    affirmation: "I am fully provided for. My soul rests in the Shepherd's loving guidance.",
    scripture: "The Lord is my shepherd, I lack nothing. — Psalm 23:1 NIV"
  },
  {
    id: "p2",
    title: "Surrendering Anxiety: Poem Rewritten",
    category: "Anxiety & Fear",
    excerpt: "As the Morning sunbeams cut through yesterday's heavy dew, No worry can remain where His gentle presence is anew...",
    fullContent: [
      "As the Morning sunbeams cut through yesterday's heavy dew,",
      "No worry can remain where His gentle presence is anew.",
      "Hands unclasped from anxiety and fear,",
      "Knowing the Lord of comfort is standing near.",
      "Breath in peace, release the strain,",
      "His love washes over every hidden pain."
    ],
    reflection: "Take three slow breaths right now. Release your worries to God with every exhale.",
    affirmation: "I release anxiety into God's hands. His perfect love casts out all fear.",
    scripture: "Cast all your anxiety on Him because He cares for you. — 1 Peter 5:7"
  },
  {
    id: "p3",
    title: "Trusting the Season of Waiting",
    category: "Faith & Trust",
    excerpt: "Roots grow deep in silence underground, Long before a blooming flower is found...",
    fullContent: [
      "Roots grow deep in silence underground,",
      "Long before a blooming flower is found.",
      "Do not mistake delay for a promise denied,",
      "For we have a trustworthy gardener by our side,",
      "faithfully working in every season",
      "know that you can trust and lean on Him."
    ],
    reflection: "Reflect on how past seasons of waiting built strength you carry today.",
    affirmation: "My waiting is not wasted. God is preparing something beautiful in His timing.",
    scripture: "They that wait upon the Lord shall renew their strength. — Isaiah 40:31"
  },
  {
    id: "p4",
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
  },
  {
    id: "p5",
    title: "Grace for the Brokenhearted",
    category: "Healing & Peace",
    excerpt: "He collects every tear shed in the dark, Igniting hope from the faintest spark...",
    fullContent: [
      "He collects every tear shed in the dark,",
      "Igniting hope from the faintest spark.",
      "Broken pieces mended in His gentle hands,",
      "Beyond what earthly understanding understands.",
      "He heals the brokenhearted and binds their wounds,",
      "In His presence, true restoration blooms."
    ],
    reflection: "Allow Jesus to hold your grief today with open heart and complete trust.",
    affirmation: "My brokenness is held in God's healing hands. Joy comes in the morning.",
    scripture: "He heals the brokenhearted and binds up their wounds. — Psalm 147:3"
  }
];

export function PoeticsView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activePoem, setActivePoem] = useState<Poem | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const categories = ["All", "Healing & Peace", "Anxiety & Fear", "Faith & Trust", "Love & Waiting"];

  const filteredPoems = poemsLibrary.filter((p) => {
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.affirmation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((i) => i !== id));
    } else {
      setSavedIds([...savedIds, id]);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#C9A44C", "#5F8067", "#FAF7F2"],
      });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#FAF7F2] text-[#1C2620]">
      <AmbientCanvas />
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#E5ECE6]/40 to-[#FAF7F2] text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#C9A44C]/30 shadow-xs">
            <Feather className="w-4 h-4 text-[#C9A44C]" />
            <span className="font-serif-luxury text-xs text-[#193323] font-semibold">Complete Poetry Library &amp; Sanctuary</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-[#193323]">
            The Encouraging Poetics Library
          </h1>
          <p className="font-script-poetry text-2xl sm:text-3xl text-[#7A5E16]">
            One Poem At A Time.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mt-6">
            <Search className="w-5 h-5 text-[#536458] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search poems by keyword, emotion, or scripture..."
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white border border-[#5F8067]/25 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A44C] shadow-sm text-[#193323]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
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
      </section>

      {/* Poem Cards Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPoems.map((poem) => {
            const isSaved = savedIds.includes(poem.id);
            return (
              <motion.div
                key={poem.id}
                whileHover={{ y: -4 }}
                onClick={() => setActivePoem(poem)}
                className="p-6 rounded-3xl bg-white border border-[#5F8067]/20 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-0.5 rounded-full bg-[#5F8067]/10 text-[#254631] text-[11px] font-medium">
                      {poem.category}
                    </span>
                    <button
                      onClick={(e) => toggleSave(poem.id, e)}
                      className={`p-1.5 rounded-full transition-colors ${
                        isSaved ? "bg-[#C9A44C]/20 text-[#7A5E16]" : "text-[#536458] hover:bg-[#193323]/5"
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? "fill-[#C9A44C]" : ""}`} />
                    </button>
                  </div>

                  <h3 className="font-serif-luxury text-xl font-bold text-[#193323] group-hover:text-[#5F8067] transition-colors mb-2">
                    {poem.title}
                  </h3>

                  <p className="font-serif-luxury italic text-xs text-[#536458] leading-relaxed mb-4">
                    &ldquo;{poem.excerpt}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-[#5F8067]/10 flex items-center justify-between text-xs text-[#193323] font-medium">
                  <span className="flex items-center gap-1 text-[#7A5E16]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Focus Sanctuary View</span>
                  </span>
                  <span>Read →</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Expanded Poem Focus Modal */}
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
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 sm:p-10 rounded-3xl bg-[#FAF7F2] border-2 border-[#C9A44C]/30 shadow-2xl space-y-6"
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

              <h3 className="font-serif-luxury text-3xl font-bold text-[#193323]">
                {activePoem.title}
              </h3>

              <div className="space-y-3 font-serif-luxury italic text-lg text-[#254631] leading-relaxed p-6 rounded-2xl bg-white border border-[#5F8067]/15">
                {activePoem.fullContent.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-[#193323]/5 border border-[#5F8067]/15 space-y-1">
                <p className="text-xs uppercase tracking-wider text-[#7A5E16] font-semibold">🌱 Quiet Reflection Prompt:</p>
                <p className="text-sm text-[#193323] font-medium">{activePoem.reflection}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#193323] text-[#FAF7F2] space-y-1">
                <p className="text-xs uppercase tracking-wider text-[#7A5E16] font-semibold">✨ Daily Affirmation:</p>
                <p className="font-serif-luxury text-sm text-white">{activePoem.affirmation}</p>
                <p className="text-[11px] text-[#7A5E16] font-mono mt-1">{activePoem.scripture}</p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={(e) => toggleSave(activePoem.id, e)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#193323] text-[#D4AF37] text-xs font-semibold"
                >
                  <Bookmark className="w-4 h-4 fill-[#D4AF37]" />
                  <span>Save Affirmation</span>
                </button>
                <button onClick={() => setActivePoem(null)} className="text-xs text-[#536458] hover:text-[#193323]">
                  Close Modal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactFooter />
    </main>
  );
}
