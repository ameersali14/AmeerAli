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
  { name: 'AI Timeline', href: '/timeline' },
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
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isHomePage = pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || !isHomePage
            ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <span className={`text-[1.25rem] font-bold tracking-tight transition-colors duration-300 ${
                isScrolled || !isHomePage ? 'text-[#0B1B2B]' : 'text-white'
              }`}>
                {settings?.Name || 'Ameer Ali'}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.children ? (
                    <button
                      className={`flex items-center gap-1 px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 ${
                        item.children.some((child) => pathname === child.href)
                          ? 'text-[#0284C7]'
                          : isScrolled || !isHomePage
                            ? 'text-[#475569] hover:text-[#0B1B2B] hover:bg-[#F8FAFC]'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 ${
                        pathname === item.href
                          ? 'text-[#0284C7]'
                          : isScrolled || !isHomePage
                            ? 'text-[#475569] hover:text-[#0B1B2B] hover:bg-[#F8FAFC]'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {item.children && (
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                          className="absolute top-full left-0 pt-1"
                        >
                          <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-[#E2E8F0] py-2 min-w-[180px] overflow-hidden">
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                className={`block px-4 py-2.5 text-[13px] transition-all duration-150 ${
                                  pathname === child.href
                                    ? 'text-[#0284C7] bg-[#F0F9FF] font-medium'
                                    : 'text-[#475569] hover:text-[#0B1B2B] hover:bg-[#F8FAFC]'
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

              {/* CTA */}
              <div className="ml-4 pl-4 border-l border-[#E2E8F0]">
                <Button 
                  asChild 
                  className="bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-full px-5 py-2 text-[13px] font-semibold h-auto shadow-none transition-colors duration-200"
                >
                  <Link href={settings?.['Hero CTA Button URL'] || '/contact'}>
                    {settings?.['Hero CTA Button Text'] || 'Get in Touch'}
                  </Link>
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden relative z-10 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                mobileMenuOpen 
                  ? 'bg-[#0B1B2B] text-white' 
                  : isScrolled || !isHomePage
                    ? 'text-[#0B1B2B] hover:bg-[#F8FAFC]'
                    : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-[#0B1B2B]/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[360px] bg-white z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-6 h-16 border-b border-[#F1F5F9]">
                  <span className="text-[1rem] font-bold text-[#0B1B2B]">
                    Menu
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-9 h-9 rounded-lg bg-[#F8FAFC] flex items-center justify-center text-[#475569]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-4 px-6">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      {item.children ? (
                        <div className="py-3 border-b border-[#F1F5F9]">
                          <p className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.15em] mb-3">
                            {item.name}
                          </p>
                          <div className="space-y-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                className={`block py-2.5 px-3 rounded-lg text-[14px] font-medium transition-colors ${
                                  pathname === child.href
                                    ? 'text-[#0284C7] bg-[#F0F9FF]'
                                    : 'text-[#475569] hover:bg-[#F8FAFC]'
                                }`}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={`block py-4 text-[15px] font-medium border-b border-[#F1F5F9] transition-colors ${
                            pathname === item.href
                              ? 'text-[#0284C7]'
                              : 'text-[#0B1B2B]'
                          }`}
                        >
                          {item.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Drawer Footer */}
                <div className="p-6 border-t border-[#F1F5F9]">
                  <Button 
                    asChild 
                    className="w-full bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-full py-6 text-[14px] font-semibold"
                  >
                    <Link href={settings?.['Hero CTA Button URL'] || '/contact'}>
                      {settings?.['Hero CTA Button Text'] || 'Get in Touch'}
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}