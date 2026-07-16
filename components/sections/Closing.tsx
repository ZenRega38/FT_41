import React from 'react';
import { Container } from '@/components/ui/Container';

export function Closing() {
  return (
    <section className="py-32 bg-black-primary relative overflow-x-clip flex items-center justify-center min-h-[60vh]" >
      <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
        <div className="w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] rounded-full bg-gold/5 blur-[120px]"></div>
      </div>
      
      <Container className="relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-text-primary leading-tight">
            Fondasi telah dipancangkan.<br />Rancang bangun telah diuji.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-champagne via-gold to-gold-muted">
              Kini saatnya membangun peradaban.
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-text-muted mt-8 mb-12 font-light">
            Selamat kepada 71 lulusan Yudisium Ke-41 Fakultas Teknik Universitas Borneo Tarakan.
          </p>
          
          <div className="pt-12">
            <a 
              href="#home" 
              className="inline-flex items-center justify-center px-8 py-3 border border-border-gold rounded-full text-gold hover:bg-gold/10 hover:text-champagne transition-all duration-300"
            >
              Kembali ke Atas
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
