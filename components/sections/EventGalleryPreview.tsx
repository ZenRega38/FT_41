"use client";

import React, { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';
import Link from 'next/link';
import { ArrowRight, Video } from 'lucide-react';
import galleryData from '@/data/gallery.json';
import { motion, AnimatePresence } from 'framer-motion';
import { getAsset } from '@/lib/asset';

// Helper to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => 0.5 - Math.random());
}

export function EventGalleryPreview() {
  const photos = galleryData as Array<{
    id: number | string;
    ratio: string;
    label: string;
    src?: string;
    category: string;
    isVideo?: boolean;
    url?: string;
  }>;
  const kirabPhotos = photos.filter(p => p.category === 'kirab' && !p.isVideo);
  const yudisiumPhotos = photos.filter(p => p.category === 'yudisium' && !p.isVideo);

  const [displayedPhotos, setDisplayedPhotos] = useState<typeof photos>([]);

  useEffect(() => {
    const pickPhotos = () => {
      const selectedKirab = shuffleArray(kirabPhotos).slice(0, 4);
      const selectedYudisium = shuffleArray(yudisiumPhotos).slice(0, 4);
      setDisplayedPhotos(shuffleArray([...selectedKirab, ...selectedYudisium]));
    };

    pickPhotos();

    const interval = setInterval(() => {
      pickPhotos();
    }, 15000);

    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="py-32 bg-black-soft relative overflow-hidden">
      <Container>
        <MotionReveal direction="up" className="text-center mb-16 space-y-4">
          <p className="text-gold tracking-[0.2em] uppercase text-xs md:text-sm font-semibold">Dokumentasi Acara</p>
          <h2 className="section-title text-text-primary">Galeri Momen</h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Kilas balik momen bersejarah dari rangkaian kegiatan Kirab dan Yudisium Ke-41.
          </p>
        </MotionReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-16 max-w-5xl mx-auto px-4">
          {displayedPhotos.map((photo, i) => (
            <div key={i} className="aspect-square relative rounded-2xl overflow-hidden border border-glass bg-charcoal">
              <AnimatePresence mode="wait">
                {photo && (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 group"
                  >
                    <img
                      src={getAsset(photo.src || '')}
                      alt={photo.label}
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-3 inset-x-0 text-gold font-mono text-[10px] md:text-xs uppercase tracking-widest text-center">
                        {photo.category}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <MotionReveal direction="up" className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            href="/galeri"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gold text-black-primary rounded-full font-mono tracking-widest uppercase text-sm font-bold hover:bg-champagne hover:scale-[1.02] transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            <span>Lihat Semua Dokumentasi</span>
            <ArrowRight size={16} />
          </Link>
        </MotionReveal>
      </Container>
    </section>
  );
}
