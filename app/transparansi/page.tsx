"use client";

import React from 'react';
import { Container } from '@/components/ui/Container';
import { MotionReveal } from '@/components/ui/MotionReveal';
import { TransparansiPopup } from '@/components/ui/TransparansiPopup';
import { Calculator, FileText, PieChart } from 'lucide-react';

export default function TransparansiPage() {
  const rabData = [
    { id: 1,  tanggal: "Senin, 29 Juni 2026", uraian: "Dasi", volume: 71, satuan: "pcs", hargaSatuan: 20000 },
    { id: 2,  tanggal: "Selasa, 30 Juni 2026", uraian: "Jilbab Paris Varisha di Naytacare", volume: 11, satuan: "pcs", hargaSatuan: 18000 },
    { id: 3,  tanggal: "Selasa, 30 Juni 2026", uraian: "Jilbab Paris Jadul di Givit", volume: 2, satuan: "pcs", hargaSatuan: 25000 },
    { id: 4,  tanggal: "Rabu, 01 Juli 2026", uraian: "Pin Ukuran 4,4 cm", volume: 71, satuan: "pcs", hargaSatuan: 4500 },
    { id: 5,  tanggal: "Rabu, 01 Juli 2026", uraian: "Ganci Akrilik 4,4 cm", volume: 71, satuan: "pcs", hargaSatuan: 6000 },
    { id: 6,  tanggal: "Rabu, 01 Juli 2026", uraian: "Plakat Akrilik A6 3 mm", volume: 71, satuan: "pcs", hargaSatuan: 48000 },
    { id: 7,  tanggal: "Rabu, 01 Juli 2026", uraian: "JD Plakat Starprint", volume: 1, satuan: "", hargaSatuan: 20000 },
    { id: 8,  tanggal: "Jumat, 03 Juli 2026", uraian: "Banner", volume: 12.5, satuan: "m", hargaSatuan: 30000 },
    { id: 9,  tanggal: "Jumat, 03 Juli 2026", uraian: "Pilox", volume: 1, satuan: "", hargaSatuan: 100000 },
    { id: 10, tanggal: "Sabtu, 04 Juli 2026", uraian: "Konsumsi Padus Selama Latihan", volume: 1, satuan: "", hargaSatuan: 100000 },
    { id: 11, tanggal: "Senin, 06 Juli 2026", uraian: "BEM", volume: 1, satuan: "", hargaSatuan: 3587500 },
    { id: 12, tanggal: "-", uraian: "Snack box Bimbingan Karir 07 Juli", volume: 80, satuan: "kotak", hargaSatuan: 15000 },
    { id: 13, tanggal: "-", uraian: "Snack box Yudisium 08 Juli", volume: 171, satuan: "kotak", hargaSatuan: 15000 },
    { id: 14, tanggal: "-", uraian: "Nasi Kotak 08 Juli", volume: 100, satuan: "kotak", hargaSatuan: 30000 },
    { id: 15, tanggal: "Selasa, 07 Juli 2026", uraian: "Selempang", volume: 14, satuan: "", hargaSatuan: 150000 },
    { id: 16, tanggal: "Selasa, 07 Juli 2026", uraian: "Penari", volume: 3, satuan: "orang", hargaSatuan: 150000 },
    { id: 17, tanggal: "Selasa, 07 Juli 2026", uraian: "Sound System", volume: 1, satuan: "", hargaSatuan: 1500000 },
    { id: 18, tanggal: "Selasa, 07 Juli 2026", uraian: "Fotografer", volume: 1, satuan: "", hargaSatuan: 5300000 },
    { id: 19, tanggal: "Selasa, 07 Juli 2026", uraian: "Jilbab Paris Jadul di Givit", volume: 1, satuan: "pcs", hargaSatuan: 25000 },
    { id: 20, tanggal: "Selasa, 07 Juli 2026", uraian: "Konsumsi yang Bangun Gapura", volume: 1, satuan: "", hargaSatuan: 350000 },
    { id: 21, tanggal: "Selasa, 07 Juli 2026", uraian: "Cleo Botol Kecil untuk Senat", volume: 1, satuan: "dus", hargaSatuan: 40000 },
  ];

  const totalAnggaran = rabData.reduce((total, item) => total + (item.volume * item.hargaSatuan), 0);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  return (
    <main className="min-h-screen bg-black-primary text-text-primary pt-32 pb-24">
      <TransparansiPopup />
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <MotionReveal direction="up" className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono font-bold tracking-widest uppercase mb-2">
              <PieChart size={14} />
              <span>Laporan Publik Resmi</span>
            </div>
            <h1 className="hero-title font-serif text-transparent bg-clip-text bg-gradient-to-r from-champagne via-gold to-gold-muted drop-shadow-sm pb-3">
              Transparansi Anggaran
            </h1>
            <p className="text-text-muted text-lg font-light max-w-xl leading-relaxed">
              Sebagai bentuk integritas dan tanggung jawab kepanitiaan, berikut adalah Laporan Pengeluaran Keuangan resmi Kegiatan Yudisium Ke-41 Fakultas Teknik Universitas Borneo Tarakan.
            </p>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.2} className="lg:col-span-1">
            <div className="bg-charcoal border border-glass rounded-2xl p-8 flex flex-col justify-center h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Calculator size={100} />
              </div>
              <p className="text-sm font-mono text-gold uppercase tracking-widest mb-2">Total Pengeluaran</p>
              <p className="text-4xl md:text-5xl font-serif text-text-primary">{formatRupiah(totalAnggaran)}</p>
              <div className="mt-4 pt-4 border-t border-glass flex items-center justify-between text-xs font-mono text-text-muted">
                <span>Status: <span className="text-gold">Resmi</span></span>
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
              <h2 className="font-serif text-xl">Laporan Pengeluaran Keuangan</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-glass bg-black-soft/30">
                    <th className="p-4 font-mono text-xs uppercase tracking-widest text-text-muted w-16 text-center">No</th>
                    <th className="p-4 font-mono text-xs uppercase tracking-widest text-text-muted min-w-[200px]">Hari &amp; Tanggal</th>
                    <th className="p-4 font-mono text-xs uppercase tracking-widest text-text-muted min-w-[250px]">Uraian</th>
                    <th className="p-4 font-mono text-xs uppercase tracking-widest text-text-muted text-right">Jumlah</th>
                    <th className="p-4 font-mono text-xs uppercase tracking-widest text-text-muted text-center">Satuan</th>
                    <th className="p-4 font-mono text-xs uppercase tracking-widest text-text-muted text-right">Harga Satuan</th>
                    <th className="p-4 font-mono text-xs uppercase tracking-widest text-text-muted text-right pr-6">Total</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-sm md:text-base">
                  {rabData.map((item, idx) => (
                    <tr 
                      key={item.id} 
                      className={`border-b border-glass/50 hover:bg-gold/5 transition-colors ${idx % 2 === 0 ? 'bg-transparent' : 'bg-black-soft/20'}`}
                    >
                      <td className="p-4 text-center font-mono text-text-muted">{idx + 1}</td>
                      <td className="p-4 text-text-muted whitespace-nowrap">{item.tanggal}</td>
                      <td className="p-4 font-medium text-text-primary">{item.uraian}</td>
                      <td className="p-4 text-right text-text-muted">
                        <span className="font-mono text-text-primary mr-1">{item.volume}</span>
                      </td>
                      <td className="p-4 text-center text-text-muted text-xs">{item.satuan}</td>
                      <td className="p-4 text-right font-mono text-text-muted">{formatRupiah(item.hargaSatuan)}</td>
                      <td className="p-4 text-right font-mono font-medium text-text-primary pr-6">{formatRupiah(item.volume * item.hargaSatuan)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gold/10 border-t-2 border-gold/30">
                    <td colSpan={6} className="p-5 text-right font-serif text-lg text-gold font-bold">TOTAL PENGELUARAN:</td>
                    <td className="p-5 text-right font-mono font-bold text-xl text-gold pr-6">{formatRupiah(totalAnggaran)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <div className="p-4 bg-black-soft/80 border-t border-glass text-xs font-mono text-text-muted/60 text-center">
              Laporan ini adalah laporan resmi dari panitia, namun dapat berubah sewaktu-waktu jika terdapat penyesuaian atau perbaikan kesalahan input.
            </div>
          </div>
        </MotionReveal>
      </Container>
    </main>
  );
}
