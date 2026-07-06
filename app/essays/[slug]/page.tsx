import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, ArrowRight, ArrowUpRight } from 'lucide-react';
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
    title: `${essay.Title} — Essays`,
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
  const [essay, settings, allEssays] = await Promise.all([
    getEssayBySlug(slug),
    getSettings(),
    getEssays(),
  ]);

  if (!essay) {
    notFound();
  }

  const relatedEssays = allEssays
    .filter((e) => e.id !== essay.id)
    .slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: essay.Title,
    description: essay.Excerpt,
    image: essay['Cover Image']?.[0]?.url,
    datePublished: essay['Publish Date'],
    author: {
      '@type': 'Person',
      name: settings?.Name || 'Ameer Ali',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <article className="min-h-screen bg-[#FDFCFA]">
        
        {/* Floating Back Link */}
        <div className="fixed top-24 left-5 md:left-8 z-30 hidden md:block">
          <Link
            href="/essays"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#64748B] hover:text-[#0284C7] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Essays
          </Link>
        </div>

        {/* Essay Header — Left aligned, editorial */}
        <header className="pt-24 pb-16 md:pt-32 md:pb-20 bg-white">
          <div className="max-w-3xl mx-auto px-5 md:px-8">
            {/* Mobile back link */}
            <Link
              href="/essays"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-[#64748B] hover:text-[#0284C7] transition-colors mb-6 md:hidden"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>

            {/* Meta — left aligned */}
            <div className="flex items-center gap-3 text-[12px] text-[#94A3B8] font-medium uppercase tracking-wider mb-5">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {essay['Publish Date']
                  ? new Date(essay['Publish Date']).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : ''}
              </span>
            </div>

            {/* Title — Left aligned, bold */}
            <h1 className="text-[2rem] leading-[1.15] font-bold text-[#0B1B2B] md:text-[2.75rem] md:leading-[1.1]">
              {essay.Title}
            </h1>

            {/* Excerpt — Left aligned, not italic */}
            <p className="mt-5 text-[16px] leading-[1.7] text-[#64748B] md:text-[17px] max-w-2xl">
              {essay.Excerpt}
            </p>

            {/* Author — Left aligned */}
            {settings?.Name && (
              <div className="mt-8 pt-8 border-t border-[#E2E8F0] flex items-center gap-3">
                {settings?.['Bio Photo']?.[0]?.url && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#F1F5F9]">
                    <Image
                      src={settings['Bio Photo'][0].url}
                      alt={settings.Name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                )}
                <div>
                  <p className="text-[14px] font-semibold text-[#0B1B2B]">
                    {settings.Name}
                  </p>
                  <p className="text-[12px] text-[#94A3B8]">Essay</p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Cover Image — Left aligned container, not centered */}
        {essay['Cover Image']?.[0]?.url && (
          <div className="bg-white">
            <div className="max-w-7xl mx-auto px-5 md:px-8 pb-12 md:pb-16">
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-[#F1F5F9] max-w-4xl">
                <Image
                  src={essay['Cover Image'][0].url}
                  alt={essay.Title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>
          </div>
        )}

        {/* Essay Content — Left aligned, reading column */}
        <div className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto px-5 md:px-8">
            <div className="prose prose-lg max-w-none">
              {essay['Full Content'] ? (
                <div 
                  className="text-[16px] leading-[1.8] text-[#475569] md:text-[17px] essay-content"
                  dangerouslySetInnerHTML={{ __html: essay['Full Content'] }}
                />
              ) : (
                <p className="text-[16px] leading-[1.8] text-[#475569] md:text-[17px]">
                  {essay.Excerpt}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Related Essays — Left aligned header, asymmetric grid */}
        {relatedEssays.length > 0 && (
          <section className="py-16 md:py-24 bg-white border-t border-[#E2E8F0]">
            <div className="max-w-7xl mx-auto px-5 md:px-8">
              <h2 className="text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-10">
                More Essays
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl">
                {relatedEssays.map((related) => (
                  <Link
                    key={related.id}
                    href={`/essays/${related.Slug}`}
                    className="group block"
                  >
                    <div className="flex items-center gap-2 text-[11px] text-[#94A3B8] mb-3">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {related['Publish Date']
                          ? new Date(related['Publish Date']).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })
                          : ''}
                      </span>
                    </div>
                    
                    <h3 className="text-[17px] font-bold text-[#0B1B2B] group-hover:text-[#0284C7] transition-colors leading-snug line-clamp-2">
                      {related.Title}
                    </h3>
                    
                    <p className="mt-2 text-[14px] leading-[1.6] text-[#64748B] line-clamp-2">
                      {related.Excerpt}
                    </p>
                    
                    <div className="mt-4 flex items-center gap-1.5 text-[13px] font-semibold text-[#0284C7] opacity-0 group-hover:opacity-100 transition-opacity">
                      Read Essay
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Page CTA — Left aligned content */}
        <section className="py-20 md:py-28 bg-[#0B1B2B] relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#0284C7]/8 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-3xl mx-auto px-5 md:px-8 relative z-10">
            <h2 className="text-[1.75rem] leading-[1.2] font-bold text-white md:text-[2.25rem]">
              Enjoyed this essay?
            </h2>
            <p className="mt-4 text-[15px] text-[#94A3B8] md:text-[16px] max-w-xl">
              I share more thoughts on AI, healthcare, and building meaningful technology.
            </p>
            <div className="mt-8">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-full px-8 py-4 text-[14px] font-semibold shadow-lg shadow-[#0284C7]/25 transition-all duration-200 group"
              >
                Read More Articles
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}