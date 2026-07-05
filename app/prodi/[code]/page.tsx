import React from 'react';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import programsData from '@/data/programs.json';
import staffData from '@/data/staff.json';
import { ArrowLeft, BookOpen, Users, Cpu, Settings, Building2, CircuitBoard } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Program } from '@/types/site';
import { MotionReveal } from '@/components/ui/MotionReveal';

const iconMap = {
  circuit: CircuitBoard,
  gear: Settings,
  bridge: Building2,
  chip: Cpu
};

// Tell Next.js to pre-render these dynamic routes at build time
export function generateStaticParams() {
  return programsData.map((p) => ({
    code: p.code,
  }));
}

function ProfileCard({ name, role, image }: { name: string, role: string, image?: string }) {
  return (
    <div className="bg-charcoal border border-glass rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 hover:border-gold/30 transition-colors group">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-black-soft border border-glass flex-shrink-0 relative">
        {image ? (
          <Image src={image} alt={name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" sizes="96px" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-muted/30 text-3xl font-serif">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <div className="pt-2">
        <h4 className="font-serif text-lg md:text-xl text-text-primary group-hover:text-gold transition-colors">{name}</h4>
        <p className="text-sm md:text-base text-text-muted mt-1">{role}</p>
      </div>
    </div>
  );
}

export default async function ProdiDetailPage(props: { params: Promise<{ code: string }> }) {
  const params = await props.params;
  const program = (programsData as Program[]).find(p => p.code === params.code);
  
  if (!program) {
    notFound();
  }

  const staffDept = staffData.departments.find(d => d.name === program.name);
  const Icon = iconMap[program.icon as keyof typeof iconMap] || Cpu;

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
            href="/#prodi"
            className="inline-flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-mono tracking-widest uppercase text-sm"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Icon & Basic Info */}
          <div className="lg:col-span-4 space-y-6">
            <MotionReveal direction="up">
              <div className="aspect-square rounded-2xl overflow-hidden border border-glass bg-black-soft relative flex flex-col items-center justify-center p-8 text-center group">
                <div className="absolute inset-0 bg-gradient-to-t from-black-primary via-transparent to-transparent z-10"></div>
                <div className="w-24 h-24 rounded-full bg-charcoal border border-border-gold flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors relative z-20">
                  <Icon className="text-gold w-12 h-12" />
                </div>
                <h1 className="text-2xl font-serif text-text-primary relative z-20">{program.name}</h1>
                <p className="text-sm font-mono text-gold uppercase tracking-widest mt-2 relative z-20">Fakultas Teknik UBT</p>
              </div>
            </MotionReveal>
            
            <MotionReveal direction="up" delay={0.1}>
              <div className="p-6 rounded-2xl bg-charcoal border border-glass space-y-4">
                <Link href={`/?prodi=${program.code}#peserta`} className="w-full py-4 rounded-xl bg-gold text-black-primary font-semibold flex items-center justify-center gap-2 hover:bg-champagne transition-colors shadow-lg">
                  <Users size={18} />
                  <span>Lihat Lulusan Prodi Ini</span>
                </Link>
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: Deskripsi & Dosen */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Profil */}
            <MotionReveal direction="up">
              <div className="space-y-4">
                <h2 className="text-2xl font-serif flex items-center gap-3 border-b border-glass pb-4">
                  <BookOpen className="text-gold" size={24} />
                  Profil Program Studi
                </h2>
                <p className="text-text-muted leading-relaxed text-lg">
                  {program.description} 
                  <br /><br />
                  Berkomitmen untuk mencetak lulusan unggul yang mampu menjawab tantangan industri dan memberikan kontribusi nyata bagi pembangunan daerah perbatasan dan pesisir.
                </p>
              </div>
            </MotionReveal>

            {/* Pimpinan & Dosen */}
            {staffDept && (
              <div className="space-y-8 pt-8">
                <MotionReveal direction="up">
                  <h2 className="text-2xl font-serif flex items-center gap-3 border-b border-glass pb-4">
                    <Users className="text-gold" size={24} />
                    Jajaran Akademik
                  </h2>
                </MotionReveal>
                
                <div className="space-y-6">
                  {/* Kaprodi */}
                  <MotionReveal direction="up" delay={0.1}>
                    <ProfileCard name={staffDept.head.name} role={staffDept.head.role} image={staffDept.head.image} />
                  </MotionReveal>
                  
                  {/* Lecturers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {staffDept.lecturers.map((lec, idx) => (
                      <MotionReveal key={lec.id} direction="up" delay={0.2 + (idx * 0.1)}>
                        <ProfileCard name={lec.name} role={lec.role} image={lec.image} />
                      </MotionReveal>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </Container>
    </main>
  );
}
