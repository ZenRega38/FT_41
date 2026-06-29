"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Participant } from '@/types/site';
import { motion } from 'framer-motion';

interface GraduateCardProps {
  participant: Participant;
  onClick: (participant: Participant) => void;
  index?: number;
}

export function GraduateCard({ participant, onClick, index = 0 }: GraduateCardProps) {
  // Simple 3D tilt effect on hover
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.6, delay: (index % 10) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onClick(participant)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer rounded-xl overflow-hidden"
      style={{ perspective: 1000 }}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(participant);
        }
      }}
    >
      <motion.div 
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-full h-full bg-charcoal border border-glass group-hover:border-gold/50 transition-colors duration-300 rounded-xl overflow-hidden"
      >
        <div className="aspect-[3/4] relative bg-black-soft w-full overflow-hidden">
          
          {/* Animated Mesh Placeholder */}
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
          </div>
          
          {/* Uncomment when images are ready */}
          {/* <Image
            src={participant.photo}
            alt={participant.photoAlt}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-110 z-10"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            loading="lazy"
          /> */}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black-primary via-black-primary/50 to-transparent opacity-90 z-20 transition-opacity duration-300 group-hover:opacity-100" />
          
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-30 translate-y-4 transition-transform duration-500 group-hover:translate-y-0 ease-out">
            <div className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-gold mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
              {participant.programCode}
            </div>
            <h3 className="font-serif text-lg md:text-xl text-text-primary group-hover:text-champagne transition-colors line-clamp-2 leading-tight drop-shadow-md">
              {participant.name}
            </h3>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
