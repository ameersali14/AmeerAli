import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ExternalLink, ArrowUpRight, Lightbulb } from 'lucide-react';
import { getLearnings } from '@/lib/data';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Learnings — Research Insights',
    description: 'Key insights and lessons from AI healthcare research papers and industry developments.',
  };
}

export default async function LearningsPage() {
  const learnings = await getLearnings();

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      {/* Page Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <span className="inline-block text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-4">
            Research
          </span>
          <h1 className="text-[2.5rem] leading-[1.1] font-bold text-[#0B1B2B] md:text-[3.5rem]">
            Learnings
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-[#64748B] max-w-xl md:text-base">
            Important lessons and key findings from research papers, industry reports, and
            thought-provoking developments in healthcare AI.
          </p>
        </div>
      </section>

      {/* Learnings Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          {learnings.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-[15px] text-[#94A3B8]">No learnings found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {learnings.map((learning) => (
                <article
                  key={learning.id}
                  className="bg-white rounded-2xl p-6 lg:p-8 border border-[#E2E8F0] flex flex-col transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#CBD5E1]"
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-5 h-5 text-[#0284C7]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      {learning.Featured && (
                        <span className="inline-block px-2 py-0.5 text-[10px] font-semibold bg-[#E0F2FE] text-[#0284C7] rounded-full uppercase tracking-wider mb-2">
                          Featured
                        </span>
                      )}
                      <h3 className="text-[15px] font-bold text-[#0B1B2B] leading-snug line-clamp-2">
                        {learning.Title}
                      </h3>
                    </div>
                  </div>

                  {/* Source */}
                  {learning.Source && (
                    <p className="text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.1em] mb-3">
                      {learning.Source}
                    </p>
                  )}

                  {/* Summary */}
                  <p className="text-[13px] leading-[1.65] text-[#64748B] line-clamp-4 flex-grow">
                    {learning['Key Lessons / Summary']}
                  </p>

                  {/* Footer */}
                  <div className="mt-6 pt-5 border-t border-[#F1F5F9] flex items-center justify-between">
                    <span className="text-[11px] text-[#94A3B8] font-medium flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {learning['Publish Date']
                        ? new Date(learning['Publish Date']).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                          })
                        : ''}
                    </span>

                    {learning['White Paper URL'] ? (
                      <a
                        href={learning['White Paper URL']}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#0284C7] hover:text-[#0369A1] transition-colors group"
                      >
                        Read
                        <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    ) : (
                      <span className="text-[12px] text-[#94A3B8] font-medium">Research</span>
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