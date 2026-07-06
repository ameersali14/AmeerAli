'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowUpRight, Filter } from 'lucide-react';
import { Portfolio } from '@/types/airtable';
import { generateSlug, formatDate } from '@/lib/utils';

interface PortfolioPageClientProps {
  portfolio: Portfolio[];
  categories: string[];
}

export function PortfolioPageClient({ portfolio, categories }: PortfolioPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPortfolio = useMemo(() => {
    if (!selectedCategory) return portfolio;
    return portfolio.filter((p) => p.Category === selectedCategory);
  }, [portfolio, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      {/* Page Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-4">
              My Work
            </span>
            <h1 className="text-[2.5rem] leading-[1.1] font-bold text-[#0B1B2B] md:text-[3.5rem]">
              Portfolio
            </h1>
            <p className="mt-5 text-[15px] leading-relaxed text-[#64748B] max-w-xl md:text-base">
              A collection of AI healthcare projects showcasing innovation in clinical applications,
              research, and digital health transformation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur-xl border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <Filter className="w-4 h-4 text-[#94A3B8] flex-shrink-0 hidden md:block" />
            
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex-shrink-0 px-4 py-2 text-[13px] font-semibold rounded-full transition-all duration-200 ${
                selectedCategory === null
                  ? 'bg-[#0284C7] text-white shadow-md shadow-[#0284C7]/15'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
            >
              All Projects
            </button>
            
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 px-4 py-2 text-[13px] font-semibold rounded-full transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-[#0284C7] text-white shadow-md shadow-[#0284C7]/15'
                    : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <AnimatePresence mode="wait">
            {filteredPortfolio.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <p className="text-[15px] text-[#94A3B8]">No projects found in this category.</p>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              >
                {filteredPortfolio.map((project, index) => (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                  >
                    <Link
                      href={`/portfolio/${generateSlug(project['Project Title'])}`}
                      className="group block h-full"
                    >
                      <div className="bg-white rounded-2xl overflow-hidden h-full border border-[#E2E8F0] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-[#CBD5E1]">
                        {/* Image */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-[#F1F5F9]">
                          {project.Images?.[0]?.url ? (
                            <Image
                              src={project.Images[0].url}
                              alt={project['Project Title']}
                              fill
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#E0F2FE] to-[#F1F5F9]" />
                          )}
                          
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-[#0B1B2B]/0 group-hover:bg-[#0B1B2B]/5 transition-colors duration-500" />
                          
                          {/* Category tag */}
                          {project.Category && (
                            <span className="absolute top-4 left-4 px-3 py-1.5 text-[11px] font-semibold bg-white/95 backdrop-blur-sm rounded-full text-[#0B1B2B] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                              {project.Category}
                            </span>
                          )}
                          
                          {/* Arrow on hover */}
                          <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                            <ArrowUpRight className="w-4 h-4 text-[#0B1B2B]" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 lg:p-6">
                          <h3 className="text-[16px] font-bold text-[#0B1B2B] group-hover:text-[#0284C7] transition-colors duration-300 line-clamp-2 leading-snug">
                            {project['Project Title']}
                          </h3>
                          <p className="mt-2 text-[13px] leading-[1.6] text-[#64748B] line-clamp-2">
                            {project['Short Description']}
                          </p>
                          
                          <div className="mt-4 pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
                            {project['Completion Date'] && (
                              <div className="flex items-center gap-1.5 text-[12px] text-[#94A3B8] font-medium">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{formatDate(project['Completion Date'])}</span>
                              </div>
                            )}
                            <span className="text-[12px] font-semibold text-[#0284C7] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              View Project →
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}