"use client";

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';
import { motion } from 'framer-motion';

const VIDEOS = [
  {
    id: 'aftermovie',
    label: 'After Movie',
    src: 'https://drive.google.com/file/d/19ZbFiZEf8uPLFvgYpxxFm7ZgutF7g6gS/preview',
    type: 'drive',
    thumbnail: '/bg1.jpeg',
  },
  {
    id: 'live1',
    label: 'Siaran Ulang Live — Part 1',
    src: 'https://www.youtube.com/embed/1Lrajv0bo5U?autoplay=1&rel=0',
    type: 'youtube',
    thumbnail: 'https://img.youtube.com/vi/1Lrajv0bo5U/maxresdefault.jpg',
  },
  {
    id: 'live2',
    label: 'Siaran Ulang Live — Part 2',
    src: 'https://www.youtube.com/embed/Y5MTxurBlrE?autoplay=1&rel=0',
    type: 'youtube',
    thumbnail: 'https://img.youtube.com/vi/Y5MTxurBlrE/maxresdefault.jpg',
  },
];

export function Trailer() {
  const [activeId, setActiveId] = useState('aftermovie');
  const [isPlaying, setIsPlaying] = useState(false);

  const active = VIDEOS.find(v => v.id === activeId)!;

  const handleSelect = (id: string) => {
    if (id === activeId) return;
    setActiveId(id);
    setIsPlaying(false);
  };

  return (
    <section className="py-32 bg-black-primary relative overflow-x-clip">
      <Container>
        <MotionReveal direction="up" className="text-center mb-16 space-y-4">
          <p className="text-gold tracking-[0.3em] font-mono text-xs md:text-sm">[ DOKUMENTASI ACARA ]</p>
          <h2 className="section-title text-text-primary">Kilas Balik &amp; Harapan</h2>
        </MotionReveal>

        {/* Pill selector */}
        <MotionReveal direction="up" delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {VIDEOS.map(v => (
              <button
                key={v.id}
                onClick={() => handleSelect(v.id)}
                disabled={v.type === 'coming-soon'}
                className={`relative px-5 py-2 rounded-full text-sm font-mono tracking-wide border transition-all duration-300
                  ${activeId === v.id
                    ? 'bg-gold text-black-primary border-gold font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                    : v.type === 'coming-soon'
                      ? 'bg-transparent text-text-muted border-white/10 cursor-not-allowed opacity-50'
                      : 'bg-transparent text-text-muted border-white/20 hover:border-gold/50 hover:text-gold'
                  }`}
              >
                {v.label}
                {v.type === 'coming-soon' && (
                  <span className="ml-2 text-[10px] tracking-widest uppercase text-gold/60">Segera</span>
                )}
                {activeId === v.id && (
                  <motion.span
                    layoutId="pill-active"
                    className="absolute inset-0 rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </button>
            ))}
          </div>
        </MotionReveal>

        {/* Video player */}
        <MotionReveal direction="up" delay={0.2}>
          <div className="max-w-5xl mx-auto aspect-video bg-charcoal rounded-3xl border border-glass overflow-hidden relative shadow-2xl group flex items-center justify-center">

            {active.type === 'coming-soon' ? (
              <div className="flex flex-col items-center justify-center gap-4 text-center px-8">
                <span className="text-6xl">🎬</span>
                <p className="text-gold font-mono tracking-widest text-sm uppercase">After Movie</p>
                <p className="text-text-muted text-base max-w-sm">Video after movie sedang dalam proses produksi. Nantikan segera.</p>
              </div>
            ) : (
              <>
                {/* Thumbnail / Play State */}
                {!isPlaying ? (
                  <>
                    <div
                      key={activeId + '-thumb'}
                      className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-40 transition-opacity duration-700"
                      style={{ backgroundImage: `url('${active.thumbnail}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black-primary via-black-primary/50 to-transparent" />
                    <div className="absolute bottom-6 left-0 right-0 text-center z-10">
                      <p className="text-text-muted font-mono text-xs tracking-widest uppercase">{active.label}</p>
                    </div>
                    <motion.button
                      key={activeId}
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsPlaying(true)}
                      className="relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-full bg-gold/10 backdrop-blur-md border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold/20 group-hover:border-gold/50 transition-all duration-300"
                    >
                      <svg className="ml-2" width={48} height={48} viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
                      <div className="absolute inset-0 rounded-full border border-gold/20 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                    </motion.button>
                  </>
                ) : (
                  <div className="relative z-20 w-full h-full bg-black-primary">
                    <iframe
                      key={activeId}
                      src={active.src!}
                      className="w-full h-full border-0"
                      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
