"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { MessageSquareQuote } from 'lucide-react';
import guestbookData from '@/data/guestbook.json';

export function Guestbook() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Slow horizontal movement based on scroll
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);
  
  // Spring physics for smoothness
  const springX1 = useSpring(x1, { stiffness: 100, damping: 30, mass: 1 });
  const springX2 = useSpring(x2, { stiffness: 100, damping: 30, mass: 1 });

  // Duplicate items to ensure seamless loop
  const topRow = [...guestbookData.slice(0, 4), ...guestbookData.slice(0, 4)];
  const bottomRow = [...guestbookData.slice(4), ...guestbookData.slice(4), ...guestbookData.slice(4)];

  return (
    <section ref={containerRef} className="py-24 bg-black-primary relative overflow-hidden border-t border-glass">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute left-0 w-32 h-full bg-gradient-to-r from-black-primary to-transparent z-10" />
        <div className="absolute right-0 w-32 h-full bg-gradient-to-l from-black-primary to-transparent z-10" />
      </div>

      <Container>
        <div className="mb-16 flex items-center justify-between">
          <div>
            <h2 className="section-title text-text-primary flex items-center gap-4">
              <MessageSquareQuote className="text-gold" size={32} />
              Buku Tamu
            </h2>
            <p className="text-text-muted mt-2 max-w-2xl">
              Pesan dan kesan dari keluarga, sahabat, dan civitas akademika untuk para lulusan.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="px-6 py-2 rounded-full border border-gold/30 text-gold text-sm font-mono tracking-widest uppercase">
              Live Messages
            </div>
          </div>
        </div>
      </Container>

      {/* Marquee Container */}
      <div className="space-y-6">
        {/* Row 1 - Moves Left */}
        <motion.div style={{ x: springX1 }} className="flex gap-6 w-max px-4">
          {topRow.map((msg, idx) => (
            <div 
              key={`${msg.id}-${idx}`} 
              className="w-[350px] md:w-[450px] shrink-0 p-8 rounded-2xl bg-charcoal border border-glass hover:border-gold/30 hover:bg-black-soft transition-all duration-300 relative group"
            >
              <p className="text-text-primary/90 leading-relaxed font-serif text-lg mb-6 line-clamp-4">
                "{msg.message}"
              </p>
              <div className="flex items-center gap-4 border-t border-glass pt-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold">
                  {msg.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">{msg.name}</h4>
                  <p className="text-xs text-gold font-mono uppercase tracking-wider">{msg.relation}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Row 2 - Moves Right */}
        <motion.div style={{ x: springX2 }} className="flex gap-6 w-max px-4 ml-[-20vw]">
          {bottomRow.map((msg, idx) => (
            <div 
              key={`${msg.id}-${idx}`} 
              className="w-[350px] md:w-[450px] shrink-0 p-8 rounded-2xl bg-charcoal border border-glass hover:border-gold/30 hover:bg-black-soft transition-all duration-300 relative group"
            >
              <p className="text-text-primary/90 leading-relaxed font-serif text-lg mb-6 line-clamp-4">
                "{msg.message}"
              </p>
              <div className="flex items-center gap-4 border-t border-glass pt-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold">
                  {msg.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">{msg.name}</h4>
                  <p className="text-xs text-gold font-mono uppercase tracking-wider">{msg.relation}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
