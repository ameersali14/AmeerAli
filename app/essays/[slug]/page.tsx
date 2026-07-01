import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar } from 'lucide-react';
import { getEssays, getEssayBySlug, getSettings } from '@/lib/data';

interface EssayDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const essays = await getEssays();
  return essays.map((e) => ({
    slug: e.Slug,
  }));
}

export async function generateMetadata({ params }: EssayDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const essay = await getEssayBySlug(slug);

  if (!essay) {
    return { title: 'Essay Not Found' };
  }

  return {
    title: essay.Title,
    description: essay.Excerpt,
    openGraph: {
      title: essay.Title,
      description: essay.Excerpt,
      type: 'article',
      publishedTime: essay['Publish Date'],
      images: essay['Cover Image']?.[0]?.url ? [{ url: essay['Cover Image'][0].url }] : [],
    },
  };
}

export default async function EssayDetailPage({ params }: EssayDetailPageProps) {
  const { slug } = await params;
  const [essay, settings] = await Promise.all([
    getEssayBySlug(slug),
    getSettings(),
  ]);

  if (!essay) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: essay.Title,
    description: essay.Excerpt,
    image: essay['Cover Image']?.[0]?.url,
    datePublished: essay['Publish Date'],
    author: {
      '@type': 'Person',
      name: settings?.Name || 'Dr. Sarah Chen',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="min-h-screen">
        <header className="bg-gradient-to-br from-healthcare-50 via-white to-healthcare-100 py-16 md:py-24">
          <div className="container-custom">
            <Link
              href="/essays"
              className="inline-flex items-center text-sm text-healthcare-600 hover:text-healthcare-700 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Essays
            </Link>

            <div className="max-w-3xl">
              <time className="text-sm text-neutral-500 flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4" />
                {essay['Publish Date']
                  ? new Date(essay['Publish Date']).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : ''}
              </time>
              <h1 className="heading-xl text-neutral-900">{essay.Title}</h1>
              <p className="text-body-lg mt-4 text-neutral-600 italic">{essay.Excerpt}</p>
            </div>
          </div>
        </header>

        {essay['Cover Image']?.[0]?.url && (
          <div className="container-custom py-8">
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden">
              <Image
                src={essay['Cover Image'][0].url}
                alt={essay.Title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
        )}

        <div className="container-custom section-padding">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg prose-neutral max-w-none">
              <div dangerouslySetInnerHTML={{ __html: essay['Full Content'] || essay.Excerpt }} />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
