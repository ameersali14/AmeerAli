import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Mail, ExternalLink, BookOpen, Award, Users } from 'lucide-react';
import { getSettings, getCuratedReadings } from '@/lib/data';
import { Button } from '@/components/ui/button';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: 'About',
    description: `Learn more about ${settings?.Name || 'Dr. Sarah Chen'} - AI Healthcare expert with extensive experience in clinical AI implementation and digital health transformation.`,
  };
}

export default async function AboutPage() {
  const [settings, curatedReadings] = await Promise.all([
    getSettings(),
    getCuratedReadings(),
  ]);

  const name = settings?.Name || 'Dr. Sarah Chen';
  const bioPhoto = settings?.['Bio Photo']?.[0]?.url;
  const biography = settings?.Biography;
  const linkedinUrl = settings?.['Bio LinkedIn URL'];

  const highlights = [
    {
      icon: Award,
      title: '15+ Years Experience',
      description: 'Leading AI healthcare initiatives across academic and industry settings',
    },
    {
      icon: BookOpen,
      title: '50+ Publications',
      description: 'Peer-reviewed research in top medical and AI journals',
    },
    {
      icon: Users,
      title: 'Global Impact',
      description: 'Consulting for healthcare organizations worldwide',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-healthcare-50 via-white to-healthcare-100 py-16 md:py-24">
        <div className="container-custom">
          <span className="text-sm font-medium text-healthcare-600 uppercase tracking-wider">
            About Me
          </span>
          <h1 className="heading-xl mt-4">{name}</h1>
          <p className="text-body-lg mt-4 max-w-2xl">
            AI Healthcare Expert | Researcher | Speaker | Advisor
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
             {/* Main Bio Image - Better Size */}
{bioPhoto && (
  <div className="relative aspect-[16/10] lg:aspect-[16/9] max-w-4xl mx-auto rounded-3xl overflow-hidden mb-10 shadow-xl">
    <Image
      src={bioPhoto}
      alt={name}
      fill
      className="object-cover"
      sizes="(max-width: 1024px) 100vw, 70vw"
      priority
    />
  </div>
)}

              <div className="prose prose-lg max-w-none">
                {biography ? (
                  <div className="text-neutral-700 leading-relaxed whitespace-pre-line">
                    {biography}
                  </div>
                ) : (
                  <div className="text-neutral-700 leading-relaxed">
                    <p className="mb-6">
                      With over 15 years of experience at the intersection of artificial
                      intelligence and healthcare, I have dedicated my career to bridging
                      cutting-edge technology with compassionate patient care.
                    </p>
                    <p className="mb-6">
                      My journey began in clinical medicine, where I witnessed firsthand the
                      transformative potential of data-driven decision-making. This experience
                      ignited my passion for developing AI solutions that enhance clinical
                      workflows while maintaining the human touch that is essential to
                      healthcare.
                    </p>
                    <p className="mb-6">
                      Today, I work with healthcare organizations, research institutions, and
                      technology companies to implement AI solutions that improve patient outcomes,
                      reduce clinician burnout, and advance the field of digital health.
                    </p>
                    <h2 className="font-serif text-2xl font-semibold text-neutral-900 mt-10 mb-4">
                      Research & Publications
                    </h2>
                    <p>
                      My research focuses on clinical natural language processing, diagnostic
                      AI systems, and the ethical implementation of machine learning in healthcare
                      settings. I have published extensively in both medical and technical
                      journals, always striving to make AI accessible and beneficial to
                      healthcare practitioners.
                    </p>
                  </div>
                )}
              </div>

              {linkedinUrl && (
                <div className="mt-8">
                  <Button
                    asChild
                    variant="outline"
                    className="border-healthcare-200 text-healthcare-700 hover:bg-healthcare-50 rounded-full"
                  >
                    <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4 mr-2" />
                      Connect on LinkedIn
                    </a>
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Highlights */}
              <div className="bg-neutral-50 rounded-2xl p-6">
                <h3 className="font-serif text-xl font-semibold text-neutral-900 mb-6">
                  At a Glance
                </h3>
                <div className="space-y-6">
                  {highlights.map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="p-3 rounded-xl bg-healthcare-50 text-healthcare-600 shrink-0">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900">{item.title}</h4>
                        <p className="text-sm text-neutral-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curated Readings */}
              {curatedReadings.length > 0 && (
                <div className="bg-neutral-50 rounded-2xl p-6">
                  <h3 className="font-serif text-xl font-semibold text-neutral-900 mb-6">
                    Recommended Reading
                  </h3>
                  <div className="space-y-4">
                    {curatedReadings.slice(0, 4).map((reading) => (
                      <a
                        key={reading.id}
                        href={reading.URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="flex gap-3">
                          {reading['Cover Image']?.[0]?.url ? (
                            <div className="relative w-12 h-16 shrink-0 rounded overflow-hidden">
                              <Image
                                src={reading['Cover Image'][0].url}
                                alt={reading.Title}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-16 shrink-0 rounded bg-healthcare-100 flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-healthcare-600" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-neutral-900 group-hover:text-healthcare-600 transition-colors line-clamp-2">
                              {reading.Title}
                            </h4>
                            <p className="text-xs text-neutral-500">{reading.Author}</p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact CTA */}
              <div className="bg-healthcare-600 rounded-2xl p-6 text-white">
                <h3 className="font-serif text-xl font-semibold mb-3">Let us Connect</h3>
                <p className="text-healthcare-100 text-sm mb-4">
                  Interested in collaborating or speaking opportunities?
                </p>
                <Button
                  asChild
                  className="bg-white text-healthcare-700 hover:bg-healthcare-50 rounded-full w-full"
                >
                  <Link href="/contact">
                    <Mail className="w-4 h-4 mr-2" />
                    Get in Touch
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Recommended Reading Section */}
      {curatedReadings.length > 4 && (
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <h2 className="heading-lg text-center mb-12">More Recommended Reading</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {curatedReadings.slice(4).map((reading) => (
                <a
                  key={reading.id}
                  href={reading.URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white rounded-2xl overflow-hidden border border-neutral-100 card-hover"
                >
                  {reading['Cover Image']?.[0]?.url ? (
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={reading['Cover Image'][0].url}
                        alt={reading.Title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 25vw"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[3/4] bg-neutral-100 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-neutral-300" />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-serif font-semibold text-neutral-900 group-hover:text-healthcare-600 transition-colors line-clamp-2">
                      {reading.Title}
                    </h3>
                    <p className="text-sm text-neutral-500 mt-1">{reading.Author}</p>
                    {reading['Why I Recommend It'] && (
                      <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
                        {reading['Why I Recommend It']}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
