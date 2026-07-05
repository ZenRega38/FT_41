"use client";

import React, { useMemo, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';
import participantsData from '@/data/participants.json';
import { Participant } from '@/types/site';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsPostYudisium } from '@/lib/hooks';

type DistType = 'tahun' | 'prodi' | 'gender';

export function CohortGraph() {
  const [activeTab, setActiveTab] = useState<DistType>('tahun');
  const isPost = useIsPostYudisium();

  const distributionData = useMemo(() => {
    const stats: Record<string, number> = {};
    const participants = participantsData as Participant[];

    participants.forEach(p => {
      if (activeTab === 'tahun') {
        if (p.nim && p.nim.length >= 2) {
          const yearPrefix = p.nim.substring(0, 2);
          const year = `20${yearPrefix}`;
          stats[year] = (stats[year] || 0) + 1;
        }
      } else if (activeTab === 'gender') {
        const genderRaw = p.gender;
        const genderVal = genderRaw === 'L' ? 'Laki-Laki' : genderRaw === 'P' ? 'Perempuan' : 'Tidak Diketahui';
        stats[genderVal] = (stats[genderVal] || 0) + 1;
      } else if (activeTab === 'prodi') {
        const prodiVal = p.program || 'Lainnya';
        stats[prodiVal] = (stats[prodiVal] || 0) + 1;
      }
    });

    return Object.entries(stats)
      .sort(([a], [b]) => {
        // Default alphabetical, but year should be ascending
        return a.localeCompare(b);
      })
      .map(([label, count]) => ({ label, count }));
  }, [activeTab]);

  const maxCount = Math.max(...distributionData.map(s => s.count), 1);

  return (
    <section className="py-24 bg-charcoal relative overflow-x-clip border-y border-glass">
      <Container>
        <MotionReveal direction="up" className="text-center mb-16 space-y-4">
          <p className="text-gold tracking-[0.3em] font-mono text-xs md:text-sm">[ DEMOGRAFI ]</p>
          <h2 className="section-title text-text-primary">Distribusi Peserta</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Komposisi 71 {isPost ? 'lulusan' : 'calon lulusan'} berdasarkan berbagai kategori.
          </p>
        </MotionReveal>

        <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-black-primary border border-glass shadow-2xl">
          
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {(['tahun', 'prodi', 'gender'] as DistType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full font-mono text-xs md:text-sm uppercase tracking-widest transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gold text-black-primary font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                    : 'bg-black-soft text-text-muted hover:text-gold hover:bg-charcoal border border-glass'
                }`}
              >
                {tab === 'tahun' ? (
                  <>
                    <span className="sm:hidden">Tahun</span>
                    <span className="hidden sm:inline">Tahun Masuk</span>
                  </>
                ) : tab === 'prodi' ? (
                  <>
                    <span className="sm:hidden">Prodi</span>
                    <span className="hidden sm:inline">Program Studi</span>
                  </>
                ) : (
                  'Gender'
                )}
              </button>
            ))}
          </div>

          {/* Graph */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {distributionData.map((stat, idx) => {
                  const widthPercentage = (stat.count / maxCount) * 100;
                  return (
                    <div key={stat.label} className="relative">
                      <div className="flex items-center justify-between mb-2 font-mono text-sm">
                        <span className="text-text-primary tracking-widest">
                          {activeTab === 'tahun' ? `Angkatan ${stat.label}` : stat.label}
                        </span>
                        <span className="text-gold font-bold">{stat.count} Peserta</span>
                      </div>
                      <div className="w-full h-4 bg-black-soft rounded-full overflow-hidden border border-glass">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${widthPercentage}%` }}
                          transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                          className="h-full bg-gold relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full animate-[shimmer_2s_infinite]"></div>
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
