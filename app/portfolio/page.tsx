import { Metadata } from 'next';
import { getPortfolio, getPortfolioCategories } from '@/lib/data';
import { PortfolioPageClient } from './page-client';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Portfolio',
    description: 'Explore AI healthcare projects showcasing innovation in clinical applications, research, and digital health transformation.',
  };
}

export default async function PortfolioPage() {
  const [portfolio, categories] = await Promise.all([
    getPortfolio(),
    getPortfolioCategories(),
  ]);

  return <PortfolioPageClient portfolio={portfolio} categories={categories} />;
}
