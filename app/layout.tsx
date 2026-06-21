import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { SpotlightCursor } from "@/components/ui/SpotlightCursor";
import { TechnoBackground } from "@/components/ui/TechnoBackground";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  ),
  title: 'Nicholas William — Freelance Software Engineer',
  description: 'Freelance software engineer building fast, scalable web products. Available for projects.',
  openGraph: {
    type: 'website',
    title: 'Nicholas William — Freelance Software Engineer',
    description: 'Freelance software engineer building fast, scalable web products. Available for projects.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Nicholas William — Freelance Software Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nicholas William — Freelance Software Engineer',
    description: 'Freelance software engineer building fast, scalable web products. Available for projects.',
    images: ['/opengraph-image'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${jetbrainsMono.variable}`}>
      <body>
        <TechnoBackground />
        <SpotlightCursor />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Nicholas William',
              jobTitle: 'Freelance Software Engineer',
              description: 'Freelance software engineer building fast, scalable web products.',
              sameAs: [
                'https://github.com/nichowil',
                'https://linkedin.com/in/nichowil',
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
