"use client";

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';
import { ExternalLink, FolderOpen, Film, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

interface AlbumFolder {
  id: string;
  title: string;
  description: string;
  category: 'yudisium' | 'kirab' | 'video';
  url: string;
  icon: 'camera' | 'film';
  count?: string;
}

const ALBUMS: AlbumFolder[] = [
  {
    id: 'yudisium-1',
    title: 'Liputan Yudisium — Sesi 1',
    description: 'Dokumentasi prosesi dan momen acara Yudisium Ke-41 Fakultas Teknik UBT.',
    category: 'yudisium',
    url: 'https://drive.google.com/drive/folders/1wKga1ch3MDRncGWrTVvwtm6cl1Kma9ei',
    icon: 'camera',
  },
  {
    id: 'yudisium-2',
    title: 'Liputan Yudisium — Sesi 2',
    description: 'Koleksi foto tambahan dari rangkaian acara Yudisium Ke-41.',
    category: 'yudisium',
    url: 'https://drive.google.com/drive/folders/1Gyo49jQZtfL3wuNlccHQObNveMUxbj1-',
    icon: 'camera',
  },
  {
    id: 'yudisium-3',
    title: 'Liputan Yudisium — Sesi 3',
    description: 'Momen spesial keluarga dan peserta Yudisium Ke-41.',
    category: 'yudisium',
    url: 'https://drive.google.com/drive/folders/1TxLfklZ5cEMNJSFuEZaiNU4GcMNKB2mY',
    icon: 'camera',
  },
  {
    id: 'kirab-1',
    title: 'Kirab (Arak-Arakan) — Sesi 1',
    description: 'Dokumentasi prosesi kirab kelulusan para peserta Yudisium Ke-41.',
    category: 'kirab',
    url: 'https://drive.google.com/drive/folders/1MS9AdOIdfSPahDBlJKdfFoZQ0qOgW5xv',
    icon: 'camera',
  },
  {
    id: 'kirab-2',
    title: 'Kirab (Arak-Arakan) — Sesi 2',
    description: 'Koleksi foto arak-arakan dan perayaan kelulusan bersama keluarga.',
    category: 'kirab',
    url: 'https://drive.google.com/drive/folders/1PdTOdqZVkIHDYATub4XO-NUKo-cuWEsC',
    icon: 'camera',
  },
  {
    id: 'video',
    title: 'Koleksi Video',
    description: 'Kumpulan video dokumentasi acara Yudisium Ke-41 Fakultas Teknik UBT.',
    category: 'video',
    url: 'https://drive.google.com/drive/folders/16bwC7yIL6ulWvdt61NBwy-jzrMAxFWaw',
    icon: 'film',
  },
];

const FILTERS = [
  { id: 'all',      label: 'Semua' },
  { id: 'yudisium', label: 'Yudisium' },
  { id: 'kirab',    label: 'Kirab' },
  { id: 'video',    label: 'Video' },
];

const CATEGORY_COLORS: Record<string, string> = {
  yudisium: 'border-gold/30 text-gold',
  kirab:    'border-champagne/30 text-champagne',
  video:    'border-white/20 text-text-muted',
};

export default function GaleriPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? ALBUMS
    : ALBUMS.filter(a => a.category === activeFilter);

  return (
    <main className="min-h-screen bg-black-primary text-text-primary pt-32 pb-24">
      <Container>

        <MotionReveal direction="up" className="mb-16 space-y-4">
          <p className="text-gold tracking-[0.2em] uppercase text-xs md:text-sm font-semibold">Dokumentasi</p>
          <h1 className="hero-title font-serif text-transparent bg-clip-text bg-gradient-to-r from-champagne via-gold to-gold-muted drop-shadow-sm">
            Galeri Yudisium
          </h1>
          <p className="text-text-muted max-w-2xl font-light">
            Kumpulan momen bersejarah dari acara Yudisium Ke-41 Fakultas Teknik Universitas Borneo Tarakan.
            Klik album untuk membuka koleksi lengkap.
          </p>
        </MotionReveal>

        {/* Filter pills */}
        <MotionReveal direction="up" delay={0.1}>
          <div className="flex flex-wrap gap-3 mb-12">
            {FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-5 py-2 rounded-full text-sm font-mono tracking-wide border transition-all duration-300 ${
                  activeFilter === f.id
                    ? 'bg-gold text-black-primary border-gold font-bold'
                    : 'bg-transparent text-text-muted border-white/15 hover:border-gold/40 hover:text-gold'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </MotionReveal>

        {/* Album grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((album, idx) => (
            <MotionReveal key={album.id} delay={idx * 0.08} direction="up">
              <motion.a
                href={album.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group flex flex-col gap-5 p-7 rounded-3xl bg-charcoal border transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.08)] hover:border-gold/30 ${CATEGORY_COLORS[album.category] || 'border-glass'}`}
              >
                {/* Icon area */}
                <div className="w-14 h-14 rounded-2xl bg-black-soft border border-glass flex items-center justify-center text-gold group-hover:bg-gold/10 group-hover:border-gold/30 transition-all duration-300">
                  {album.icon === 'film'
                    ? <Film size={26} />
                    : <Camera size={26} />
                  }
                </div>

                {/* Meta */}
                <div className="flex-1 space-y-2">
                  <span className={`text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded border ${CATEGORY_COLORS[album.category]}`}>
                    {album.category}
                  </span>
                  <h2 className="font-serif text-xl text-text-primary group-hover:text-champagne transition-colors leading-snug">
                    {album.title}
                  </h2>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {album.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-gold font-mono text-xs tracking-widest uppercase group-hover:gap-3 transition-all duration-300">
                  <FolderOpen size={14} />
                  <span>Buka Album</span>
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.a>
            </MotionReveal>
          ))}
        </div>

        {/* Note */}
        <MotionReveal direction="up" delay={0.3}>
          <p className="mt-16 text-center text-text-muted/50 text-xs font-mono tracking-widest uppercase">
            Foto dibuka melalui Google Drive — koneksi internet diperlukan
          </p>
        </MotionReveal>

      </Container>
    </main>
  );
}
