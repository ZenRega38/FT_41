"use client";

import React from 'react';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/data/site';

export function Stats() {
  const stats = [
    { label: "Lulusan Yudisium", value: siteConfig.stats.participants },
    { label: "Program Studi", value: siteConfig.stats.programs },
    { label: "Fakultas Teknik", value: siteConfig.stats.faculties },
    { label: "Chapter", value: "41st" },
  ];

  return (
    <section className="py-16 md:py-24 bg-charcoal border-y border-border-gold relative">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center space-y-2 group">
              <span className="text-4xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-champagne to-gold transition-transform duration-500 group-hover:scale-110">
                {stat.value}
              </span>
              <span className="text-sm md:text-base text-text-muted uppercase tracking-wider font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
