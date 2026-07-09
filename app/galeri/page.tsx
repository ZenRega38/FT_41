"use client";

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';
import Link from 'next/link';
import { getAsset } from '@/lib/asset';
import { ArrowLeft, Image as ImageIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import galleryData from '@/data/gallery.json';

export default function GaleriPage() {
  const photos = galleryData as Array<{
    id: number | string;
    ratio: string;
    label: string;
    src?: string;
    category: string;
    isVideo?: boolean;
    url?: string;
  }>;
  const [selectedImage, setSelectedImage] = useState<typeof photos[0] | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredPhotos = photos.filter(photo => 
    activeTab === 'all' ? !photo.isVideo : photo.category === activeTab
  );

  const tabs = [
    { id: 'all', label: 'Semua' },
    { id: 'yudisium', label: 'Yudisium' },
    { id: 'kirab', label: 'Kirab' },
    { id: 'video', label: 'Video' }
  ];

  return (
    <main className="min-h-screen bg-black-primary text-text-primary pt-32 pb-24">
      <Container>

        <MotionReveal direction="up" className="mb-12 space-y-4">
          <p className="text-gold tracking-[0.2em] uppercase text-xs md:text-sm font-semibold">Dokumentasi</p>
          <h1 className="hero-title font-serif text-transparent bg-clip-text bg-gradient-to-r from-champagne via-gold to-gold-muted drop-shadow-sm">
            Galeri Momen
          </h1>
          <p className="text-text-muted max-w-2xl font-light">
            Kumpulan momen bersejarah dari rangkaian acara Yudisium Ke-41 Fakultas Teknik Universitas Borneo Tarakan.
          </p>
        </MotionReveal>

        {/* Filter Tabs */}
        <MotionReveal delay={0.1} direction="up" className="mb-10 flex flex-wrap gap-3">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeTab === tab.id
                  ? 'bg-gold/10 text-gold border-gold shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                  : 'bg-charcoal text-text-muted border-glass hover:text-text-primary hover:border-gold/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </MotionReveal>

        {/* Masonry via CSS columns — tiles naturally per aspect ratio, no empty row gaps */}
        {filteredPhotos.length > 0 ? (
          <div
            style={{
              columns: 'var(--masonry-cols)',
              gap: '14px',
            } as React.CSSProperties}
            className="[--masonry-cols:2] md:[--masonry-cols:3] lg:[--masonry-cols:4]"
          >
            {filteredPhotos.map((photo, idx) => (
              <MotionReveal
                key={photo.id}
                delay={(idx % 12) * 0.05}
                direction="up"
                className={`w-full ${photo.ratio} rounded-2xl border border-glass bg-charcoal relative overflow-hidden group flex flex-col items-center justify-center mb-[14px] break-inside-avoid ${(!photo.src && !photo.isVideo) ? 'animate-pulse' : 'cursor-pointer hover:border-gold/50'}`}
                onClick={() => {
                  if (photo.isVideo && (photo as any).url) {
                    window.open((photo as any).url, '_blank');
                  } else if (photo.src) {
                    setSelectedImage(photo);
                  }
                }}
              >
                {photo.src ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getAsset(photo.src)}
                      alt={photo.label}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                      <p className="text-gold font-mono tracking-widest uppercase text-[10px] drop-shadow-md">
                        {photo.category.replace(/-/g, ' ')}
                      </p>
                    </div>
                  </>
                ) : photo.isVideo ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-black-soft transition-opacity" />
                    <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-gold/40 transition-all duration-500 relative z-10 border border-gold/30">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[14px] border-l-gold border-b-8 border-b-transparent ml-1"></div>
                    </div>
                    <p className="text-white mt-4 font-serif text-lg group-hover:text-gold transition-colors relative z-10 text-center px-4">
                      {photo.label}
                    </p>
                    <p className="text-gold/70 text-xs font-mono uppercase mt-2 relative z-10">
                      Buka di Google Drive
                    </p>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-glass to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                    <ImageIcon size={28} className="text-gold/30 mb-3 group-hover:scale-110 group-hover:text-gold transition-all duration-500 relative z-10" />
                    <p className="text-text-muted/50 font-mono tracking-widest uppercase text-xs group-hover:text-gold transition-colors relative z-10 text-center px-4">
                      Memproses Foto...
                    </p>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </>
                )}
              </MotionReveal>
            ))}
          </div>
        ) : activeTab === 'video' ? (
          <MotionReveal direction="up" className="flex flex-col items-center justify-center py-32 text-center border border-glass rounded-3xl bg-charcoal/30">
            <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold/80">
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
            </div>
            <h3 className="font-serif text-3xl md:text-4xl text-text-primary mb-4">Video Coming Soon</h3>
            <p className="text-text-muted font-light max-w-md mx-auto text-sm md:text-base">
              Dokumentasi video rangkaian acara Kirab dan Yudisium sedang dalam proses penyuntingan dan akan segera hadir.
            </p>
          </MotionReveal>
        ) : null}

      </Container>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && selectedImage.src && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 cursor-zoom-out bg-black/40 backdrop-blur-md"
          >
            {/* Blurred dominant color background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getAsset(selectedImage.src)}
                alt="blur background"
                className="absolute inset-0 w-full h-full object-cover scale-150 blur-[100px] opacity-40 saturate-200"
              />
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-gold hover:text-black transition-colors"
            >
              <X size={24} />
            </button>

            {/* Main Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-5xl max-h-[90vh] rounded-xl overflow-hidden shadow-2xl border border-glass"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getAsset(selectedImage.src)}
                alt={selectedImage.label}
                className="w-full h-full object-contain bg-black-soft/50 backdrop-blur-sm"
              />
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black-primary/90 to-transparent">
                <p className="text-white font-serif text-xl">{selectedImage.label}</p>
                <p className="text-gold font-mono tracking-widest uppercase text-xs mt-2">
                  {selectedImage.category.replace(/-/g, ' ')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
