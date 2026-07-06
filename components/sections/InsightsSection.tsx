'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight, Calendar } from 'lucide-react';
import { Article, Essay } from '@/types/airtable';
import { generateSlug, formatDate } from '@/lib/utils';

interface InsightsSectionProps {
  articles: Article[];
  essays: Essay[];
}

export function InsightsSection({ articles, essays }: InsightsSectionProps) {
  const recentArticles = articles.slice(0, 3);
  const recentEssays = essays.slice(0, 1);
  const hasContent = recentArticles.length > 0 || recentEssays.length > 0;

  if (!hasContent) {
    return null;
  }

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        
        {/* Header — Left-aligned, editorial */}
        <div className="mb-14 md:mb-20 md:flex md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="inline-block text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-4">
              Latest Thinking
            </span>
            <h2 className="text-[1.75rem] leading-[1.12] font-bold text-[#0B1B2B] md:text-[2.25rem] md:leading-[1.1]">
              Insights & Perspectives
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#64748B] md:text-base md:mt-5">
              Exploring the intersection of AI and healthcare through analysis, research, and personal reflections.
            </p>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/articles" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0284C7] hover:text-[#0369A1] transition-colors group"
            >
              All Articles
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              href="/essays" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0284C7] hover:text-[#0369A1] transition-colors group"
            >
              All Essays
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Content Grid — Featured article left, list right */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Featured Article — 7 cols, large card */}
          {recentArticles[0] && (
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <Link
                href={`/articles/${generateSlug(recentArticles[0].Title)}`}
                className="group block"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#F1F5F9] md:aspect-[16/9]">
                  {recentArticles[0]['Thumbnail Image']?.[0]?.url ? (
                    <Image
                      src={recentArticles[0]['Thumbnail Image'][0].url}
                      alt={recentArticles[0].Title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#E0F2FE] to-[#F1F5F9]" />
                  )}
                  
                  <div className="absolute inset-0 bg-[#0B1B2B]/0 group-hover:bg-[#0B1B2B]/5 transition-colors duration-500" />
                  
                  <span className="absolute top-4 left-4 px-3.5 py-1.5 text-[11px] font-semibold bg-white/95 backdrop-blur-sm rounded-full text-[#0B1B2B] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                    Article
                  </span>
                  
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                    <ArrowUpRight className="w-4 h-4 text-[#0B1B2B]" />
                  </div>
                </div>

                <div className="mt-5 md:mt-6">
                  <div className="flex items-center gap-2 text-[12px] text-[#94A3B8] mb-2.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(recentArticles[0]['Publish Date'])}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0B1B2B] group-hover:text-[#0284C7] transition-colors duration-300 md:text-xl">
                    {recentArticles[0].Title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-[1.65] text-[#64748B] line-clamp-2 md:text-[15px]">
                    {recentArticles[0].Excerpt}
                  </p>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Right Column — Stacked list, 5 cols */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Secondary Articles */}
            {recentArticles.slice(1, 3).map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1), ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/articles/${generateSlug(article.Title)}`}
                  className="group flex gap-4"
                >
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-[#F1F5F9]">
                    {article['Thumbnail Image']?.[0]?.url ? (
                      <Image
                        src={article['Thumbnail Image'][0].url}
                        alt={article.Title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#E0F2FE] to-[#F1F5F9]" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[11px] text-[#94A3B8] mb-1.5">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(article['Publish Date'])}</span>
                    </div>
                    <h3 className="text-[14px] font-semibold text-[#0B1B2B] group-hover:text-[#0284C7] transition-colors duration-300 line-clamp-2 leading-snug">
                      {article.Title}
                    </h3>
                  </div>
                </Link>
              </motion.article>
            ))}

            {/* Featured Essay — Distinct treatment */}
            {recentEssays.length > 0 && recentEssays.map((essay) => (
              <motion.article
                key={essay.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="pt-6 border-t border-[#E2E8F0]"
              >
                <Link href={`/essays/${essay.Slug}`} className="group block">
                  <span className="inline-block px-3 py-1 text-[10px] font-semibold bg-[#E0F2FE] text-[#0284C7] rounded-full mb-3">
                    Essay
                  </span>
                  <h3 className="text-[15px] font-bold text-[#0B1B2B] group-hover:text-[#0284C7] transition-colors duration-300 line-clamp-2 leading-snug">
                    {essay.Title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.6] text-[#64748B] line-clamp-2">
                    {essay.Excerpt}
                  </p>
                  <div className="mt-3 flex items-center text-[13px] font-semibold text-[#0284C7]">
                    Read Essay
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Mobile CTAs */}
        <div className="mt-14 flex flex-col gap-3 md:hidden">
          <Button
            asChild
            variant="outline"
            className="w-full rounded-full border-[#CBD5E1] text-[#475569] hover:bg-[#F8FAFC] hover:border-[#94A3B8] py-5 text-[14px] font-semibold"
          >
            <Link href="/articles" className="flex items-center justify-center gap-2">
              All Articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full rounded-full border-[#CBD5E1] text-[#475569] hover:bg-[#F8FAFC] hover:border-[#94A3B8] py-5 text-[14px] font-semibold"
          >
            <Link href="/essays" className="flex items-center justify-center gap-2">
              All Essays
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}