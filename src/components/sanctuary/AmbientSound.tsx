"use me";
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function AmbientSound() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create sanctuary background piano audio track
    const audio = new Audio(
      "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=peaceful-piano-ambient-112199.mp3"
    );
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    const startAudio = () => {
      audio
        .play()
        .then(() => {
          audio.muted = false;
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => {
          // Autoplay blocked by browser policy until user clicks anywhere
          const handleFirstClick = () => {
            if (audioRef.current && audioRef.current.paused) {
              audioRef.current.play().then(() => {
                audioRef.current!.muted = false;
                setIsPlaying(true);
                setIsMuted(false);
              });
            }
            window.removeEventListener("click", handleFirstClick);
            window.removeEventListener("touchstart", handleFirstClick);
          };
          window.addEventListener("click", handleFirstClick, { once: true });
          window.addEventListener("touchstart", handleFirstClick, { once: true });
        });
    };

    startAudio();

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (!isMuted && isPlaying) {
      // Instantly pause and mute audio
      audioRef.current.pause();
      audioRef.current.muted = true;
      setIsMuted(true);
      setIsPlaying(false);
    } else {
      // Unmute and play audio
      audioRef.current.muted = false;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch((err) => console.log("Audio play error:", err));
    }
  };

  return (
    <button
      onClick={toggleSound}
      type="button"
      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
        !isMuted && isPlaying
          ? "bg-[#193323] text-[#D4AF37] border border-[#C9A44C]/40 shadow-md ring-2 ring-[#C9A44C]/20"
          : "bg-white/80 text-[#536458] border border-[#5F8067]/20 hover:bg-white hover:text-[#193323]"
      }`}
      title={!isMuted && isPlaying ? "Click to Mute Sanctuary Audio" : "Click to Play Sanctuary Audio"}
    >
      {!isMuted && isPlaying ? (
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
