import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ExternalLink, BookOpen, Lightbulb } from 'lucide-react';
import { getLearnings } from '@/lib/data';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Learnings',
    description: 'Key insights and lessons from AI healthcare research papers and industry developments.',
  };
}

export default async function LearningsPage() {
  const learnings = await getLearnings();

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-healthcare-50 via-white to-healthcare-100 py-16 md:py-24">
        <div className="container-custom">
          <span className="text-sm font-medium text-healthcare-600 uppercase tracking-wider">
            Writing
          </span>
          <h1 className="heading-xl mt-4">Learnings</h1>
          <p className="text-body-lg mt-4 max-w-2xl">
            Important lessons and key findings from research papers, industry reports, and
            thought-provoking developments in healthcare AI.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {learnings.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-500">No learnings found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learnings.map((learning) => (
                <article
                  key={learning.id}
                  className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100 flex flex-col"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-healthcare-50 text-healthcare-600 shrink-0">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      {learning.Featured && (
                        <span className="inline-block px-2 py-0.5 text-xs bg-healthcare-100 text-healthcare-700 rounded-full mb-2">
                          Featured
                        </span>
                      )}
                      <h3 className="font-serif text-lg font-semibold text-neutral-900 line-clamp-2">
                        {learning.Title}
                      </h3>
                      {learning.Source && (
                        <p className="text-sm text-healthcare-600 mt-1">{learning.Source}</p>
                      )}
                    </div>
                  </div>
                  <p className="mt-4 text-neutral-600 text-sm line-clamp-4 flex-grow">
                    {learning['Key Lessons / Summary']}
                  </p>
                  <div className="mt-4 pt-4 border-t border-neutral-200 flex items-center justify-between">
                    <span className="text-xs text-neutral-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {learning['Publish Date']
                        ? new Date(learning['Publish Date']).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                          })
                        : ''}
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
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
