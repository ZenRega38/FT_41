"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import participantsData from '@/data/participants.json';
import { getAsset } from '@/lib/asset';

const SHIFT_DELAY   = 3000;   // 3s before layout shifts
const PHOTO_INTERVAL = 3500;  // 3.5s per photo

type Participant = typeof participantsData[0];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const eligibleParticipants = participantsData.filter(
  (p) => p.displayConsent && p.photo && p.photo.trim() !== ''
);

export function LulusanHero() {
  const [shifted, setShifted]             = useState(false);
  const [currentParticipant, setCurrentParticipant] = useState<Participant | null>(null);
  const [isMobile, setIsMobile]           = useState(false);
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(false);
  const queueRef = useRef<Participant[]>([]);

  // Track page scroll to fade hero elements as GraduateWall rises
  const { scrollY } = useScroll();
  const photoOpacity   = useTransform(scrollY, [0, 250, 650], [1, 1, 0]);
  const photoX         = useTransform(scrollY, [0, 650], [0, -70]);
  const subtitleOpacity = useTransform(scrollY, [0, 150, 450], [1, 1, 0]);
  const labelOpacity   = useTransform(scrollY, [0, 100, 320], [1, 1, 0]);
  const contentY       = useTransform(scrollY, [0, 650], [0, -40]);

  // Mouse Parallax for Background Glows
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax constraints (how far the glows move)
  const glowX1 = useTransform(mouseX, [-1, 1], [-500, 500]);
  const glowY1 = useTransform(mouseY, [-1, 1], [-500, 500]);
  
  const glowX2 = useTransform(mouseX, [-1, 1], [500, -500]); // Moves opposite direction
  const glowY2 = useTransform(mouseY, [-1, 1], [500, -500]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const getNext = useCallback((): Participant => {
    if (queueRef.current.length === 0) {
      queueRef.current = shuffleArray(eligibleParticipants);
    }
    return queueRef.current.pop()!;
  }, []);

  // Screen size detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Trigger layout shift (0.3s on mobile, 3s on desktop)
  useEffect(() => {
    const isMob = window.matchMedia('(max-width: 768px)').matches;
    const delay = isMob ? 300 : SHIFT_DELAY;
    const timer = setTimeout(() => {
      setShifted(true);
      setCurrentParticipant(getNext());
    }, delay);
    return () => clearTimeout(timer);
  }, [getNext]);

  // Cycle photos every 3.5s
  useEffect(() => {
    if (!shifted) return;
    const interval = setInterval(() => {
      setIsPhotoLoaded(false);
      setCurrentParticipant(getNext());
    }, PHOTO_INTERVAL);
    return () => clearInterval(interval);
  }, [shifted, getNext]);

  return (
    <div className="relative w-full h-full flex items-center overflow-hidden bg-black-primary">
      {/* Background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-0">
        <motion.div 
          style={{ x: glowX1, y: glowY1 }}
          className="w-[700px] h-[420px] bg-gold/8 rounded-full blur-[140px]" 
        />
      </div>
      <div className="absolute bottom-0 right-1/4 pointer-events-none z-0">
        <motion.div 
          style={{ x: glowX2, y: glowY2 }}
          className="w-80 h-80 bg-champagne/4 rounded-full blur-[100px]" 
        />
      </div>

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12"
      >
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-16 pt-8 md:pt-0">

          {/* ── Photo Card — slides in after 3s, fades on scroll ── */}
          <AnimatePresence>
            {shifted && currentParticipant && (
              <motion.div
                key="photo-container"
                style={{ opacity: photoOpacity, x: photoX }}
                initial={isMobile ? { y: 100, opacity: 0 } : { x: -100, opacity: 0, width: 0, minWidth: 0 }}
                animate={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1, width: 'auto', minWidth: 'auto' }}
                exit={isMobile ? { y: 50, opacity: 0 } : { x: -100, opacity: 0, width: 0, minWidth: 0 }}
                transition={{ duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex-shrink-0 self-center md:self-stretch"
              >
                <div className="relative w-64 md:w-80 lg:w-96 h-[45vh] md:h-full md:min-h-[65vh] rounded-2xl overflow-hidden border border-gold/20 shadow-2xl shadow-black/70">
                  <AnimatePresence mode="sync">
                    <motion.div
                      key={currentParticipant.id}
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute inset-0"
                    >
                      {/* Shimmer skeleton */}
                      <div className={`absolute inset-0 bg-gradient-to-br from-charcoal via-[#14120c] to-black-primary animate-pulse z-0 transition-opacity duration-700 ${isPhotoLoaded ? 'opacity-0' : 'opacity-100'}`} />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={getAsset(currentParticipant.photo)}
                        alt={currentParticipant.photoAlt || currentParticipant.name}
                        onLoad={() => setIsPhotoLoaded(true)}
                        className={`absolute inset-0 w-full h-full object-cover object-top z-10 transition-all duration-700 ${isPhotoLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-xl scale-110'}`}
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black-primary via-black-primary/15 to-transparent z-20" />
                      {/* Name tag */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                        <p className="text-text-primary font-serif text-sm md:text-base leading-snug line-clamp-2">
                          {currentParticipant.name}
                        </p>
                        <p className="text-gold text-[10px] font-mono tracking-[0.15em] uppercase mt-1.5">
                          {currentParticipant.program}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Text block — shifts left after 3s on desktop, stays centered on mobile ── */}
          <motion.div
            layout
            transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`flex-1 space-y-5 transition-[text-align] duration-700 ${
              shifted ? 'text-center md:text-left' : 'text-center'
            }`}
          >
            <motion.p
              layout
              style={{ opacity: labelOpacity }}
              className="text-gold tracking-[0.25em] uppercase text-xs md:text-sm font-semibold"
            >
              Yudisium Ke-41 · Fakultas Teknik UBT
            </motion.p>

            <motion.h1
              layout
              className="hero-title text-text-primary leading-none"
            >
              Daftar{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-champagne to-gold">
                Lulusan
              </span>
            </motion.h1>

            <motion.p
              layout
              style={{ opacity: subtitleOpacity }}
              className={`text-text-muted text-base md:text-xl max-w-xl transition-[margin] duration-700 ${
                shifted ? 'mx-auto md:ml-0 md:mr-auto' : 'mx-auto'
              }`}
            >
              Selamat kepada seluruh peserta Yudisium Ke-41<br />
              Fakultas Teknik Universitas Borneo Tarakan.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: labelOpacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <p className="text-text-muted/60 text-[10px] tracking-[0.25em] uppercase font-mono">
          Gulir untuk melihat
        </p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="text-gold/50"
        >
          <ChevronDown size={18} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </div>
  );
}
