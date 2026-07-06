'use client';

import { useState } from 'react';
import { Mail, Linkedin, Send, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Settings } from '@/types/airtable';

interface ContactPageClientProps {
  settings: Settings | null;
}

export function ContactPageClient({ settings }: ContactPageClientProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      {/* Page Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <span className="inline-block text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-4">
            Get in Touch
          </span>
          <h1 className="text-[2.5rem] leading-[1.1] font-bold text-[#0B1B2B] md:text-[3.5rem]">
            Contact
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-[#64748B] max-w-xl md:text-base">
            I work with leaders and organizations seeking to move beyond AI experimentation 
            and into real operational transformation through workflow redesign and applied AI systems.
          </p>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            
            {/* Form — 7 cols */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E2E8F0]">
                <h2 className="text-[18px] font-bold text-[#0B1B2B] mb-6">
                  Send a Message
                </h2>

                {/* Success */}
                {status === 'success' && (
                  <div className="mb-6 p-4 bg-[#F0FDF4] border border-[#86EFAC] rounded-xl flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#166534] text-[14px]">Message sent successfully!</p>
                      <p className="text-[13px] text-[#22C55E] mt-1">
                        Thank you for reaching out. I will get back to you soon.
                      </p>
                    </div>
                  </div>
                )}

                {/* Error */}
                {status === 'error' && (
                  <div className="mb-6 p-4 bg-[#FEF2F2] border border-[#FECACA] rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#991B1B] text-[14px]">Something went wrong</p>
                      <p className="text-[13px] text-[#EF4444] mt-1">
                        Please try again or email directly.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[13px] font-semibold text-[#475569]">
                        Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="rounded-lg border-[#E2E8F0] focus:border-[#0284C7] focus:ring-[#0284C7]/20 h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[13px] font-semibold text-[#475569]">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="rounded-lg border-[#E2E8F0] focus:border-[#0284C7] focus:ring-[#0284C7]/20 h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[13px] font-semibold text-[#475569]">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can I help you?"
                      className="rounded-lg border-[#E2E8F0] focus:border-[#0284C7] focus:ring-[#0284C7]/20 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-full py-6 text-[14px] font-semibold shadow-lg shadow-[#0284C7]/15 active:scale-[0.98] transition-all duration-200"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message
                        <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Sidebar — 5 cols */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Quick Connect */}
              <div className="bg-[#0B1B2B] rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0284C7]/10 rounded-full blur-[60px]" />
                <div className="relative z-10">
                  <h3 className="text-[16px] font-bold text-white mb-2">
                    Quick Connect
                  </h3>
                  <p className="text-[13px] leading-[1.6] text-[#94A3B8] mb-5">
                    For speaking engagements, consulting, or collaboration opportunities, reach out directly.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="mailto:ameerproduct@gmail.com"
                      className="flex items-center gap-3 text-[14px] text-white/90 hover:text-white transition-colors group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                        <Mail className="w-4 h-4" />
                      </div>
                      <span>ameerproduct@gmail.com</span>
                    </a>
                    {settings?.['Bio LinkedIn URL'] && (
                      <a
                        href={settings['Bio LinkedIn URL']}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-[14px] text-white/90 hover:text-white transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                          <Linkedin className="w-4 h-4" />
                        </div>
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
                <h3 className="text-[14px] font-bold text-[#0B1B2B] mb-2">
                  Response Time
                </h3>
                <p className="text-[13px] leading-[1.6] text-[#64748B]">
                  I typically respond within 24-48 business hours. For urgent matters, please reach out via LinkedIn or direct email.
                </p>
              </div>

              {/* Speaking & Consulting */}
              <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
                <h3 className="text-[14px] font-bold text-[#0B1B2B] mb-2">
                  Speaking & Consulting
                </h3>
                <p className="text-[13px] leading-[1.6] text-[#64748B] mb-4">
                  Available for keynotes, panels, workshops, and advisory roles in AI healthcare and digital transformation.
                </p>
                <a
                  href="mailto:ameerproduct@gmail.com?subject=Speaking%20Engagement%20Inquiry"
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0284C7] hover:text-[#0369A1] transition-colors group"
                >
                  Book a Speaking Engagement
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}