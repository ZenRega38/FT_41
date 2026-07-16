import React from 'react';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/data/site';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-black-primary py-12 md:py-16 border-t border-border-gold">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Identity */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="inline-block" aria-label="Beranda">
              <div className="text-2xl font-serif text-text-primary">
                FT<span className="text-gold">41</span>
              </div>
            </Link>
            <p className="text-text-muted text-sm max-w-sm leading-relaxed">
              Yudisium Ke-41 Fakultas Teknik.<br />
              {siteConfig.institution.name}.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-5">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Navigasi</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-text-muted hover:text-champagne hover:translate-x-1 inline-block transition-all">Beranda</Link></li>
              <li><Link href="/tentang" className="text-sm text-text-muted hover:text-champagne hover:translate-x-1 inline-block transition-all">Tentang</Link></li>
              <li><Link href="/#prodi" className="text-sm text-text-muted hover:text-champagne hover:translate-x-1 inline-block transition-all">Program Studi</Link></li>
              <li><Link href="/lulusan" className="text-sm text-text-muted hover:text-champagne hover:translate-x-1 inline-block transition-all">Lulusan</Link></li>
              <li><Link href="/galeri" className="text-sm text-text-muted hover:text-champagne hover:translate-x-1 inline-block transition-all">Galeri</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">Alamat</h4>
              <address className="text-sm text-text-muted not-italic leading-relaxed">
                {siteConfig.institution.address}
              </address>
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">Pengembang</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/lulusan/rega-rizkan-azizan" className="text-sm text-text-muted hover:text-champagne hover:translate-x-1 inline-block transition-all">
                    Tentang Pengembang
                  </Link>
                </li>
                <li>
                  <a href="https://zenrega38.github.io/rega/" target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted hover:text-champagne hover:translate-x-1 inline-block transition-all">
                    Website Pribadi Pengembang
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-glass flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <p>&copy; {new Date().getFullYear()} {siteConfig.institution.faculty} {siteConfig.institution.name}. All rights reserved.</p>
          <p>Data lulusan berdasarkan dokumen resmi panitia yudisium.</p>
        </div>
      </Container>
    </footer>
  );
}
