'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Briefcase, DollarSign, ArrowUpRight, Building2 } from 'lucide-react';
import { AIJob } from '@/types/airtable';

interface FeaturedJobsSectionProps {
  jobs: AIJob[];
}

export function FeaturedJobsSection({ jobs }: FeaturedJobsSectionProps) {
  const featuredJobs = jobs.slice(0, 3);

  if (featuredJobs.length === 0) return null;

  return (
    <section className="py-20 md:py-32 bg-[#FDFCFA]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        
        {/* Section Header — Editorial, left-aligned */}
        <div className="mb-14 md:mb-20 md:flex md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="inline-block text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-4">
              Opportunities
            </span>
            <h2 className="text-[2rem] leading-[1.12] font-bold text-[#0B1B2B] md:text-[2.75rem] md:leading-[1.08]">
              Top AI Healthcare Jobs
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#64748B] md:text-base md:mt-5">
              Curated high-impact roles at the intersection of artificial intelligence and healthcare.
            </p>
          </div>
          
          {/* Desktop link */}
          <Link 
            href="/ai-jobs" 
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-[#0284C7] hover:text-[#0369A1] transition-colors group"
          >
            View all opportunities
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Jobs Grid — Editorial cards with uniform height */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {featuredJobs.map((job, index) => (
            <motion.article
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <Link
                href={`/ai-jobs/${job.id}`}
                className="group flex flex-col h-full"
              >
                <div className="bg-white rounded-2xl p-6 lg:p-7 h-full border border-[#E2E8F0] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#CBD5E1] flex flex-col">
                  
                  {/* Top row — Company + Score */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#E0F2FE] flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-4 h-4 text-[#0284C7]" />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-[#0284C7]">{job.Company}</p>
                        <p className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-[0.1em]">
                          {job['Employment Type'] || 'Full-time'}
                        </p>
                      </div>
                    </div>
                    
                    {job['Score (1-10)'] && (
                      <span className="px-3 py-1.5 text-[11px] font-bold bg-[#E0F2FE] text-[#0284C7] rounded-full">
                        {job['Score (1-10)']}/10
                      </span>
                    )}
                  </div>

                  {/* Job Title */}
                  <h3 className="text-[17px] font-bold text-[#0B1B2B] group-hover:text-[#0284C7] transition-colors duration-300 leading-snug line-clamp-2">
                    {job['Job Title']}
                  </h3>

                  {/* Meta row */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    {job.Location && (
                      <div className="flex items-center gap-1.5 text-[12px] text-[#64748B] font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" />
                        {job.Location}
                      </div>
                    )}
                    {job['Salary Range'] && (
                      <div className="flex items-center gap-1.5 text-[12px] text-[#64748B] font-medium">
                        <DollarSign className="w-3.5 h-3.5 text-[#94A3B8]" />
                        {job['Salary Range']}
                      </div>
                    )}
                  </div>

                  {/* Description — flex-grow pushes CTA to bottom */}
                  <p className="mt-4 text-[13px] leading-[1.65] text-[#64748B] line-clamp-3 flex-grow">
                    {job['Full Job Description']?.slice(0, 160)}...
                  </p>

                  {/* CTA — always at bottom */}
                  <div className="mt-6 pt-5 border-t border-[#F1F5F9] flex items-center justify-between flex-shrink-0">
                    <span className="text-[13px] font-semibold text-[#0284C7] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Details
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#F1F5F9] flex items-center justify-center group-hover:bg-[#E0F2FE] transition-colors duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[#0284C7] transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-14 md:hidden">
          <Button
            asChild
            variant="outline"
            className="w-full rounded-full border-[#CBD5E1] text-[#475569] hover:bg-[#F8FAFC] hover:border-[#94A3B8] py-5 text-[14px] font-semibold"
          >
            <Link href="/ai-jobs" className="flex items-center justify-center gap-2">
              View All AI Jobs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}