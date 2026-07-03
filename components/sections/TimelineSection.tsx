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
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-healthcare-600 uppercase tracking-wider">
            AI Evolution
          </span>
          <h2 className="heading-lg mt-3">Timeline of Key Milestones</h2>
          <p className="text-body mt-4 max-w-2xl mx-auto">
            Major developments in AI and Healthcare since 2022
          </p>
        </div>

        {/* Horizontal Scrollable Timeline */}
        <div className="relative">
          <div className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide md:hidden">
            {displayEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-80 snap-center group"
              >
                <div className="relative bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm transition-all duration-300 group-hover:scale-105">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-healthcare-600 mb-2 tabular-nums">
                      {event.Year}
                    </div>
                    {event.Category && (
                      <span className="inline-block px-4 py-1 text-xs font-medium bg-healthcare-100 text-healthcare-700 rounded-full mb-4">
                        {event.Category}
                      </span>
                    )}
                    <h3 className="font-serif text-xl font-semibold text-neutral-900 mb-3">
                      {event.Title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed line-clamp-4">
                      {event.Description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:block">
            <div className="relative border-l-2 border-healthcare-200 pl-8 max-w-3xl mx-auto">
              {displayEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-12 relative"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-2xl font-semibold text-healthcare-600 tabular-nums">
                      {event.Year}
                    </span>
                    {event.Category && (
                      <span className="px-3 py-1 text-xs font-medium bg-healthcare-100 text-healthcare-700 rounded-full">
                        {event.Category}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {event.Title}
                  </h3>

                  <p className="text-neutral-600 leading-relaxed">
                    {event.Description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}