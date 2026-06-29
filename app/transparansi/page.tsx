"use client";

import React from 'react';
import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';
import Link from 'next/link';
import { ArrowLeft, Calculator, FileText, PieChart } from 'lucide-react';

export default function TransparansiPage() {
  // Mock Data untuk Rencana Anggaran Biaya (RAB)
  const rabData = [
    { id: 1, uraian: "Sewa Gedung Rektorat Lt. 4", volume: 1, satuan: "Hari", hargaSatuan: 5000000 },
    { id: 2, uraian: "Konsumsi Peserta & Panitia", volume: 100, satuan: "Kotak", hargaSatuan: 35000 },
    { id: 3, uraian: "Snack Box VIP / Undangan", volume: 20, satuan: "Kotak", hargaSatuan: 25000 },
    { id: 4, uraian: "Cetak Buku Yudisium (Hardcover)", volume: 75, satuan: "Buku", hargaSatuan: 120000 },
    { id: 5, uraian: "Cetak Sertifikat Kelulusan", volume: 71, satuan: "Lembar", hargaSatuan: 15000 },
    { id: 6, uraian: "Pembuatan Gordon / Selempang", volume: 71, satuan: "Pcs", hargaSatuan: 45000 },
    { id: 7, uraian: "Jasa Dokumentasi (Foto & Video)", volume: 1, satuan: "Paket", hargaSatuan: 3500000 },
    { id: 8, uraian: "Dekorasi Panggung & Photobooth", volume: 1, satuan: "Paket", hargaSatuan: 2500000 },
    { id: 9, uraian: "Biaya Tak Terduga (Overhead)", volume: 1, satuan: "LS", hargaSatuan: 1500000 },
  ];

  const totalAnggaran = rabData.reduce((total, item) => total + (item.volume * item.hargaSatuan), 0);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  return (
    <main className="min-h-screen bg-black-primary text-text-primary pt-32 pb-24">
      {/* Background Effect */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-gold)_0%,_transparent_50%)] blur-[120px] opacity-[0.15]"></div>
        <div 
          className="absolute inset-0 opacity-10 mix-blend-overlay"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(197, 160, 89, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(197, 160, 89, 0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <Container className="relative z-10">
        <MotionReveal direction="down" className="mb-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-mono tracking-widest uppercase text-sm"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Beranda</span>
          </Link>
        </MotionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <MotionReveal direction="up" className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono font-bold tracking-widest uppercase mb-2">
              <PieChart size={14} />
              <span>Laporan Publik</span>
            </div>
            <h1 className="hero-title font-serif text-transparent bg-clip-text bg-gradient-to-r from-champagne via-gold to-gold-muted drop-shadow-sm pb-3">
              Transparansi Anggaran
            </h1>
            <p className="text-text-muted text-lg font-light max-w-xl leading-relaxed">
              Sebagai bentuk integritas dan tanggung jawab kepanitiaan, berikut adalah Rencana Anggaran Biaya (RAB) Yudisium Ke-41 Fakultas Teknik Universitas Borneo Tarakan.
            </p>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.2} className="lg:col-span-1">
            <div className="bg-charcoal border border-glass rounded-2xl p-8 flex flex-col justify-center h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Calculator size={100} />
              </div>
              <p className="text-sm font-mono text-gold uppercase tracking-widest mb-2">Estimasi Total Biaya</p>
              <p className="text-4xl md:text-5xl font-serif text-text-primary">{formatRupiah(totalAnggaran)}</p>
              <div className="mt-4 pt-4 border-t border-glass flex items-center justify-between text-xs font-mono text-text-muted">
                <span>Status: <span className="text-gold">Draft / Estimasi</span></span>
                <span>Mata Uang: IDR</span>
              </div>
            </div>
          </MotionReveal>
        </div>

        {/* Tabel RAB */}
        <MotionReveal direction="up" delay={0.4}>
          <div className="bg-charcoal border border-glass rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-glass flex items-center gap-3 bg-black-soft/50">
              <FileText className="text-gold" size={20} />
              <h2 className="font-serif text-xl">Rincian Anggaran (Mock Data)</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-glass bg-black-soft/30">
                    <th className="p-4 font-mono text-xs uppercase tracking-widest text-text-muted w-16 text-center">No</th>
                    <th className="p-4 font-mono text-xs uppercase tracking-widest text-text-muted min-w-[250px]">Uraian Kebutuhan</th>
                    <th className="p-4 font-mono text-xs uppercase tracking-widest text-text-muted text-right">Volume</th>
                    <th className="p-4 font-mono text-xs uppercase tracking-widest text-text-muted text-right">Harga Satuan</th>
                    <th className="p-4 font-mono text-xs uppercase tracking-widest text-text-muted text-right pr-6">Jumlah Harga</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-sm md:text-base">
                  {rabData.map((item, idx) => (
                    <tr 
                      key={item.id} 
                      className={`border-b border-glass/50 hover:bg-gold/5 transition-colors ${idx % 2 === 0 ? 'bg-transparent' : 'bg-black-soft/20'}`}
                    >
                      <td className="p-4 text-center font-mono text-text-muted">{idx + 1}</td>
                      <td className="p-4 font-medium text-text-primary">{item.uraian}</td>
                      <td className="p-4 text-right text-text-muted">
                        <span className="font-mono text-text-primary mr-1">{item.volume}</span>
                        <span className="text-xs">{item.satuan}</span>
                      </td>
                      <td className="p-4 text-right font-mono text-text-muted">{formatRupiah(item.hargaSatuan)}</td>
                      <td className="p-4 text-right font-mono font-medium text-text-primary pr-6">{formatRupiah(item.volume * item.hargaSatuan)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gold/10 border-t-2 border-gold/30">
                    <td colSpan={4} className="p-5 text-right font-serif text-lg text-gold font-bold">TOTAL ESTIMASI ANGGARAN:</td>
                    <td className="p-5 text-right font-mono font-bold text-xl text-gold pr-6">{formatRupiah(totalAnggaran)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <div className="p-4 bg-black-soft/80 border-t border-glass text-xs font-mono text-text-muted/60 text-center">
              Catatan: Data di atas hanyalah angka contoh (mock data) dan belum mewakili dokumen keuangan resmi kepanitiaan.
            </div>
          </div>
        </MotionReveal>
      </Container>
    </main>
  );
}
