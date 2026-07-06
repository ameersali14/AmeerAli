'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowDown } from 'lucide-react';
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
    <section className="relative min-h-[100dvh] flex flex-col justify-end md:justify-center overflow-hidden bg-[#0B1B2B]">
      {/* Background Image — Dramatic, dark treatment */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Healthcare AI background"
          fill
          className="object-cover object-center opacity-25 md:opacity-30"
          priority
          sizes="100vw"
          quality={90}
        />
        {/* Deep navy overlay with subtle warmth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B2B] via-[#0B1B2B]/80 to-[#0B1B2B]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B2B]/95 via-[#0B1B2B]/60 to-transparent md:from-[#0B1B2B]/90 md:via-[#0B1B2B]/50" />
      </div>

      {/* Subtle ambient glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-[15%] w-[600px] h-[600px] bg-[#0284C7]/8 rounded-full blur-[150px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-5 md:px-8 pb-16 pt-32 md:py-0">
          <div className="max-w-2xl">
            
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em]">
                <span className="w-6 h-px bg-[#0284C7]" />
                AI Healthcare
              </span>
            </motion.div>

            {/* Title — Bold, commanding */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[2.5rem] leading-[1.08] font-bold text-white mb-6 md:text-[4rem] md:leading-[1.05] md:mb-8"
            >
              {heroTitle.split('AI').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="text-[#0284C7]">AI</span>
                  )}
                </span>
              ))}
            </motion.h1>

            {/* Description — Frosted glass card */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-8 md:mb-10"
            >
              <div className="relative rounded-2xl p-6 md:p-8 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] md:rounded-3xl">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0284C7]/[0.04] to-transparent pointer-events-none md:rounded-3xl" />
                <p className="relative text-[15px] leading-[1.75] text-[#94A3B8] md:text-[16px] md:leading-[1.8]">
                  {heroSubtitle}
                </p>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col gap-3 sm:flex-row sm:gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-full px-8 py-7 text-[15px] font-semibold w-full shadow-lg shadow-[#0284C7]/25 active:scale-[0.97] transition-all duration-200 sm:w-auto group"
              >
                <Link href={ctaUrl} className="flex items-center justify-center gap-2.5">
                  {ctaText}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/[0.06] backdrop-blur-sm border-white/10 text-white hover:bg-white/[0.1] hover:border-white/20 rounded-full px-8 py-7 text-[15px] font-semibold w-full active:scale-[0.97] transition-all duration-200 sm:w-auto"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — Minimal, elegant */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}