import { Metadata } from 'next';
import { getSettings } from '@/lib/data';
import { ContactPageClient } from './page-client';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Contact',
    description: 'Get in touch for collaboration opportunities, speaking engagements, or consulting in AI healthcare.',
  };
}

export default async function ContactPage() {
  const settings = await getSettings();
  return <ContactPageClient settings={settings} />;
}
