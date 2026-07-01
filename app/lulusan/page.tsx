import type { Metadata } from 'next';
import { GraduateWall } from '@/components/graduates/GraduateWall';

export const metadata: Metadata = {
  title: 'Daftar Lulusan — Yudisium Ke-41 Fakultas Teknik UBT',
  description:
    'Kenali 71 lulusan Yudisium Ke-41 Fakultas Teknik Universitas Borneo Tarakan. Cari berdasarkan nama, filter per program studi, dan buka profil lengkap setiap lulusan.',
};

export default function LulusanPage() {
  return (
    <main className="min-h-screen bg-black-primary">
      {/* Hero */}
      <section className="relative pt-32 pb-16 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Glow spotlights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gold/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-champagne/4 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 space-y-4 px-6">
          <p className="text-gold tracking-[0.25em] uppercase text-xs md:text-sm font-semibold">
            Yudisium Ke-41 · Fakultas Teknik UBT
          </p>
          <h1 className="hero-title text-text-primary leading-none">
            Daftar{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-champagne to-gold">
              Lulusan
            </span>
          </h1>
          <p className="text-text-muted max-w-xl mx-auto text-base md:text-lg">
            71 calon lulusan dari 4 program studi. Gunakan pencarian dan filter
            untuk menemukan nama yang Anda cari.
          </p>
        </div>

        {/* Thin gold divider */}
        <div className="relative z-10 mt-12 w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      </section>

      {/* Graduate Wall — same component as homepage, with all features */}
      <GraduateWall hideSectionHeader />
    </main>
  );
}
