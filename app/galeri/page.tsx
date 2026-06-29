"use client";

import React from 'react';
import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';
import Link from 'next/link';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';

export default function GaleriPage() {
  // Adaptive array mapping to different aspect ratios
  const photos = [
    { id: 1, ratio: "aspect-[4/3]", label: "Coming Soon" },
    { id: 2, ratio: "aspect-[3/4]", label: "Coming Soon" },
    { id: 3, ratio: "aspect-square", label: "Coming Soon" },
    { id: 4, ratio: "aspect-video", label: "Coming Soon" },
    { id: 5, ratio: "aspect-square", label: "Coming Soon" },
    { id: 6, ratio: "aspect-[4/3]", label: "Coming Soon" },
    { id: 7, ratio: "aspect-video", label: "Coming Soon" },
    { id: 8, ratio: "aspect-[3/4]", label: "Coming Soon" },
  ];

  return (
    <main className="min-h-screen bg-black-primary text-text-primary pt-32 pb-24">
      <Container>
        <MotionReveal direction="down" className="mb-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-mono tracking-widest uppercase text-sm"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Beranda</span>
          </Link>
        </MotionReveal>

        <MotionReveal direction="up" className="mb-16 space-y-4">
          <p className="text-gold tracking-[0.2em] uppercase text-xs md:text-sm font-semibold">Dokumentasi</p>
          <h1 className="hero-title font-serif text-transparent bg-clip-text bg-gradient-to-r from-champagne via-gold to-gold-muted drop-shadow-sm">
            Galeri Yudisium
          </h1>
          <p className="text-text-muted max-w-2xl font-light">
            Kumpulan momen bersejarah dari acara Yudisium Ke-41 Fakultas Teknik Universitas Borneo Tarakan.
          </p>
        </MotionReveal>

        {/* Adaptive Grid / Masonry-like Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-auto">
          {photos.map((photo, idx) => (
            <MotionReveal 
              key={photo.id}
              delay={idx * 0.1}
              direction="up"
              className={`w-full ${photo.ratio} rounded-2xl border border-glass bg-charcoal relative overflow-hidden group flex flex-col items-center justify-center`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-glass to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
              
              <ImageIcon size={32} className="text-gold/30 mb-4 group-hover:scale-110 group-hover:text-gold transition-all duration-500" />
              <p className="text-text-muted/50 font-mono tracking-widest uppercase text-xs group-hover:text-gold transition-colors">
                {photo.label}
              </p>
              
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </main>
  );
}
