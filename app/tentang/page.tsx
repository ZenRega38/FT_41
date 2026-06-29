import React from 'react';
import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';
import staffData from '@/data/staff.json';
import { Building2, GraduationCap, Users, Bookmark } from 'lucide-react';

export const metadata = {
  title: 'Tentang | Yudisium Ke-41 Fakultas Teknik UBT',
  description: 'Profil pimpinan universitas, pimpinan fakultas, program studi, dan panitia Yudisium Ke-41 Fakultas Teknik UBT.',
};

function ProfileCard({ name, role, image }: { name: string, role: string, image?: string }) {
  return (
    <div className="bg-charcoal border border-glass rounded-2xl p-6 flex items-center gap-6 hover:border-gold/30 transition-colors group">
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-black-soft border border-glass flex-shrink-0 relative">
        {image ? (
           // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-muted/30 text-2xl font-serif">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <div>
        <h4 className="font-serif text-lg md:text-xl text-text-primary group-hover:text-gold transition-colors">{name}</h4>
        <p className="text-sm md:text-base text-text-muted mt-1">{role}</p>
      </div>
    </div>
  );
}

export default function TentangPage() {
  return (
    <main className="min-h-screen bg-black-primary text-text-primary pt-32 pb-24">
      {/* Hero Background — Gedung Rektorat UBT */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] pointer-events-none overflow-hidden">
        {/* Building photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://www.ubt.ac.id/wp-content/uploads/Rektorat-scaled-e1580889029273.jpg"
          alt="Gedung Rektorat Universitas Borneo Tarakan"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark gradient overlay so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black-primary/70 via-black-primary/50 to-black-primary" />
        {/* Subtle gold glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-gold)_0%,_transparent_70%)] opacity-[0.08]" />
        {/* Noise texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay" />
      </div>

      <Container className="relative z-10 space-y-32">
        {/* Header */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <MotionReveal direction="up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
              Di Balik <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-champagne">Layar</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mt-6 leading-relaxed drop-shadow-md">
              Mengenal jajaran pimpinan dan tokoh-tokoh penting di balik layar kesuksesan para lulusan Yudisium Ke-41 Fakultas Teknik Universitas Borneo Tarakan.
            </p>
          </MotionReveal>
        </section>

        {/* Pimpinan Universitas */}
        <section>
          <MotionReveal direction="up">
            <div className="flex items-center gap-4 mb-10 border-b border-glass pb-4">
              <Building2 className="text-gold" size={28} />
              <h2 className="text-2xl md:text-3xl font-serif">Pimpinan Universitas</h2>
            </div>
          </MotionReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {staffData.university.map((staff, idx) => (
              <MotionReveal key={staff.id} direction="up" delay={idx * 0.1}>
                <ProfileCard name={staff.name} role={staff.role} image={staff.image} />
              </MotionReveal>
            ))}
          </div>
        </section>

        {/* Pimpinan Fakultas */}
        <section>
          <MotionReveal direction="up">
            <div className="flex items-center gap-4 mb-10 border-b border-glass pb-4">
              <GraduationCap className="text-gold" size={28} />
              <h2 className="text-2xl md:text-3xl font-serif">Pimpinan Fakultas Teknik</h2>
            </div>
          </MotionReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staffData.faculty.map((staff, idx) => (
              <MotionReveal key={staff.id} direction="up" delay={idx * 0.1}>
                <ProfileCard name={staff.name} role={staff.role} image={staff.image} />
              </MotionReveal>
            ))}
          </div>
        </section>

        {/* Program Studi */}
        <section>
          <MotionReveal direction="up">
            <div className="flex items-center gap-4 mb-10 border-b border-glass pb-4">
              <Bookmark className="text-gold" size={28} />
              <h2 className="text-2xl md:text-3xl font-serif">Program Studi</h2>
            </div>
          </MotionReveal>
          
          <div className="space-y-16">
            {staffData.departments.map((dept, idx) => (
              <div key={idx} className="bg-black-soft border border-glass rounded-3xl p-8 md:p-10">
                <MotionReveal direction="up">
                  <h3 className="text-xl md:text-2xl font-serif text-gold mb-8">{dept.name}</h3>
                </MotionReveal>
                
                <div className="space-y-8">
                  {/* Kaprodi */}
                  <MotionReveal direction="up" delay={0.1}>
                    <ProfileCard name={dept.head.name} role={dept.head.role} image={dept.head.image} />
                  </MotionReveal>
                  
                  {/* Dosen */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {dept.lecturers.map((lec, lIdx) => (
                      <MotionReveal key={lec.id} direction="up" delay={0.2 + (lIdx * 0.1)}>
                        <ProfileCard name={lec.name} role={lec.role} image={lec.image} />
                      </MotionReveal>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Panitia */}
        <section>
          <MotionReveal direction="up">
            <div className="flex items-center gap-4 mb-10 border-b border-glass pb-4">
              <Users className="text-gold" size={28} />
              <h2 className="text-2xl md:text-3xl font-serif">Panitia Yudisium Ke-41</h2>
            </div>
          </MotionReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staffData.committee.map((staff, idx) => (
              <MotionReveal key={staff.id} direction="up" delay={idx * 0.1}>
                <ProfileCard name={staff.name} role={staff.role} image={staff.image} />
              </MotionReveal>
            ))}
          </div>
        </section>

      </Container>
    </main>
  );
}
