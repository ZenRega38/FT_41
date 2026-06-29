/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { notFound } from 'next/navigation';
import participantsData from '@/data/participants.json';
import { Container } from '@/components/ui/Container';
import { ArrowLeft, BookOpen, GraduationCap, Link as LinkIcon, Camera, Code } from 'lucide-react';
import Link from 'next/link';

// Tell Next.js to pre-render these dynamic routes at build time
export function generateStaticParams() {
  return participantsData.map((p) => ({
    slug: p.slug,
  }));
}

export default async function PesertaDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const participant = participantsData.find(p => p.slug === params.slug);

  if (!participant) {
    notFound();
  }

  // Fallback dummy data for missing properties
  const bio = (participant as any).bio || `Halo, saya ${participant.name.split(',')[0]}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Berkomitmen untuk mengaplikasikan ilmu keteknikan dalam membangun peradaban dan memajukan kawasan pesisir laut tropis.`;
  const projects = (participant as any).projects || [
    { title: `Tugas Akhir ${participant.name.split(',')[0]}`, desc: "Penelitian akhir yang berfokus pada optimasi sistem di wilayah perbatasan Kalimantan Utara. Lorem ipsum dolor sit amet." },
    { title: "Proyek Kolaboratif Fakultas", desc: "Pengembangan infrastruktur cerdas berbasi IoT dan desain berkelanjutan." }
  ];

  return (
    <main className="min-h-screen bg-black-primary text-text-primary pt-24 pb-24">
      {/* Hero Background */}
      <div className="absolute top-0 left-0 right-0 h-[40vh] bg-charcoal border-b border-glass pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-gold)_0%,_transparent_60%)] blur-[120px] opacity-10"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay"></div>
      </div>

      <Container className="relative z-10">
        <div className="mb-12 pt-8">
          <Link 
            href="/#peserta"
            className="inline-flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-mono tracking-widest uppercase text-sm"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Daftar</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Photo & Basic Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-glass bg-black-soft relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black-primary via-transparent to-transparent z-10"></div>
              {/* Photo placeholder until images are added */}
              <div className="absolute inset-0 flex items-center justify-center text-text-muted/20 z-0">
                 FOTO FORMAL
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-charcoal border border-glass space-y-4">
              <div>
                <p className="text-xs font-mono text-gold uppercase tracking-widest mb-1">Program Studi</p>
                <p className="font-semibold text-lg">{participant.program}</p>
              </div>
              
              <div className="pt-4 border-t border-glass">
                <p className="text-xs font-mono text-gold uppercase tracking-widest mb-1">NPM / NIM</p>
                <p className="font-mono text-text-muted">{participant.nim || "Dirahasiakan"}</p>
              </div>
              
              <div className="pt-4 border-t border-glass">
                <p className="text-xs font-mono text-gold uppercase tracking-widest mb-1">Status Kelulusan</p>
                <p className="text-text-muted">Yudisium Ke-41 (Juli 2026)</p>
              </div>
            </div>
          </div>

          {/* Right Column: CV, Projects, Socials */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text-primary leading-tight mb-4 drop-shadow-sm">
                {participant.name}
              </h1>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 text-gold text-sm font-medium">
                <GraduationCap size={16} />
                <span>Calon Insinyur</span>
              </div>
            </div>

            {/* Riwayat Hidup */}
            <div className="space-y-4">
              <h2 className="text-2xl font-serif flex items-center gap-3 border-b border-glass pb-4">
                <BookOpen className="text-gold" size={24} />
                Riwayat Hidup
              </h2>
              <p className="text-text-muted leading-relaxed text-lg">
                {bio}
              </p>
            </div>

            {/* Proyek & Publikasi */}
            <div className="space-y-6">
              <h2 className="text-2xl font-serif flex items-center gap-3 border-b border-glass pb-4">
                <Code className="text-gold" size={24} />
                Proyek & Publikasi Akhir
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj: any, idx: number) => (
                  <div key={idx} className="p-6 rounded-xl bg-charcoal border border-glass hover:border-gold/30 transition-colors">
                    <h3 className="font-semibold text-text-primary mb-2">{proj.title}</h3>
                    <p className="text-sm text-text-muted">{proj.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4 pt-8 border-t border-glass">
              <h2 className="text-sm font-mono text-text-muted uppercase tracking-widest mb-4">
                Terhubung dengan {participant.name.split(',')[0]}
              </h2>
              
              <div className="flex flex-wrap gap-4">
                {(participant as any).linkedin ? (
                  <a href={(participant as any).linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-lg bg-charcoal border border-glass hover:border-gold hover:text-gold transition-colors">
                    <LinkIcon size={18} />
                    <span>LinkedIn Profile</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-2 px-5 py-3 rounded-lg bg-charcoal border border-glass opacity-50 cursor-not-allowed text-text-muted">
                    <LinkIcon size={18} />
                    <span>LinkedIn (Belum Ditambahkan)</span>
                  </div>
                )}
                
                {(participant as any).instagram ? (
                  <a href={(participant as any).instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-lg bg-charcoal border border-glass hover:border-gold hover:text-gold transition-colors">
                    <Camera size={18} />
                    <span>Instagram</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-2 px-5 py-3 rounded-lg bg-charcoal border border-glass opacity-50 cursor-not-allowed text-text-muted">
                    <Camera size={18} />
                    <span>Instagram (Belum Ditambahkan)</span>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </Container>
    </main>
  );
}
