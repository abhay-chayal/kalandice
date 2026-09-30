"use client";

import React from "react";
import { Navbar } from "@/components/sanctuary/Navbar";
import { ContactFooter } from "@/components/sanctuary/ContactFooter";
import { AmbientCanvas } from "@/components/sanctuary/AmbientCanvas";
import { motion } from "framer-motion";
import { Music, HeartPulse, Church, ExternalLink, Download, Headphones, ShieldAlert, FileText } from "lucide-react";
import type { ResourceGroups } from "@/lib/content/types";
import { CONTACT_EMAIL } from "@/lib/site";

export function ResourcesView({ resources }: { resources: ResourceGroups }) {
  const { playlist: playlists, mental_health: mentalHealth, faith } = resources;

  return (
    <main className="relative min-h-screen bg-[#FAF7F2] text-[#1C2620]">
      <AmbientCanvas />
      <Navbar />

      {/* Header Banner */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#E5ECE6]/40 to-[#FAF7F2] text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#C9A44C]/30 shadow-xs">
            <HeartPulse className="w-4 h-4 text-[#C9A44C]" />
            <span className="font-serif-luxury text-xs text-[#193323] font-semibold">Sanctuary Care &amp; Support Hub</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-[#193323]">
            Resources for Spirit &amp; Mind
          </h1>
          <p className="font-script-poetry text-2xl sm:text-3xl text-[#C9A44C]">
            Carefully curated tools for your healing journey.
          </p>
        </div>
      </section>

      {/* Spotify Sanctuary Playlists */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Music className="w-5 h-5 text-[#1DB954]" />
          <h2 className="font-serif-luxury text-2xl font-bold text-[#193323]">Author Spotify Sanctuary Playlists</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {playlists.map((pl) => (
            <motion.a
              key={pl.id}
              href={pl.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-white border border-[#5F8067]/20 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#1DB954]/10 flex items-center justify-center text-[#1DB954] mb-4 group-hover:scale-110 transition-transform">
                  <Headphones className="w-5 h-5" />
                </div>
                <h3 className="font-serif-luxury text-lg font-bold text-[#193323] group-hover:text-[#5F8067] transition-colors mb-2">
                  {pl.title}
                </h3>
                <p className="text-xs text-[#536458] leading-relaxed mb-4">{pl.description}</p>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#1DB954]">
                <span>Listen on Spotify</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Mental Health & Church Finder Row */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Mental Health Support Cards */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="w-5 h-5 text-[#C9A44C]" />
              <h2 className="font-serif-luxury text-xl font-bold text-[#193323]">Recommended Mental Health Support</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {mentalHealth.map((res) => (
                <a
                  key={res.id}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-white border border-[#5F8067]/15 hover:border-[#193323] hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="px-2 py-0.5 rounded-md bg-[#193323]/5 text-[10px] font-semibold text-[#5F8067]">
                      {res.tag || "Resource"}
                    </span>
                    <h3 className="font-serif-luxury text-sm font-bold text-[#193323] mt-2 mb-1 group-hover:text-[#5F8067] transition-colors">
                      {res.title}
                    </h3>
                    <p className="text-[11px] text-[#536458] leading-normal">{res.description}</p>
                  </div>
                  <span className="text-[11px] font-medium text-[#193323] mt-3 flex items-center gap-1">
                    <span>Visit Resource</span>
                    <ExternalLink className="w-3 h-3 text-[#C9A44C]" />
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Church Finder / Faith Box */}
          {faith.length > 0 && (
          <div className="lg:col-span-4 p-8 rounded-3xl bg-[#193323] text-[#FAF7F2] border border-[#C9A44C]/30 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#C9A44C]/20 flex items-center justify-center text-[#D4AF37] mb-4">
                <Church className="w-5 h-5" />
              </div>
              <h3 className="font-serif-luxury text-2xl font-bold text-white mb-2">{faith[0].title}</h3>
              <p className="text-xs text-[#E5ECE6] leading-relaxed mb-6">{faith[0].description}</p>
              {faith.length > 1 && (
                <ul className="space-y-2 mb-6">
                  {faith.slice(1).map((f) => (
                    <li key={f.id}>
                      <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#D4AF37] hover:text-white inline-flex items-center gap-1.5">
                        <span>{f.title}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <a
              href={faith[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#C9A44C] text-[#193323] font-bold text-xs hover:bg-[#e6ca65] transition-all shadow-md"
            >
              <span>{faith[0].tag || "Visit Resource"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          )}

        </div>
      </section>

      {/* Quiet Time Download Guide */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="p-8 rounded-3xl bg-white border border-[#5F8067]/20 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#C9A44C] font-semibold">
              <FileText className="w-4 h-4" />
              <span>Free Sanctuary Resource</span>
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#193323]">Daily Quiet Hour &amp; Prayer Reflection Worksheets</h3>
            <p className="text-xs text-[#536458]">Ask Kalandice for her free daily prayer guide for morning quiet hours and she&apos;ll send it to your inbox.</p>
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Quiet%20Hour%20Guide%20Request`}
            className="px-6 py-3 rounded-full bg-[#193323] text-[#D4AF37] font-semibold text-xs flex items-center gap-2 hover:bg-[#254631] transition-all shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Request the Guide</span>
          </a>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
