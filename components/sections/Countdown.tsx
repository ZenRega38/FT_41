"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';

// Target Date: 8 July 2026, 08:00 WITA (UTC+8) (Main Event)
const TARGET_DATE = new Date("2026-07-08T08:00:00+08:00").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 0);
    
    const calculateTimeLeft = () => {
      const difference = TARGET_DATE - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="py-20 relative bg-black-primary overflow-x-clip border-y border-glass" >
      
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-charcoal)_0%,_transparent_70%)] opacity-50"></div>
      
      <Container className="relative z-10">
        <div className="text-center mb-12">
          <p className="text-gold tracking-[0.2em] uppercase text-xs md:text-sm font-semibold mb-4">Menuju Hari Puncak Yudisium</p>
          <h2 className="text-2xl md:text-4xl font-serif text-text-primary">8 Juli 2026</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
          <TimeUnit value={timeLeft.days} label="Hari" />
          <TimeUnit value={timeLeft.hours} label="Jam" />
          <TimeUnit value={timeLeft.minutes} label="Menit" />
          <TimeUnit value={timeLeft.seconds} label="Detik" />
        </div>
      </Container>
    </section>
  );
}

function TimeUnit({ value, label }: { value: number, label: string }) {
  // Format to 2 digits
  const formattedValue = value < 10 ? `0${value}` : value.toString();

  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-24 md:w-28 md:h-32 bg-black-soft border border-glass rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.05)] relative overflow-hidden group">
        
        {/* Animated highlight inside box */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black-primary/50 z-10 shadow-[0_1px_0_rgba(255,255,255,0.05)]"></div>

        <AnimatePresence mode="popLayout">
          <motion.span
            key={formattedValue}
            initial={{ y: 20, opacity: 0, rotateX: -45 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: -20, opacity: 0, rotateX: 45 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="text-4xl md:text-6xl font-serif text-gold absolute z-20 select-none"
          >
            {formattedValue}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-4 text-xs md:text-sm uppercase tracking-[0.2em] text-text-muted font-medium">
        {label}
      </span>
    </div>
  );
}
