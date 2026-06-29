"use client";

import React from 'react';
import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';
import Link from 'next/link';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';

export function GalleryPreview() {
  const placeholders = [1, 2, 3];

  return (
    <section className="py-24 bg-black-primary relative overflow-x-clip" >
      <Container>
        <MotionReveal direction="up" className="text-center mb-16 space-y-4">
          <p className="text-gold tracking-[0.2em] uppercase text-xs md:text-sm font-semibold">Dokumentasi</p>
          <h2 className="section-title text-text-primary">Galeri Yudisium</h2>
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {placeholders.map((item, idx) => (
            <MotionReveal 
              key={item}
              delay={idx * 0.15}
              direction="up"
              className="aspect-[4/3] rounded-2xl border border-glass bg-charcoal relative overflow-hidden group flex flex-col items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-glass to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
              
              <ImageIcon size={32} className="text-gold/50 mb-4 group-hover:scale-110 transition-transform duration-500" />
              <p className="text-text-muted font-mono tracking-widest uppercase text-sm group-hover:text-gold transition-colors">
                Coming Soon
              </p>
              
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
            </MotionReveal>
          ))}
        </div>

        <MotionReveal direction="up" delay={0.4} className="text-center">
          <Link 
            href="/galeri"
            className="inline-flex items-center gap-3 text-gold hover:text-champagne font-mono tracking-widest uppercase text-sm md:text-base group transition-colors"
          >
            <span>Lihat Lebih Banyak</span>
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </MotionReveal>
      </Container>
    </section>
  );
}
