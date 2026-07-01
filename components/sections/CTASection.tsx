'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Settings } from '@/types/airtable';

interface CTASectionProps {
  settings: Settings | null;
}

export function CTASection({ settings }: CTASectionProps) {
  const name = settings?.Name || 'Dr. Sarah Chen';
  const statement =
    settings?.['Purpose / Sales Statement'] ||
    'Let us collaborate to transform healthcare through innovative AI solutions.';

  return (
    <section className="section-padding bg-gradient-to-br from-healthcare-50 via-white to-healthcare-100">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="heading-lg text-neutral-900">Let us Connect</h2>
          <p className="mt-6 text-body-lg text-neutral-600">{statement}</p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Button
              asChild
              size="lg"
              className="bg-healthcare-600 hover:bg-healthcare-700 text-white rounded-full px-10"
            >
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-healthcare-200 text-healthcare-700 hover:bg-healthcare-50 rounded-full px-10"
            >
              <Link href="/portfolio">View My Work</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
