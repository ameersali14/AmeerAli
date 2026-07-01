import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { getArticles } from '@/lib/data';
import { generateSlug } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Articles',
    description: 'In-depth articles on AI healthcare, digital health innovation, and clinical technology applications.',
  };
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-healthcare-50 via-white to-healthcare-100 py-16 md:py-24">
        <div className="container-custom">
          <span className="text-sm font-medium text-healthcare-600 uppercase tracking-wider">
            Writing
          </span>
          <h1 className="heading-xl mt-4">Articles</h1>
          <p className="text-body-lg mt-4 max-w-2xl">
            Exploring the latest developments in AI healthcare through in-depth analysis and
            research-backed insights.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-neutral-500">No articles found.</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {articles.map((article, index) => (
                <Link
                  key={article.id}
                  href={`/articles/${generateSlug(article.Title)}`}
                  className="group block"
                >
                  <article
                    className={`flex gap-6 ${
                      index === 0 ? 'lg:col-span-2' : ''
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden rounded-2xl shrink-0 ${
                        index === 0
                          ? 'w-full aspect-[21/9]'
                          : 'w-48 aspect-[4/3]'
                      }`}
                    >
                      {article['Thumbnail Image']?.[0]?.url ? (
                        <Image
                          src={article['Thumbnail Image'][0].url}
                          alt={article.Title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes={index === 0 ? '100vw' : '200px'}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-healthcare-100 to-healthcare-200" />
                      )}
                    </div>
                    <div className={`${index === 0 ? 'lg:absolute lg:bottom-0 lg:right-0 lg:w-1/2 lg:p-10' : 'py-2'}`}>
                      <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {article['Publish Date']
                            ? new Date(article['Publish Date']).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })
                            : ''}
                        </span>
                      </div>
                      <h3
                        className={`font-serif font-semibold text-neutral-900 group-hover:text-healthcare-600 transition-colors line-clamp-2 ${
                          index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'
                        }`}
                      >
                        {article.Title}
                      </h3>
                      <p className="mt-2 text-neutral-600 line-clamp-2">{article.Excerpt}</p>
                      <div className="mt-4 flex items-center text-healthcare-600 font-medium">
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                      {article.Tags?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {article.Tags.slice(0, 3).map((tag: string) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs bg-neutral-100 text-neutral-600 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
