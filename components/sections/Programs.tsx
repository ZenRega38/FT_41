import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import programsData from '@/data/programs.json';
import { Program } from '@/types/site';
import { Cpu, Settings, Building2, CircuitBoard } from 'lucide-react';

const iconMap = {
  circuit: CircuitBoard,
  gear: Settings,
  bridge: Building2,
  chip: Cpu
};

export function Programs() {
  const programs: Program[] = programsData as Program[];

  return (
    <section id="prodi" className="py-24 bg-black-primary relative">
      <Container>
        <div className="text-center mb-16 space-y-4">
          <h2 className="section-title text-text-primary">Program Studi</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Empat pilar akademik Fakultas Teknik yang mendidik talenta unggul untuk masa depan.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program) => (
            <div 
              key={program.code}
              className="bg-black-soft border border-glass hover:border-gold/30 rounded-xl p-8 transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="w-12 h-12 rounded-full bg-charcoal border border-border-gold flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors">
                {(() => {
                  const Icon = iconMap[program.icon as keyof typeof iconMap] || Cpu;
                  return <Icon className="text-gold w-6 h-6" />;
                })()}
              </div>
              <h3 className="text-xl font-serif text-text-primary mb-3 group-hover:text-gold transition-colors font-mono tracking-tighter">
                [ {program.name.toUpperCase()} ]
              </h3>
              <p className="text-text-muted text-sm leading-relaxed mb-6">
                {program.description}
              </p>
              
              <div className="flex items-center justify-between mt-6 border-t border-glass pt-4">
                <Link href={`/?prodi=${program.code}#lulusan`} className="inline-flex items-center text-sm text-gold hover:text-champagne transition-colors group/btn">
                  Lihat Lulusan
                  <svg className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                
                {(program as any).website && (
                  <Link href={(program as any).website} target={(program as any).website.startsWith('http') ? '_blank' : '_self'} className="inline-flex items-center text-sm text-text-muted hover:text-white transition-colors group/btn">
                    Profil Prodi
                    <svg className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
