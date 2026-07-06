'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail } from 'lucide-react';
import { Settings } from '@/types/airtable';

interface CTASectionProps {
  settings: Settings | null;
}

export function CTASection({ settings }: CTASectionProps) {
  const statement =
    settings?.['Purpose / Sales Statement'] ||
    'I work with leaders and organizations seeking to move beyond AI experimentation and into real operational transformation through workflow redesign and applied AI systems.';

  // Split into headline (first sentence) + body (rest)
  const sentences = statement.split(/(?<=[.!?])\s+/);
  const headline = sentences[0] || 'Ready to Transform?';
  const body = sentences.slice(1).join(' ') || '';

  return (
    <section className="py-24 md:py-36 bg-[#0B1B2B] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#0284C7]/8 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Subtle grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="max-w-3xl mx-auto px-5 md:px-8 relative z-10 md:text-left">
        
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-6 md:mb-8">
            <span className="w-6 h-px bg-[#0284C7] md:w-8" />
            Let us Connect
          </span>
        </motion.div>

        {/* Headline — Short, bold, punchy */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[1.75rem] leading-[1.2] font-bold text-white md:text-[2.5rem] md:leading-[1.15]"
        >
          {headline}
        </motion.h2>

        {/* Body — Regular weight, readable, left-aligned */}
        {body && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-[16px] leading-[1.7] text-[#94A3B8] md:text-[17px] md:leading-[1.75] md:max-w-2xl"
          >
            {body}
          </motion.p>
        )}

        {/* Divider — Left-aligned on desktop */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-16 h-px bg-[#0284C7]/30 my-10 md:my-12 origin-left md:mx-0 mx-auto"
        />

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col gap-3 sm:flex-row sm:gap-4 md:justify-start justify-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-full px-10 py-7 text-[15px] font-semibold shadow-lg shadow-[#0284C7]/25 active:scale-[0.97] transition-all duration-200 group"
          >
            <Link href="/contact" className="flex items-center justify-center gap-2.5">
              <Mail className="w-4 h-4" />
              Get in Touch
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white/[0.06] backdrop-blur-sm border-white/10 text-white hover:bg-white/[0.1] hover:border-white/20 rounded-full px-10 py-7 text-[15px] font-semibold active:scale-[0.97] transition-all duration-200"
          >
            <Link href="/portfolio">View My Work</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}