"use client";

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

export function Trailer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-32 bg-black-primary relative overflow-x-clip">
      <Container>
        <MotionReveal direction="up" className="text-center mb-16 space-y-4">
          <p className="text-gold tracking-[0.3em] font-mono text-xs md:text-sm">[ TRAILER ACARA ]</p>
          <h2 className="section-title text-text-primary">Kilas Balik & Harapan</h2>
        </MotionReveal>

        <MotionReveal direction="up" delay={0.2}>
          <div className="max-w-5xl mx-auto aspect-video bg-charcoal rounded-3xl border border-glass overflow-hidden relative shadow-2xl group flex items-center justify-center">
            
            {/* Background Thumbnail Placeholder */}
            <div className="absolute inset-0 bg-[url('/bg1.jpeg')] bg-cover bg-center opacity-40 group-hover:opacity-30 transition-opacity duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black-primary via-black-primary/50 to-transparent"></div>
            
            {/* Play Button */}
            {!isPlaying ? (
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(true)}
                className="relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-full bg-gold/10 backdrop-blur-md border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold/20 group-hover:border-gold/50 transition-all duration-300"
              >
                <Play size={48} className="ml-2" fill="currentColor" />
                <div className="absolute inset-0 rounded-full border border-gold/20 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
              </motion.button>
            ) : (
              <div className="relative z-20 w-full h-full bg-black-primary">
                <iframe
                  src="https://drive.google.com/file/d/1DGUUqj4-i1ekn_DQa-F3hoQ5W-pDIOIP/preview"
                  className="w-full h-full border-0"
                  allow="autoplay"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
