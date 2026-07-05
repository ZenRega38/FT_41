import { ImageResponse } from 'next/og';
import participantsData from '@/data/participants.json';

export const runtime = 'edge';

export const alt = 'Kartu Yudisium Peserta';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const participant = participantsData.find((p) => p.slug === params.slug);

  if (!participant) {
    return new ImageResponse(
      (
        <div
          style={{
            background: '#050505',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1 style={{ color: '#d4af37', fontSize: 64, fontFamily: 'sans-serif' }}>
            Yudisium Ke-41 FT UBT
          </h1>
        </div>
      ),
      { ...size }
    );
  }

  // Construct absolute URL for the image
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

  const imageUrl = `${baseUrl}${participant.photo}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#050505',
          fontFamily: 'sans-serif',
          backgroundImage: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, #050505 70%)',
        }}
      >
        {/* Left Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '65%',
            padding: '80px',
            justifyContent: 'center',
          }}
        >
          <p
            style={{
              color: '#d4af37',
              fontSize: 28,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              marginBottom: '16px',
              fontWeight: 600,
            }}
          >
            {participant.program}
          </p>
          <h1
            style={{
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.1,
              margin: 0,
              color: '#f7f7f2',
            }}
          >
            {participant.name}
          </h1>
          <p
            style={{
              fontSize: 26,
              color: '#a7a7a7',
              marginTop: '32px',
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            Yudisium Ke-41 Fakultas Teknik
            <br />
            Universitas Borneo Tarakan
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 'auto',
              borderTop: '2px solid rgba(212, 175, 55, 0.22)',
              paddingTop: '24px',
            }}
          >
            <p style={{ fontSize: 24, color: '#d4af37', fontWeight: 600, margin: 0 }}>
              The 41st Chapter
            </p>
          </div>
        </div>

        {/* Right Photo */}
        <div
          style={{
            display: 'flex',
            width: '35%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: '60px',
            paddingTop: '60px',
            paddingBottom: '60px',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              borderRadius: '32px',
              overflow: 'hidden',
              border: '4px solid rgba(212, 175, 55, 0.3)',
              boxShadow: '0 0 60px rgba(212, 175, 55, 0.15)',
            }}
          >
            <img
              src={imageUrl}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'grayscale(100%) contrast(1.1)',
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
