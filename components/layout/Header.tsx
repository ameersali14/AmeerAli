'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Settings } from '@/types/airtable';

interface HeaderProps {
  settings: Settings | null;
}

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Portfolio', href: '/portfolio' },
  {
    name: 'Writing',
    href: '#',
    children: [
      { name: 'Articles', href: '/articles' },
      { name: 'Essays', href: '/essays' },
      { name: 'AI News', href: '/ai-news' },
      { name: 'Learnings', href: '/learnings' },
    ],
  },
  { name: 'Resources', href: '/resources' },
  { name: 'Videos', href: '/videos' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Header({ settings }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-semibold text-neutral-900">
              {settings?.Name || 'Dr. Sarah Chen'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <button
                    className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                      item.children.some((child) => pathname === child.href)
                        ? 'text-healthcare-600'
                        : 'text-neutral-700 hover:text-healthcare-600'
                    }`}
                  >
                    {item.name}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? 'text-healthcare-600'
                        : 'text-neutral-700 hover:text-healthcare-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.children && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 pt-2"
                      >
                        <div className="bg-white rounded-lg shadow-lg border border-neutral-100 py-2 min-w-[160px]">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className={`block px-4 py-2 text-sm transition-colors ${
                                pathname === child.href
                                  ? 'bg-healthcare-50 text-healthcare-600'
                                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-healthcare-600'
                              }`}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <Button asChild className="bg-healthcare-600 hover:bg-healthcare-700 text-white rounded-full px-6">
              <Link href={settings?.['Hero CTA Button URL'] || '/contact'}>
                {settings?.['Hero CTA Button Text'] || 'Get in Touch'}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-700"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-neutral-100"
          >
            <div className="container-custom py-4">
              {navigation.map((item) => (
                <div key={item.name} className="py-2">
                  {item.children ? (
                    <>
                      <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                        {item.name}
                      </p>
                      <div className="pl-4 space-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={`block py-1 text-base ${
                              pathname === child.href
                                ? 'text-healthcare-600 font-medium'
                                : 'text-neutral-700'
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block text-base ${
                        pathname === item.href
                          ? 'text-healthcare-600 font-medium'
                          : 'text-neutral-700'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Button asChild className="w-full bg-healthcare-600 hover:bg-healthcare-700 text-white rounded-full">
                  <Link href={settings?.['Hero CTA Button URL'] || '/contact'}>
                    {settings?.['Hero CTA Button Text'] || 'Get in Touch'}
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
