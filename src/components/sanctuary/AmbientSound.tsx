"use me";
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Singleton audio instance cleanup for HMR
    if (typeof window !== "undefined" && (window as unknown as { _sanctuaryAudio?: HTMLAudioElement })._sanctuaryAudio) {
      const prevAudio = (window as unknown as { _sanctuaryAudio?: HTMLAudioElement })._sanctuaryAudio;
      if (prevAudio) {
        prevAudio.pause();
      }
    }

    const audio = new Audio(
      "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=peaceful-piano-ambient-112199.mp3"
    );
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;
    (window as unknown as { _sanctuaryAudio?: HTMLAudioElement })._sanctuaryAudio = audio;

    return () => {
      audio.pause();
    };
  }, []);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!audioRef.current) return;

    if (isPlaying) {
      // Pause audio without resetting currentTime so it resumes smoothly from where it left off
      audioRef.current.muted = true;
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Unmute and resume playback from current position
      audioRef.current.muted = false;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Audio play blocked by browser policy:", err);
        });
    }
  };

  return (
    <button
      onClick={toggleSound}
      type="button"
      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
        isPlaying
          ? "bg-[#193323] text-[#D4AF37] border border-[#C9A44C]/40 shadow-md ring-2 ring-[#C9A44C]/20"
          : "bg-white/80 text-[#536458] border border-[#5F8067]/20 hover:bg-white hover:text-[#193323]"
      }`}
      title={isPlaying ? "Click to Mute Sanctuary Audio" : "Click to Unmute Sanctuary Audio"}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
          <span>Sanctuary Audio: On</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-ping" />
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 opacity-60 text-rose-700" />
          <span>Sanctuary Audio: Muted</span>
        </>
      )}
    </button>
  );
}
