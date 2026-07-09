"use client";

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';
import { Award, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAsset } from '@/lib/asset';
import Link from 'next/link';

interface Awardee {
  rank: number;
  name: string;
  slug: string;
  photo: string;
}

interface Category {
  id: string;
  label: string;
  sublabel: string;
  awardees: Awardee[];
}

const CATEGORIES: Category[] = [
  {
    id: 'fakultas',
    label: 'Fakultas Teknik',
    sublabel: 'Lulusan Terbaik Se-Fakultas',
    awardees: [
      { rank: 1, name: 'Dimas Satrio Wiranata, S.T.', slug: 'dimas-satrio-wiranata', photo: '/graduates/dimas-satrio-wiranata.webp' },
      { rank: 2, name: 'Agung Gunawan, S.T.',          slug: 'agung-gunawan',          photo: '/graduates/agung-gunawan.webp' },
      { rank: 3, name: 'Bisma Baghas Waluyo, S.T.',   slug: 'bisma-baghas-waluyo',   photo: '/graduates/bisma-baghas-waluyo.webp' },
    ],
  },
  {
    id: 'sipil',
    label: 'Teknik Sipil',
    sublabel: 'Lulusan Terbaik Program Studi',
    awardees: [
      { rank: 1, name: 'Nureni, S.T.',                  slug: 'nureni',                  photo: '/graduates/nureni.webp' },
      { rank: 2, name: 'Shendly Calistha Bulawan, S.T.', slug: 'shendly-calistha-bulawan', photo: '/graduates/shendly-calistha-bulawan.webp' },
      { rank: 3, name: 'Alya Rima Firdaus, S.T.',       slug: 'alya-rima-firdaus',       photo: '/graduates/alya-rima-firdaus.webp' },
    ],
  },
  {
    id: 'elektro',
    label: 'Teknik Elektro',
    sublabel: 'Lulusan Terbaik Program Studi',
    awardees: [
      { rank: 1, name: 'Randi Ramdansyah, S.T.',       slug: 'randi-ramdansyah',       photo: '/graduates/randi-ramdansyah.webp' },
      { rank: 2, name: 'Michael Yehezkiel Rattu, S.T.', slug: 'michael-yehezkiel-rattu', photo: '/graduates/michael-yehezkiel-rattu.webp' },
    ],
  },
  {
    id: 'komputer',
    label: 'Teknik Komputer',
    sublabel: 'Lulusan Terbaik Program Studi',
    awardees: [
      { rank: 1, name: 'Dimas Satrio Wiranata, S.T.', slug: 'dimas-satrio-wiranata', photo: '/graduates/dimas-satrio-wiranata.webp' },
      { rank: 2, name: 'Agung Gunawan, S.T.',          slug: 'agung-gunawan',          photo: '/graduates/agung-gunawan.webp' },
      { rank: 3, name: 'Bisma Baghas Waluyo, S.T.',   slug: 'bisma-baghas-waluyo',   photo: '/graduates/bisma-baghas-waluyo.webp' },
    ],
  },
];

const RANK_COLORS = ['text-gold', 'text-text-muted', 'text-[#cd7f32]'];
const RANK_LABELS = ['I', 'II', 'III'];

export function FeaturedGraduates() {
  const [activeId, setActiveId] = useState('fakultas');
  const active = CATEGORIES.find(c => c.id === activeId)!;

  return (
    <section className="py-32 bg-black-primary relative overflow-x-clip">
      {/* Cinematic spotlights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-champagne/5 rounded-full blur-[100px] pointer-events-none" />

      <Container>
        <MotionReveal direction="up" className="mb-12 space-y-4 text-center">
          <p className="text-gold tracking-[0.2em] uppercase text-xs md:text-sm font-semibold">Hall of Fame</p>
          <h2 className="section-title text-text-primary">Prestasi &amp; Dedikasi</h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Angkatan ke-41 telah menorehkan standar baru. Inilah representasi terbaik dari dedikasi dan kerja keras para mahasiswa.
          </p>
        </MotionReveal>

        {/* Category pill tabs */}
        <MotionReveal direction="up" delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveId(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-mono tracking-wide border transition-all duration-300 ${
                  activeId === cat.id
                    ? 'bg-gold text-black-primary border-gold font-bold shadow-[0_0_20px_rgba(212,175,55,0.35)]'
                    : 'bg-transparent text-text-muted border-white/15 hover:border-gold/50 hover:text-gold'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </MotionReveal>

        {/* Awardees */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-center text-text-muted font-mono text-xs tracking-widest uppercase mb-10">
              {active.sublabel}
            </p>

            <div className={`grid gap-6 max-w-5xl mx-auto ${
              active.awardees.length === 1 ? 'grid-cols-1 max-w-sm' :
              active.awardees.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl' :
              'grid-cols-1 sm:grid-cols-3'
            }`}>
              {active.awardees.map((awardee, i) => (
                <Link key={awardee.slug} href={`/peserta/${awardee.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`group relative bg-charcoal border rounded-3xl overflow-hidden flex flex-col cursor-pointer transition-all duration-500 hover:scale-[1.02] ${
                      i === 0 ? 'border-gold/40 shadow-[0_0_40px_rgba(212,175,55,0.1)]' : 'border-glass hover:border-gold/20'
                    }`}
                  >
                    {/* Photo */}
                    <div className="aspect-[3/4] relative bg-black-soft overflow-hidden">
                      {awardee.photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={getAsset(awardee.photo)}
                          alt={awardee.name}
                          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-[8rem] font-serif text-gold/10">
                          {awardee.name.charAt(0)}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />

                      {/* Rank badge */}
                      <div className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm border ${
                        i === 0 ? 'bg-gold text-black-primary border-gold' : 'bg-black-soft/80 backdrop-blur border-glass text-text-muted'
                      }`}>
                        {i === 0 ? <Star size={16} fill="currentColor" /> : RANK_LABELS[i]}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5 flex flex-col gap-1">
                      <div className={`flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase mb-1 ${RANK_COLORS[i]}`}>
                        <Award size={12} />
                        <span>Peringkat {RANK_LABELS[i]}</span>
                      </div>
                      <h3 className="font-serif text-text-primary text-base leading-snug group-hover:text-champagne transition-colors">
                        {awardee.name}
                      </h3>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
