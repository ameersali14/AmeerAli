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
  const biography = settings?.Biography || '';
  const linkedinUrl = settings?.['Bio LinkedIn URL'];
  const name = settings?.Name || 'Ameer Ali';

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {bioPhoto ? (
              <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden bg-neutral-100 shadow-xl">
                <Image
                  src={bioPhoto}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  priority
                />
              </div>
            ) : (
              <div className="aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-3xl bg-gradient-to-br from-healthcare-100 to-healthcare-200 flex items-center justify-center shadow-xl">
                <span className="font-serif text-7xl text-healthcare-400">{name.charAt(0)}</span>
              </div>
            )}

            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-52 h-52 bg-healthcare-50 rounded-3xl -z-10 hidden lg:block" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <span className="text-sm font-medium text-healthcare-600 uppercase tracking-wider">
                Introduction
              </span>
              <h2 className="heading-lg mt-3">{aboutTitle}</h2>
            </div>

            {/* Justified Biography Text */}
            <div className="prose prose-lg text-neutral-600 leading-relaxed text-justify">
              {biography ? (
                <p className="text-justify">{biography}</p>
              ) : (
                <p className="text-justify">
                  With over 15 years of experience at the intersection of artificial intelligence and
                  healthcare, I have dedicated my career to bridging cutting-edge technology with
                  compassionate patient care. My work spans clinical AI implementation, research
                  collaborations, and thought leadership in digital health transformation.
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-healthcare-600 hover:text-healthcare-700 transition-colors group"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="font-medium group-hover:underline">Connect on LinkedIn</span>
                </a>
              )}

              <Button
                asChild
                variant="outline"
                className="border-healthcare-200 text-healthcare-700 hover:bg-healthcare-50 rounded-full px-8 py-6 text-base"
              >
                <Link href="/about">
                  Read More
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