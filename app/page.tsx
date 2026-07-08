import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { FeaturedPortfolioSection } from '@/components/sections/FeaturedPortfolioSection';
import { InsightsSection } from '@/components/sections/InsightsSection';
import { LearningsSection } from '@/components/sections/LearningsSection';
import { QuotesSection } from '@/components/sections/QuotesSection';
import { CTASection } from '@/components/sections/CTASection';
import { TimelineSection } from '@/components/sections/TimelineSection';
import { FeaturedJobsSection } from '@/components/sections/FeaturedJobsSection';

import {
  getSettings,
  getPortfolio,
  getArticles,
  getEssays,
  getLearnings,
  getQuotes,
  getTimelineEvents,
  getAIJobs,          // ← Make sure this is imported
} from '@/lib/data';

export default async function Home() {
  const [settings, portfolio, articles, essays, learnings, quotes, timelineEvents, jobs] = await Promise.all([
    getSettings(),
    getPortfolio(),
    getArticles(),
    getEssays(),
    getLearnings(),
    getQuotes(),
    getTimelineEvents(),
    getAIJobs(),           // ← This was missing
  ]);

  const featuredPortfolio = portfolio.filter((p) => p.Featured);
  const featuredArticles = articles.filter((a) => a.Featured);
  const featuredEssays = essays.filter((e) => e.Featured);
  const featuredLearnings = learnings.filter((l) => l.Featured);

  return (
    <>
      <HeroSection settings={settings} />
      <AboutSection settings={settings} />
      {featuredPortfolio.length > 0 && <FeaturedPortfolioSection portfolio={featuredPortfolio} />}
      {featuredPortfolio.length === 0 && portfolio.length > 0 && (
        <FeaturedPortfolioSection portfolio={portfolio} />
      )}
      <InsightsSection
        articles={featuredArticles.length > 0 ? featuredArticles : articles}
        essays={featuredEssays.length > 0 ? featuredEssays : essays}
      />
      <LearningsSection
        learnings={featuredLearnings.length > 0 ? featuredLearnings : learnings}
      />
      <QuotesSection quotes={quotes} />
      <TimelineSection events={timelineEvents} />
      <FeaturedJobsSection jobs={jobs} />
      <CTASection settings={settings} />
    </>
  );
}