import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sanctuary/Navbar";
import { ContactFooter } from "@/components/sanctuary/ContactFooter";
import { Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page doesn't exist. Find your way back to poems, devotionals and encouragement.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[#FAF7F2] text-[#1C2620]">
      <Navbar />
      <section className="pt-40 pb-24 px-4 text-center max-w-2xl mx-auto space-y-6">
        <Compass className="w-10 h-10 text-[#C9A44C] mx-auto" />
        <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-[#193323]">This path wandered off</h1>
        <p className="text-[#536458]">
          The page you&apos;re looking for isn&apos;t here — but you&apos;re never lost. Let&apos;s guide you back to quiet pastures.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="px-6 py-3 rounded-full bg-[#193323] text-[#D4AF37] font-semibold text-sm hover:bg-[#254631] transition-all">
            Return Home
          </Link>
          <Link href="/blog" className="px-6 py-3 rounded-full bg-white border border-[#5F8067]/25 text-[#193323] font-semibold text-sm hover:bg-[#193323]/5 transition-all">
            Read Devotionals
          </Link>
        </div>
      </section>
      <ContactFooter />
    </main>
  );
}
