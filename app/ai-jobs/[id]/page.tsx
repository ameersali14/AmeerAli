import { Metadata } from 'next';
import { getAIJobById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, MapPin, Briefcase, DollarSign, Calendar, Building2, ArrowRight } from 'lucide-react';
import { JobGate } from '@/components/sections/JobGate';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const job = await getAIJobById(id);
  
  return {
    title: job ? `${job['Job Title']} — ${job.Company}` : 'AI Job Details',
    description: job?.['Short Description'] || 'AI Healthcare Job Details',
  };
}

export default async function AIJobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getAIJobById(id);

  if (!job) notFound();

  // Safe extraction for AI fields
  const getValue = (field: any): string => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    if (field.value) return field.value;
    return String(field);
  };

  const keyCapabilities = getValue(job['Key Capabilities']);
  const companyInsights = getValue(job['Company Strategy Insights']);
  const score = getValue(job['Score (1-10)']);

  return (
    <JobGate>
      <div className="min-h-screen bg-[#FDFCFA]">
        
        {/* Floating Back Link — Desktop */}
        <div className="fixed top-24 left-5 md:left-8 z-30 hidden md:block">
          <Link
            href="/ai-jobs"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#64748B] hover:text-[#0284C7] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Jobs
          </Link>
        </div>

        {/* Hero Header */}
        <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-white">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            
            {/* Mobile back link */}
            <Link
              href="/ai-jobs"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-[#64748B] hover:text-[#0284C7] transition-colors mb-6 md:hidden"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>

            <div className="md:flex md:items-start md:justify-between gap-8">
              <div className="max-w-3xl">
                {/* Company row */}
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-[#E0F2FE] flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-[#0284C7]" />
                  </div>
                  <span className="text-[14px] font-semibold text-[#0284C7]">{job.Company}</span>
                  {job['Employment Type'] && (
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-[0.1em]">
                      • {job['Employment Type']}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-[2rem] leading-[1.1] font-bold text-[#0B1B2B] md:text-[2.75rem] md:leading-[1.08]">
                  {job['Job Title']}
                </h1>

                {/* Meta row */}
                <div className="mt-6 flex flex-wrap items-center gap-5">
                  {job.Location && (
                    <div className="flex items-center gap-1.5 text-[13px] text-[#64748B] font-medium">
                      <MapPin className="w-4 h-4 text-[#94A3B8]" />
                      {job.Location}
                    </div>
                  )}
                  {job['Salary Range'] && (
                    <div className="flex items-center gap-1.5 text-[13px] text-[#64748B] font-medium">
                      <DollarSign className="w-4 h-4 text-[#94A3B8]" />
                      {job['Salary Range']}
                    </div>
                  )}
                  {job['Posted Date / Time'] && (
                    <div className="flex items-center gap-1.5 text-[13px] text-[#64748B] font-medium">
                      <Calendar className="w-4 h-4 text-[#94A3B8]" />
                      Posted {job['Posted Date / Time']}
                    </div>
                  )}
                </div>
              </div>

              {/* Score + CTA — Desktop */}
              <div className="hidden md:flex flex-col items-end gap-4 mt-2">
                {score && (
                  <div className="text-center">
                    <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.15em]">Score</span>
                    <div className="text-[2.5rem] font-bold text-[#0284C7] leading-none mt-1">{score}<span className="text-[16px] text-[#94A3B8]">/10</span></div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Score + Apply CTA */}
            <div className="mt-8 md:hidden flex items-center justify-between">
              {score && (
                <div className="flex items-baseline gap-1">
                  <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.15em] mr-2">Score</span>
                  <span className="text-[1.75rem] font-bold text-[#0284C7]">{score}</span>
                  <span className="text-[13px] text-[#94A3B8]">/10</span>
                </div>
              )}
            </div>

            {/* Apply Button — Full width on mobile, inline on desktop */}
            {job['Job Link'] && (
              <div className="mt-8 md:mt-10">
                <a
                  href={job['Job Link']}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-full px-8 py-4 text-[14px] font-semibold shadow-lg shadow-[#0284C7]/20 transition-all duration-200 group w-full md:w-auto"
                >
                  Apply for this Role
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Content + Sidebar */}
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              
              {/* Main Content — 8 cols */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Job Description */}
                {job['Full Job Description'] && (
                  <div className="bg-white rounded-2xl p-6 md:p-10 border border-[#E2E8F0]">
                    <h2 className="text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-6">
                      Job Description
                    </h2>
                    <div className="prose prose-slate max-w-none">
                      <div className="text-[15px] leading-[1.8] text-[#475569] md:text-[16px] whitespace-pre-wrap">
                        {job['Full Job Description']}
                      </div>
                    </div>
                  </div>
                )}

                {/* Key Capabilities */}
                {keyCapabilities && (
                  <div className="bg-white rounded-2xl p-6 md:p-10 border border-[#E2E8F0]">
                    <h2 className="text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-6">
                      Key Capabilities
                    </h2>
                    <div className="text-[15px] leading-[1.8] text-[#475569] md:text-[16px] whitespace-pre-wrap">
                      {keyCapabilities}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar — 4 cols */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Job Details Card */}
                <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
                  <h3 className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.15em] mb-5">
                    Job Details
                  </h3>
                  <div className="space-y-4">
                    {job.Location && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[#94A3B8] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[11px] text-[#94A3B8] uppercase tracking-wider mb-0.5">Location</p>
                          <p className="text-[14px] font-medium text-[#0B1B2B]">{job.Location}</p>
                        </div>
                      </div>
                    )}
                    {job['Employment Type'] && (
                      <div className="flex items-start gap-3">
                        <Briefcase className="w-4 h-4 text-[#94A3B8] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[11px] text-[#94A3B8] uppercase tracking-wider mb-0.5">Employment Type</p>
                          <p className="text-[14px] font-medium text-[#0B1B2B]">{job['Employment Type']}</p>
                        </div>
                      </div>
                    )}
                    {job['Salary Range'] && (
                      <div className="flex items-start gap-3">
                        <DollarSign className="w-4 h-4 text-[#94A3B8] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[11px] text-[#94A3B8] uppercase tracking-wider mb-0.5">Salary Range</p>
                          <p className="text-[14px] font-medium text-[#0B1B2B]">{job['Salary Range']}</p>
                        </div>
                      </div>
                    )}
                    {job['Posted Date / Time'] && (
                      <div className="flex items-start gap-3">
                        <Calendar className="w-4 h-4 text-[#94A3B8] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[11px] text-[#94A3B8] uppercase tracking-wider mb-0.5">Posted</p>
                          <p className="text-[14px] font-medium text-[#0B1B2B]">{job['Posted Date / Time']}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Company Insights */}
                {companyInsights && (
                  <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
                    <h3 className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.15em] mb-4">
                      Company Insights
                    </h3>
                    <p className="text-[14px] leading-[1.7] text-[#64748B]">
                      {companyInsights}
                    </p>
                  </div>
                )}

                {/* Apply CTA — Sidebar */}
                {job['Job Link'] && (
                  <a
                    href={job['Job Link']}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-2xl px-6 py-4 text-[14px] font-semibold shadow-lg shadow-[#0284C7]/20 transition-all duration-200 group"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Apply Now
                      <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA — Explore More Jobs */}
        <section className="py-16 md:py-24 bg-white border-t border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-5 md:px-8 text-center">
            <h2 className="text-[1.5rem] leading-[1.2] font-bold text-[#0B1B2B] md:text-[2rem]">
              Explore More Opportunities
            </h2>
            <p className="mt-3 text-[15px] text-[#64748B] max-w-md mx-auto">
              Discover more AI healthcare roles curated for impact and growth.
            </p>
            <div className="mt-8">
              <Link
                href="/ai-jobs"
                className="inline-flex items-center gap-2.5 bg-[#0B1B2B] hover:bg-[#1e293b] text-white rounded-full px-8 py-4 text-[14px] font-semibold transition-all duration-200 group"
              >
                Browse All Jobs
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </JobGate>
  );
}