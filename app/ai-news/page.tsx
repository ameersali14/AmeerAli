import { Metadata } from 'next';
import Image from 'next/image';
import { Calendar, ExternalLink, Tag, Newspaper } from 'lucide-react';
import { getAINews } from '@/lib/data';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'AI News',
    description: 'Curated news and updates from the world of AI healthcare and digital health innovation.',
  };
}

export default async function AINewsPage() {
  const news = await getAINews();

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-healthcare-50 via-white to-healthcare-100 py-16 md:py-24">
        <div className="container-custom">
          <span className="text-sm font-medium text-healthcare-600 uppercase tracking-wider">
            Writing
          </span>
          <h1 className="heading-xl mt-4">AI News</h1>
          <p className="text-body-lg mt-4 max-w-2xl">
            Stay updated with the latest developments in AI healthcare, machine learning
            breakthroughs, and digital health innovations.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {news.length === 0 ? (
            <div className="text-center py-16">
              <Newspaper className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-500">No news articles found.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {news.map((item) => (
                <article
                  key={item.id}
                  className="bg-neutral-50 rounded-2xl border border-neutral-100 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {item.Image?.[0]?.url && (
                      <div className="relative w-full md:w-72 aspect-[16/10] md:aspect-square shrink-0">
                        <Image
                          src={item.Image[0].url}
                          alt={item.Title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 300px"
                        />
                      </div>
                    )}
                    <div className="flex-1 p-6">
                      <div className="flex items-center gap-3 text-sm text-neutral-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {item['Publish Date']
                              ? new Date(item['Publish Date']).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })
                              : ''}
                          </span>
                        </div>
                        {item.Source && (
                          <span className="px-2 py-0.5 bg-neutral-200 rounded text-xs">
                            {item.Source}
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-neutral-900">
                        {item.Title}
                      </h3>
                      <p className="mt-3 text-neutral-600 line-clamp-3">{item.Summary}</p>
                      {item.Tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {item.Tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-white text-neutral-600 rounded border border-neutral-200"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {item.URL && (
                        <a
                          href={item.URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-4 text-healthcare-600 hover:text-healthcare-700 font-medium text-sm"
                        >
                          Read Full Article
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
