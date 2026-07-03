'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import { Article, Essay } from '@/types/airtable';
import { generateSlug } from '@/lib/utils';
import { formatDate } from '@/lib/utils';

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
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-healthcare-600 uppercase tracking-wider">
            Latest Thinking
          </span>
          <h2 className="heading-lg mt-3">Insights & Perspectives</h2>
          <p className="text-body mt-4 max-w-2xl mx-auto">
            Exploring the intersection of AI and healthcare through analysis, research, and personal reflections.
          </p>
        </motion.div>

        {/* Horizontal Scroll on Mobile */}
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:gap-8">
          {/* Articles */}
          {recentArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-[88%] md:w-auto snap-start"
            >
              <Link
                href={`/articles/${generateSlug(article.Title)}`}
                className="group block h-full"
              >
                <div className="bg-neutral-50 rounded-2xl overflow-hidden h-full border border-neutral-100 card-hover">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {article['Thumbnail Image']?.[0]?.url ? (
                      <Image
                        src={article['Thumbnail Image'][0].url}
                        alt={article.Title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 88vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200" />
                    )}
                    <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm rounded-full text-neutral-700">
                      Article
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(article['Publish Date'])}</span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-neutral-900 group-hover:text-healthcare-600 transition-colors line-clamp-2">
                      {article.Title}
                    </h3>
                    <p className="mt-2 text-neutral-600 line-clamp-2">{article.Excerpt}</p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}

          {/* Featured Essay */}
          {recentEssays.length > 0 && recentEssays.map((essay) => (
            <motion.article
              key={essay.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0 w-[88%] md:w-auto snap-start"
            >
              <Link href={`/essays/${essay.Slug}`} className="group block h-full">
                <div className="bg-healthcare-50 rounded-2xl overflow-hidden h-full border border-healthcare-100 card-hover">
                  <div className="p-6 flex flex-col h-full">
                    <span className="px-3 py-1 text-xs font-medium bg-healthcare-100 text-healthcare-700 rounded-full self-start mb-4">
                      Essay
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-neutral-900 group-hover:text-healthcare-700 transition-colors line-clamp-2">
                      {essay.Title}
                    </h3>
                    <p className="mt-3 text-neutral-600 line-clamp-3 flex-grow">
                      {essay.Excerpt}
                    </p>
                    <div className="mt-auto pt-6 flex items-center text-sm text-healthcare-600 font-medium">
                      Read Essay
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          <Button
            asChild
            variant="outline"
            className="border-healthcare-200 text-healthcare-700 hover:bg-healthcare-50 rounded-full px-6"
          >
            <Link href="/articles">
              All Articles
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-healthcare-200 text-healthcare-700 hover:bg-healthcare-50 rounded-full px-6"
          >
            <Link href="/essays">
              All Essays
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}