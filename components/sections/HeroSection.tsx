'use client';

import Image from 'next/image';
import Link from 'next/Link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Settings } from '@/types/airtable';

interface HeroSectionProps {
  settings: Settings | null;
}

export function HeroSection({ settings }: HeroSectionProps) {
  const heroImageFromAirtable = settings?.['Hero Background Image']?.[0]?.url;
  const heroImage = heroImageFromAirtable || '/images/hero-bg.png';

  const heroTitle = settings?.['Hero Title'] || 'Advancing Healthcare Through AI Innovation';
  const heroSubtitle =
    settings?.['Hero Subtitle'] ||
    'Most organizations use AI to automate existing processes. I help leaders rethink work itself. With over 20 years of experience across clinical care, enterprise operations, product innovation, venture investment, and artificial intelligence, I build practical AI systems that eliminate unnecessary work, improve decision-making, and drive measurable operational impact.';
  const ctaText = settings?.['Hero CTA Button Text'] || 'Explore My Work';
  const ctaUrl = settings?.['Hero CTA Button URL'] || '/portfolio';

  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Hero background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30 md:from-white/30 md:via-white/15 md:to-white/5" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 px-4">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
          
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-xl text-white md:text-neutral-900 mb-6 leading-tight"
          >
            {heroTitle}
          </motion.h1>

          {/* White Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-6 md:p-8 mb-10 shadow-xl"
          >
            <p className="text-base md:text-body-lg text-neutral-800 leading-relaxed text-justify">
              {heroSubtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-healthcare-600 hover:bg-healthcare-700 text-white rounded-full px-8 py-6 text-base w-full sm:w-auto"
            >
              <Link href={ctaUrl}>
                {ctaText}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>

            {/* Fixed Learn More Button */}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 text-base border-white text-neutral-900 hover:bg-white hover:text-neutral-900 md:border-neutral-300 md:text-neutral-700 md:hover:bg-neutral-50 w-full sm:w-auto"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center text-white/70 text-xs tracking-widest">
        SCROLL TO EXPLORE
      </div>
    </section>
  );
}