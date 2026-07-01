'use client';

import { motion } from 'framer-motion';
import { Lightbulb, ExternalLink, BookOpen } from 'lucide-react';
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
    <section className="section-padding bg-neutral-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-healthcare-600 uppercase tracking-wider">
            Key Learnings
          </span>
          <h2 className="heading-lg mt-3">Insights from Research</h2>
          <p className="text-body mt-4 max-w-2xl mx-auto">
            Important lessons and findings from recent research papers and industry developments.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredLearnings.map((learning, index) => (
            <motion.div
              key={learning.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-healthcare-50 text-healthcare-600 shrink-0">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-semibold text-neutral-900 line-clamp-2">
                    {learning.Title}
                  </h3>
                  {learning.Source && (
                    <p className="text-sm text-healthcare-600 mt-1">{learning.Source}</p>
                  )}
                  <p className="mt-3 text-neutral-600 text-sm line-clamp-3">
                    {learning['Key Lessons / Summary']}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-neutral-500">
                      {formatDate(learning['Publish Date'])}
                    </span>
                    {learning['White Paper URL'] && (
                      <a
                        href={learning['White Paper URL']}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-healthcare-600 hover:text-healthcare-700 font-medium"
                      >
                        Read Paper
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            href="/learnings"
            className="inline-flex items-center text-healthcare-600 hover:text-healthcare-700 font-medium transition-colors"
          >
            View All Learnings
            <BookOpen className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
