"use client";

import React from "react";
import { motion } from "framer-motion";
import { Music, HeartPulse, Church, ExternalLink, ShieldAlert, Headphones } from "lucide-react";
import type { ResourceGroups } from "@/lib/content/types";

export function ResourcesSection({ resources }: { resources: ResourceGroups }) {
  const { playlist: spotifyPlaylists, mental_health: mentalHealthResources, faith } = resources;

  return (
    <section id="resources" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#E5ECE6]/30 to-[#FAF7F2]">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#193323]/10 text-[#193323] text-xs font-semibold uppercase tracking-widest mb-3">
            <HeartPulse className="w-3.5 h-3.5 text-[#C9A44C]" />
            <span>Sanctuary Care &amp; Support</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#193323] leading-tight mb-4">
            Resources for Your Spirit &amp; Mind
          </h2>
          <p className="text-[#536458] text-base">
            Carefully curated Spotify playlists, professional mental health support, and local church finder tools.
          </p>
        </div>

        {/* 1. Spotify Sanctuary Playlists */}
        <div className="mb-16">
          <h3 className="font-serif-luxury text-xl font-bold text-[#193323] flex items-center gap-2 mb-6">
            <Music className="w-5 h-5 text-[#1DB954]" />
            <span>Author Spotify Sanctuary Playlists</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {spotifyPlaylists.map((playlist) => (
              <motion.a
                key={playlist.id}
                href={playlist.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="p-6 rounded-3xl bg-white border border-[#5F8067]/20 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#1DB954]/10 flex items-center justify-center text-[#1DB954] mb-4 group-hover:scale-110 transition-transform">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif-luxury text-lg font-bold text-[#193323] group-hover:text-[#5F8067] transition-colors mb-2">
                    {playlist.title}
                  </h4>
                  <p className="text-xs text-[#536458] leading-relaxed mb-4">
                    {playlist.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-[#1DB954]">
                  <span>Listen on Spotify</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* 2. Mental Health & Church Finder Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Mental Health Support Cards */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <h3 className="font-serif-luxury text-xl font-bold text-[#193323] flex items-center gap-2 mb-2">
              <ShieldAlert className="w-5 h-5 text-[#C9A44C]" />
              <span>Recommended Self-Help &amp; Mental Health</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {mentalHealthResources.map((res) => (
                <a
                  key={res.id}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-white border border-[#5F8067]/15 hover:border-[#193323] hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="px-2.5 py-0.5 rounded-md bg-[#193323]/5 text-[10px] font-semibold text-[#5F8067]">
                      {res.tag || "Resource"}
                    </span>
                    <h4 className="font-serif-luxury text-sm font-bold text-[#193323] mt-2 mb-1 group-hover:text-[#5F8067] transition-colors">
                      {res.title}
                    </h4>
                    <p className="text-[11px] text-[#536458] leading-normal">
                      {res.description}
                    </p>
                  </div>
                  <span className="text-[11px] font-medium text-[#193323] mt-3 flex items-center gap-1">
                    <span>Visit Resource</span>
                    <ExternalLink className="w-3 h-3 text-[#C9A44C]" />
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Church Finder / Faith Card */}
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

      </div>
    </section>
  );
}
