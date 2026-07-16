import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getSettings } from '@/lib/data';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    metadataBase: new URL('http://localhost:3000'), // For development
    title: {
      default: settings?.Name || 'Dr. Sarah Chen | AI Healthcare Expert',
      template: `%s | ${settings?.Name || 'Dr. Sarah Chen'}`,
    },
    description:
      settings?.['Purpose / Sales Statement'] ||
      'AI Healthcare expert bridging innovation and patient outcomes. Explore insights, research, and thought leadership on the future of healthcare technology.',
    keywords: ['AI Healthcare', 'Healthcare Technology', 'Artificial Intelligence', 'Health Innovation', 'Digital Health'],
    authors: [{ name: settings?.Name || 'Dr. Sarah Chen' }],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://example.com',
      siteName: settings?.Name || 'Dr. Sarah Chen',
      title: settings?.Name || 'Dr. Sarah Chen | AI Healthcare Expert',
      description:
        settings?.['Purpose / Sales Statement'] ||
        'AI Healthcare expert bridging innovation and patient outcomes.',
      images: settings?.['Hero Background Image']
        ? [{ url: settings['Hero Background Image'][0]?.url }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: settings?.Name || 'Dr. Sarah Chen | AI Healthcare Expert',
      description:
        settings?.['Purpose / Sales Statement'] ||
        'AI Healthcare expert bridging innovation and patient outcomes.',
      images: settings?.['Hero Background Image']
        ? [settings['Hero Background Image'][0]?.url]
        : [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
  <Header settings={settings} />

  <main className="min-h-screen pt-20">
    {children}
  </main>

  <Footer settings={settings} />

  <Analytics />
</body>
    </html>
  );
}
