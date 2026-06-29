"use client";

import React, { useMemo } from 'react';
import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';
import participantsData from '@/data/participants.json';
import { Participant } from '@/types/site';

export function CohortGraph() {
  const cohortStats = useMemo(() => {
    const stats: Record<string, number> = {};
    (participantsData as Participant[]).forEach(p => {
      if (p.nim && p.nim.length >= 2) {
        const yearPrefix = p.nim.substring(0, 2);
        // Assuming prefixes like 19, 20, 21, 22
        const year = `20${yearPrefix}`;
        stats[year] = (stats[year] || 0) + 1;
      }
    });

    return Object.entries(stats)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([year, count]) => ({ year, count }));
  }, []);

  const maxCount = Math.max(...cohortStats.map(s => s.count), 1);

  return (
    <section className="py-24 bg-charcoal relative overflow-x-clip border-y border-glass">
      <Container>
        <MotionReveal direction="up" className="text-center mb-16 space-y-4">
          <p className="text-gold tracking-[0.3em] font-mono text-xs md:text-sm">[ DEMOGRAFI ]</p>
          <h2 className="section-title text-text-primary">Distribusi Angkatan</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Komposisi 71 calon lulusan berdasarkan tahun penerimaan mahasiswa.
          </p>
        </MotionReveal>

        <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-black-primary border border-glass shadow-2xl">
          <div className="space-y-6">
            {cohortStats.map((stat, idx) => {
              const widthPercentage = (stat.count / maxCount) * 100;
              return (
                <MotionReveal key={stat.year} direction="right" delay={idx * 0.1} className="relative">
                  <div className="flex items-center justify-between mb-2 font-mono text-sm">
                    <span className="text-text-primary tracking-widest">Angkatan {stat.year}</span>
                    <span className="text-gold">{stat.count} Mahasiswa</span>
                  </div>
                  <div className="w-full h-4 bg-black-soft rounded-full overflow-hidden border border-glass">
                    <div 
                      className="h-full bg-gold transition-all duration-1000 ease-out relative overflow-hidden"
                      style={{ width: `${widthPercentage}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                  </div>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
