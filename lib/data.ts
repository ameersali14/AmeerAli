import {
  Settings,
  Portfolio,
  Article,
  Essay,
  Video,
  AINews,
  Resource,
  Learning,
  CuratedReading,
  Quote,
} from '@/types/airtable';
import {
  fetchAllRecords,
  fetchFeatured,
  fetchBySlug,
  fetchByField,
  TABLES,
} from './airtable';
import { generateSlug } from './utils';   // ← Add this line

// Site Settings - returns first record from Settings table
export async function getSettings(): Promise<Settings | null> {
  try {
    const records = await fetchAllRecords<any>(TABLES.SETTINGS);
    
    if (records.length === 0) {
      console.warn('No Settings record found');
      return null;
    }

    const raw = records[0];

    // Force correct values
    const settings: Settings = {
      Name: 'Ameer Ali',  // ← Force correct name
      'About Title': raw['About Title'] || 'About Ameer Ali',
      'Bio Photo': raw['Bio Photo'] || [],
      Biography: raw.Biography || '',
      'Bio LinkedIn URL': raw['Bio LinkedIn URL'] || 'https://www.linkedin.com/in/aliameer/',
      'Hero Background Image': raw['Hero Background Image'] || [],
      'Hero Title': raw['Hero Title'] || '',
      'Hero Subtitle': raw['Hero Subtitle'] || '',
      'Hero CTA Button Text': raw['Hero CTA Button Text'] || '',
      'Hero CTA Button URL': raw['Hero CTA Button URL'] || '',
      'Purpose / Sales Statement': raw['Purpose / Sales Statement'] || '',
      'Site Footer Text': raw['Site Footer Text'] || '© 2026 Ameer Ali',
    };

    console.log('✅ Settings Loaded:', {
      Name: settings.Name,
      BioLinkedIn: settings['Bio LinkedIn URL'],
      HasHeroImage: !!settings['Hero Background Image']?.[0]?.url
    });

    return settings;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return null;
  }
}

// Portfolio
export async function getPortfolio(): Promise<Portfolio[]> {
  return fetchAllRecords<Portfolio>(TABLES.PORTFOLIO);
}

export async function getFeaturedPortfolio(): Promise<Portfolio[]> {
  return fetchFeatured<Portfolio>(TABLES.PORTFOLIO);
}

// Portfolio Detail
export async function getPortfolioBySlug(slug: string): Promise<Portfolio | null> {
  try {
    const allPortfolio = await getPortfolio();
    
    const project = allPortfolio.find((p) => {
      const generatedSlug = generateSlug(p['Project Title']);
      return generatedSlug === slug;
    });

    return project || null;
  } catch (error) {
    console.error('Error in getPortfolioBySlug:', error);
    return null;
  }
}
export async function getPortfolioByCategory(category: string): Promise<Portfolio[]> {
  return fetchByField<Portfolio>(TABLES.PORTFOLIO, 'Category', category);
}

// Articles
export async function getArticles(): Promise<Article[]> {
  return fetchAllRecords<Article>(TABLES.ARTICLES);
}

export async function getFeaturedArticles(): Promise<Article[]> {
  return fetchFeatured<Article>(TABLES.ARTICLES);
}

// Article Detail
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const allArticles = await getArticles();
    
    const article = allArticles.find((a) => {
      const generatedSlug = generateSlug(a.Title);
      return generatedSlug === slug;
    });

    return article || null;
  } catch (error) {
    console.error('Error in getArticleBySlug:', error);
    return null;
  }
}
// Essays
export async function getEssays(): Promise<Essay[]> {
  return fetchAllRecords<Essay>(TABLES.ESSAYS);
}

export async function getFeaturedEssays(): Promise<Essay[]> {
  return fetchFeatured<Essay>(TABLES.ESSAYS);
}

export async function getEssayBySlug(slug: string): Promise<Essay | null> {
  return fetchBySlug<Essay>(TABLES.ESSAYS, slug);
}

// Videos
export async function getVideos(): Promise<Video[]> {
  return fetchAllRecords<Video>(TABLES.VIDEOS);
}

export async function getVideosByCategory(category: string): Promise<Video[]> {
  return fetchByField<Video>(TABLES.VIDEOS, 'Category', category);
}

// AI News
export async function getAINews(): Promise<AINews[]> {
  return fetchAllRecords<AINews>(TABLES.AI_NEWS);
}

// Resources
export async function getResources(): Promise<Resource[]> {
  return fetchAllRecords<Resource>(TABLES.RESOURCES);
}

export async function getFeaturedResources(): Promise<Resource[]> {
  return fetchFeatured<Resource>(TABLES.RESOURCES);
}

export async function getResourcesByCategory(category: string): Promise<Resource[]> {
  return fetchByField<Resource>(TABLES.RESOURCES, 'Category', category);
}

// Learnings
export async function getLearnings(): Promise<Learning[]> {
  return fetchAllRecords<Learning>(TABLES.LEARNINGS);
}

export async function getFeaturedLearnings(): Promise<Learning[]> {
  return fetchFeatured<Learning>(TABLES.LEARNINGS);
}

// Curated Readings
export async function getCuratedReadings(): Promise<CuratedReading[]> {
  return fetchAllRecords<CuratedReading>(TABLES.CURATED_READINGS);
}

// Quotes
export async function getQuotes(): Promise<Quote[]> {
  return fetchAllRecords<Quote>(TABLES.QUOTES);
}

export async function getFeaturedQuotes(): Promise<Quote[]> {
  return fetchFeatured<Quote>(TABLES.QUOTES);
}

// Get unique categories from portfolio
export async function getPortfolioCategories(): Promise<string[]> {
  const portfolio = await getPortfolio();
  const categories = new Set(portfolio.map((p) => p.Category).filter(Boolean));
  return Array.from(categories);
}

// Get unique categories from resources
export async function getResourceCategories(): Promise<string[]> {
  const resources = await getResources();
  const categories = new Set(resources.map((r) => r.Category).filter(Boolean));
  return Array.from(categories);
}
