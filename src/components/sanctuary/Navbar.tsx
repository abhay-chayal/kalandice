"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AmbientSound } from "./AmbientSound";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Journey", href: "/about" },
    { name: "The Book", href: "/book" },
    { name: "Poetics", href: "/poetics" },
    { name: "Resources", href: "/resources" },
    { name: "Events", href: "/events" },
    { name: "Devotionals", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || pathname !== "/"
          ? "bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#5F8067]/15 py-2.5 sm:py-3 shadow-sm"
          : "bg-transparent py-3.5 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink min-w-0">
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-[#C9A44C]/40 shadow-sm group-hover:scale-105 transition-transform duration-300 shrink-0">
            <Image
              src="/images/logo.webp"
              alt="Encouraging Poetics logo"
              fill
              sizes="44px"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-serif-luxury text-sm sm:text-lg tracking-tight font-semibold text-[#193323] leading-tight group-hover:text-[#5F8067] transition-colors truncate">
              Kalandice Thomas
            </span>
            <span className="font-script-poetry text-[11px] sm:text-xs text-[#7A5E16] tracking-wide truncate">
              Encouraging Poetics
            </span>
          </div>
        </Link>

        {/* Center Scripture Pill (Visible on xl+ screens) */}
        <div className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#193323]/5 border border-[#5F8067]/20 text-xs text-[#254631] font-medium shadow-xs shrink-0 max-w-md">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A44C] shrink-0" />
          <span className="font-serif-luxury italic truncate">
            &ldquo;The Lord is my shepherd, I lack nothing&rdquo;
          </span>
          <span className="text-[10px] text-[#7A5E16] font-mono font-semibold uppercase tracking-wider shrink-0">
            Ps 23:1
          </span>
        </div>

        {/* Desktop Links & Sanctuary Sound Toggle */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7 shrink-0">
          <nav className="flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[11px] lg:text-xs uppercase tracking-widest font-semibold transition-colors relative group py-1 whitespace-nowrap ${
                    isActive ? "text-[#193323]" : "text-[#536458] hover:text-[#193323]"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-[#C9A44C] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="w-px h-5 bg-[#5F8067]/20" />
          <AmbientSound />
        </div>

        {/* Mobile Actions: Audio Toggle + Hamburger Menu */}
        <div className="flex items-center gap-2 md:hidden shrink-0">
          <AmbientSound />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="w-11 h-11 rounded-xl bg-white/90 border border-[#5F8067]/25 text-[#193323] hover:bg-[#193323] hover:text-[#FAF7F2] transition-colors shadow-xs flex items-center justify-center shrink-0 cursor-pointer touch-manipulation z-30"
            aria-label="Toggle navigation menu"
            title="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-rose-700" /> : <Menu className="w-5 h-5" />}
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
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-[#FAF7F2] border-b-2 border-[#C9A44C]/30 px-5 py-5 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              <div className="p-3 rounded-xl bg-[#193323]/5 border border-[#5F8067]/15 text-center">
                <p className="font-serif-luxury italic text-xs text-[#193323]">
                  &ldquo;The Lord is my shepherd, I lack nothing&rdquo;
                </p>
                <p className="text-[10px] text-[#7A5E16] font-semibold mt-1">
                  Psalm 23:1 NIV
                </p>
              </div>

              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-semibold py-2.5 px-3 rounded-xl border-b border-[#5F8067]/10 flex items-center justify-between transition-colors ${
                      isActive ? "bg-[#193323]/10 text-[#193323]" : "text-[#254631] hover:bg-white/60"
                    }`}
                  >
                    <span>{link.name}</span>
                    <span className="text-[#7A5E16]">→</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
