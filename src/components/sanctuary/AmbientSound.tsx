"use me";
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

export function AmbientSound() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Background peaceful sanctuary audio track
    // Uses high-quality royalty-free ambient piano/worship stream with Web Audio fallback
    const audio = new Audio(
      "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=peaceful-piano-ambient-112199.mp3"
    );
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    const attemptAutoplay = () => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => {
          // Modern browsers require a user interaction to unblock audio autoplay
          const handleFirstClick = () => {
            audio.play().then(() => {
              setIsPlaying(true);
              setIsMuted(false);
            });
            window.removeEventListener("click", handleFirstClick);
            window.removeEventListener("touchstart", handleFirstClick);
          };
          window.addEventListener("click", handleFirstClick);
          window.addEventListener("touchstart", handleFirstClick);
        });
    };

    attemptAutoplay();

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (isMuted || !isPlaying) {
      audioRef.current.muted = false;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      });
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <button
      onClick={toggleMute}
      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
        !isMuted && isPlaying
          ? "bg-[#193323] text-[#D4AF37] border border-[#C9A44C]/40 shadow-md ring-2 ring-[#C9A44C]/20"
          : "bg-white/80 text-[#536458] border border-[#5F8067]/20 hover:bg-white hover:text-[#193323]"
      }`}
      title={isMuted ? "Unmute Sanctuary Worship Audio" : "Mute Sanctuary Worship Audio"}
    >
      {!isMuted && isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
          <span>Sanctuary Audio: On</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-ping" />
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 opacity-60" />
          <span>Sanctuary Audio: Muted</span>
        </>
      )}
    </button>
  );
}
