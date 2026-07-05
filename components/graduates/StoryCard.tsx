import React, { forwardRef } from 'react';
import { Participant } from '@/types/site';
import { motion } from 'framer-motion';

const CinematicText = ({ text, className, isExporting }: { text: string; className?: string; isExporting: boolean }) => {
  if (isExporting || !text) {
    return <span className={className}>{text}</span>;
  }
  
  const words = text.split(" ");
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.05, delayChildren: 0.1 },
        },
      }}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 15, filter: 'blur(8px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

interface StoryCardProps {
  participant: Participant;
  motto?: string | null;
  thesis?: string | null;
  displayMode?: 'motto' | 'thesis';
  translateX?: number;
  translateY?: number;
  imageScale?: number;
  imageAspectRatio?: number;
  isExporting?: boolean; // New prop to determine if rendering for PNG download
}

export const StoryCard = forwardRef<HTMLDivElement, StoryCardProps>(({ 
  participant, motto, thesis, displayMode = 'motto', 
  translateX = 0, translateY = 0, imageScale = 1, imageAspectRatio = 0.75,
  isExporting = false 
}, ref) => {
  // Bold name sizing that wraps dynamically to 2 lines without being too small, never truncated
  const nameLength = participant.name ? participant.name.length : 0;
  let nameSizeClass = 'text-[5.5rem]';
  if (nameLength > 32) {
    nameSizeClass = 'text-[3.8rem]';
  } else if (nameLength > 24) {
    nameSizeClass = 'text-[4.4rem]';
  } else if (nameLength > 16) {
    nameSizeClass = 'text-[4.9rem]';
  }

  // Dynamic font size for motto depending on length to maximize readability, never truncated
  const mottoLength = motto ? motto.length : 0;
  let mottoClass = 'text-[2.75rem] text-white/95 font-medium leading-relaxed';
  if (mottoLength > 180) {
    mottoClass = 'text-[1.85rem] text-white/80 font-light leading-relaxed';
  } else if (mottoLength > 120) {
    mottoClass = 'text-[2.15rem] text-white/85 font-normal leading-relaxed';
  } else if (mottoLength > 60) {
    mottoClass = 'text-[2.45rem] text-white/90 font-medium leading-relaxed';
  }

  // Dynamic font size for thesis depending on length, never truncated
  const thesisLength = thesis ? thesis.length : 0;
  let thesisClass = 'text-[2.35rem] text-white/95 font-medium leading-relaxed';
  if (thesisLength > 180) {
    thesisClass = 'text-[1.75rem] text-white/80 font-light leading-relaxed';
  } else if (thesisLength > 120) {
    thesisClass = 'text-[2.05rem] text-white/85 font-normal leading-relaxed';
  }

  // Calculate image layout bounds manually to mimic object-fit cover but preserve overflow for dragging
  const Rc = 850 / 750;
  const isPortrait = imageAspectRatio < Rc;
  const imgStyle = isPortrait
    ? { width: '850px', height: 'auto' }
    : { height: '750px', width: 'auto', maxWidth: 'none' };

  return (
    // Fixed 1080x1920 (9:16) wrapper
    <div 
      ref={ref} 
      className="bg-[#050505] text-text-primary overflow-hidden relative"
      style={{ 
        width: '1080px', 
        height: '1920px', 
        fontFamily: "'Inter', sans-serif" 
      }}
    >
      {/* Premium Radial Gradient Background - 100% Safe from Blur rendering bugs */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{
          background: `
            radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.15) 0%, transparent 60%),
            radial-gradient(circle at 50% 100%, rgba(212, 175, 55, 0.08) 0%, transparent 60%),
            #050505
          `
        }}
      />

      {/* Header - Fixed Position */}
      <div className="absolute top-20 left-0 right-0 z-10 flex flex-col items-center text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Logo UBT"
          className="w-28 h-28 object-contain mb-6"
          crossOrigin="anonymous"
        />
        <h2 className="text-[#d4af37] tracking-[0.4em] font-mono text-5xl uppercase font-extrabold mb-4">
          [ YUDISIUM KE-XLI ]
        </h2>
        <p className="text-white/70 tracking-[0.25em] text-2xl uppercase font-medium whitespace-nowrap">
          Fakultas Teknik | Universitas Borneo Tarakan
        </p>
      </div>

      {/* Main Photo Container - Positioned with a clear gap from header */}
      <div className="absolute top-[390px] left-[115px] z-10 w-[850px] h-[750px]">
        <div className="w-full h-full rounded-[3rem] overflow-hidden border-[2px] border-gold/40 bg-[#141416] relative shadow-[0_30px_100px_rgba(212,175,55,0.15)]">
          {participant.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={participant.photo}
              alt={participant.name}
              className="absolute top-1/2 left-1/2 origin-center select-none pointer-events-none"
              style={{
                ...imgStyle,
                transform: `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) scale(${imageScale})`,
              }}
              crossOrigin="anonymous"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-muted">
              Foto belum tersedia
            </div>
          )}
          
          {/* Smooth gradient fade into the bottom of the photo */}
          <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
          
          {/* Floating Program Badge */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#0b0b0d] border border-white/20 text-white px-8 py-3 rounded-full font-mono text-xl uppercase tracking-widest shadow-xl pointer-events-none">
            {participant.program}
          </div>
        </div>
      </div>

      {/* 
        Info Container - Spans exactly from the bottom of the photo (1160px) 
        to the top of the footer line (1780px) to auto-center the motto.
      */}
      <div className="absolute top-[1160px] left-[115px] w-[850px] h-[620px] z-10 flex flex-col justify-between items-center text-center overflow-hidden">
        
        {/* Name Header - Allowed to wrap dynamically without truncation */}
        <h1 className={`font-serif text-transparent bg-clip-text bg-gradient-to-r from-champagne via-gold to-gold-muted leading-[1.1] drop-shadow-lg font-bold w-full max-h-[190px] overflow-hidden ${nameSizeClass}`}>
          {participant.name}
        </h1>

        {/* Centered Motto / Thesis Container - Centers vertically between Name and Footer Line */}
        <div className="flex-grow w-full flex items-center justify-center relative px-4 py-4 overflow-hidden">
          {displayMode === 'motto' && (
            motto ? (
              <div className="relative w-full">
                <span className="absolute top-[-30px] left-0 text-8xl text-white/10 font-serif leading-none select-none pointer-events-none">"</span>
                <CinematicText 
                  text={motto.replace(/^["'“]+|["'”]+$/g, '')} 
                  className={`${mottoClass} italic font-serif text-center max-w-full px-8 overflow-hidden inline-block`}
                  isExporting={isExporting}
                />
                <span className="absolute bottom-[-30px] right-0 text-8xl text-white/10 font-serif leading-none rotate-180 select-none pointer-events-none">"</span>
              </div>
            ) : (
              !isExporting && (
                <div className="flex flex-col items-center gap-5 relative z-20 pointer-events-auto w-full">
                  <p className="text-[2.7rem] text-white/35 font-mono tracking-[0.1em] uppercase select-none whitespace-nowrap">
                    [ BELUM MENGISI MOTTO HIDUP ]
                  </p>
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSch0HhtAAQJ-Cseq_yU2uo0dkffyNkaFVbobQb3JLolGVYLlQ/viewform" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[2.5rem] text-gold hover:text-champagne font-extrabold underline tracking-wide cursor-pointer whitespace-nowrap"
                  >
                    ISI SEKARANG, KLIK DI SINI!
                  </a>
                </div>
              )
            )
          )}

          {displayMode === 'thesis' && (
            thesis ? (
              <div className="flex flex-col items-center justify-center w-full">
                <span className="text-[2rem] text-[#d4af37] font-mono tracking-[0.25em] uppercase mb-4 font-extrabold select-none pointer-events-none">
                  JUDUL SKRIPSI
                </span>
                <CinematicText 
                  text={thesis} 
                  className={`${thesisClass} italic font-serif text-center max-w-full px-8 overflow-hidden inline-block`}
                  isExporting={isExporting}
                />
              </div>
            ) : (
              !isExporting && (
                <div className="flex flex-col items-center gap-5 relative z-20 pointer-events-auto w-full">
                  <p className="text-[2.7rem] text-white/35 font-mono tracking-[0.1em] uppercase select-none whitespace-nowrap">
                    [ BELUM MENGISI JUDUL SKRIPSI ]
                  </p>
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSch0HhtAAQJ-Cseq_yU2uo0dkffyNkaFVbobQb3JLolGVYLlQ/viewform" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[2.5rem] text-gold hover:text-champagne font-extrabold underline tracking-wide cursor-pointer whitespace-nowrap"
                  >
                    ISI SEKARANG, KLIK DI SINI!
                  </a>
                </div>
              )
            )
          )}
        </div>

        {/* Footer Line - Placed exactly at the bottom of the 620px box (which maps to 1780px) */}
        <div className="w-full border-t border-gold/40" />
      </div>

      {/* Footer Link - Absolutely fixed at the bottom with 2.5x padding ratio (100px bottom / 40px top) */}
      <div className="absolute top-[1780px] left-[115px] w-[850px] z-10 flex flex-col items-center pt-10">
        <div className="flex items-center justify-center gap-3">
          <span className="w-3 h-3 rounded-full bg-gold animate-pulse" />
          <p className="text-white font-mono text-4xl tracking-widest font-bold">
            s.id/Yudisium-FT
          </p>
        </div>
      </div>
    </div>
  );
});

StoryCard.displayName = 'StoryCard';
