'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
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
            Selected Work
          </span>
          <h2 className="heading-lg mt-3">Featured Projects</h2>
          <p className="text-body mt-4 max-w-2xl mx-auto">
            Explore my most impactful AI healthcare implementations and research collaborations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col h-full"   // ← Important
            >
              <Link
                href={`/portfolio/${generateSlug(project['Project Title'])}`}
                className="group flex flex-col h-full"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 card-hover flex flex-col h-full">
                  {/* Image - Fixed aspect ratio */}
                  <div className="relative aspect-[16/10] overflow-hidden flex-shrink-0">
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

                  {/* Content - Equal height using flex */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-serif text-xl font-semibold text-neutral-900 group-hover:text-healthcare-600 transition-colors line-clamp-2">
                      {project['Project Title']}
                    </h3>
                    
                    <p className="mt-3 text-neutral-600 line-clamp-3 flex-1">
                      {project['Short Description']}
                    </p>

                    {project['Client / Role'] && (
                      <p className="mt-4 text-sm text-neutral-500 pt-4 border-t border-neutral-100">
                        {project['Client / Role']}
                      </p>
                    )}
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
          className="text-center mt-12"
        >
          <Button
            asChild
            variant="outline"
            className="border-healthcare-200 text-healthcare-700 hover:bg-healthcare-50 rounded-full px-8"
          >
            <Link href="/portfolio">
              View All Projects
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}