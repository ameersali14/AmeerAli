import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Linkedin, Tag, ArrowRight } from 'lucide-react';
import { getArticles, getArticleBySlug, getSettings } from '@/lib/data';
import { generateSlug } from '@/lib/utils';

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({
    slug: generateSlug(a.Title),
  }));
}

export async function generateMetadata({ params }: ArticleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: `${article.Title} — Articles`,
    description: article.Excerpt,
    openGraph: {
      title: article.Title,
      description: article.Excerpt,
      type: 'article',
      publishedTime: article['Publish Date'],
      images: article['Thumbnail Image']?.[0]?.url ? [{ url: article['Thumbnail Image'][0].url }] : [],
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const [article, settings, allArticles] = await Promise.all([
    getArticleBySlug(slug),
    getSettings(),
    getArticles(),
  ]);

  if (!article) {
    notFound();
  }

  // Get related articles (exclude current)
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.Title,
    description: article.Excerpt,
    image: article['Thumbnail Image']?.[0]?.url,
    datePublished: article['Publish Date'],
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
            href="/articles"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#64748B] hover:text-[#0284C7] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Articles
          </Link>
        </div>

        {/* Article Header */}
        <header className="pt-24 pb-12 md:pt-32 md:pb-20 bg-white">
          <div className="max-w-3xl mx-auto px-5 md:px-8">
            {/* Mobile back link */}
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-[#64748B] hover:text-[#0284C7] transition-colors mb-6 md:hidden"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>

            {/* Meta */}
            <div className="flex items-center gap-3 text-[12px] text-[#94A3B8] font-medium uppercase tracking-wider mb-5">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {article['Publish Date']
                  ? new Date(article['Publish Date']).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : ''}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-[2rem] leading-[1.15] font-bold text-[#0B1B2B] md:text-[2.75rem] md:leading-[1.1]">
              {article.Title}
            </h1>

            {/* Excerpt */}
            <p className="mt-5 text-[16px] leading-[1.7] text-[#64748B] md:text-[17px]">
              {article.Excerpt}
            </p>

            {/* Tags */}
            {article.Tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8">
                {article.Tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAFC] rounded-lg text-[12px] font-medium text-[#475569] border border-[#E2E8F0]"
                  >
                    <Tag className="w-3 h-3 text-[#94A3B8]" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author */}
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
                  <p className="text-[12px] text-[#94A3B8]">AI Healthcare Consultant</p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {article['Thumbnail Image']?.[0]?.url && (
          <div className="bg-white">
            <div className="max-w-5xl mx-auto px-5 md:px-8 pb-12 md:pb-16">
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-[#F1F5F9]">
                <Image
                  src={article['Thumbnail Image'][0].url}
                  alt={article.Title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto px-5 md:px-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-[16px] leading-[1.8] text-[#475569] md:text-[17px]">
                {article.Excerpt}
              </p>
              
              {/* Note for full content */}
              <div className="mt-8 p-6 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <p className="text-[14px] text-[#94A3B8] italic">
                  Full article content would be displayed here. Add a &quot;Content&quot; long text field to your Airtable Articles table to display the complete article body.
                </p>
              </div>
            </div>

            {/* LinkedIn CTA */}
            {article['LinkedIn URL'] && (
              <div className="mt-12 pt-8 border-t border-[#E2E8F0]">
                <a
                  href={article['LinkedIn URL']}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-[14px] font-semibold text-[#0284C7] hover:text-[#0369A1] transition-colors group"
                >
                  <Linkedin className="w-5 h-5" />
                  Read and discuss on LinkedIn
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-16 md:py-24 bg-white border-t border-[#E2E8F0]">
            <div className="max-w-7xl mx-auto px-5 md:px-8">
              <h2 className="text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-8">
                More Articles
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/articles/${generateSlug(related.Title)}`}
                    className="group block"
                  >
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#F1F5F9] mb-4">
                      {related['Thumbnail Image']?.[0]?.url ? (
                        <Image
                          src={related['Thumbnail Image'][0].url}
                          alt={related.Title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#E0F2FE] to-[#F1F5F9]" />
                      )}
                      <div className="absolute inset-0 bg-[#0B1B2B]/0 group-hover:bg-[#0B1B2B]/5 transition-colors duration-500" />
                    </div>
                    
                    <div className="flex items-center gap-2 text-[11px] text-[#94A3B8] mb-2">
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
                    
                    <h3 className="text-[16px] font-bold text-[#0B1B2B] group-hover:text-[#0284C7] transition-colors leading-snug line-clamp-2">
                      {related.Title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Page CTA */}
        <section className="py-20 md:py-28 bg-[#0B1B2B] relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#0284C7]/8 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-3xl mx-auto px-5 md:px-8 relative z-10 text-center">
            <h2 className="text-[1.75rem] leading-[1.2] font-bold text-white md:text-[2.25rem]">
              Want to discuss this topic?
            </h2>
            <p className="mt-4 text-[15px] text-[#94A3B8] md:text-[16px]">
              I help organizations navigate AI healthcare implementation.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-full px-8 py-4 text-[14px] font-semibold shadow-lg shadow-[#0284C7]/25 transition-all duration-200 group"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}