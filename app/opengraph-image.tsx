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
            color: '#555555',
            fontSize: 18,
            fontFamily: 'monospace',
            margin: '0 0 24px',
          }}
        >
          $ whoami
        </p>
        <h1
          style={{
            color: '#e8e8e8',
            fontSize: 88,
            fontWeight: 700,
            margin: '0 0 16px',
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}
        >
          Nicholas Hadiwijaya
        </h1>
        <p
          style={{
            color: '#00d9b8',
            fontSize: 22,
            fontWeight: 400,
            fontFamily: 'monospace',
            margin: 0,
          }}
        >
          software engineer
        </p>
      </div>
    ),
    size,
  );
}
