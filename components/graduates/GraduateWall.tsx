"use client";

import React, { useState, useMemo } from 'react';
import { Container } from '@/components/ui/Container';
import { GraduateCard } from './GraduateCard';
import { GraduateModal } from './GraduateModal';
import { Participant } from '@/types/site';
import participantsData from '@/data/participants.json';
import { AnimatePresence, motion } from 'framer-motion';

export function GraduateWall() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('All');
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

  const participants: Participant[] = participantsData as Participant[];

  const filteredParticipants = useMemo(() => {
    return participants
      .filter((p) => p.displayConsent) // Ensure only approved ones are shown
      .filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'All' || p.programCode === filter;
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [search, filter, participants]);

  return (
    <section id="peserta" className="py-24 bg-black-soft min-h-screen">
      <Container>
        <div className="text-center mb-16 space-y-4">
          <h2 className="section-title text-text-primary">Lulusan</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Mengenal lebih dekat 71 calon lulusan Fakultas Teknik.
          </p>
        </div>

        {/* Filters and Search - To be extracted to GraduateFilters.tsx later */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
          <div className="flex gap-2 bg-charcoal p-1 rounded-lg border border-glass">
            {[
              { code: 'All', name: 'Semua Prodi' },
              { code: 'TE', name: 'Teknik Elektro' },
              { code: 'TM', name: 'Teknik Mesin' },
              { code: 'TS', name: 'Teknik Sipil' },
              { code: 'TK', name: 'Teknik Komputer' }
            ].map((prog) => (
              <button
                key={prog.code}
                onClick={() => setFilter(prog.code)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  filter === prog.code
                    ? 'bg-gold/20 text-gold border border-gold/30'
                    : 'text-text-muted hover:text-text-primary hover:bg-glass'
                }`}
              >
                {prog.name}
              </button>
            ))}
          </div>

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

        {/* Graduate Grid */}
        {filteredParticipants.length > 0 ? (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            <AnimatePresence>
              {filteredParticipants.map((participant, index) => (
                <GraduateCard
                  key={participant.id}
                  participant={participant}
                  onClick={setSelectedParticipant}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-charcoal rounded-xl border border-glass"
          >
            <p className="text-text-muted">Tidak ada peserta yang sesuai dengan pencarian.</p>
          </motion.div>
        )}

        <AnimatePresence>
          {selectedParticipant && (
            <GraduateModal 
              participant={selectedParticipant} 
              onClose={() => setSelectedParticipant(null)} 
            />
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
