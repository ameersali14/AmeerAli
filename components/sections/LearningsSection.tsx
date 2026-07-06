'use client';

import { motion } from 'framer-motion';
import { Lightbulb, ExternalLink, BookOpen, ArrowRight } from 'lucide-react';
import { Learning } from '@/types/airtable';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

interface LearningsSectionProps {
  learnings: Learning[];
}

export function LearningsSection({ learnings }: LearningsSectionProps) {
  const featuredLearnings = learnings.slice(0, 3);

  if (featuredLearnings.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-32 bg-[#FDFCFA]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        
        {/* Header */}
        <div className="mb-14 md:mb-20 md:flex md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="inline-block text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-4">
              Key Learnings
            </span>
            <h2 className="text-[1.75rem] leading-[1.12] font-bold text-[#0B1B2B] md:text-[2.25rem] md:leading-[1.1]">
              Insights from Research
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#64748B] md:text-base md:mt-5">
              Important lessons and findings from recent research papers and industry developments.
            </p>
          </div>
          
          <Link 
            href="/learnings" 
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-[#0284C7] hover:text-[#0369A1] transition-colors group"
          >
            View All Learnings
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {featuredLearnings.map((learning, index) => (
            <motion.article
              key={learning.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 lg:p-8 border border-[#E2E8F0] h-full flex flex-col transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:border-[#CBD5E1]">
                
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-[#E0F2FE] flex items-center justify-center mb-5">
                  <Lightbulb className="w-5 h-5 text-[#0284C7]" />
                </div>

                {/* Content */}
                <h3 className="text-[16px] font-bold text-[#0B1B2B] leading-snug group-hover:text-[#0284C7] transition-colors duration-300 line-clamp-2">
                  {learning.Title}
                </h3>
                
                {learning.Source && (
                  <p className="mt-2 text-[12px] font-semibold text-[#0284C7] uppercase tracking-[0.1em]">
                    {learning.Source}
                  </p>
                )}
                
                <p className="mt-4 text-[14px] leading-[1.65] text-[#64748B] line-clamp-4 flex-grow">
                  {learning['Key Lessons / Summary']}
                </p>

                {/* Footer */}
                <div className="mt-6 pt-5 border-t border-[#F1F5F9] flex items-center justify-between">
                  <span className="text-[12px] text-[#94A3B8] font-medium">
                    {formatDate(learning['Publish Date'])}
                  </span>
                  
                  {learning['White Paper URL'] ? (
                    <a
                      href={learning['White Paper URL']}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0284C7] hover:text-[#0369A1] transition-colors"
                    >
                      Read Paper
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#94A3B8]">
                      <BookOpen className="w-3.5 h-3.5" />
                      Research
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-14 md:hidden">
          <Link
            href="/learnings"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-full border border-[#CBD5E1] text-[#475569] hover:bg-white transition-colors text-[14px] font-semibold"
          >
            View All Learnings
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}