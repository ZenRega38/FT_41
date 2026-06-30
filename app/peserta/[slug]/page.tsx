/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { notFound } from 'next/navigation';
import participantsData from '@/data/participants.json';
import { fetchStudentDetails } from '@/lib/sheets';
import { Container } from '@/components/ui/Container';
import { ArrowLeft, BookOpen, GraduationCap, Link as LinkIcon, Camera, Code, Users, Briefcase } from 'lucide-react';
import Link from 'next/link';

const LinkedinIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// Tell Next.js to pre-render these dynamic routes at build time
export function generateStaticParams() {
  return participantsData.map((p) => ({
    slug: p.slug,
  }));
}

export default async function PesertaDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const participant = participantsData.find(p => p.slug === params.slug);

  if (!participant) {
    notFound();
  }

  const sheetData = participant.nim ? await fetchStudentDetails(participant.nim) : null;

  // Fallback dummy data for missing properties
  const bio = sheetData ? sheetData.bio : (participant as any).bio || "[N/A]";
  const projects = sheetData ? sheetData.projects : (participant as any).projects || [
    { title: "[N/A]", desc: "[N/A]" }
  ];
  const organizations = sheetData ? sheetData.organizations : (participant as any).organizations || [
    { name: "[N/A]", role: "[N/A]", period: "[N/A]" }
  ];
  const internships = sheetData ? sheetData.internships : (participant as any).internships || [
    { company: "[N/A]", role: "[N/A]", period: "[N/A]" }
  ];
  const scholarships = sheetData ? sheetData.scholarships : (participant as any).scholarships || ["[N/A]"];
  const awards = sheetData ? sheetData.awards : (participant as any).awards || ["[N/A]"];
  const publications = sheetData ? sheetData.publications : (participant as any).publications || [{ title: "[N/A]", url: "#" }];
  const job = sheetData ? sheetData.job : (participant as any).job || { company: "[N/A]", role: "[N/A]", date: "[N/A]" };
  const linkedinUrl = sheetData?.linkedin || (participant as any).linkedin;
  const instagramUrl = sheetData?.instagram || (participant as any).instagram;
  const ipk = sheetData?.ipk || (participant as any).gpa || "[N/A]";
  const motto = sheetData?.motto || (participant as any).quote || "[N/A]";

  return (
    <main className="min-h-screen bg-black-primary text-text-primary pt-24 pb-24">
      {/* Hero Background */}
      <div className="absolute top-0 left-0 right-0 h-[40vh] bg-charcoal border-b border-glass pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-gold)_0%,_transparent_60%)] blur-[120px] opacity-10"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay"></div>
      </div>

      <Container className="relative z-10">
        <div className="mb-12 pt-8">
          <Link 
            href="/#peserta"
            className="inline-flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-mono tracking-widest uppercase text-sm"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Daftar</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Photo & Basic Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-glass bg-black-soft relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black-primary via-transparent to-transparent z-10"></div>
              {participant.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={participant.photo} alt={participant.name} className="w-full h-full object-cover object-top relative z-0" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-text-muted/30 z-0">
                  <Camera size={48} className="mb-4 opacity-50" />
                  <span className="font-mono text-sm tracking-widest uppercase">Coming Soon</span>
                </div>
              )}
            </div>

            <div className="p-6 rounded-2xl bg-charcoal border border-glass space-y-4">
              <div>
                <p className="text-xs font-mono text-gold uppercase tracking-widest mb-1">Program Studi</p>
                <p className="font-semibold text-lg">{participant.program}</p>
              </div>
              
              <div className="pt-4 border-t border-glass">
                <p className="text-xs font-mono text-gold uppercase tracking-widest mb-1">NPM / NIM</p>
                <p className="font-mono text-text-muted">{participant.nim || "Dirahasiakan"}</p>
              </div>

              {scholarships && scholarships.length > 0 && (
                <div className="pt-4 border-t border-glass">
                  <p className="text-xs font-mono text-gold uppercase tracking-widest mb-2">Penerima Beasiswa</p>
                  <ul className="text-text-muted space-y-2 list-disc list-outside ml-4 text-sm">
                    {scholarships.map((item: string, idx: number) => (
                      <li key={idx} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {awards && awards.length > 0 && (
                <div className="pt-4 border-t border-glass">
                  <p className="text-xs font-mono text-gold uppercase tracking-widest mb-2">Penghargaan</p>
                  <ul className="text-text-muted space-y-2 list-disc list-outside ml-4 text-sm">
                    {awards.map((item: string, idx: number) => (
                      <li key={idx} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="pt-4 border-t border-glass">
                <p className="text-xs font-mono text-gold uppercase tracking-widest mb-1">Status Kelulusan</p>
                <p className="text-text-muted">Yudisium Ke-41 (Juli 2026)</p>
                {ipk && <p className="text-text-muted mt-1">IPK {ipk}</p>}
              </div>

              {job && (
                <div className="pt-4 border-t border-glass">
                  <p className="text-xs font-mono text-gold uppercase tracking-widest mb-1">Pekerjaan Saat Ini</p>
                  <p className="font-semibold text-text-primary">{job.role}</p>
                  <p className="text-sm text-text-muted">{job.company}</p>
                  <p className="text-xs text-text-muted/60 mt-1">Diterima: {job.date}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: CV, Projects, Socials */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text-primary leading-tight mb-4 drop-shadow-sm">
                {participant.name}
              </h1>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 text-gold text-sm font-medium mb-6">
                <GraduationCap size={16} />
                <span>Calon Insinyur</span>
              </div>
              {motto && (
                <div className="border-l-2 border-gold/40 pl-5 py-2">
                  <p className="text-lg md:text-xl text-text-primary/90 italic font-serif">
                    {motto.includes('"') || motto.includes("'") || motto.includes('“') || motto.includes('”') ? motto.trim() : `"${motto.trim()}"`}
                  </p>
                </div>
              )}
            </div>

            {/* Riwayat Hidup */}
            <div className="space-y-4">
              <h2 className="text-2xl font-serif flex items-center gap-3 border-b border-glass pb-4">
                <BookOpen className="text-gold" size={24} />
                Riwayat Hidup
              </h2>
              <p className="text-text-muted leading-relaxed text-lg">
                {bio}
              </p>
            </div>

            {/* Pengalaman Organisasi */}
            {organizations && organizations.length > 0 && (
              <div className="space-y-6 pt-6 border-t border-glass">
                <h2 className="text-2xl font-serif flex items-center gap-3 border-b border-glass pb-4">
                  <Users className="text-gold" size={24} />
                  Pengalaman Organisasi
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {organizations.map((org: any, idx: number) => (
                    <div key={idx} className="p-6 rounded-xl bg-charcoal border border-glass hover:border-gold/30 transition-colors">
                      <h3 className="font-semibold text-text-primary mb-1">{org.name}</h3>
                      <p className="text-sm text-gold font-mono tracking-widest uppercase mb-2">{org.role}</p>
                      <p className="text-xs text-text-muted">{org.period}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pengalaman Magang */}
            {internships && internships.length > 0 && (
              <div className="space-y-6 pt-6 border-t border-glass">
                <h2 className="text-2xl font-serif flex items-center gap-3 border-b border-glass pb-4">
                  <Briefcase className="text-gold" size={24} />
                  Pengalaman Magang
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {internships.map((intern: any, idx: number) => (
                    <div key={idx} className="p-6 rounded-xl bg-charcoal border border-glass hover:border-gold/30 transition-colors">
                      <h3 className="font-semibold text-text-primary mb-1">{intern.company}</h3>
                      <p className="text-sm text-gold font-mono tracking-widest uppercase mb-2">{intern.role}</p>
                      <p className="text-xs text-text-muted">{intern.period}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Proyek & Publikasi */}
            <div className="space-y-6 pt-6 border-t border-glass">
              <h2 className="text-2xl font-serif flex items-center gap-3 border-b border-glass pb-4">
                <Code className="text-gold" size={24} />
                Proyek & Publikasi Akhir
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj: any, idx: number) => (
                  <div key={idx} className="p-6 rounded-xl bg-charcoal border border-glass hover:border-gold/30 transition-colors">
                    <h3 className="font-semibold text-text-primary mb-2">{proj.title}</h3>
                    <p className="text-sm text-text-muted">{proj.desc}</p>
                  </div>
                ))}
              </div>

              {publications && publications.length > 0 && (
                <div className="mt-8 pt-6 border-t border-glass/30 space-y-3">
                  <p className="text-sm font-mono text-gold uppercase tracking-widest">Tautan Publikasi</p>
                  <ul className="space-y-2">
                    {publications.map((pub: any, idx: number) => (
                      <li key={idx}>
                        <a href={pub.url || pub} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-text-muted hover:text-gold transition-colors text-sm break-all">
                          <LinkIcon size={14} className="shrink-0" />
                          <span>{pub.title || pub.url || pub}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Social Media */}
            <div className="space-y-4 pt-8 border-t border-glass">
              <h2 className="text-sm font-mono text-text-muted uppercase tracking-widest mb-4">
                Terhubung dengan {participant.name.split(',')[0]}
              </h2>
              
              <div className="flex flex-wrap gap-4">
                {linkedinUrl ? (
                  <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-lg bg-charcoal border border-glass hover:border-gold hover:text-gold transition-colors">
                    <LinkedinIcon size={18} />
                    <span>LinkedIn Profile</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-2 px-5 py-3 rounded-lg bg-charcoal border border-glass opacity-50 cursor-not-allowed text-text-muted">
                    <LinkedinIcon size={18} />
                    <span>LinkedIn (Belum Ditambahkan)</span>
                  </div>
                )}
                
                {instagramUrl ? (
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-lg bg-charcoal border border-glass hover:border-gold hover:text-gold transition-colors">
                    <InstagramIcon size={18} />
                    <span>Instagram</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-2 px-5 py-3 rounded-lg bg-charcoal border border-glass opacity-50 cursor-not-allowed text-text-muted">
                    <InstagramIcon size={18} />
                    <span>Instagram (Belum Ditambahkan)</span>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </Container>
    </main>
  );
}
