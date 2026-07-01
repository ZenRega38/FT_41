"use client";

import React, { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CircuitBoard, Settings, Building2, Cpu } from 'lucide-react';

const icons = [CircuitBoard, Settings, Building2, Cpu];

export function GlobalPreloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handle Initial Load
  useEffect(() => {
    // Artificial minimum delay for the initial load to show the animation nicely
    const minDelay = 2000;
    const start = Date.now();

    const handleLoad = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, minDelay - elapsed);
      setTimeout(() => setIsLoading(false), remaining);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Remove the global block on route changes as requested by user.
  // The gallery will handle its own per-image loading skeleton.

  // Rotate Icons
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % icons.length);
    }, 500); // Change icon every 500ms
    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black-primary"
        >
          {/* Logo container */}
          <div className="relative w-24 h-24 flex items-center justify-center mb-6">
            <AnimatePresence mode="wait">
              {(() => {
                const Icon = icons[currentIconIndex];
                return (
                  <motion.div
                    key={currentIconIndex}
                    initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.5, rotate: 45 }}
                    transition={{ duration: 0.4, ease: "backOut" }}
                    className="absolute text-gold"
                  >
                    <Icon size={48} strokeWidth={1.5} />
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <p className="text-gold font-serif tracking-[0.2em] text-sm md:text-base mb-2">
              MEMUAT
            </p>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-1.5 h-1.5 rounded-full bg-champagne"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
