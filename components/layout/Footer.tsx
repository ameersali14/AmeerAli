import Link from 'next/link';
import { Settings } from '@/types/airtable';
import { Linkedin, Mail, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  settings: Settings | null;
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const name = settings?.Name || 'Ameer Ali';

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Articles', href: '/articles' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const resources = [
    { label: 'AI News', href: '/ai-news' },
    { label: 'Learnings', href: '/learnings' },
    { label: 'Videos', href: '/videos' },
    { label: 'Essays', href: '/essays' },
    { label: 'Curated Readings', href: '/resources' },
  ];

  return (
    <footer className="bg-[#0B1B2B]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-12 md:pt-20 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8">
          
          {/* Brand Column */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block">
              <span className="text-[1.5rem] font-bold text-white tracking-tight">
                {name}
              </span>
            </Link>
            
            <p className="mt-5 text-[14px] leading-[1.7] text-[#64748B] max-w-sm">
              {settings?.['Site Footer Text'] ||
                'AI Healthcare expert dedicated to building meaningful technology that improves patient outcomes and transforms healthcare delivery.'}
            </p>

            {/* Socials */}
            <div className="flex gap-3 mt-8">
              {settings?.['Bio LinkedIn URL'] && (
                <a
                  href={settings['Bio LinkedIn URL']}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#64748B] hover:text-white hover:border-white/25 transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              <a
                href="mailto:ameerproduct@gmail.com"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#64748B] hover:text-white hover:border-white/25 transition-all duration-200"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.15em] mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-[14px] text-[#64748B] hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-4">
            <h4 className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.15em] mb-6">
              Resources
            </h4>
            <ul className="space-y-3.5">
              {resources.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-[14px] text-[#64748B] hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[12px] text-[#475569]">
            © {currentYear} {name}. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
}