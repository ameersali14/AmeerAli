import { Metadata } from 'next';
import { getResources, getResourceCategories } from '@/lib/data';
import { ResourcesPageClient } from './page-client';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Resources',
    description: 'Curated resources for AI healthcare professionals including tools, frameworks, datasets, and references.',
  };
}

// Export the client component with data
export default async function ResourcesPage() {
  const [resources, categories] = await Promise.all([
    getResources(),
    getResourceCategories(),
  ]);

  return <ResourcesPageClient resources={resources} categories={categories} />;
}
