import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight, ArrowUpRight } from 'lucide-react';
import { getArticles } from '@/lib/data';
import { generateSlug } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Articles — AI Healthcare Insights',
    description: 'In-depth articles on AI healthcare, digital health innovation, and clinical technology applications.',
  };
}

export default async function ArticlesPage() {
  const articles = await getArticles();
  const featuredArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      {/* Page Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <span className="inline-block text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-4">
            Writing
          </span>
          <h1 className="text-[2.5rem] leading-[1.1] font-bold text-[#0B1B2B] md:text-[3.5rem]">
            Articles
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-[#64748B] max-w-xl md:text-base">
            Exploring the latest developments in AI healthcare through in-depth analysis and
            research-backed insights.
          </p>
        </div>
      </section>

      {/* Featured Article — Full bleed hero */}
      {featuredArticle && (
        <section className="pb-12 md:pb-20 bg-white">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <Link
              href={`/articles/${generateSlug(featuredArticle.Title)}`}
              className="group block"
            >
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Image — 7 cols */}
                <div className="lg:col-span-7">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#F1F5F9]">
                    {featuredArticle['Thumbnail Image']?.[0]?.url ? (
                      <Image
                        src={featuredArticle['Thumbnail Image'][0].url}
                        alt={featuredArticle.Title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#E0F2FE] to-[#F1F5F9]" />
                    )}
                    <div className="absolute inset-0 bg-[#0B1B2B]/0 group-hover:bg-[#0B1B2B]/5 transition-colors duration-500" />
                  </div>
                </div>

                {/* Content — 5 cols */}
                <div className="lg:col-span-5">
                  <span className="inline-block px-3 py-1 text-[10px] font-semibold bg-[#E0F2FE] text-[#0284C7] rounded-full uppercase tracking-wider mb-4">
                    Featured
                  </span>
                  
                  <div className="flex items-center gap-2 text-[12px] text-[#94A3B8] mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {featuredArticle['Publish Date']
                        ? new Date(featuredArticle['Publish Date']).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : ''}
                    </span>
                  </div>

                  <h2 className="text-[1.5rem] leading-[1.2] font-bold text-[#0B1B2B] group-hover:text-[#0284C7] transition-colors duration-300 md:text-[1.75rem]">
                    {featuredArticle.Title}
                  </h2>
                  
                  <p className="mt-3 text-[14px] leading-[1.7] text-[#64748B] line-clamp-3 md:text-[15px]">
                    {featuredArticle.Excerpt}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-[13px] font-semibold text-[#0284C7] group-hover:text-[#0369A1] transition-colors">
                    Read Article
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>

                  {featuredArticle.Tags?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {featuredArticle.Tags.slice(0, 4).map((tag: string) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 text-[11px] font-medium bg-[#F8FAFC] text-[#475569] rounded-lg border border-[#E2E8F0]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Article Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          {remainingArticles.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-[15px] text-[#94A3B8]">No more articles found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {remainingArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${generateSlug(article.Title)}`}
                  className="group block"
                >
                  <article className="bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-[#CBD5E1] h-full flex flex-col">
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#F1F5F9]">
                      {article['Thumbnail Image']?.[0]?.url ? (
                        <Image
                          src={article['Thumbnail Image'][0].url}
                          alt={article.Title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#E0F2FE] to-[#F1F5F9]" />
                      )}
                      <div className="absolute inset-0 bg-[#0B1B2B]/0 group-hover:bg-[#0B1B2B]/5 transition-colors duration-500" />
                    </div>

                    {/* Content */}
                    <div className="p-5 lg:p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-[11px] text-[#94A3B8] mb-2.5">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {article['Publish Date']
                            ? new Date(article['Publish Date']).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })
                            : ''}
                        </span>
                      </div>

                      <h3 className="text-[15px] font-bold text-[#0B1B2B] group-hover:text-[#0284C7] transition-colors duration-300 leading-snug line-clamp-2">
                        {article.Title}
                      </h3>
                      
                      <p className="mt-2 text-[13px] leading-[1.6] text-[#64748B] line-clamp-2 flex-1">
                        {article.Excerpt}
                      </p>

                      <div className="mt-4 pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
                        <span className="text-[12px] font-semibold text-[#0284C7] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Read Article
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#0284C7] transition-colors" />
                      </div>

                      {article.Tags?.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {article.Tags.slice(0, 2).map((tag: string) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-[10px] font-medium bg-[#F8FAFC] text-[#64748B] rounded border border-[#E2E8F0]"
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