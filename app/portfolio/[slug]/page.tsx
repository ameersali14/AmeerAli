import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, ExternalLink, User } from 'lucide-react';
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
    title: project['Project Title'],
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
  const [project, settings] = await Promise.all([
    getPortfolioBySlug(slug),
    getSettings(),
  ]);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Project',
    name: project['Project Title'],
    description: project['Short Description'],
    image: project.Images?.[0]?.url,
    dateCreated: project['Completion Date'],
    creator: {
      '@type': 'Person',
      name: settings?.Name || 'Dr. Sarah Chen',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen">
        {/* Header */}
        <section className="bg-gradient-to-br from-healthcare-50 via-white to-healthcare-100 py-16 md:py-24">
          <div className="container-custom">
            <Link
              href="/portfolio"
              className="inline-flex items-center text-sm text-healthcare-600 hover:text-healthcare-700 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Link>
            <span className="inline-block px-3 py-1 text-sm font-medium text-healthcare-700 bg-healthcare-100 rounded-full mb-4">
              {project.Category || 'Project'}
            </span>
            <h1 className="heading-xl text-neutral-900 mb-4">{project['Project Title']}</h1>
            <p className="text-body-lg max-w-3xl">{project['Short Description']}</p>

            <div className="flex flex-wrap gap-6 mt-8 text-sm text-neutral-600">
              {project['Client / Role'] && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-healthcare-600" />
                  <span>{project['Client / Role']}</span>
                </div>
              )}
              {project['Completion Date'] && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-healthcare-600" />
                  <span>{new Date(project['Completion Date']).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                </div>
              )}
            </div>

            {project['Live URL'] && (
              <Button asChild className="mt-8 bg-healthcare-600 hover:bg-healthcare-700 text-white rounded-full">
                <a href={project['Live URL']} target="_blank" rel="noopener noreferrer">
                  View Live Project
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            )}
          </div>
        </section>

        {/* Image Gallery */}
        {project.Images?.length > 0 && (
          <section className="py-12 bg-white">
            <div className="container-custom">
              <div className="grid gap-4">
                {project.Images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative rounded-2xl overflow-hidden ${
                      index === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={`${project['Project Title']} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-lg prose-neutral">
                <p className="text-lg text-neutral-700 leading-relaxed">
                  {project['Full Description'] || project['Short Description']}
                </p>
              </div>

              {/* Technologies */}
              {project.Technologies?.length > 0 && (
                <div className="mt-12">
                  <h3 className="font-serif text-xl font-semibold text-neutral-900 mb-4">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.Technologies.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-white rounded-full text-sm text-neutral-700 border border-neutral-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-healthcare-50">
          <div className="container-custom text-center">
            <h2 className="heading-md text-neutral-900">Interested in similar projects?</h2>
            <p className="text-body mt-3 mb-6">
              Let me help you transform your healthcare ideas into reality.
            </p>
            <Button asChild variant="outline" className="border-healthcare-200 text-healthcare-700 hover:bg-healthcare-50 rounded-full px-8">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
