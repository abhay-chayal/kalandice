"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AmbientSound } from "./AmbientSound";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Journey", href: "#journey" },
    { name: "The Book", href: "#book" },
    { name: "Poetics", href: "#poetics" },
    { name: "Resources", href: "#resources" },
    { name: "Events", href: "#events" },
    { name: "Encouragement", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#5F8067]/15 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-[#C9A44C]/40 shadow-sm group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/logo.png"
              alt="Kalandice Thomas Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif-luxury text-base sm:text-lg tracking-tight font-semibold text-[#193323] leading-none group-hover:text-[#5F8067] transition-colors">
              Kalandice Thomas
            </span>
            <span className="font-script-poetry text-xs text-[#C9A44C] tracking-wide mt-0.5">
              Encouraging Poetics
            </span>
          </div>
        </Link>

        {/* Center Scripture Pill (Ultra-clean, visible only on large screens xl+ to avoid layout collisions) */}
        <div className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#193323]/5 border border-[#5F8067]/20 text-xs text-[#254631] font-medium shadow-xs shrink-0 max-w-md">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A44C] shrink-0" />
          <span className="font-serif-luxury italic truncate">
            &ldquo;The Lord is my shepherd, I lack nothing&rdquo;
          </span>
          <span className="text-[10px] text-[#C9A44C] font-mono font-semibold uppercase tracking-wider shrink-0">
            Ps 23:1
          </span>
        </div>

        {/* Desktop Links & Sanctuary Sound Toggle */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7 shrink-0">
          <nav className="flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] lg:text-xs uppercase tracking-widest text-[#536458] hover:text-[#193323] font-semibold transition-colors relative group py-1 whitespace-nowrap"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A44C] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="w-px h-5 bg-[#5F8067]/20" />
          <AmbientSound />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <AmbientSound />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-[#193323] hover:bg-[#193323]/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FAF7F2] border-b border-[#5F8067]/20 px-6 py-6 shadow-xl"
          >
            <div className="flex flex-col gap-4">
              <div className="p-3 rounded-xl bg-[#193323]/5 border border-[#5F8067]/15 text-center">
                <p className="font-serif-luxury italic text-xs text-[#193323]">
                  &ldquo;The Lord is my shepherd, I lack nothing&rdquo;
                </p>
                <p className="text-[10px] text-[#C9A44C] font-semibold mt-1">
                  Psalm 23:1 NIV
                </p>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-[#254631] py-2 border-b border-[#5F8067]/10 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-[#C9A44C]">→</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
