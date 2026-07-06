import { Metadata } from 'next';
import Image from 'next/image';
import { Calendar, ExternalLink, Tag, ArrowUpRight } from 'lucide-react';
import { getAINews } from '@/lib/data';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'AI News — Curated Healthcare Updates',
    description: 'Curated news and updates from the world of AI healthcare and digital health innovation.',
  };
}

export default async function AINewsPage() {
  const news = await getAINews();

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      {/* Page Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <span className="inline-block text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-4">
            Writing
          </span>
          <h1 className="text-[2.5rem] leading-[1.1] font-bold text-[#0B1B2B] md:text-[3.5rem]">
            AI News
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-[#64748B] max-w-xl md:text-base">
            Stay updated with the latest developments in AI healthcare, machine learning
            breakthroughs, and digital health innovations.
          </p>
        </div>
      </section>

      {/* News Feed */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          {news.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-[15px] text-[#94A3B8]">No news articles found.</p>
            </div>
          ) : (
            <div className="space-y-0">
              {news.map((item) => (
                <article
                  key={item.id}
                  className="py-8 md:py-10 border-b border-[#E2E8F0] first:pt-0"
                >
                  <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
                    
                    {/* Image — 3 cols */}
                    {item.Image?.[0]?.url && (
                      <div className="md:col-span-3">
                        <div className="relative aspect-[16/10] md:aspect-[4/3] rounded-xl overflow-hidden bg-[#F1F5F9]">
                          <Image
                            src={item.Image[0].url}
                            alt={item.Title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 25vw"
                          />
                        </div>
                      </div>
                    )}

                    {/* Content — 7 cols */}
                    <div className={`${item.Image?.[0]?.url ? 'md:col-span-7' : 'md:col-span-10'}`}>
                      {/* Meta row */}
                      <div className="flex items-center gap-3 text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider mb-3">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {item['Publish Date']
                            ? new Date(item['Publish Date']).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : ''}
                        </span>
                        {item.Source && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-[#CBD5E1]" />
                            <span className="px-2 py-0.5 bg-[#F8FAFC] rounded text-[10px] text-[#475569] border border-[#E2E8F0]">
                              {item.Source}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-[17px] font-bold text-[#0B1B2B] leading-snug md:text-[18px]">
                        {item.Title}
                      </h3>

                      {/* Summary */}
                      <p className="mt-2 text-[14px] leading-[1.65] text-[#64748B] line-clamp-3">
                        {item.Summary}
                      </p>

                      {/* Tags */}
                      {item.Tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {item.Tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium bg-[#F8FAFC] text-[#475569] rounded border border-[#E2E8F0]"
                            >
                              <Tag className="w-2.5 h-2.5 text-[#94A3B8]" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Link — 2 cols */}
                    <div className="md:col-span-2 flex md:justify-end items-start">
                      {item.URL ? (
                        <a
                          href={item.URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0284C7] hover:text-[#0369A1] transition-colors group"
                        >
                          Read
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      ) : (
                        <span className="text-[13px] text-[#94A3B8] font-medium">No link</span>
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