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
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo - Circular on Mobile, Rectangular on Desktop */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center lg:justify-start"
          >
            {bioPhoto ? (
              <div className="relative w-64 h-64 lg:w-[320px] lg:h-[400px] lg:aspect-[4/5] rounded-3xl lg:rounded-3xl overflow-hidden bg-neutral-100 shadow-xl mx-auto lg:mx-0">
                <Image
                  src={bioPhoto}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 256px, 320px"
                  priority
                />
              </div>
            ) : (
              <div className="w-64 h-64 lg:w-[320px] lg:h-[400px] rounded-3xl lg:rounded-3xl bg-gradient-to-br from-healthcare-100 to-healthcare-200 flex items-center justify-center shadow-xl mx-auto lg:mx-0">
                <span className="font-serif text-8xl text-healthcare-400">{name.charAt(0)}</span>
              </div>
            )}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8 text-left"
          >
            <div>
              <span className="text-sm font-medium text-healthcare-600 uppercase tracking-wider">
                Introduction
              </span>
              <h2 className="heading-lg mt-3">{aboutTitle}</h2>
            </div>

            {/* Short Preview */}
            <div className="prose prose-lg text-neutral-600 leading-relaxed">
              <p>{previewText}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-4 max-w-xs">
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl border border-healthcare-200 text-healthcare-700 hover:bg-healthcare-50 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="font-medium">Connect on LinkedIn</span>
                </a>
              )}

              <Button
                asChild
                variant="outline"
                className="rounded-2xl py-6 text-base border-healthcare-200 text-healthcare-700 hover:bg-healthcare-50"
              >
                <Link href="/about">
                  Read Full Bio
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}