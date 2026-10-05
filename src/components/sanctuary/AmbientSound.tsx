"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

// Self-hosted so the music can't break if the original CDN changes its URL.
// preload="none" means the file is only fetched once playback is attempted.
const AUDIO_SRC = "/audio/sanctuary-ambient.mp3";
const MUTE_KEY = "sanctuary-audio-muted";

type SanctuaryWindow = Window & { _sanctuaryAudio?: HTMLAudioElement };

function readMutePreference() {
  try {
    return window.localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false; // private browsing, blocked storage — fall back to the default
  }
}

function saveMutePreference(muted: boolean) {
  try {
    window.localStorage.setItem(MUTE_KEY, muted ? "1" : "0");
  } catch {
    // Not being able to remember the choice shouldn't break the button.
  }
}

export function AmbientSound() {
  // Starts false and only turns true once the audio really plays, so the label
  // can never claim "On" while the browser is still blocking autoplay.
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userMutedRef = useRef(false);

  useEffect(() => {
    const win = window as SanctuaryWindow;
    let audio = win._sanctuaryAudio;

    if (!audio) {
      audio = new Audio();
      audio.src = AUDIO_SRC;
      audio.loop = true;
      audio.volume = 0.35;
      audio.preload = "none";
      win._sanctuaryAudio = audio;
    }

    audioRef.current = audio;
    userMutedRef.current = readMutePreference();

    // Catch up with audio that's already playing (moving between pages reuses
    // the same element). Deferred so it doesn't cascade renders on mount.
    const playing = !audio.paused && !audio.muted;
    if (playing) queueMicrotask(() => setIsPlaying(true));

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    const gestures = ["pointerdown", "keydown", "touchstart", "wheel", "scroll"] as const;

    const startOnGesture = () => {
      const el = audioRef.current;
      if (!userMutedRef.current && el && el.paused) {
        el.muted = false;
        el.play().catch(() => {});
      }
      removeGestureListeners();
    };

    const removeGestureListeners = () => {
      gestures.forEach((g) => window.removeEventListener(g, startOnGesture));
    };

    // Visitors who chose silence before stay silent; everyone else gets the
    // worship track, starting on their first interaction if autoplay is blocked.
    if (!userMutedRef.current && audio.paused) {
      audio.play().catch(() => {
        gestures.forEach((g) => window.addEventListener(g, startOnGesture, { passive: true, once: true }));
      });
    }

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      removeGestureListeners();
    };
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused && !audio.muted) {
      userMutedRef.current = true;
      saveMutePreference(true);
      audio.pause();
      setIsPlaying(false);
    } else {
      userMutedRef.current = false;
      saveMutePreference(false);
      audio.muted = false;
      audio.play().catch(() => setIsPlaying(false));
    }
  };

  return (
    <button
      onClick={handleToggle}
      type="button"
      aria-pressed={isPlaying}
      aria-label={isPlaying ? "Turn the background music off" : "Turn the background music on"}
      className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 min-h-11 rounded-full text-xs font-semibold transition-all duration-200 select-none cursor-pointer touch-manipulation shrink-0 ${
        isPlaying
          ? "bg-[#193323] text-[#D4AF37] border border-[#C9A44C]/40 shadow-md ring-2 ring-[#C9A44C]/20"
          : "bg-white/80 text-[#536458] border border-[#5F8067]/20 hover:bg-white hover:text-[#193323]"
      }`}
      title={isPlaying ? "Turn the background music off" : "Turn the background music on"}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline whitespace-nowrap">Sanctuary Audio: On</span>
          <span className="sm:hidden text-[11px] whitespace-nowrap">Audio: On</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-ping shrink-0" aria-hidden="true" />
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-rose-700 shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline whitespace-nowrap">Sanctuary Audio: Off</span>
          <span className="sm:hidden text-[11px] whitespace-nowrap">Audio: Off</span>
        </>
      )}
    </button>
  );
}
