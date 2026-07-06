'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote as QuoteIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quote } from '@/types/airtable';

interface QuotesSectionProps {
  quotes: Quote[];
}

export function QuotesSection({ quotes }: QuotesSectionProps) {
  const featuredQuotes = quotes.filter((q) => q.Featured);
  const allQuotes = featuredQuotes.length > 0 ? featuredQuotes : quotes;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuote = allQuotes[currentIndex];

  // Auto-rotate every 6 seconds
  useEffect(() => {
    if (allQuotes.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allQuotes.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [allQuotes.length]);

  const goToPrev = useCallback(() => setCurrentIndex((prev) => (prev - 1 + allQuotes.length) % allQuotes.length), [allQuotes.length]);
  const goToNext = useCallback(() => setCurrentIndex((prev) => (prev + 1) % allQuotes.length), [allQuotes.length]);

  if (!currentQuote || allQuotes.length === 0) {
    return null;
  }

  return (
    <section className="py-24 md:py-36 bg-[#0B1B2B] relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#0284C7]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-5 md:px-8 relative z-10">
        
        {/* Quote mark — large, decorative */}
        <div className="flex justify-center mb-10 md:mb-14">
          <QuoteIcon className="w-10 h-10 text-[#0284C7]/40 md:w-12 md:h-12" strokeWidth={1.5} />
        </div>

        {/* Quote carousel */}
        <div className="relative min-h-[200px] md:min-h-[240px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center w-full"
            >
              <blockquote className="text-[1.5rem] leading-[1.4] font-medium text-white/95 md:text-[2.25rem] md:leading-[1.35] lg:text-[2.75rem] lg:leading-[1.3]">
                &ldquo;{currentQuote['Quote Text']}&rdquo;
              </blockquote>

              <div className="mt-8 md:mt-10">
                <cite className="not-italic">
                  <span className="text-[14px] font-semibold text-white tracking-wide md:text-[15px]">
                    {currentQuote.Author}
                  </span>
                  {currentQuote['Source / Context'] && (
                    <span className="block text-[13px] text-[#64748B] mt-1.5 md:text-[14px]">
                      {currentQuote['Source / Context']}
                    </span>
                  )}
                </cite>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {allQuotes.length > 1 && (
          <div className="flex items-center justify-center gap-6 mt-12 md:mt-16">
            {/* Prev button */}
            <button
              onClick={goToPrev}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200"
              aria-label="Previous quote"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2.5">
              {allQuotes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 ${
                    idx === currentIndex 
                      ? 'w-6 h-1.5 rounded-full bg-[#0284C7]' 
                      : 'w-1.5 h-1.5 rounded-full bg-white/25 hover:bg-white/40'
                  }`}
                  aria-label={`Go to quote ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={goToNext}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200"
              aria-label="Next quote"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}