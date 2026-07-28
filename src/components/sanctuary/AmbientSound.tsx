"use me";
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

export function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const toggleSound = () => {
    if (isPlaying) {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    } else {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Create warm ambient chord pad (A440 gentle sine modulation)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(220, ctx.currentTime); // A3 note
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(277.18, ctx.currentTime); // C#4 note

        gain.gain.setValueAtTime(0.04, ctx.currentTime); // Very soft background hum

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();
        gainNodeRef.current = gain;
      } else {
        audioCtxRef.current.resume();
      }
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
        isPlaying
          ? "bg-[#193323] text-[#D4AF37] border border-[#C9A44C]/40 shadow-lg shadow-[#193323]/20 ring-2 ring-[#C9A44C]/30"
          : "bg-white/70 text-[#536458] border border-[#5F8067]/20 hover:bg-white hover:text-[#193323]"
      }`}
      title="Toggle Sanctuary Ambient Soundscape"
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#D4AF37]" />
          <span>Sanctuary Audio: On</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 opacity-60" />
          <span>Sanctuary Audio</span>
        </>
      )}
    </button>
  );
}
