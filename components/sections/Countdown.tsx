"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { YUDISIUM_DATE } from '@/lib/constants';

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
      const difference = YUDISIUM_DATE - new Date().getTime();
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

  const units = [
    { value: timeLeft.days, label: 'Hari' },
    { value: timeLeft.hours, label: 'Jam' },
    { value: timeLeft.minutes, label: 'Menit' },
    { value: timeLeft.seconds, label: 'Detik' },
  ];

  return (
    <section className="py-16 md:py-20 relative bg-black-primary border-y border-glass overflow-x-clip">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-charcoal)_0%,_transparent_70%)] opacity-50" />

      <Container className="relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <p className="text-gold tracking-[0.2em] uppercase text-xs font-semibold mb-2">Menuju Hari Puncak Yudisium</p>
          <h2 className="text-xl md:text-4xl font-serif text-text-primary">8 Juli 2026</h2>
        </div>

        {/* ── DESKTOP: original large boxes ── */}
        <div className="hidden md:flex justify-center gap-6 lg:gap-10 max-w-4xl mx-auto">
          {units.map((unit) => (
            <TimeUnit key={unit.label} value={unit.value} label={unit.label} large />
          ))}
        </div>

        {/* ── MOBILE: compact single row with colons ── */}
        <div className="flex md:hidden items-center justify-center gap-1.5 sm:gap-3">
          {units.map((unit, idx) => (
            <React.Fragment key={unit.label}>
              <TimeUnit value={unit.value} label={unit.label} large={false} />
              {idx < units.length - 1 && (
                <span className="text-gold/50 text-xl font-serif pb-5 select-none">:</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TimeUnit({ value, label, large }: { value: number; label: string; large: boolean }) {
  const formattedValue = value < 10 ? `0${value}` : value.toString();

  if (large) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-24 h-28 lg:w-28 lg:h-32 bg-black-soft border border-glass rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.05)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black-primary/50 z-10 shadow-[0_1px_0_rgba(255,255,255,0.05)]" />
          <AnimatePresence mode="popLayout">
            <motion.span
              key={formattedValue}
              initial={{ y: 20, opacity: 0, rotateX: -45 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -20, opacity: 0, rotateX: 45 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="text-4xl lg:text-6xl font-serif text-gold absolute z-20 select-none"
            >
              {formattedValue}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="mt-4 text-xs uppercase tracking-[0.2em] text-text-muted font-medium">{label}</span>
      </div>
    );
  }

  // Mobile compact
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="w-14 h-16 bg-black-soft border border-glass rounded-lg flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black-primary/50 z-10" />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={formattedValue}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="text-2xl font-serif text-gold absolute z-20 select-none"
          >
            {formattedValue}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] uppercase tracking-[0.12em] text-text-muted font-medium">{label}</span>
    </div>
  );
}
