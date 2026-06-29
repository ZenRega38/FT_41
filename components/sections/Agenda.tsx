/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from 'react';
import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';
import { Calendar, MapPin, ExternalLink, CalendarPlus } from 'lucide-react';

export function Agenda() {
  const mapLink = "https://www.google.com/maps/search/?api=1&query=Gedung+Rektorat+Universitas+Borneo+Tarakan";

  const events = [
    {
      date: "Selasa, 7 Juli 2026",
      title: "Kegiatan Bimbingan Karier",
      location: "Gedung Rektorat Lantai 4",
      time: "Menyusul",
      googleDates: "20260707/20260708"
    },
    {
      date: "Rabu, 8 Juli 2026",
      title: "Yudisium Ke-41",
      location: "Gedung Rektorat Lantai 4",
      time: "Menyusul",
      highlight: true,
      googleDates: "20260708/20260709"
    },
    {
      date: "Rabu, 29 Juli 2026",
      title: "Wisuda 43 UBT",
      location: "Gedung Rektorat Lantai 4",
      time: "Menyusul",
      googleDates: "20260729/20260730"
    }
  ];

  const generateCalendarLink = (event: any) => {
    const title = encodeURIComponent(event.title + " | Fakultas Teknik UBT");
    const details = encodeURIComponent("Rangkaian acara Yudisium Fakultas Teknik Universitas Borneo Tarakan.");
    const location = encodeURIComponent("Gedung Rektorat Universitas Borneo Tarakan");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${event.googleDates}&details=${details}&location=${location}`;
  };

  return (
    <section className="py-24 bg-black-soft relative overflow-x-clip" >
      <Container>
        <MotionReveal direction="up" className="text-center mb-16 space-y-4">
          <p className="text-gold tracking-[0.2em] uppercase text-xs md:text-sm font-semibold">Rangkaian Acara</p>
          <h2 className="section-title text-text-primary">Agenda Utama</h2>
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {events.map((event, idx) => (
            <MotionReveal 
              key={idx} 
              delay={idx * 0.2}
              direction="up"
              className={`p-8 rounded-3xl border relative overflow-hidden transition-colors duration-500 group flex flex-col justify-between ${
                event.highlight 
                  ? 'bg-charcoal border-gold/50 shadow-[0_0_40px_rgba(212,175,55,0.1)] hover:border-gold scale-105 z-10' 
                  : 'bg-black-primary border-glass hover:border-gold/30'
              }`}
            >
              {/* Highlight Glow */}
              {event.highlight && (
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
              )}

              <div className="relative z-10 space-y-8 flex-1">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-gold mb-2">
                    <Calendar size={18} />
                    <span className="font-mono text-sm tracking-wider uppercase">{event.date}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif text-text-primary leading-tight group-hover:text-champagne transition-colors">
                    {event.title}
                  </h3>
                </div>

                <div className="space-y-4 pt-6 border-t border-glass">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-text-muted mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-mono text-text-primary uppercase tracking-widest mb-1 opacity-50">Tempat</p>
                      <a 
                        href={mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-gold transition-colors inline-flex items-center gap-1 group/link"
                      >
                        <span className="group-hover/link:underline underline-offset-4 decoration-gold/50">{event.location}</span>
                        <ExternalLink size={12} className="opacity-0 group-hover/link:opacity-100 transition-opacity -translate-y-1 translate-x-1" />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted mt-0.5 shrink-0">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <div>
                      <p className="text-xs font-mono text-text-primary uppercase tracking-widest mb-1 opacity-50">Waktu</p>
                      <p className="text-text-muted">{event.time}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-8 mt-auto">
                <a 
                  href={generateCalendarLink(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-mono text-sm uppercase tracking-widest transition-all ${
                    event.highlight
                      ? 'bg-gold text-black-primary hover:bg-champagne hover:scale-[1.02]'
                      : 'bg-black-soft border border-glass text-gold hover:border-gold/50 hover:bg-gold/5'
                  }`}
                >
                  <CalendarPlus size={16} />
                  <span>[+] Tambahkan ke Kalender</span>
                </a>
              </div>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
