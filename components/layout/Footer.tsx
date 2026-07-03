import Link from 'next/link';
import { Settings } from '@/types/airtable';
import { Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  settings: Settings | null;
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const name = settings?.Name || 'Ameer Ali';

  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 gap-x-8">
          {/* Brand & Description */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-3xl font-semibold tracking-tight text-neutral-900">
                {name}
              </span>
            </Link>
            
            <p className="text-neutral-600 leading-relaxed max-w-md">
              {settings?.['Site Footer Text'] ||
                'AI Healthcare expert dedicated to building meaningful technology that improves patient outcomes and transforms healthcare delivery.'}
            </p>

            <div className="flex gap-4 mt-8">
              {settings?.['Bio LinkedIn URL'] && (
                <a
                  href={settings['Bio LinkedIn URL']}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-neutral-100 hover:bg-neutral-200 transition-colors text-neutral-600"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              <a
                href="mailto:ameerproduct@gmail.com"
                className="p-3 rounded-2xl bg-neutral-100 hover:bg-neutral-200 transition-colors text-neutral-600"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="font-medium text-neutral-900 mb-5">Quick Links</h4>
            <ul className="space-y-3 text-neutral-600">
              <li><Link href="/" className="hover:text-healthcare-600 transition-colors">Home</Link></li>
              <li><Link href="/portfolio" className="hover:text-healthcare-600 transition-colors">Portfolio</Link></li>
              <li><Link href="/articles" className="hover:text-healthcare-600 transition-colors">Articles</Link></li>
              <li><Link href="/about" className="hover:text-healthcare-600 transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-healthcare-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-4">
            <h4 className="font-medium text-neutral-900 mb-5">Resources</h4>
            <ul className="space-y-3 text-neutral-600">
              <li><Link href="/ai-news" className="hover:text-healthcare-600 transition-colors">AI News</Link></li>
              <li><Link href="/learnings" className="hover:text-healthcare-600 transition-colors">Learnings</Link></li>
              <li><Link href="/videos" className="hover:text-healthcare-600 transition-colors">Videos</Link></li>
              <li><Link href="/essays" className="hover:text-healthcare-600 transition-colors">Essays</Link></li>
              <li><Link href="/resources" className="hover:text-healthcare-600 transition-colors">Curated Readings</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-100 bg-neutral-50">
        <div className="container-custom py-6 text-sm text-neutral-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>
            © {currentYear} {name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-neutral-700 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-neutral-700 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}