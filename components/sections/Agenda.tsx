"use client";

import React from 'react';
import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';
import { Calendar, MapPin } from 'lucide-react';

export function Agenda() {
  const events = [
    {
      date: "Selasa, 7 Juli 2026",
      title: "Kegiatan Bimbingan Karier",
      location: "Gedung Rektorat Lantai 4",
      time: "Menyusul"
    },
    {
      date: "Rabu, 8 Juli 2026",
      title: "Yudisium Ke-41",
      location: "Gedung Rektorat Lantai 4",
      time: "Menyusul",
      highlight: true
    }
  ];

  return (
    <section className="py-24 bg-black-soft relative overflow-x-clip" >
      <Container>
        <MotionReveal direction="up" className="text-center mb-16 space-y-4">
          <p className="text-gold tracking-[0.2em] uppercase text-xs md:text-sm font-semibold">Rangkaian Acara</p>
          <h2 className="section-title text-text-primary">Agenda Utama</h2>
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {events.map((event, idx) => (
            <MotionReveal 
              key={idx} 
              delay={idx * 0.2}
              direction="up"
              className={`p-8 md:p-10 rounded-3xl border relative overflow-hidden transition-colors duration-500 group ${
                event.highlight 
                  ? 'bg-charcoal border-gold/50 shadow-[0_0_40px_rgba(212,175,55,0.1)] hover:border-gold' 
                  : 'bg-black-primary border-glass hover:border-gold/30'
              }`}
            >
              {/* Highlight Glow */}
              {event.highlight && (
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
              )}

              <div className="relative z-10 space-y-8">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-gold mb-2">
                    <Calendar size={18} />
                    <span className="font-mono text-sm tracking-wider uppercase">{event.date}</span>
                  </div>
                  <h3 className="text-3xl font-serif text-text-primary leading-tight group-hover:text-champagne transition-colors">
                    {event.title}
                  </h3>
                </div>

                <div className="space-y-4 pt-6 border-t border-glass">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-text-muted mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-text-primary uppercase tracking-widest mb-1">Tempat</p>
                      <p className="text-text-muted">{event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted mt-0.5">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-text-primary uppercase tracking-widest mb-1">Waktu</p>
                      <p className="text-text-muted">{event.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
