'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { ExternalLink, ArrowUpRight, Filter } from 'lucide-react';
import { Resource } from '@/types/airtable';

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
    <div className="min-h-screen bg-[#FDFCFA]">
      {/* Page Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <span className="inline-block text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-4">
            Tools & References
          </span>
          <h1 className="text-[2.5rem] leading-[1.1] font-bold text-[#0B1B2B] md:text-[3.5rem]">
            Resources
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-[#64748B] max-w-xl md:text-base">
            Curated collection of tools, frameworks, datasets, and references for AI healthcare
            professionals.
          </p>
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
              All Resources
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

      {/* Resources Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          {filteredResources.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-[15px] text-[#94A3B8]">No resources found in this category.</p>
            </div>
          ) : (
            <div className="space-y-16">
              
              {/* Featured Resources */}
              {featuredResources.length > 0 && (
                <div>
                  <h2 className="text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-8">
                    Featured Resources
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    {featuredResources.map((resource) => (
                      <a
                        key={resource.id}
                        href={resource.URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block bg-white rounded-2xl p-6 lg:p-8 border border-[#E2E8F0] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-[#CBD5E1]"
                      >
                        <div className="flex items-start gap-4">
                          {/* Logo */}
                          {resource['Logo / Image']?.[0]?.url ? (
                            <div className="relative w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-[#F1F5F9]">
                              <Image
                                src={resource['Logo / Image'][0].url}
                                alt={resource['Resource Name']}
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            </div>
                          ) : (
                            <div className="w-14 h-14 shrink-0 rounded-xl bg-[#E0F2FE] flex items-center justify-center text-[#0284C7] text-xl font-bold">
                              {resource['Resource Name'].charAt(0)}
                            </div>
                          )}
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="text-[16px] font-bold text-[#0B1B2B] group-hover:text-[#0284C7] transition-colors line-clamp-1">
                                {resource['Resource Name']}
                              </h3>
                              <ArrowUpRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#0284C7] transition-colors flex-shrink-0" />
                            </div>
                            
                            <span className="inline-block text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.1em] mt-1">
                              {resource.Category}
                            </span>
                            
                            <p className="mt-3 text-[14px] leading-[1.65] text-[#64748B]">
                              {resource.Description}
                            </p>
                            
                            {resource['Extra Details'] && (
                              <p className="mt-2 text-[12px] text-[#94A3B8]">
                                {resource['Extra Details']}
                              </p>
                            )}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* All Resources */}
              {otherResources.length > 0 && (
                <div>
                  {featuredResources.length > 0 && (
                    <h2 className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.2em] mb-8">
                      All Resources
                    </h2>
                  )}
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherResources.map((resource) => (
                      <a
                        key={resource.id}
                        href={resource.URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block bg-white rounded-2xl p-5 border border-[#E2E8F0] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#CBD5E1]"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          {resource['Logo / Image']?.[0]?.url ? (
                            <div className="relative w-10 h-10 shrink-0 rounded-lg overflow-hidden bg-[#F1F5F9]">
                              <Image
                                src={resource['Logo / Image'][0].url}
                                alt={resource['Resource Name']}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 shrink-0 rounded-lg bg-[#F8FAFC] flex items-center justify-center text-[#475569] text-sm font-bold">
                              {resource['Resource Name'].charAt(0)}
                            </div>
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-[14px] font-bold text-[#0B1B2B] group-hover:text-[#0284C7] transition-colors line-clamp-1">
                              {resource['Resource Name']}
                            </h3>
                            <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider">
                              {resource.Category}
                            </span>
                          </div>
                          
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#CBD5E1] group-hover:text-[#0284C7] transition-colors flex-shrink-0" />
                        </div>
                        
                        <p className="text-[13px] leading-[1.6] text-[#64748B] line-clamp-2">
                          {resource.Description}
                        </p>
                      </a>
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