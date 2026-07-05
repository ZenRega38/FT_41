"use client";

import React, { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import participantsData from '@/data/participants.json';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

export function GalleryPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = React.useState<string | null>(null);
  
  // Extract all available photos
  const photos = participantsData
    .map(p => p.photo)
    .filter(photo => photo && photo.trim() !== '');

  // Create three rows of photos for the marquee
  const row1 = [...photos].sort(() => Math.random() - 0.5);
  const row2 = [...photos].sort(() => Math.random() - 0.5);
  const row3 = [...photos].sort(() => Math.random() - 0.5);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
  const x3 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section ref={containerRef} className="py-32 bg-black-primary relative overflow-hidden" >
      
      {/* Background gradients for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-gold)_0%,_transparent_50%)] blur-[150px] opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black-primary via-transparent to-black-primary z-10 pointer-events-none" />

      <Container className="relative z-20">
        <MotionReveal direction="up" className="text-center mb-24 space-y-4">
          <p className="text-gold tracking-[0.2em] uppercase text-xs md:text-sm font-semibold">Wajah Yudisium</p>
          <h2 className="section-title text-text-primary">Satu Babak Baru</h2>
        </MotionReveal>
      </Container>

      {/* Marquee Rows */}
      <div className="relative z-0 flex flex-col gap-4 md:gap-6 opacity-60 hover:opacity-100 transition-opacity duration-700 w-[200vw] -ml-[50vw]">
        
        {/* Row 1 */}
        <motion.div style={{ x: x1 }} className="flex gap-4 md:gap-6 items-center hover:[&>div]:opacity-30">
          {[...row1, ...row1].map((photo, i) => (
            <div 
              key={`r1-${i}`} 
              onClick={() => setSelectedPhoto(photo)}
              className="relative w-40 h-56 md:w-60 md:h-80 shrink-0 rounded-2xl overflow-hidden border border-white/10 filter grayscale hover:!grayscale-0 hover:!opacity-100 hover:scale-105 transition-all duration-500 cursor-zoom-in"
            >
              <Image src={photo} alt="Graduate" fill className="object-cover" sizes="(max-width: 768px) 160px, 240px" unoptimized />
            </div>
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div style={{ x: x2 }} className="flex gap-4 md:gap-6 items-center ml-24 hover:[&>div]:opacity-30">
          {[...row2, ...row2].map((photo, i) => (
            <div 
              key={`r2-${i}`} 
              onClick={() => setSelectedPhoto(photo)}
              className="relative w-40 h-56 md:w-60 md:h-80 shrink-0 rounded-2xl overflow-hidden border border-white/10 filter grayscale hover:!grayscale-0 hover:!opacity-100 hover:scale-105 transition-all duration-500 cursor-zoom-in"
            >
              <Image src={photo} alt="Graduate" fill className="object-cover" sizes="(max-width: 768px) 160px, 240px" unoptimized />
            </div>
          ))}
        </motion.div>

        {/* Row 3 */}
        <motion.div style={{ x: x3 }} className="flex gap-4 md:gap-6 items-center ml-12 hover:[&>div]:opacity-30">
          {[...row3, ...row3].map((photo, i) => (
            <div 
              key={`r3-${i}`} 
              onClick={() => setSelectedPhoto(photo)}
              className="relative w-40 h-56 md:w-60 md:h-80 shrink-0 rounded-2xl overflow-hidden border border-white/10 filter grayscale hover:!grayscale-0 hover:!opacity-100 hover:scale-105 transition-all duration-500 cursor-zoom-in"
            >
              <Image src={photo} alt="Graduate" fill className="object-cover" sizes="(max-width: 768px) 160px, 240px" unoptimized />
            </div>
          ))}
        </motion.div>

      </div>

      <Container className="relative z-20 mt-24">
        <MotionReveal direction="up" className="text-center">
          <Link 
            href="/#peserta"
            className="inline-flex items-center gap-3 px-8 py-4 bg-charcoal border border-gold/30 rounded-full text-gold hover:text-black-primary hover:bg-gold font-mono tracking-widest uppercase text-sm md:text-base group transition-all duration-300 shadow-2xl"
          >
            <span>Lihat Profil Peserta</span>
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </MotionReveal>
      </Container>

      {/* Lightbox Modal */}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-[99999] flex flex-col items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-zoom-out"
            >
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedPhoto(null); }}
                className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
              >
                <X size={24} />
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-full max-w-2xl h-[70vh] md:h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <Image 
                  src={selectedPhoto} 
                  alt="Graduate High Res" 
                  fill 
                  className="object-contain bg-black-primary" 
                  sizes="(max-width: 1024px) 100vw, 1024px" 
                  unoptimized 
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
