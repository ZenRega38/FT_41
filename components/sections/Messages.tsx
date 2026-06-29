import React from 'react';
import { Container } from '@/components/ui/Container';

export function Messages() {
  const messages = [
    {
      author: "Dr. Syahfrizal Tachfulloh, S.T., M.T.",
      role: "Dekan Fakultas Teknik",
      body: "Lulusan Fakultas Teknik Universitas Borneo Tarakan diharapkan tidak hanya menjadi insinyur yang handal secara teknis, tetapi juga memiliki integritas dan kepedulian terhadap pengembangan kawasan perbatasan dan pesisir. Jadilah pelita di mana pun kalian berkarya."
    },
    {
      author: "Ir. Rosmalia Handayani, S.T., M.T.",
      role: "Wakil Dekan Bidang Akademik",
      body: "Sebuah perjalanan akademik yang penuh dengan tantangan telah berhasil kalian lewati. Hari ini bukan garis akhir, melainkan titik awal untuk memberikan dampak nyata bagi masyarakat."
    }
  ];

  return (
    <section className="py-24 bg-black-soft relative">
      <Container>
        <div className="text-center mb-16 space-y-4">
          <h2 className="section-title text-text-primary">Pesan</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Harapan dan doa untuk babak baru.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {messages.map((msg, idx) => (
            <div key={idx} className="bg-charcoal border border-glass p-8 md:p-10 rounded-2xl relative group">
              <span className="absolute top-6 left-6 text-6xl text-gold/20 font-serif leading-none select-none">&quot;</span>
              
              <div className="relative z-10 space-y-6 pt-4">
                <p className="text-lg text-text-primary leading-relaxed font-serif italic">
                  {msg.body}
                </p>
                
                <div className="border-t border-border-gold/30 pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gold">{msg.author}</h4>
                    <p className="text-sm text-text-muted">{msg.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
