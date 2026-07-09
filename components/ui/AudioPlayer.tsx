"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { getAsset } from "@/lib/asset";
import { motion, AnimatePresence } from 'framer-motion';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play on first user interaction to bypass browser restrictions
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }

    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((e) => console.log("Autoplay prevented:", e));
      }
      // Remove listeners after first interaction
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('scroll', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []); // Reverted to empty array to satisfy React hooks consistency rules and Fast Refresh

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      setIsPlaying(true);
    }
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-[9999]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <audio 
        ref={audioRef}
        loop 
        src={getAsset("/audio/bg-music.m4a")} 
        preload="auto"
      />
      
      <button 
        onClick={togglePlay}
        className={`relative w-12 h-12 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-gold/30 text-gold shadow-2xl transition-all duration-500 overflow-hidden group hover:scale-110 hover:border-gold`}
      >
        {/* Subtle rotating glow effect */}
        <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {isPlaying ? (
          <Volume2 size={20} className="relative z-10" />
        ) : (
          <VolumeX size={20} className="relative z-10 text-white/50 group-hover:text-gold transition-colors" />
        )}

        {/* Audio Bars Animation (Only when playing) */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute -bottom-1 flex gap-[2px] h-2 justify-center items-end"
            >
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-[2px] bg-gold rounded-t-sm"
                  animate={{ height: [2, Math.random() * 6 + 2, 2] }}
                  transition={{
                    duration: 0.5 + Math.random() * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: 10, filter: 'blur(4px)' }}
            className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur border border-white/10 text-xs font-mono text-white/80 pointer-events-none"
          >
            {isPlaying ? 'Jeda Musik' : 'Putar Musik'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
