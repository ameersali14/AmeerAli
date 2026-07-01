'use client';

import { useState, useEffect } from 'react';
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

  if (!currentQuote || allQuotes.length === 0) {
    return null;
  }

  const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + allQuotes.length) % allQuotes.length);
  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % allQuotes.length);

  return (
    <section className="py-16 md:py-24 bg-healthcare-600">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center relative">
          <QuoteIcon className="w-12 h-12 text-healthcare-300 mx-auto mb-8" />

          <div className="relative min-h-[180px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="font-serif text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed"
              >
                {currentQuote['Quote Text']}
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <motion.footer 
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8"
          >
            <cite className="text-healthcare-200 not-italic">
              — {currentQuote.Author}
              {currentQuote['Source / Context'] && (
                <span className="block text-sm mt-1 opacity-75">{currentQuote['Source / Context']}</span>
              )}
            </cite>
          </motion.footer>

          {/* Navigation Dots */}
          {allQuotes.length > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {allQuotes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentIndex 
                      ? 'bg-white scale-110' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}