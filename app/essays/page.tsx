import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { getEssays } from '@/lib/data';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Essays',
    description: 'Personal essays and reflections on AI healthcare, technology ethics, and the future of medicine.',
  };
}

export default async function EssaysPage() {
  const essays = await getEssays();

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-healthcare-50 via-white to-healthcare-100 py-16 md:py-24">
        <div className="container-custom">
          <span className="text-sm font-medium text-healthcare-600 uppercase tracking-wider">
            Writing
          </span>
          <h1 className="heading-xl mt-4">Essays</h1>
          <p className="text-body-lg mt-4 max-w-2xl">
            Personal reflections and thoughtful explorations on the intersection of AI,
            healthcare, and humanity.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {essays.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-neutral-500">No essays found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {essays.map((essay) => (
                <Link
                  key={essay.id}
                  href={`/essays/${essay.Slug}`}
                  className="group block"
                >
                  <article className="bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100 card-hover h-full">
                    {essay['Cover Image']?.[0]?.url && (
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={essay['Cover Image'][0].url}
                          alt={essay.Title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {essay['Publish Date']
                            ? new Date(essay['Publish Date']).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })
                            : ''}
                        </span>
                        {essay.Featured && (
                          <span className="ml-2 px-2 py-0.5 text-xs bg-healthcare-100 text-healthcare-700 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-neutral-900 group-hover:text-healthcare-600 transition-colors">
                        {essay.Title}
                      </h3>
                      <p className="mt-3 text-neutral-600 line-clamp-3">{essay.Excerpt}</p>
                      <div className="mt-4 flex items-center text-healthcare-600 font-medium">
                        Read Essay
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
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
