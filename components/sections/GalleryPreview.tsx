"use client";

import React, { useRef, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import participantsData from '@/data/participants.json';
import { motion, useScroll, useTransform, AnimatePresence, useAnimation, useMotionValue, PanInfo } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

const GalleryImage = ({ src, onClick }: { src: string; onClick: () => void }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div 
      onClick={onClick}
      className="relative w-40 h-56 md:w-60 md:h-80 shrink-0 rounded-2xl overflow-hidden border border-white/10 filter grayscale hover:!grayscale-0 hover:!opacity-100 hover:scale-105 transition-all duration-500 cursor-zoom-in"
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-charcoal via-[#14120c] to-black-primary animate-pulse z-0 transition-opacity duration-700 ${isLoaded ? 'opacity-0' : 'opacity-100'}`} />
      <Image 
        src={src} 
        alt="Graduate" 
        fill 
        className={`object-cover transition-all duration-700 z-10 ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'}`} 
        sizes="(max-width: 768px) 160px, 240px" 
        unoptimized 
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

const LightboxImage = ({ src }: { src: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className="relative w-full max-w-2xl h-[70vh] md:h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 mx-auto bg-black-primary">
      <div className={`absolute inset-0 bg-gradient-to-br from-charcoal via-[#14120c] to-black-primary animate-pulse z-0 transition-opacity duration-700 ${isLoaded ? 'opacity-0' : 'opacity-100'}`} />
      <Image 
        src={src} 
        alt="Graduate High Res" 
        fill 
        className={`object-contain transition-all duration-700 z-10 ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md scale-95'}`} 
        sizes="(max-width: 1024px) 100vw, 1024px" 
        unoptimized 
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export function GalleryPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Extract all available photos
  const photos = React.useMemo(() => participantsData
    .map(p => p.photo)
    .filter(photo => photo && photo.trim() !== ''), []);

  // Create three rows of photos for the marquee
  // Deterministic split to avoid SSR hydration mismatch
  // Instead of Math.random(), we slice the array differently for each row
  // This guarantees the server and client render the exact same HTML initially
  const row1 = React.useMemo(() => [...photos], [photos]);
  const row2 = React.useMemo(() => [...photos].reverse(), [photos]);
  const row3 = React.useMemo(() => {
    const half = Math.floor(photos.length / 2);
    return [...photos.slice(half), ...photos.slice(0, half)];
  }, [photos]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
  const x3 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  // Swipeable Lightbox State
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const trackX = useMotionValue(0);
  const controls = useAnimation();
  const [isSliding, setIsSliding] = useState(false);
  const backdropPointerDown = useRef(false);

  const prevPhoto = currentIndex !== null && currentIndex > 0 ? photos[currentIndex - 1] : null;
  const currentPhoto = currentIndex !== null ? photos[currentIndex] : null;
  const nextPhoto = currentIndex !== null && currentIndex < photos.length - 1 ? photos[currentIndex + 1] : null;

  const handleDragEnd = async (e: any, info: PanInfo) => {
    if (isSliding || currentIndex === null) return;
    
    const swipeThreshold = 50;
    const velocityThreshold = 500;
    const isLeftSwipe = info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold;
    const isRightSwipe = info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold;

    const width = window.innerWidth;

    if (isLeftSwipe && nextPhoto) {
      setIsSliding(true);
      await controls.start({ x: -width, transition: { type: "spring", stiffness: 300, damping: 30 } });
      setCurrentIndex(currentIndex + 1);
      controls.set({ x: 0 });
      setIsSliding(false);
    } else if (isRightSwipe && prevPhoto) {
      setIsSliding(true);
      await controls.start({ x: width, transition: { type: "spring", stiffness: 300, damping: 30 } });
      setCurrentIndex(currentIndex - 1);
      controls.set({ x: 0 });
      setIsSliding(false);
    } else {
      controls.start({ x: 0, transition: { type: "spring", stiffness: 400, damping: 40 } });
    }
  };

  const handlePhotoClick = (photo: string) => {
    const idx = photos.indexOf(photo);
    if (idx !== -1) setCurrentIndex(idx);
  };

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
            <GalleryImage key={`r1-${i}`} src={photo} onClick={() => handlePhotoClick(photo)} />
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div style={{ x: x2 }} className="flex gap-4 md:gap-6 items-center ml-24 hover:[&>div]:opacity-30">
          {[...row2, ...row2].map((photo, i) => (
            <GalleryImage key={`r2-${i}`} src={photo} onClick={() => handlePhotoClick(photo)} />
          ))}
        </motion.div>

        {/* Row 3 */}
        <motion.div style={{ x: x3 }} className="flex gap-4 md:gap-6 items-center ml-12 hover:[&>div]:opacity-30">
          {[...row3, ...row3].map((photo, i) => (
            <GalleryImage key={`r3-${i}`} src={photo} onClick={() => handlePhotoClick(photo)} />
          ))}
        </motion.div>

      </div>

      <Container className="relative z-20 mt-24">
        <MotionReveal direction="up" className="text-center">
          <Link 
            href="/lulusan"
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
          {currentIndex !== null && currentPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onPointerDown={(e) => {
                if (e.target === e.currentTarget) {
                  backdropPointerDown.current = true;
                }
              }}
              onClick={(e) => {
                if (e.target === e.currentTarget && backdropPointerDown.current) {
                  setCurrentIndex(null);
                }
                backdropPointerDown.current = false;
              }}
              className="fixed inset-0 z-[99999] flex flex-col items-center justify-center p-4 bg-black/95 backdrop-blur-md cursor-zoom-out overflow-hidden"
            >
              <button
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(null); }}
                className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-[100]"
              >
                <X size={24} />
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-full h-full flex items-center justify-center cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Physical Swipe Track */}
                <motion.div
                  className="absolute inset-0 w-full h-full flex items-center justify-center"
                  drag="x"
                  dragConstraints={{ left: nextPhoto ? -1000 : 0, right: prevPhoto ? 1000 : 0 }}
                  dragElastic={0.8}
                  style={{ x: trackX }}
                  animate={controls}
                  onDragEnd={handleDragEnd}
                >
                  {/* PREV PHOTO */}
                  {prevPhoto && (
                    <div className="absolute top-1/2 -translate-y-1/2 select-none pointer-events-none w-full" style={{ left: '-100%' }}>
                      <LightboxImage src={prevPhoto} />
                    </div>
                  )}

                  {/* CURRENT PHOTO */}
                  <div className="absolute top-1/2 -translate-y-1/2 select-none w-full left-0">
                    <LightboxImage src={currentPhoto} />
                  </div>

                  {/* NEXT PHOTO */}
                  {nextPhoto && (
                    <div className="absolute top-1/2 -translate-y-1/2 select-none pointer-events-none w-full" style={{ left: '100%' }}>
                      <LightboxImage src={nextPhoto} />
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
