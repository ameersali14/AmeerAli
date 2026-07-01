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
    'Bridging the gap between cutting-edge artificial intelligence and compassionate patient care. Exploring how technology can transform healthcare outcomes.';
  const ctaText = settings?.['Hero CTA Button Text'] || 'Explore My Work';
  const ctaUrl = settings?.['Hero CTA Button URL'] || '/portfolio';

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
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
        
        {/* Much Lighter Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/25 to-white/15" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
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
            className="heading-xl text-neutral-900 mb-6"
          >
            {heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body-lg mb-10 max-w-2xl text-neutral-800"
          >
            {heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-healthcare-600 hover:bg-healthcare-700 text-white rounded-full px-8"
            >
              <Link href={ctaUrl}>
                {ctaText}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 border-neutral-300 text-neutral-700 hover:bg-neutral-50"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}