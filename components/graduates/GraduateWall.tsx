"use client";

import React, { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { GraduateCard } from './GraduateCard';
import { Participant } from '@/types/site';
import participantsData from '@/data/participants.json';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsPostYudisium } from '@/lib/hooks';

const PAGE_SIZE = 10;

function GraduateWallContent({ hideSectionHeader = false }: { hideSectionHeader?: boolean }) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('All');
  const [sort, setSort] = useState<string>('name-asc');
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [activeScrollIndex, setActiveScrollIndex] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isPost = useIsPostYudisium();

  // Hide the compact sticky header once the card grid enters the viewport
  useEffect(() => {
    if (!hideSectionHeader || !sentinelRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeaderVisible(entry.isIntersecting),
      {
        threshold: 0,
        // Fire when the top of the sentinel reaches the bottom of the sticky bar
        // navbar (80px) + compact header (~100px) = ~180px
        rootMargin: '-180px 0px 0px 0px',
      }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hideSectionHeader]);

  useEffect(() => {
    const prodi = searchParams.get('prodi');
    if (prodi && ['TE', 'TM', 'TS', 'TK'].includes(prodi)) {
      setFilter(prodi);
    }
  }, [searchParams]);

  const participants: Participant[] = participantsData as Participant[];

  const filteredParticipants = useMemo(() => {
    return participants
      .filter((p) => p.displayConsent)
      .filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'All' || p.programCode === filter;
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        if (sort === 'name-asc') return a.name.localeCompare(b.name);
        if (sort === 'name-desc') return b.name.localeCompare(a.name);
        if (sort === 'year-asc') return (a.nim || '').localeCompare(b.nim || '');
        if (sort === 'year-desc') return (b.nim || '').localeCompare(a.nim || '');
        return 0;
      });
  }, [search, filter, sort, participants]);

  const mobileChunks = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < filteredParticipants.length; i += visibleCount) {
      chunks.push(filteredParticipants.slice(i, i + visibleCount));
    }
    return chunks;
  }, [filteredParticipants, visibleCount]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    setActiveScrollIndex(0);
  }, [filter, search, sort]);

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollLeft / container.clientWidth);
    setActiveScrollIndex(index);
  };

  const scrollNext = () => {
    const slider = document.getElementById('graduate-slider');
    if (slider) slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
  };

  const scrollPrev = () => {
    const slider = document.getElementById('graduate-slider');
    if (slider) slider.scrollBy({ left: -slider.clientWidth, behavior: 'smooth' });
  };

  const hasMore = visibleCount < filteredParticipants.length;
  const hasLess = visibleCount > PAGE_SIZE;

  // ── Reusable filter / sort / search bar ──
  const filterBar = (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-between items-center">
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        {/* Program filter */}
        <div className="relative w-full sm:w-auto">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-52 appearance-none bg-charcoal border border-glass focus:border-gold/50 rounded-lg py-2.5 pl-4 pr-10 text-sm text-text-primary outline-none transition-colors cursor-pointer"
            aria-label="Filter Prodi"
          >
            {[
              { code: 'All', name: 'Semua Prodi' },
              { code: 'TE',  name: 'Teknik Elektro' },
              { code: 'TM',  name: 'Teknik Mesin' },
              { code: 'TS',  name: 'Teknik Sipil' },
              { code: 'TK',  name: 'Teknik Komputer' },
            ].map((prog) => (
              <option key={prog.code} value={prog.code}>{prog.name}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-text-muted">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Sort */}
        <div className="relative w-full sm:w-auto">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full sm:w-52 appearance-none bg-charcoal border border-glass focus:border-gold/50 rounded-lg py-2.5 pl-4 pr-10 text-sm text-text-primary outline-none transition-colors cursor-pointer"
            aria-label="Urutkan"
          >
            <option value="name-asc">Nama (A – Z)</option>
            <option value="name-desc">Nama (Z – A)</option>
            <option value="year-asc">Tahun Masuk (Lama – Baru)</option>
            <option value="year-desc">Tahun Masuk (Baru – Lama)</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-text-muted">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full md:w-64">
        <input
          type="text"
          placeholder="Cari nama..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-charcoal border border-glass focus:border-gold/50 rounded-lg py-2 pl-4 pr-10 text-sm text-text-primary outline-none transition-colors"
          aria-label="Cari nama peserta"
        />
      </div>
    </div>
  );

  return (
    <section id="peserta" className={`${hideSectionHeader ? 'rounded-t-3xl' : 'py-24'} bg-black-soft min-h-screen`}>

      {/* ── Compact sticky header: only on /lulusan dedicated page ── */}
      {hideSectionHeader && (
        <div
          className={`sticky top-16 md:top-20 z-20 bg-black-soft/[0.97] backdrop-blur-xl border-b border-gold/10 shadow-lg shadow-black/40 py-4
            transition-all duration-500 ease-in-out
            ${headerVisible
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-3 pointer-events-none'
            }`}
        >
          <Container>
            {/* Mini title — centered */}
            <p className="text-center font-serif text-text-muted text-xs tracking-[0.22em] uppercase mb-3">
              Daftar <span className="text-gold font-semibold">Lulusan</span>
            </p>
            {/* Filter / sort / search */}
            {filterBar}
          </Container>
        </div>
      )}

      <Container>
        {/* Standard section header (homepage) */}
        {!hideSectionHeader && (
          <div className="text-center mb-16 space-y-4">
            <h2 className="section-title text-text-primary">Lulusan</h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Mengenal lebih dekat 71 {isPost ? 'lulusan' : 'calon lulusan'} Fakultas Teknik.
            </p>
          </div>
        )}

        {/* Filter bar in standard mode */}
        {!hideSectionHeader && (
          <div className="mb-12">{filterBar}</div>
        )}

        {/* ── Graduate Grid / Slider ── */}
        <div className={hideSectionHeader ? 'pt-6' : ''}>
          {/* Sentinel: when visible in viewport, compact header shows; once scrolled past, header hides */}
          {hideSectionHeader && <div ref={sentinelRef} aria-hidden="true" />}
          {filteredParticipants.length > 0 ? (
            <>
              <div className="relative w-full">
                {/* Left arrow — only when multiple pages */}
                {mobileChunks.length > 1 && (
                  <button
                    onClick={scrollPrev}
                    className="hidden md:flex absolute -left-16 lg:-left-20 xl:-left-24 top-1/2 -translate-y-1/2 w-12 h-12 bg-charcoal border border-gold/30 rounded-full items-center justify-center text-gold hover:bg-gold/10 hover:scale-110 transition-all z-10 shadow-xl"
                  >
                    <ChevronLeft size={24} />
                  </button>
                )}

                <div
                  id="graduate-slider"
                  className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 scroll-smooth"
                  onScroll={handleMobileScroll}
                >
                  {mobileChunks.map((chunk, chunkIndex) => {
                    const isNearVisible = Math.abs(chunkIndex - activeScrollIndex) <= 1;
                    return (
                      <div key={chunkIndex} className="min-w-full shrink-0 snap-center pr-1">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
                          {isNearVisible ? chunk.map((participant, index) => (
                            <GraduateCard
                              key={participant.id}
                              participant={participant}
                              index={(chunkIndex * visibleCount) + index}
                            />
                          )) : (
                            <div className="col-span-full h-[500px] flex items-center justify-center">
                              <span className="text-gold animate-pulse">Memuat...</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right arrow — only when multiple pages */}
                {mobileChunks.length > 1 && (
                  <button
                    onClick={scrollNext}
                    className="hidden md:flex absolute -right-16 lg:-right-20 xl:-right-24 top-1/2 -translate-y-1/2 w-12 h-12 bg-charcoal border border-gold/30 rounded-full items-center justify-center text-gold hover:bg-gold/10 hover:scale-110 transition-all z-10 shadow-xl"
                  >
                    <ChevronRight size={24} />
                  </button>
                )}
              </div>

              {/* Pagination controls */}
              <div className="flex flex-col items-center gap-4 mt-8 md:mt-14">
                <p className="text-xs text-text-muted tracking-widest uppercase">
                  Halaman {mobileChunks.length > 0 ? activeScrollIndex + 1 : 0}/{mobileChunks.length} · {Math.min(visibleCount, filteredParticipants.length)} dari {filteredParticipants.length} lulusan
                </p>

                {hasMore && (
                  <button
                    onClick={() => setVisibleCount(filteredParticipants.length)}
                    className="inline-flex items-center gap-3 text-gold hover:text-champagne font-mono tracking-widest uppercase text-sm group transition-colors"
                  >
                    <span>Tampilkan Semua Lulusan</span>
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                )}
                {!hasMore && hasLess && (
                  <button
                    onClick={() => {
                      setVisibleCount(PAGE_SIZE);
                      setActiveScrollIndex(0);
                      document.getElementById('peserta')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-3 text-text-muted hover:text-text-primary font-mono tracking-widest uppercase text-sm group transition-colors"
                  >
                    <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform duration-300" />
                    <span>Lihat Lebih Sedikit</span>
                  </button>
                )}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-charcoal rounded-xl border border-glass"
            >
              <p className="text-text-muted">Tidak ada peserta yang sesuai dengan pencarian.</p>
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}

export function GraduateWall({ hideSectionHeader = false }: { hideSectionHeader?: boolean }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black-soft flex items-center justify-center">Loading...</div>}>
      <GraduateWallContent hideSectionHeader={hideSectionHeader} />
    </Suspense>
  );
}
