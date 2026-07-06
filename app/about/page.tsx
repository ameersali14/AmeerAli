import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Mail, BookOpen, ArrowRight } from 'lucide-react';
import { getSettings, getCuratedReadings } from '@/lib/data';
import { Button } from '@/components/ui/button';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: `About — ${settings?.Name || 'Ameer Ali'}`,
    description: `Learn more about ${settings?.Name || 'Ameer Ali'} — AI Healthcare expert with extensive experience in clinical AI implementation and digital health transformation.`,
  };
}

export default async function AboutPage() {
  const [settings, curatedReadings] = await Promise.all([
    getSettings(),
    getCuratedReadings(),
  ]);

  const name = settings?.Name || 'Ameer Ali';
  const bioPhoto = settings?.['Bio Photo']?.[0]?.url;
  const biography = settings?.Biography;
  const linkedinUrl = settings?.['Bio LinkedIn URL'];

  const highlights = [
    { stat: '20+', label: 'Years Experience' },
    { stat: '28', label: 'Enterprise Apps' },
    { stat: '$2.25B+', label: 'Annual Flow' },
    { stat: '$36M+', label: 'Capital Evaluated' },
    { stat: '$30M+', label: 'Revenue Impact' },
    { stat: 'Millions', label: 'Cost Savings' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      {/* Page Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <span className="inline-block text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-4">
            About Me
          </span>
          <h1 className="text-[2.5rem] leading-[1.1] font-bold text-[#0B1B2B] md:text-[3.5rem]">
            {name}
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-[#64748B] max-w-xl md:text-base">
            AI Transformation Executive | Enterprise Workflow Innovator | Healthcare & Operations Leader
          </p>
        </div>
      </section>

      {/* Bio + Sidebar */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            
            {/* Main Content — 8 cols */}
            <div className="lg:col-span-8">
              {/* Photo */}
              {bioPhoto && (
                <div className="relative aspect-[4/3] max-w-lg rounded-2xl overflow-hidden bg-[#F1F5F9] mb-10">
                  <Image
                    src={bioPhoto}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              )}

              {/* Biography */}
              <div className="max-w-2xl">
                {biography ? (
                  <div className="text-[15px] leading-[1.8] text-[#475569] md:text-[16px] whitespace-pre-line">
                    {biography}
                  </div>
                ) : (
                  <div className="text-[15px] leading-[1.8] text-[#475569] md:text-[16px]">
                    <p className="mb-6">
                      With over 15 years of experience at the intersection of artificial
                      intelligence and healthcare, I have dedicated my career to bridging
                      cutting-edge technology with compassionate patient care.
                    </p>
                    <p>
                      Most organizations use AI to automate existing processes. I help leaders
                      rethink work itself — eliminating unnecessary work, improving decision-making,
                      and driving measurable operational impact.
                    </p>
                  </div>
                )}
              </div>

              {/* LinkedIn CTA */}
              {linkedinUrl && (
                <div className="mt-10">
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-[#CBD5E1] text-[#475569] hover:bg-[#F8FAFC] hover:border-[#94A3B8] transition-all duration-200 text-[14px] font-semibold"
                  >
                    <Linkedin className="w-4 h-4 text-[#0284C7]" />
                    Connect on LinkedIn
                  </a>
                </div>
              )}
            </div>

            {/* Sidebar — 4 cols */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Stats Grid */}
              <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
                <h3 className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.15em] mb-6">
                  At a Glance
                </h3>
                <div className="grid grid-cols-2 gap-5">
                  {highlights.map((item) => (
                    <div key={item.label}>
                      <div className="text-[1.25rem] font-bold text-[#0B1B2B] md:text-[1.5rem]">
                        {item.stat}
                      </div>
                      <div className="text-[11px] text-[#94A3B8] mt-1 leading-tight">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-[#0B1B2B] rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0284C7]/10 rounded-full blur-[60px]" />
                <div className="relative z-10">
                  <h3 className="text-[16px] font-bold text-white mb-2">
                    Let us Connect
                  </h3>
                  <p className="text-[13px] leading-[1.6] text-[#94A3B8] mb-5">
                    I work with leaders seeking real operational transformation through workflow redesign and applied AI systems.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 w-full bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-full py-3 text-[13px] font-semibold transition-colors duration-200"
                  >
                    <Mail className="w-4 h-4" />
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Readings */}
      {curatedReadings.length > 0 && (
        <section className="py-16 md:py-24 bg-white border-t border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="mb-12">
              <h2 className="text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-4">
                Reading List
              </h2>
              <p className="text-[15px] text-[#64748B] max-w-xl">
                Books and articles that have shaped my thinking on AI, healthcare, and building meaningful technology.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {curatedReadings.map((reading) => (
                <a
                  key={reading.id}
                  href={reading.URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#F1F5F9] mb-4">
                    {reading['Cover Image']?.[0]?.url ? (
                      <Image
                        src={reading['Cover Image'][0].url}
                        alt={reading.Title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#E0F2FE] to-[#F1F5F9] flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-[#94A3B8]" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-[#0B1B2B]/0 group-hover:bg-[#0B1B2B]/5 transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-[14px] font-bold text-[#0B1B2B] group-hover:text-[#0284C7] transition-colors leading-snug line-clamp-2">
                    {reading.Title}
                  </h3>
                  
                  <p className="mt-1 text-[12px] text-[#94A3B8]">
                    {reading.Author}
                  </p>
                  
                  {reading['Why I Recommend It'] && (
                    <p className="mt-2 text-[12px] leading-[1.5] text-[#64748B] line-clamp-2">
                      {reading['Why I Recommend It']}
                    </p>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-[#0B1B2B] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#0284C7]/8 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto px-5 md:px-8 relative z-10">
          <h2 className="text-[1.75rem] leading-[1.2] font-bold text-white md:text-[2.25rem]">
            Ready to transform your operations?
          </h2>
          <p className="mt-4 text-[15px] text-[#94A3B8] md:text-[16px] max-w-xl">
            I help organizations move beyond AI experimentation into real operational transformation.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-full px-8 py-4 text-[14px] font-semibold shadow-lg shadow-[#0284C7]/25 transition-all duration-200 group"
            >
              Start a Conversation
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}