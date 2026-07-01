import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Linkedin, Tag } from 'lucide-react';
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
    title: article.Title,
    description: article.Excerpt,
    openGraph: {
      title: article.Title,
      description: article.Excerpt,
      type: 'article',
      publishedTime: article['Publish Date'],
      authors: ['Dr. Sarah Chen'],
      images: article['Thumbnail Image']?.[0]?.url ? [{ url: article['Thumbnail Image'][0].url }] : [],
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const [article, settings] = await Promise.all([
    getArticleBySlug(slug),
    getSettings(),
  ]);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.Title,
    description: article.Excerpt,
    image: article['Thumbnail Image']?.[0]?.url,
    datePublished: article['Publish Date'],
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
              href="/articles"
              className="inline-flex items-center text-sm text-healthcare-600 hover:text-healthcare-700 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Link>

            <div className="max-w-3xl">
              <time className="text-sm text-neutral-500 flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4" />
                {article['Publish Date']
                  ? new Date(article['Publish Date']).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : ''}
              </time>
              <h1 className="heading-xl text-neutral-900">{article.Title}</h1>
              <p className="text-body-lg mt-4">{article.Excerpt}</p>

              {article.Tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {article.Tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-sm text-neutral-600 border border-neutral-200"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {article['Thumbnail Image']?.[0]?.url && (
          <div className="container-custom py-8">
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden">
              <Image
                src={article['Thumbnail Image'][0].url}
                alt={article.Title}
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
              <p className="text-lg text-neutral-700 leading-relaxed">{article.Excerpt}</p>
              <p className="mt-6 text-neutral-600">
                Full article content would be displayed here from Airtable. This is a placeholder
                for the complete article text that would be fetched from your Airtable base.
              </p>
            </div>

            {article['LinkedIn URL'] && (
              <div className="mt-12 pt-8 border-t border-neutral-200">
                <a
                  href={article['LinkedIn URL']}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-healthcare-600 hover:text-healthcare-700 font-medium"
                >
                  <Linkedin className="w-5 h-5" />
                  Read and discuss on LinkedIn
                </a>
              </div>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
