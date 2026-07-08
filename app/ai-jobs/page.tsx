import { Metadata } from 'next';
import { getAIJobs } from '@/lib/data';
import Link from 'next/link';
import { MapPin, Briefcase, DollarSign, ArrowUpRight, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import { redirect } from 'next/navigation';
import { JobGate } from '@/components/sections/JobGate';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'AI Healthcare Jobs',
    description: 'Curated high-impact AI jobs in healthcare and life sciences.',
  };
}

interface AIJobsPageProps {
  searchParams: Promise<{ page?: string }>;
}

const JOBS_PER_PAGE = 10;

export default async function AIJobsPage({ searchParams }: AIJobsPageProps) {
  const params = await searchParams;
  const allJobs = await getAIJobs();
  
  const currentPage = Math.max(1, parseInt(params.page || '1', 10));
  const totalPages = Math.ceil(allJobs.length / JOBS_PER_PAGE);
  
  // Redirect if page is out of bounds
  if (currentPage > totalPages && totalPages > 0) {
    redirect('/ai-jobs');
  }
  
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const jobs = allJobs.slice(startIndex, startIndex + JOBS_PER_PAGE);

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <JobGate>
    <div className="min-h-screen bg-[#FDFCFA]">
      
      {/* Page Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <span className="inline-block text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-4">
            Careers
          </span>
          <h1 className="text-[2.5rem] leading-[1.1] font-bold text-[#0B1B2B] md:text-[3.5rem]">
            AI Healthcare Jobs
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-[#64748B] max-w-xl md:text-base">
            Handpicked opportunities in AI, Machine Learning, and Digital Health 
            curated for impact and growth.
          </p>
          <p className="mt-3 text-[13px] text-[#94A3B8] font-medium">
            {allJobs.length} {allJobs.length === 1 ? 'opportunity' : 'opportunities'} available
          </p>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          
          {/* Desktop: Table-style rows */}
          <div className="hidden md:block">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 pb-4 border-b border-[#E2E8F0]">
              <div className="col-span-5">
                <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.15em]">Position</span>
              </div>
              <div className="col-span-2">
                <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.15em]">Company</span>
              </div>
              <div className="col-span-2">
                <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.15em]">Location</span>
              </div>
              <div className="col-span-2">
                <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.15em]">Type</span>
              </div>
              <div className="col-span-1 text-right">
                <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.15em]">Score</span>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-[#F1F5F9]">
              {jobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/ai-jobs/${job.id}`}
                  className="group grid grid-cols-12 gap-4 px-6 py-5 items-center transition-colors duration-200 hover:bg-[#F8FAFC]"
                >
                  {/* Position */}
                  <div className="col-span-5">
                    <h3 className="text-[15px] font-bold text-[#0B1B2B] group-hover:text-[#0284C7] transition-colors duration-300 line-clamp-1">
                      {job['Job Title']}
                    </h3>
                    {job['Salary Range'] && (
                      <p className="text-[12px] text-[#94A3B8] mt-0.5 font-medium">{job['Salary Range']}</p>
                    )}
                  </div>

                  {/* Company */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-[#E0F2FE] flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-3 h-3 text-[#0284C7]" />
                      </div>
                      <span className="text-[14px] font-medium text-[#475569]">{job.Company}</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-1.5 text-[13px] text-[#64748B]">
                      <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" />
                      <span className="line-clamp-1">{job.Location || 'Remote'}</span>
                    </div>
                  </div>

                  {/* Type */}
                  <div className="col-span-2">
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#475569] bg-[#F1F5F9] px-2.5 py-1 rounded-full">
                      <Briefcase className="w-3 h-3 text-[#94A3B8]" />
                      {job['Employment Type'] || 'Full-time'}
                    </span>
                  </div>

                  {/* Score + Arrow */}
                  <div className="col-span-1 flex items-center justify-end gap-3">
                    {job['Score (1-10)'] && (
                      <span className="text-[13px] font-bold text-[#0284C7]">
                        {job['Score (1-10)']}
                      </span>
                    )}
                    <ArrowUpRight className="w-4 h-4 text-[#CBD5E1] group-hover:text-[#0284C7] transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile: Card-based layout */}
          <div className="md:hidden space-y-4">
            {jobs.map((job) => (
              <Link
                key={job.id}
                href={`/ai-jobs/${job.id}`}
                className="group block"
              >
                <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-[#CBD5E1]">
                  
                  {/* Top row: Company + Score */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#E0F2FE] flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-3.5 h-3.5 text-[#0284C7]" />
                      </div>
                      <span className="text-[13px] font-semibold text-[#0284C7]">{job.Company}</span>
                    </div>
                    {job['Score (1-10)'] && (
                      <span className="px-2.5 py-1 text-[11px] font-bold bg-[#E0F2FE] text-[#0284C7] rounded-full">
                        {job['Score (1-10)']}/10
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-[16px] font-bold text-[#0B1B2B] group-hover:text-[#0284C7] transition-colors duration-300 leading-snug">
                    {job['Job Title']}
                  </h3>

                  {/* Meta */}
                  <div className="mt-3 flex flex-wrap gap-3">
                    {job.Location && (
                      <div className="flex items-center gap-1 text-[12px] text-[#64748B] font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" />
                        {job.Location}
                      </div>
                    )}
                    {job['Employment Type'] && (
                      <div className="flex items-center gap-1 text-[12px] text-[#64748B] font-medium">
                        <Briefcase className="w-3.5 h-3.5 text-[#94A3B8]" />
                        {job['Employment Type']}
                      </div>
                    )}
                    {job['Salary Range'] && (
                      <div className="flex items-center gap-1 text-[12px] text-[#64748B] font-medium">
                        <DollarSign className="w-3.5 h-3.5 text-[#94A3B8]" />
                        {job['Salary Range']}
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="mt-4 pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-[#0284C7]">View Details</span>
                    <ArrowUpRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#0284C7] transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {jobs.length === 0 && (
            <div className="text-center py-24">
              <div className="w-16 h-16 rounded-full bg-[#F1F5F9] flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-7 h-7 text-[#94A3B8]" />
              </div>
              <h3 className="text-[16px] font-bold text-[#0B1B2B]">No jobs available</h3>
              <p className="mt-2 text-[14px] text-[#94A3B8]">Check back soon for new opportunities.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              {/* Previous */}
              {currentPage > 1 ? (
                <Link
                  href={`/ai-jobs?page=${currentPage - 1}`}
                  className="w-10 h-10 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Link>
              ) : (
                <span className="w-10 h-10 rounded-full border border-[#F1F5F9] flex items-center justify-center text-[#CBD5E1] cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" />
                </span>
              )}

              {/* Page Numbers */}
              <div className="flex items-center gap-1.5">
                {getPageNumbers().map((page, index) => (
                  typeof page === 'string' ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-[13px] text-[#94A3B8]">
                      {page}
                    </span>
                  ) : (
                    <Link
                      key={page}
                      href={`/ai-jobs?page=${page}`}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all duration-200 ${
                        page === currentPage
                          ? 'bg-[#0284C7] text-white shadow-md shadow-[#0284C7]/15'
                          : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0284C7]'
                      }`}
                    >
                      {page}
                    </Link>
                  )
                ))}
              </div>

              {/* Next */}
              {currentPage < totalPages ? (
                <Link
                  href={`/ai-jobs?page=${currentPage + 1}`}
                  className="w-10 h-10 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all duration-200"
                >
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="w-10 h-10 rounded-full border border-[#F1F5F9] flex items-center justify-center text-[#CBD5E1] cursor-not-allowed">
                  <ChevronRight className="w-4 h-4" />
                </span>
              )}
            </div>
          )}

          {/* Results count */}
          {totalPages > 1 && (
            <p className="text-center mt-4 text-[12px] text-[#94A3B8] font-medium">
              Showing {startIndex + 1}-{Math.min(startIndex + JOBS_PER_PAGE, allJobs.length)} of {allJobs.length} jobs
            </p>
          )}
        </div>
      </section>
    </div>
    </JobGate>
  );
}