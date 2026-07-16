import { MetadataRoute } from 'next';
import participantsData from '@/data/participants.json';
import programsData from '@/data/programs.json';

export default function sitemap(): MetadataRoute.Sitemap {
  // Ganti dengan domain produksi Anda
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zenrega38.github.io/FT_41';

  // Halaman Statis Utama
  const staticRoutes = [
    '',
    '/tentang',
    '/galeri',
    '/lulusan',
    '/transparansi',
    '/prodi'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Halaman Profil Lulusan (Dinamis)
  const participantRoutes = participantsData.map((participant) => ({
    url: `${baseUrl}/lulusan/${participant.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Halaman Prodi (Dinamis)
  const programRoutes = programsData.map((program) => ({
    url: `${baseUrl}/prodi/${program.code}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...programRoutes, ...participantRoutes];
}
