"use client";

import React, { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Timeline() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    { title: 'Awal Perjalanan', desc: 'Langkah pertama di kampus, masa perkenalan, dan semangat baru.' },
    { title: 'Ruang Kelas & Laboratorium', desc: 'Masa-masa mendalami teori dan menguji batas kemampuan praktikal.' },
    { title: 'PKL / KKN / Riset', desc: 'Terjun ke lapangan, memahami industri, dan memecahkan masalah nyata.' },
    { title: 'Skripsi & Sidang', desc: 'Malam-malam panjang, revisi tanpa henti, dan ujian akhir pembuktian.' },
    { title: 'Yudisium Ke-41', desc: 'Hari perayaan, saat nama dipanggil dan gelar disematkan.' },
    { title: 'Menuju Dunia Profesional', desc: 'Langkah nyata membangun karya untuk nusa dan bangsa.' }
  ];

  return (
    <section ref={containerRef} className="py-24 bg-charcoal relative overflow-x-clip" >
      <Container>
        <MotionReveal direction="up" className="text-center mb-16 space-y-4">
          <h2 className="section-title text-text-primary">Perjalanan</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Dari ruang kelas hingga hari ini, setiap tahap telah membentuk karakter dan kemampuan intelektual.
          </p>
        </MotionReveal>

        <div className="max-w-4xl mx-auto relative">
          {/* Background vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-glass transform md:-translate-x-1/2"></div>
          
          {/* Animated Glowing Scroll Progress Line */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-gold via-gold to-transparent transform md:-translate-x-1/2 shadow-[0_0_15px_rgba(212,175,55,1)] z-0 origin-top"
          />

          <div className="space-y-12">
            {steps.map((step, idx) => (
              <MotionReveal 
                key={idx} 
                direction={idx % 2 === 0 ? 'right' : 'left'} 
                delay={0.1}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                
                {/* Marker */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-gold rounded-full transform -translate-x-[5px] md:-translate-x-1.5 mt-1.5 md:mt-0 shadow-[0_0_10px_rgba(212,175,55,0.8)] z-10"></div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pl-12' : 'md:pr-12 text-left md:text-right'}`}>
                  <h3 className="text-xl md:text-2xl font-serif text-text-primary mb-2 group-hover:text-gold transition-colors">{step.title}</h3>
                  <p className="text-sm md:text-base text-text-muted leading-relaxed">{step.desc}</p>
                </div>

              </MotionReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
