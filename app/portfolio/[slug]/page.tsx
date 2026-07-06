import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, ExternalLink, User, ArrowRight } from 'lucide-react';
import { getPortfolio, getPortfolioBySlug, getSettings } from '@/lib/data';
import { generateSlug } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface PortfolioDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const portfolio = await getPortfolio();
  return portfolio.map((p) => ({
    slug: generateSlug(p['Project Title']),
  }));
}

export async function generateMetadata({ params }: PortfolioDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPortfolioBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project['Project Title']} — Portfolio`,
    description: project['Short Description'],
    openGraph: {
      title: project['Project Title'],
      description: project['Short Description'],
      images: project.Images?.[0]?.url ? [{ url: project.Images[0].url }] : [],
    },
  };
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { slug } = await params;
  const [project, settings, allPortfolio] = await Promise.all([
    getPortfolioBySlug(slug),
    getSettings(),
    getPortfolio(),
  ]);

  if (!project) {
    notFound();
  }

  // Get related projects (same category, exclude current)
  const relatedProjects = allPortfolio
    .filter((p) => p.Category === project.Category && p.id !== project.id)
    .slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Project',
    name: project['Project Title'],
    description: project['Short Description'],
    image: project.Images?.[0]?.url,
    dateCreated: project['Completion Date'],
    creator: {
      '@type': 'Person',
      name: settings?.Name || 'Ameer Ali',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-[#FDFCFA]">
        
        {/* Back Link — Floating above hero */}
        <div className="fixed top-24 left-5 md:left-8 z-30 hidden md:block">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#64748B] hover:text-[#0284C7] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Portfolio
          </Link>
        </div>

        {/* Hero Section — Full bleed image or gradient */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-white">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            {/* Mobile back link */}
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-[#64748B] hover:text-[#0284C7] transition-colors mb-6 md:hidden"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>

            {/* Category */}
            <span className="inline-block px-3.5 py-1.5 text-[11px] font-semibold bg-[#E0F2FE] text-[#0284C7] rounded-full mb-5">
              {project.Category || 'Project'}
            </span>

            {/* Title */}
            <h1 className="text-[2rem] leading-[1.1] font-bold text-[#0B1B2B] md:text-[3rem] md:leading-[1.08] max-w-4xl">
              {project['Project Title']}
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-[16px] leading-[1.7] text-[#64748B] max-w-2xl md:text-[17px]">
              {project['Short Description']}
            </p>

            {/* Meta row */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              {project['Client / Role'] && (
                <div className="flex items-center gap-2 text-[13px] text-[#475569] font-medium">
                  <User className="w-4 h-4 text-[#0284C7]" />
                  {project['Client / Role']}
                </div>
              )}
              {project['Completion Date'] && (
                <div className="flex items-center gap-2 text-[13px] text-[#475569] font-medium">
                  <Calendar className="w-4 h-4 text-[#0284C7]" />
                  {new Date(project['Completion Date']).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                </div>
              )}
            </div>

            {/* Live URL CTA */}
            {project['Live URL'] && (
              <div className="mt-8">
                <a
                  href={project['Live URL']}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-full px-7 py-3.5 text-[14px] font-semibold shadow-lg shadow-[#0284C7]/20 transition-all duration-200 group"
                >
                  View Live Project
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Featured Image — Full bleed, cinematic */}
        {project.Images?.[0]?.url && (
          <section className="bg-white">
            <div className="max-w-7xl mx-auto px-5 md:px-8 pb-12 md:pb-16">
              <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-[#F1F5F9]">
                <Image
                  src={project.Images[0].url}
                  alt={project['Project Title']}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>
          </section>
        )}

        {/* Content + Gallery Grid */}
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              
              {/* Main Content — 8 cols */}
              <div className="lg:col-span-8">
                {/* Full Description */}
                <div className="bg-white rounded-2xl p-6 md:p-10 border border-[#E2E8F0]">
                  <h2 className="text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-6">
                    Project Overview
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-[15px] leading-[1.8] text-[#475569] md:text-[16px]">
                      {project['Full Description'] || project['Short Description']}
                    </p>
                  </div>
                </div>

                {/* Additional Images */}
                {project.Images && project.Images.length > 1 && (
                  <div className="mt-8 grid gap-4">
                    {project.Images.slice(1).map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#F1F5F9]"
                      >
                        <Image
                          src={image.url}
                          alt={`${project['Project Title']} — Image ${index + 2}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 66vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar — 4 cols */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Technologies */}
                {project.Technologies?.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
                    <h3 className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.15em] mb-4">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.Technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-[#F8FAFC] rounded-lg text-[13px] text-[#475569] font-medium border border-[#E2E8F0]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project Stats */}
                <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
                  <h3 className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.15em] mb-4">
                    Details
                  </h3>
                  <div className="space-y-4">
                    {project['Client / Role'] && (
                      <div>
                        <p className="text-[11px] text-[#94A3B8] uppercase tracking-wider mb-1">Role</p>
                        <p className="text-[14px] font-medium text-[#0B1B2B]">{project['Client / Role']}</p>
                      </div>
                    )}
                    {project['Completion Date'] && (
                      <div>
                        <p className="text-[11px] text-[#94A3B8] uppercase tracking-wider mb-1">Completed</p>
                        <p className="text-[14px] font-medium text-[#0B1B2B]">
                          {new Date(project['Completion Date']).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                        </p>
                      </div>
                    )}
                    {project.Category && (
                      <div>
                        <p className="text-[11px] text-[#94A3B8] uppercase tracking-wider mb-1">Category</p>
                        <p className="text-[14px] font-medium text-[#0B1B2B]">{project.Category}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-16 md:py-24 bg-white border-t border-[#E2E8F0]">
            <div className="max-w-7xl mx-auto px-5 md:px-8">
              <h2 className="text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-8">
                More Projects
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {relatedProjects.map((related) => (
                  <Link
                    key={related.id}
                    href={`/portfolio/${generateSlug(related['Project Title'])}`}
                    className="group block"
                  >
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#F1F5F9] mb-4">
                      {related.Images?.[0]?.url ? (
                        <Image
                          src={related.Images[0].url}
                          alt={related['Project Title']}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#E0F2FE] to-[#F1F5F9]" />
                      )}
                      <div className="absolute inset-0 bg-[#0B1B2B]/0 group-hover:bg-[#0B1B2B]/5 transition-colors duration-500" />
                    </div>
                    <h3 className="text-[16px] font-bold text-[#0B1B2B] group-hover:text-[#0284C7] transition-colors">
                      {related['Project Title']}
                    </h3>
                    <p className="mt-1 text-[13px] text-[#64748B] line-clamp-2">
                      {related['Short Description']}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Page CTA */}
        <section className="py-20 md:py-28 bg-[#0B1B2B] relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#0284C7]/8 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-3xl mx-auto px-5 md:px-8 relative z-10 text-center">
            <h2 className="text-[1.75rem] leading-[1.2] font-bold text-white md:text-[2.25rem]">
              Interested in similar work?
            </h2>
            <p className="mt-4 text-[15px] text-[#94A3B8] md:text-[16px]">
              Let me help you transform your healthcare ideas into reality.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-full px-8 py-4 text-[14px] font-semibold shadow-lg shadow-[#0284C7]/25 transition-all duration-200 group"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}