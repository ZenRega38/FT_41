"use client";

import React from 'react';
import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';
import { Participant } from '@/types/site';
import { Award, Star, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import participantsData from '@/data/participants.json';

export function FeaturedGraduates() {
  const featured = [
    { title: "Lulusan Terbaik Fakultas", icon: Star, name: "[N/A]", program: "[N/A]", quote: "[N/A]", photo: "", photoAlt: "" },
    { title: "Pujian Akademik (Cumlaude)", icon: Award, name: "[N/A]", program: "[N/A]", quote: "[N/A]", photo: "", photoAlt: "" },
    { title: "Peneliti Muda Terbaik", icon: TrendingUp, name: "[N/A]", program: "[N/A]", quote: "[N/A]", photo: "", photoAlt: "" },
  ];

  return (
    <section className="py-32 bg-black-primary relative overflow-x-clip" >
      {/* Cinematic Background Spotlights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-champagne/5 rounded-full blur-[100px] pointer-events-none"></div>

      <Container>
        <MotionReveal direction="up" className="mb-20 space-y-4 text-center">
          <p className="text-gold tracking-[0.2em] uppercase text-xs md:text-sm font-semibold">Hall of Fame</p>
          <h2 className="section-title text-text-primary">Prestasi & Dedikasi</h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Angkatan ke-41 telah menorehkan standar baru. Inilah representasi terbaik dari dedikasi dan kerja keras para mahasiswa.
          </p>
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
          
          {/* Main Featured (Left - spans 8 cols) */}
          <MotionReveal delay={0.1} direction="up" className="md:col-span-8 group">
            <div className="h-[500px] md:h-[600px] bg-charcoal rounded-3xl border border-glass p-8 md:p-12 relative overflow-hidden flex flex-col justify-end group-hover:border-gold/30 transition-colors duration-500">
              
              {/* Image / Background placeholder */}
              <div className="absolute inset-0 bg-gradient-to-t from-black-primary via-charcoal/50 to-transparent z-10 pointer-events-none"></div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center bg-black-soft"
              >
                {featured[0].photo ? (
                  <Image 
                    src={featured[0].photo} 
                    alt={featured[0].photoAlt || featured[0].name} 
                    fill 
                    className="object-cover object-top opacity-50 group-hover:opacity-70 transition-opacity duration-700" 
                  />
                ) : (
                  <div className="text-[12rem] font-serif text-gold/10 select-none">
                    ?
                  </div>
                )}
              </motion.div>

              <div className="relative z-20 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black-soft/50 backdrop-blur-md border border-gold/20 text-gold text-sm font-medium mb-2">
                  {(() => {
                    const Icon = featured[0].icon;
                    return <Icon size={16} />;
                  })()}
                  <span>{featured[0].title}</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-serif text-text-primary">{featured[0].name}</h3>
                <p className="text-champagne font-mono text-sm tracking-widest uppercase">{featured[0].program}</p>
                
                <div className="mt-8 border-l-2 border-gold/50 pl-4 py-1">
                  <p className="text-lg md:text-xl text-text-muted italic font-serif leading-relaxed max-w-2xl">
                    &quot;{featured[0].quote}&quot;
                  </p>
                </div>
              </div>
            </div>
          </MotionReveal>

          {/* Secondary Stack (Right - spans 4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            
            {/* Top Secondary */}
            <MotionReveal delay={0.2} direction="up" className="h-[240px] md:h-[288px] group">
              <div className="h-full bg-charcoal rounded-3xl border border-glass p-6 md:p-8 relative overflow-hidden group-hover:border-gold/30 transition-colors duration-500">
                {featured[1].photo ? (
                  <>
                    <Image 
                      src={featured[1].photo} 
                      alt={featured[1].photoAlt || featured[1].name} 
                      fill 
                      className="object-cover object-top opacity-40 group-hover:opacity-60 transition-opacity duration-700 z-0" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent z-0"></div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-end -translate-y-12 translate-x-12 opacity-5">
                    <div className="text-[10rem] font-serif">?</div>
                  </div>
                )}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="inline-flex w-fit items-center gap-2 px-3 py-1.5 rounded-full bg-black-soft/50 border border-gold/20 text-gold text-xs font-medium">
                    {(() => {
                      const Icon1 = featured[1].icon;
                      return <Icon1 size={14} />;
                    })()}
                    <span>{featured[1].title}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-text-primary mb-1">{featured[1].name}</h3>
                    <p className="text-text-muted text-sm">{featured[1].program}</p>
                  </div>
                </div>
              </div>
            </MotionReveal>

            {/* Bottom Secondary */}
            <MotionReveal delay={0.3} direction="up" className="h-[240px] md:h-[288px] group">
              <div className="h-full bg-charcoal rounded-3xl border border-glass p-6 md:p-8 relative overflow-hidden group-hover:border-gold/30 transition-colors duration-500">
                {featured[2].photo ? (
                  <>
                    <Image 
                      src={featured[2].photo} 
                      alt={featured[2].photoAlt || featured[2].name} 
                      fill 
                      className="object-cover object-top opacity-40 group-hover:opacity-60 transition-opacity duration-700 z-0" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent z-0"></div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-end -translate-y-12 translate-x-12 opacity-5">
                    <div className="text-[10rem] font-serif">?</div>
                  </div>
                )}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="inline-flex w-fit items-center gap-2 px-3 py-1.5 rounded-full bg-black-soft/50 border border-gold/20 text-gold text-xs font-medium">
                    {(() => {
                      const Icon2 = featured[2].icon;
                      return <Icon2 size={14} />;
                    })()}
                    <span>{featured[2].title}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-text-primary mb-1">{featured[2].name}</h3>
                    <p className="text-text-muted text-sm">{featured[2].program}</p>
                  </div>
                </div>
              </div>
            </MotionReveal>

          </div>

        </div>
      </Container>
    </section>
  );
}
