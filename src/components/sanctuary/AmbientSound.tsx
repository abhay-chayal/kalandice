"use me";
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function AmbientSound() {
  // Default behaviour is UNMUTED / ON by default
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userMutedRef = useRef(false);

  useEffect(() => {
    // Singleton cleanup for HMR / hot reloads
    if (typeof window !== "undefined" && (window as unknown as { _sanctuaryAudio?: HTMLAudioElement })._sanctuaryAudio) {
      const prev = (window as unknown as { _sanctuaryAudio?: HTMLAudioElement })._sanctuaryAudio;
      if (prev) {
        prev.pause();
        prev.src = "";
      }
    }

    const audio = new Audio(
      "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=peaceful-piano-ambient-112199.mp3"
    );
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = "auto";
    audio.muted = false;
    audioRef.current = audio;
    (window as unknown as { _sanctuaryAudio?: HTMLAudioElement })._sanctuaryAudio = audio;

    // Start playing unmuted by default
    const attemptPlay = () => {
      if (userMutedRef.current || !audioRef.current) return;
      audioRef.current.muted = false;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Mobile Safari & Chrome require user gesture to unblock unmuted audio
          const unlockOnGesture = () => {
            if (!userMutedRef.current && audioRef.current) {
              audioRef.current.muted = false;
              audioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => {});
            }
            cleanupListeners();
          };

          const cleanupListeners = () => {
            window.removeEventListener("touchstart", unlockOnGesture);
            window.removeEventListener("pointerdown", unlockOnGesture);
            window.removeEventListener("click", unlockOnGesture);
            window.removeEventListener("scroll", unlockOnGesture);
          };

          window.addEventListener("touchstart", unlockOnGesture, { passive: true, once: true });
          window.addEventListener("pointerdown", unlockOnGesture, { passive: true, once: true });
          window.addEventListener("click", unlockOnGesture, { passive: true, once: true });
          window.addEventListener("scroll", unlockOnGesture, { passive: true, once: true });
        });
    };

    attemptPlay();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!audioRef.current) return;

    const audio = audioRef.current;

    if (isPlaying) {
      // User explicitly muted: Stop audio instantly & pause
      userMutedRef.current = true;
      setIsPlaying(false);
      audio.muted = true;
      audio.pause();
    } else {
      // User explicitly unmuted: Resume audio from current position
      userMutedRef.current = false;
      setIsPlaying(true);
      audio.muted = false;
      audio.play().catch((err) => console.log("Audio play catch:", err));
    }
  };

  return (
    <button
      onClick={handleToggle}
      type="button"
      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 select-none cursor-pointer touch-manipulation ${
        isPlaying
          ? "bg-[#193323] text-[#D4AF37] border border-[#C9A44C]/40 shadow-md ring-2 ring-[#C9A44C]/20"
          : "bg-white/80 text-[#536458] border border-[#5F8067]/20 hover:bg-white hover:text-[#193323]"
      }`}
      title={isPlaying ? "Click to Mute Sanctuary Audio" : "Click to Unmute Sanctuary Audio"}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse shrink-0" />
          <span className="whitespace-nowrap">Sanctuary Audio: On</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-ping shrink-0" />
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-rose-700 shrink-0" />
          <span className="whitespace-nowrap">Sanctuary Audio: Muted</span>
        </>
      )}
    </button>
  );
}
