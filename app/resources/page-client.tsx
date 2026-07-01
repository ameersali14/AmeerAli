'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Star, FolderOpen } from 'lucide-react';
import { Resource } from '@/types/airtable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ResourcesPageClientProps {
  resources: Resource[];
  categories: string[];
}

export function ResourcesPageClient({ resources, categories }: ResourcesPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredResources = useMemo(() => {
    if (!selectedCategory) return resources;
    return resources.filter((r) => r.Category === selectedCategory);
  }, [resources, selectedCategory]);

  const featuredResources = filteredResources.filter((r) => r.Featured);
  const otherResources = filteredResources.filter((r) => !r.Featured);

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
              Tools & References
            </span>
            <h1 className="heading-xl mt-4">Resources</h1>
            <p className="text-body-lg mt-4 max-w-2xl">
              Curated collection of tools, frameworks, datasets, and references for AI healthcare
              professionals.
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
              All Resources
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
          {filteredResources.length === 0 ? (
            <div className="text-center py-16">
              <FolderOpen className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-500">No resources found in this category.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {featuredResources.length > 0 && (
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-neutral-900 mb-6 flex items-center gap-2">
                    <Star className="w-5 h-5 text-healthcare-600" />
                    Featured Resources
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {featuredResources.map((resource) => (
                      <motion.a
                        key={resource.id}
                        href={resource.URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group block"
                      >
                        <Card className="h-full bg-gradient-to-br from-healthcare-50 to-white border-healthcare-100 card-hover">
                          <CardHeader className="flex flex-row items-start gap-4">
                            {resource['Logo / Image']?.[0]?.url ? (
                              <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden">
                                <Image
                                  src={resource['Logo / Image'][0].url}
                                  alt={resource['Resource Name']}
                                  fill
                                  className="object-cover"
                                  sizes="64px"
                                />
                              </div>
                            ) : (
                              <div className="w-16 h-16 shrink-0 rounded-lg bg-healthcare-100 flex items-center justify-center text-healthcare-600 font-serif text-2xl">
                                {resource['Resource Name'].charAt(0)}
                              </div>
                            )}
                            <div>
                              <CardTitle className="text-xl group-hover:text-healthcare-600 transition-colors">
                                {resource['Resource Name']}
                              </CardTitle>
                              <CardDescription className="text-healthcare-600 text-sm">
                                {resource.Category}
                              </CardDescription>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-neutral-600">{resource.Description}</p>
                            {resource['Extra Details'] && (
                              <p className="text-sm text-neutral-500 mt-2">
                                {resource['Extra Details']}
                              </p>
                            )}
                            <div className="mt-4 flex items-center text-healthcare-600 font-medium text-sm">
                              Visit Resource
                              <ExternalLink className="w-4 h-4 ml-1" />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}

              {otherResources.length > 0 && (
                <div>
                  {featuredResources.length > 0 && (
                    <h2 className="font-serif text-2xl font-semibold text-neutral-900 mb-6">
                      All Resources
                    </h2>
                  )}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherResources.map((resource) => (
                      <motion.a
                        key={resource.id}
                        href={resource.URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group block"
                      >
                        <Card className="h-full card-hover">
                          <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            {resource['Logo / Image']?.[0]?.url ? (
                              <div className="relative w-12 h-12 shrink-0 rounded-lg overflow-hidden">
                                <Image
                                  src={resource['Logo / Image'][0].url}
                                  alt={resource['Resource Name']}
                                  fill
                                  className="object-cover"
                                  sizes="48px"
                                />
                              </div>
                            ) : (
                              <div className="w-12 h-12 shrink-0 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500 font-serif text-xl">
                                {resource['Resource Name'].charAt(0)}
                              </div>
                            )}
                            <div className="flex-1">
                              <CardTitle className="text-lg group-hover:text-healthcare-600 transition-colors line-clamp-1">
                                {resource['Resource Name']}
                              </CardTitle>
                              <span className="text-xs text-neutral-500">{resource.Category}</span>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-sm text-neutral-600 line-clamp-2">
                              {resource.Description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
