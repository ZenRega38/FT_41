"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Participant } from '@/types/site';
import { motion } from 'framer-motion';
import { getAsset } from "@/lib/asset";

interface GraduateCardProps {
  participant: Participant;
  index?: number;
}

export function GraduateCard({ participant, index = 0 }: GraduateCardProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: (index % 10) * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link 
        href={`/peserta/${participant.slug}`}
        className="group relative block w-full bg-charcoal border border-glass group-hover:border-gold/50 transition-colors duration-300 rounded-xl overflow-hidden"
      >
        <div className="aspect-[3/4] relative bg-black-soft w-full overflow-hidden">
          
          {/* Animated Mesh Placeholder (Missing Photo) */}
          {!participant.photo ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-charcoal via-black-primary to-[#1a150b]">
              <motion.div 
                animate={{ 
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-gold)_0%,_transparent_50%)] opacity-10 mix-blend-screen pointer-events-none"
              />
              <div className="text-4xl md:text-5xl font-serif text-gold/30 group-hover:text-gold/50 transition-colors duration-500 z-10">
                {participant.name.charAt(0).toUpperCase()}
              </div>
              <div className="mt-4 w-12 h-[1px] bg-gold/20 group-hover:bg-gold/50 transition-colors duration-500 z-10"></div>
              <div className="absolute bottom-1/4 text-[10px] font-mono tracking-widest text-gold/40 uppercase">Coming Soon</div>
            </div>
          ) : (
            <>
              {/* Premium Shimmer Skeleton */}
              <div className={`absolute inset-0 bg-gradient-to-br from-charcoal via-[#14120c] to-black-primary animate-pulse z-0 transition-opacity duration-700 ${isLoaded ? 'opacity-0' : 'opacity-100'}`} />
              
              <Image
                src={getAsset(participant.photo)}
                alt={participant.photoAlt || participant.name}
                fill
                className={`object-cover object-top transition-all duration-700 group-hover:scale-110 z-10 ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-xl scale-110'}`}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                loading="lazy"
                unoptimized={true}
                onLoad={() => setIsLoaded(true)}
              />
            </>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black-primary via-black-primary/50 to-transparent opacity-90 z-20 transition-opacity duration-300 group-hover:opacity-100" />
          
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-30 translate-y-4 transition-transform duration-500 group-hover:translate-y-0 ease-out">
            <div className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-gold mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
              {participant.program}
            </div>
            <h3 className="font-serif text-lg md:text-xl text-text-primary group-hover:text-champagne transition-colors line-clamp-2 leading-tight drop-shadow-md">
              {participant.name}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
