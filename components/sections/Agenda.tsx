"use client";

import React, { useRef } from 'react';

export interface AgendaEvent {
  date: string;
  title: string;
  location: string;
  time: string;
  highlight?: boolean;
  googleDates: string;
  isoDate: string; // ISO date for past-check, e.g. "2026-07-07"
}

import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';
import { Calendar, MapPin, ExternalLink, CalendarPlus, ChevronLeft, ChevronRight } from 'lucide-react';

export function Agenda() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft  = () => scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left:  300, behavior: 'smooth' });

  const mapLink   = "https://www.google.com/maps/search/?api=1&query=Gedung+Rektorat+Universitas+Borneo+Tarakan";
  const fullVenue = "Gedung Rektorat, Lt. 4, Ruang Auditorium, Universitas Borneo Tarakan";

  const events: AgendaEvent[] = [
    {
      date: "Selasa, 7 Juli 2026",
      isoDate: "2026-07-07",
      title: "Kegiatan Bimbingan Karier",
      location: fullVenue,
      time: "08.00 AM – 14.00 WIB",
      googleDates: "20260707T003000Z/20260707T043000Z"
    },
    {
      date: "Rabu, 8 Juli 2026",
      isoDate: "2026-07-08",
      title: "Yudisium Ke-41",
      location: fullVenue,
      time: "08.30 WIB",
      highlight: true,
      googleDates: "20260708T003000Z/20260708T043000Z"
    },
    {
      date: "Rabu, 29 Juli 2026",
      isoDate: "2026-07-29",
      title: "Wisuda 43 UBT",
      location: fullVenue,
      time: "08.30 WIB",
      googleDates: "20260729T003000Z/20260729T043000Z"
    }
  ];

  const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
  const isPast = (isoDate: string) => isoDate < today;

  const generateCalendarLink = (event: AgendaEvent) => {
    const title    = encodeURIComponent(event.title + " | Fakultas Teknik UBT");
    const details  = encodeURIComponent("Rangkaian acara Yudisium Fakultas Teknik Universitas Borneo Tarakan.");
    const location = encodeURIComponent("Gedung Rektorat Universitas Borneo Tarakan");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${event.googleDates}&details=${details}&location=${location}`;
  };

  const cardClass = (highlight?: boolean, past?: boolean) =>
    `p-7 rounded-3xl border relative overflow-hidden transition-colors duration-500 group flex flex-col justify-between ${
      past
        ? 'bg-black-primary border-glass opacity-60 grayscale-[30%]'
        : highlight
          ? 'bg-charcoal border-gold/50 shadow-[0_0_40px_rgba(212,175,55,0.1)] hover:border-gold'
          : 'bg-black-primary border-glass hover:border-gold/30'
    }`;

  return (
    <section className="py-24 bg-black-soft relative">
      <Container>
        {/* Header */}
        <MotionReveal direction="up" className="text-center mb-12 space-y-4">
          <p className="text-gold tracking-[0.2em] uppercase text-xs md:text-sm font-semibold">Rangkaian Acara</p>
          <h2 className="section-title text-text-primary">Agenda Utama</h2>
        </MotionReveal>

        {/* ── DESKTOP ── */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {events.map((event, idx) => {
            const past = isPast(event.isoDate);
            return (
              <MotionReveal key={idx} delay={idx * 0.15} direction="up" className={cardClass(event.highlight, past)}>
                {past && <TerlaksanaStamp />}
                <EventCardInner event={event} mapLink={mapLink} calLink={generateCalendarLink(event)} past={past} />
              </MotionReveal>
            );
          })}
        </div>

        {/* ── MOBILE horizontal scroll ── */}
        <div className="md:hidden">
          <div className="flex justify-end gap-3 mb-4">
            <button onClick={scrollLeft} aria-label="Geser ke kiri"
              className="w-10 h-10 rounded-full border border-glass flex items-center justify-center text-text-muted hover:text-gold hover:border-gold/50 hover:bg-gold/10 transition-colors">
              <ChevronLeft size={18} />
            </button>
            <button onClick={scrollRight} aria-label="Geser ke kanan"
              className="w-10 h-10 rounded-full border border-glass flex items-center justify-center text-text-muted hover:text-gold hover:border-gold/50 hover:bg-gold/10 transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
          <div ref={scrollRef} className="flex overflow-x-auto overflow-y-hidden items-stretch gap-4 pb-4 snap-x snap-mandatory hide-scrollbar -mx-1 px-1">
            {events.map((event, idx) => {
              const past = isPast(event.isoDate);
              return (
                <MotionReveal key={idx} delay={idx * 0.1} direction="up"
                  className={`w-[85vw] max-w-[320px] snap-center shrink-0 ${cardClass(event.highlight, past)}`}>
                  {past && <TerlaksanaStamp />}
                  <EventCardInner event={event} mapLink={mapLink} calLink={generateCalendarLink(event)} past={past} />
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Red diagonal "[ TERLAKSANA ]" stamp overlay */
function TerlaksanaStamp() {
  return (
    <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-3xl">
      <div
        style={{ transform: 'rotate(-45deg) translate(-20%, 80%)' }}
        className="absolute top-0 left-0 right-0 flex items-center justify-center"
      >
        <span
          className="border-2 border-red-600/70 text-red-600/80 font-mono text-xs md:text-sm font-bold tracking-[0.3em] uppercase px-4 py-1 rounded"
          style={{ textShadow: '0 0 8px rgba(220,38,38,0.3)', letterSpacing: '0.25em' }}
        >
          [ TERLAKSANA ]
        </span>
      </div>
    </div>
  );
}

function EventCardInner({ event, mapLink, calLink, past }: { event: AgendaEvent; mapLink: string; calLink: string; past: boolean }) {
  return (
    <>
      {event.highlight && !past && (
        <div className="absolute top-0 right-0 w-56 h-56 bg-gold/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      )}
      <div className="relative z-10 space-y-6 flex-1">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-gold mb-2">
            <Calendar size={16} />
            <span className="font-mono text-xs tracking-wider uppercase">{event.date}</span>
          </div>
          <h3 className="text-xl md:text-2xl font-serif text-text-primary leading-tight group-hover:text-champagne transition-colors">
            {event.title}
          </h3>
        </div>
        <div className="space-y-3 pt-5 border-t border-glass">
          <div className="flex items-start gap-3">
            <MapPin size={15} className="text-text-muted mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-mono text-text-primary uppercase tracking-widest mb-1 opacity-50">Tempat</p>
              <a href={mapLink} target="_blank" rel="noopener noreferrer"
                className="text-text-muted hover:text-gold transition-colors flex items-start gap-1.5 group/link text-sm">
                <span className="group-hover/link:underline underline-offset-4 decoration-gold/50 break-words">{event.location}</span>
                <ExternalLink size={11} className="opacity-0 group-hover/link:opacity-100 transition-opacity shrink-0 mt-1" />
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted mt-0.5 shrink-0">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-mono text-text-primary uppercase tracking-widest mb-1 opacity-50">Waktu</p>
              <p className="text-text-muted text-sm break-words">{event.time}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 pt-6 mt-auto">
        <a href={calLink} target="_blank" rel="noopener noreferrer"
          className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-mono text-xs uppercase tracking-widest transition-all ${
            event.highlight && !past
              ? 'bg-gold text-black-primary hover:bg-champagne hover:scale-[1.02]'
              : 'bg-black-soft border border-glass text-gold hover:border-gold/50 hover:bg-gold/5'
          }`}>
          <CalendarPlus size={13} />
          <span>Tambahkan ke Kalender</span>
        </a>
      </div>
    </>
  );
}
