import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <p
          style={{
            color: '#a3a3a3',
            fontSize: 18,
            fontFamily: 'monospace',
            margin: '0 0 16px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          // freelance
        </p>
        <h1
          style={{
            color: '#f5f5f5',
            fontSize: 80,
            fontWeight: 300,
            margin: '0 0 12px',
            lineHeight: 1,
          }}
        >
          Nicholas William
        </h1>
        <p
          style={{
            color: '#a3a3a3',
            fontSize: 32,
            fontWeight: 400,
            margin: 0,
          }}
        >
          Software Engineer
        </p>
      </div>
    ),
    size,
  );
}
