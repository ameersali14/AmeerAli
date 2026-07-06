'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Portfolio } from '@/types/airtable';
import { generateSlug } from '@/lib/utils';

interface FeaturedPortfolioSectionProps {
  portfolio: Portfolio[];
}

export function FeaturedPortfolioSection({ portfolio }: FeaturedPortfolioSectionProps) {
  const featuredProjects = portfolio.slice(0, 3);

  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-32 bg-[#FDFCFA]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        
        {/* Section Header — Editorial, left-aligned */}
        <div className="mb-14 md:mb-20 md:flex md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="inline-block text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-4">
              Selected Work
            </span>
            <h2 className="text-[2rem] leading-[1.12] font-bold text-[#0B1B2B] md:text-[2.75rem] md:leading-[1.08]">
              Featured Projects
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#64748B] md:text-base md:mt-5">
              Explore my most impactful AI healthcare implementations and research collaborations.
            </p>
          </div>
          
          {/* Desktop-only link */}
          <Link 
            href="/portfolio" 
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-[#0284C7] hover:text-[#0369A1] transition-colors group"
          >
            View all projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Projects — Asymmetric editorial grid */}
        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-12 md:gap-8">
          
          {/* First Project — Hero, spans 7 cols */}
          {featuredProjects[0] && (
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-7"
            >
              <Link
                href={`/portfolio/${generateSlug(featuredProjects[0]['Project Title'])}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] md:aspect-[16/11] rounded-2xl overflow-hidden bg-[#F1F5F9]">
                  {featuredProjects[0].Images?.[0]?.url ? (
                    <Image
                      src={featuredProjects[0].Images[0].url}
                      alt={featuredProjects[0]['Project Title']}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 58vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#E0F2FE] to-[#F1F5F9]" />
                  )}
                  
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-[#0B1B2B]/0 group-hover:bg-[#0B1B2B]/5 transition-colors duration-500" />
                  
                  {/* Category tag */}
                  {featuredProjects[0].Category && (
                    <span className="absolute top-4 left-4 px-3.5 py-1.5 text-[11px] font-semibold bg-white/95 backdrop-blur-sm rounded-full text-[#0B1B2B] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                      {featuredProjects[0].Category}
                    </span>
                  )}
                  
                  {/* Arrow on hover */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                    <ArrowUpRight className="w-4 h-4 text-[#0B1B2B]" />
                  </div>
                </div>

                <div className="mt-5 md:mt-6">
                  <h3 className="text-lg font-bold text-[#0B1B2B] group-hover:text-[#0284C7] transition-colors duration-300 md:text-xl">
                    {featuredProjects[0]['Project Title']}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-[1.65] text-[#64748B] line-clamp-2 md:text-[15px]">
                    {featuredProjects[0]['Short Description']}
                  </p>
                  {featuredProjects[0]['Client / Role'] && (
                    <p className="mt-3 text-[12px] text-[#94A3B8] font-semibold uppercase tracking-[0.15em]">
                      {featuredProjects[0]['Client / Role']}
                    </p>
                  )}
                </div>
              </Link>
            </motion.article>
          )}

          {/* Right column — 2 stacked projects, 5 cols */}
          <div className="md:col-span-5 space-y-8 md:space-y-7">
            {featuredProjects.slice(1, 3).map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.15 * (index + 1), ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/portfolio/${generateSlug(project['Project Title'])}`}
                  className="group flex gap-4 md:flex-col"
                >
                  {/* Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-[#F1F5F9] md:w-full md:aspect-[16/10] md:rounded-2xl">
                    {project.Images?.[0]?.url ? (
                      <Image
                        src={project.Images[0].url}
                        alt={project['Project Title']}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 96px, 42vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#E0F2FE] to-[#F1F5F9]" />
                    )}
                    
                    <div className="absolute inset-0 bg-[#0B1B2B]/0 group-hover:bg-[#0B1B2B]/5 transition-colors duration-500" />
                    
                    {project.Category && (
                      <span className="hidden md:inline-block absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold bg-white/95 backdrop-blur-sm rounded-full text-[#0B1B2B] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                        {project.Category}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 md:mt-5">
                    <h3 className="text-[15px] font-bold text-[#0B1B2B] group-hover:text-[#0284C7] transition-colors duration-300 line-clamp-2 md:text-[17px]">
                      {project['Project Title']}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-[1.6] text-[#64748B] line-clamp-2 md:mt-2 md:text-[14px]">
                      {project['Short Description']}
                    </p>
                    {project['Client / Role'] && (
                      <p className="hidden md:block mt-2.5 text-[11px] text-[#94A3B8] font-semibold uppercase tracking-[0.15em]">
                        {project['Client / Role']}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-14 md:hidden">
          <Button
            asChild
            variant="outline"
            className="w-full rounded-full border-[#CBD5E1] text-[#475569] hover:bg-[#F8FAFC] hover:border-[#94A3B8] py-5 text-[14px] font-semibold"
          >
            <Link href="/portfolio" className="flex items-center justify-center gap-2">
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}