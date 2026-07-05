"use client";

import React, { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { useIsPostYudisium } from '@/lib/hooks';
import { motion, useScroll, useTransform } from 'framer-motion';

export function OpeningStory() {
  const isPost = useIsPostYudisium();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="py-24 md:py-48 bg-black-primary relative overflow-hidden">
      <motion.div style={{ y: yBackground }} className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-gold/10 blur-[150px]"></div>
      </motion.div>
      
      <Container className="relative z-10">
        <motion.div style={{ y: yText, opacity: opacityText }} className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-gold">Sebuah Penanda</h2>
          
          <p className="font-serif text-2xl md:text-5xl leading-[1.4] md:leading-[1.4] text-text-primary drop-shadow-md">
            Setelah melewati ruang kelas, laboratorium, penelitian, revisi, dan perjuangan panjang, hari ini menjadi penanda babak baru.
          </p>
          
          <p className="text-lg md:text-xl text-text-muted leading-relaxed max-w-2xl mx-auto">
            Yudisium Ke-41 Fakultas Teknik Universitas Borneo Tarakan merayakan 71 {isPost ? 'lulusan' : 'calon lulusan'} yang siap membawa ilmu, integritas, dan karya ke masa depan.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
