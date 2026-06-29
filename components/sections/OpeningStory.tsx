"use client";

import React from 'react';
import { Container } from '@/components/ui/Container';
import { useIsPostYudisium } from '@/lib/hooks';

export function OpeningStory() {
  const isPost = useIsPostYudisium();
  return (
    <section className="py-24 md:py-32 bg-black-primary relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-gold/5 blur-[120px]"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-gold">Sebuah Penanda</h2>
          
          <p className="font-serif text-2xl md:text-4xl leading-relaxed text-text-primary">
            Setelah melewati ruang kelas, laboratorium, penelitian, revisi, dan perjuangan panjang, hari ini menjadi penanda babak baru.
          </p>
          
          <p className="text-lg md:text-xl text-text-muted leading-relaxed">
            Yudisium Ke-41 Fakultas Teknik Universitas Borneo Tarakan merayakan 71 {isPost ? 'lulusan' : 'calon lulusan'} yang siap membawa ilmu, integritas, dan karya ke masa depan.
          </p>
        </div>
      </Container>
    </section>
  );
}
