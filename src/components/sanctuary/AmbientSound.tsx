"use me";
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

const AUDIO_SRC =
  "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=peaceful-piano-ambient-112199.mp3";

export function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userMutedRef = useRef(false);

  useEffect(() => {
    let audio: HTMLAudioElement;

    if (typeof window !== "undefined" && (window as unknown as { _sanctuaryAudio?: HTMLAudioElement })._sanctuaryAudio) {
      audio = (window as unknown as { _sanctuaryAudio?: HTMLAudioElement })._sanctuaryAudio!;
      if (!audio.src) {
        audio.src = AUDIO_SRC;
      }
    } else {
      audio = new Audio(AUDIO_SRC);
      audio.loop = true;
      audio.volume = 0.35;
      audio.preload = "auto";
      (window as unknown as { _sanctuaryAudio?: HTMLAudioElement })._sanctuaryAudio = audio;
    }

    audioRef.current = audio;

    audio.onplay = () => setIsPlaying(true);
    audio.onpause = () => setIsPlaying(false);

    const unlockOnGesture = () => {
      if (!userMutedRef.current && audioRef.current && audioRef.current.paused) {
        audioRef.current.muted = false;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener("wheel", unlockOnGesture);
      window.removeEventListener("scroll", unlockOnGesture);
      window.removeEventListener("mousemove", unlockOnGesture);
      window.removeEventListener("pointerdown", unlockOnGesture);
      window.removeEventListener("click", unlockOnGesture);
      window.removeEventListener("touchstart", unlockOnGesture);
      window.removeEventListener("keydown", unlockOnGesture);
    };

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        window.addEventListener("wheel", unlockOnGesture, { passive: true, once: true });
        window.addEventListener("scroll", unlockOnGesture, { passive: true, once: true });
        window.addEventListener("mousemove", unlockOnGesture, { passive: true, once: true });
        window.addEventListener("pointerdown", unlockOnGesture, { passive: true, once: true });
        window.addEventListener("click", unlockOnGesture, { passive: true, once: true });
        window.addEventListener("touchstart", unlockOnGesture, { passive: true, once: true });
        window.addEventListener("keydown", unlockOnGesture, { passive: true, once: true });
      });

    return () => {
      cleanupListeners();
    };
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!audioRef.current) return;

    const audio = audioRef.current;

    if (!audio.src) {
      audio.src = AUDIO_SRC;
    }

    const isCurrentlyPlaying = !audio.paused && !audio.muted;

    if (isCurrentlyPlaying || isPlaying) {
      userMutedRef.current = true;
      audio.muted = true;
      audio.pause();
      setIsPlaying(false);
    } else {
      userMutedRef.current = false;
      audio.muted = false;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => console.log("Unmute play error:", err));
    }
  };

  return (
    <button
      onClick={handleToggle}
      type="button"
      className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 select-none cursor-pointer touch-manipulation shrink-0 ${
        isPlaying
          ? "bg-[#193323] text-[#D4AF37] border border-[#C9A44C]/40 shadow-md ring-2 ring-[#C9A44C]/20"
          : "bg-white/80 text-[#536458] border border-[#5F8067]/20 hover:bg-white hover:text-[#193323]"
      }`}
      title={isPlaying ? "Click to Mute Sanctuary Audio" : "Click to Unmute Sanctuary Audio"}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse shrink-0" />
          <span className="hidden sm:inline whitespace-nowrap">Sanctuary Audio: On</span>
          <span className="sm:hidden text-[11px] whitespace-nowrap">Audio: On</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-ping shrink-0" />
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-rose-700 shrink-0" />
          <span className="hidden sm:inline whitespace-nowrap">Sanctuary Audio: Muted</span>
          <span className="sm:hidden text-[11px] whitespace-nowrap">Muted</span>
        </>
      )}
    </button>
  );
}
