'use client';

import { motion } from 'framer-motion';
import { TimelineEvent } from '@/types/airtable';

interface TimelineSectionProps {
  events: TimelineEvent[];
}

export function TimelineSection({ events }: TimelineSectionProps) {
  const featuredEvents = events
    .filter((e) => e.Featured)
    .sort((a, b) => parseInt(b.Year) - parseInt(a.Year));

  const displayEvents = featuredEvents.length > 0 ? featuredEvents : events.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));

  if (displayEvents.length === 0) return null;

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        
        {/* Header */}
        <div className="mb-16 md:mb-24 md:flex md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="inline-block text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-4">
              AI Evolution
            </span>
            <h2 className="text-[1.75rem] leading-[1.12] font-bold text-[#0B1B2B] md:text-[2.25rem] md:leading-[1.1]">
              Timeline of Key Milestones
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#64748B] md:text-base md:mt-5">
              Major developments in AI and Healthcare since 2022
            </p>
          </div>
        </div>

        {/* Desktop Timeline — Vertical with spine */}
        <div className="hidden md:block relative">
          {/* Central spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#E2E8F0] -translate-x-1/2" />
          
          <div className="space-y-0">
            {displayEvents.map((event, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex items-start ${isLeft ? 'flex-row' : 'flex-row-reverse'} mb-16 last:mb-0`}
                >
                  {/* Content side */}
                  <div className={`w-1/2 ${isLeft ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className={`inline-block text-left ${isLeft ? 'text-right' : 'text-left'}`}>
                      <span className="text-[13px] font-semibold text-[#0284C7] uppercase tracking-[0.1em]">
                        {event.Category}
                      </span>
                      <h3 className="mt-2 text-[18px] font-bold text-[#0B1B2B] leading-snug">
                        {event.Title}
                      </h3>
                      <p className="mt-3 text-[14px] leading-[1.7] text-[#64748B] max-w-md">
                        {event.Description}
                      </p>
                    </div>
                  </div>

                  {/* Center node */}
                  <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-[#0284C7] ring-4 ring-white" />
                  </div>

                  {/* Year side */}
                  <div className={`w-1/2 ${isLeft ? 'pl-12' : 'pr-12'}`}>
                    <span className={`text-[3rem] font-bold text-[#F1F5F9] leading-none tabular-nums ${isLeft ? 'block' : 'block text-right'}`}>
                      {event.Year}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile Timeline — Vertical stack with left spine */}
        <div className="md:hidden relative pl-8">
          {/* Spine */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-[#E2E8F0]" />
          
          <div className="space-y-10">
            {displayEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Node */}
                <div className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-[#0284C7] ring-3 ring-white" />
                
                {/* Year */}
                <span className="text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.1em]">
                  {event.Year}
                </span>
                
                {/* Category */}
                {event.Category && (
                  <span className="ml-2 text-[11px] font-medium text-[#94A3B8]">
                    {event.Category}
                  </span>
                )}
                
                {/* Title */}
                <h3 className="mt-2 text-[16px] font-bold text-[#0B1B2B] leading-snug">
                  {event.Title}
                </h3>
                
                {/* Description */}
                <p className="mt-2 text-[14px] leading-[1.65] text-[#64748B]">
                  {event.Description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}