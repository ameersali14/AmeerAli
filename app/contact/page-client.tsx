'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';
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
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-healthcare-50 via-white to-healthcare-100 py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-medium text-healthcare-600 uppercase tracking-wider">
              Get in Touch
            </span>
            <h1 className="heading-xl mt-4">Contact</h1>
            <p className="text-body-lg mt-4 max-w-2xl">
            I work with leaders and organizations seeking to move beyond AI experimentation and into real operational transformation through workflow redesign and applied AI systems.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-100">
                <h2 className="font-serif text-2xl font-semibold text-neutral-900 mb-6">
                  Send a Message
                </h2>

                {status === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800">Message sent successfully!</p>
                      <p className="text-sm text-green-600 mt-1">
                        Thank you for reaching out. I will get back to you soon.
                      </p>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800">Something went wrong</p>
                      <p className="text-sm text-red-600 mt-1">
                        Please try again or email directly.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      required
                      rows={7}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can I help you?"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-healthcare-600 hover:bg-healthcare-700 text-white rounded-full py-6"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-healthcare-600 rounded-2xl p-6 text-white">
                <h3 className="font-serif text-xl font-semibold mb-4">Quick Connect</h3>
                <p className="text-healthcare-100 text-sm mb-6">
                  For speaking engagements, consulting, or collaboration opportunities, reach out directly.
                </p>
                <div className="space-y-4">
                  <a
                    href="mailto:ameerproduct@gmail.com"
                    className="flex items-center gap-3 text-white hover:text-healthcare-200 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>ameerproduct@gmail.com</span>
                  </a>
                  {settings?.['Bio LinkedIn URL'] && (
                    <a
                      href={settings['Bio LinkedIn URL']}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-white hover:text-healthcare-200 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
                <h3 className="font-serif text-xl font-semibold text-neutral-900 mb-4">
                  Response Time
                </h3>
                <p className="text-neutral-600 text-sm">
                  I typically respond within 24-48 business hours. For urgent matters, please reach out via
                  LinkedIn or direct email.
                </p>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
                <h3 className="font-serif text-xl font-semibold text-neutral-900 mb-4">
                  Speaking & Consulting
                </h3>
                <p className="text-neutral-600 text-sm mb-4">
                  Available for keynotes, panels, workshops, and advisory roles in AI healthcare
                  and digital transformation.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-healthcare-200 text-healthcare-700 hover:bg-healthcare-50 rounded-full"
                >
                  <a href="mailto:speaking@example.com">Book a Speaking Engagement</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
