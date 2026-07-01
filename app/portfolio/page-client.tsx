'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink } from 'lucide-react';
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
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-healthcare-50 via-white to-healthcare-100 py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-medium text-healthcare-600 uppercase tracking-wider">
              My Work
            </span>
            <h1 className="heading-xl mt-4">Portfolio</h1>
            <p className="text-body-lg mt-4 max-w-2xl">
              A collection of AI healthcare projects showcasing innovation in clinical applications,
              research, and digital health transformation.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-neutral-200 bg-white sticky top-20 z-30">
        <div className="container-custom py-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                selectedCategory === null
                  ? 'bg-healthcare-600 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              All Projects
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-healthcare-600 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {filteredPortfolio.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-neutral-500">No projects found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPortfolio.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link
                    href={`/portfolio/${generateSlug(project['Project Title'])}`}
                    className="group block h-full"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden h-full border border-neutral-100 shadow-sm card-hover">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {project.Images?.[0]?.url ? (
                          <Image
                            src={project.Images[0].url}
                            alt={project['Project Title']}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-healthcare-100 to-healthcare-200" />
                        )}
                        {project.Category && (
                          <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm rounded-full text-healthcare-700">
                            {project.Category}
                          </span>
                        )}
                      </div>

                      <div className="p-6">
                        <h3 className="font-serif text-xl font-semibold text-neutral-900 group-hover:text-healthcare-600 transition-colors">
                          {project['Project Title']}
                        </h3>
                        <p className="mt-2 text-neutral-600 line-clamp-2">
                          {project['Short Description']}
                        </p>
                        <div className="mt-4 flex items-center justify-between text-sm text-neutral-500">
                          {project['Completion Date'] && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(project['Completion Date'])}</span>
                            </div>
                          )}
                          {project['Live URL'] && (
                            <span onClick={(e) => e.stopPropagation()} className="text-healthcare-600">
                              <a
                                href={project['Live URL']}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 hover:text-healthcare-700"
                              >
                                View Live
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
