import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight, ArrowUpRight } from 'lucide-react';
import { getEssays } from '@/lib/data';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Essays — AI Healthcare Reflections',
    description: 'Personal essays and reflections on AI healthcare, technology ethics, and the future of medicine.',
  };
}

export default async function EssaysPage() {
  const essays = await getEssays();
  const featuredEssay = essays.find((e) => e.Featured);
  const regularEssays = essays.filter((e) => e.id !== featuredEssay?.id);

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      {/* Page Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <span className="inline-block text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-4">
            Writing
          </span>
          <h1 className="text-[2.5rem] leading-[1.1] font-bold text-[#0B1B2B] md:text-[3.5rem]">
            Essays
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-[#64748B] max-w-xl md:text-base">
            Personal reflections and thoughtful explorations on the intersection of AI,
            healthcare, and humanity.
          </p>
        </div>
      </section>

      {/* Featured Essay — Full width hero */}
      {featuredEssay && (
        <section className="pb-12 md:pb-20 bg-white">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <Link
              href={`/essays/${featuredEssay.Slug}`}
              className="group block"
            >
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Image — 7 cols */}
                <div className="lg:col-span-7">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#F1F5F9]">
                    {featuredEssay['Cover Image']?.[0]?.url ? (
                      <Image
                        src={featuredEssay['Cover Image'][0].url}
                        alt={featuredEssay.Title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#E0F2FE] to-[#F1F5F9]" />
                    )}
                    <div className="absolute inset-0 bg-[#0B1B2B]/0 group-hover:bg-[#0B1B2B]/5 transition-colors duration-500" />
                  </div>
                </div>

                {/* Content — 5 cols */}
                <div className="lg:col-span-5">
                  <span className="inline-block px-3 py-1 text-[10px] font-semibold bg-[#E0F2FE] text-[#0284C7] rounded-full uppercase tracking-wider mb-4">
                    Featured Essay
                  </span>
                  
                  <div className="flex items-center gap-2 text-[12px] text-[#94A3B8] mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {featuredEssay['Publish Date']
                        ? new Date(featuredEssay['Publish Date']).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : ''}
                    </span>
                  </div>

                  <h2 className="text-[1.5rem] leading-[1.2] font-bold text-[#0B1B2B] group-hover:text-[#0284C7] transition-colors duration-300 md:text-[1.75rem]">
                    {featuredEssay.Title}
                  </h2>
                  
                  <p className="mt-3 text-[14px] leading-[1.7] text-[#64748B] line-clamp-3 md:text-[15px]">
                    {featuredEssay.Excerpt}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-[13px] font-semibold text-[#0284C7] group-hover:text-[#0369A1] transition-colors">
                    Read Essay
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Essay List */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          {regularEssays.length === 0 && !featuredEssay ? (
            <div className="text-center py-24">
              <p className="text-[15px] text-[#94A3B8]">No essays found.</p>
            </div>
          ) : (
            <div className="space-y-0">
              {regularEssays.map((essay, index) => (
                <Link
                  key={essay.id}
                  href={`/essays/${essay.Slug}`}
                  className="group block"
                >
                  <article className="py-8 md:py-10 border-b border-[#E2E8F0] first:pt-0">
                    <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
                      {/* Date — 2 cols */}
                      <div className="md:col-span-2">
                        <span className="text-[12px] font-medium text-[#94A3B8] uppercase tracking-wider">
                          {essay['Publish Date']
                            ? new Date(essay['Publish Date']).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : ''}
                        </span>
                      </div>

                      {/* Content — 8 cols */}
                      <div className="md:col-span-8">
                        <h3 className="text-[17px] font-bold text-[#0B1B2B] group-hover:text-[#0284C7] transition-colors duration-300 leading-snug md:text-[18px]">
                          {essay.Title}
                        </h3>
                        <p className="mt-2 text-[14px] leading-[1.65] text-[#64748B] line-clamp-2 md:line-clamp-3">
                          {essay.Excerpt}
                        </p>
                      </div>

                      {/* Arrow — 2 cols */}
                      <div className="md:col-span-2 flex justify-end items-start">
                        <div className="w-9 h-9 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#94A3B8] group-hover:border-[#0284C7] group-hover:text-[#0284C7] transition-all duration-300">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}