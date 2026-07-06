'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Linkedin } from 'lucide-react';
import { Settings } from '@/types/airtable';

interface AboutSectionProps {
  settings: Settings | null;
}

export function AboutSection({ settings }: AboutSectionProps) {
  const bioPhoto = settings?.['Bio Photo']?.[0]?.url;
  const aboutTitle = settings?.['About Title'] || 'About Me';
  const fullBiography = settings?.Biography || '';
  const linkedinUrl = settings?.['Bio LinkedIn URL'];
  const name = settings?.Name || 'Ameer Ali';

  const previewText = fullBiography 
    ? fullBiography.split('\n\n').slice(0, 2).join('\n\n').slice(0, 380) + '...'
    : 'With over 15 years of experience at the intersection of artificial intelligence and healthcare, I have dedicated my career to bridging cutting-edge technology with compassionate patient care.';

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Photo — 5 cols, editorial treatment */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {bioPhoto ? (
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#F1F5F9]">
                  <Image
                    src={bioPhoto}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    priority
                  />
                </div>
              ) : (
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-[#E0F2FE] to-[#F1F5F9] flex items-center justify-center">
                  <span className="text-[8rem] font-bold text-[#0284C7]/20 leading-none">
                    {name.charAt(0)}
                  </span>
                </div>
              )}
              
              {/* Decorative accent line */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-[#0284C7]/20 rounded-2xl -z-10 hidden lg:block" />
            </div>
          </motion.div>

          {/* Content — 7 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 lg:pt-8"
          >
            <span className="inline-block text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-4">
              Introduction
            </span>
            
            <h2 className="text-[1.75rem] leading-[1.15] font-bold text-[#0B1B2B] md:text-[2.25rem] md:leading-[1.1]">
              {aboutTitle}
            </h2>

            {/* Bio text — warm, readable */}
            <div className="mt-6 md:mt-8">
              <p className="text-[15px] leading-[1.75] text-[#475569] md:text-[16px] md:leading-[1.8]">
                {previewText}
              </p>
            </div>

            {/* Divider */}
            <div className="my-8 md:my-10 h-px bg-[#E2E8F0]" />

            {/* Actions — Horizontal on desktop, stacked on mobile */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button
                asChild
                className="bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-full px-7 py-6 text-[14px] font-semibold shadow-lg shadow-[#0284C7]/15 active:scale-[0.97] transition-all duration-200 group"
              >
                <Link href="/about" className="flex items-center justify-center gap-2.5">
                  Read Full Bio
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full border border-[#CBD5E1] text-[#475569] hover:bg-[#F8FAFC] hover:border-[#94A3B8] transition-all duration-200 text-[14px] font-semibold"
                >
                  <Linkedin className="w-4 h-4 text-[#0284C7]" />
                  Connect on LinkedIn
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}