import type { Metadata } from 'next';
import { GraduateWall } from '@/components/graduates/GraduateWall';
import { LulusanHero } from '@/components/sections/LulusanHero';

export const metadata: Metadata = {
  title: 'Daftar Lulusan — Yudisium Ke-41 Fakultas Teknik UBT',
  description:
    'Kenali 71 lulusan Yudisium Ke-41 Fakultas Teknik Universitas Borneo Tarakan. Cari berdasarkan nama, filter per program studi, dan buka profil lengkap setiap lulusan.',
};

export default function LulusanPage() {
  return (
    <main className="bg-black-primary">
      {/*
       * Scroll space — gives the sticky hero room to animate before GraduateWall covers it.
       * Hero is sticky at top (100vh), total container is 200vh, so the user scrolls
       * 100vh while the hero stays put and its elements fade/shift on scroll.
       */}
      <div style={{ height: '200vh' }}>
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            zIndex: 5,
          }}
        >
          <LulusanHero />
        </div>
      </div>

      {/*
       * GraduateWall slides up over the hero.
       * marginTop: -100vh pulls it up so it starts at the bottom of the initial viewport,
       * then naturally scrolls upward to "cover" the sticky hero below.
       * Higher z-index ensures it sits on top of the hero as it rises.
       * NOTE: no overflow-hidden here — that would break sticky positioning inside GraduateWall.
       */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          marginTop: '-100vh',
        }}
        className="shadow-2xl shadow-black/60"
      >
        <GraduateWall hideSectionHeader />
      </div>
    </main>
  );
}
