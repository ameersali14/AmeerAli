import { AirtableResponse } from '@/types/airtable';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

const AIRTABLE_API_URL = 'https://api.airtable.com/v0';

function isAirtableConfigured(): boolean {
  return Boolean(AIRTABLE_API_KEY && AIRTABLE_BASE_ID);
}

async function fetchFromAirtable<T>(
  tableName: string,
  params: Record<string, string> = {}
): Promise<AirtableResponse<T>> {
  if (!isAirtableConfigured()) {
    return { records: [] };
  }

  const encodedTableName = encodeURIComponent(tableName);
  const queryString = new URLSearchParams(params).toString();
  const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/${encodedTableName}${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function fetchAllRecords<T>(tableName: string): Promise<T[]> {
  if (!isAirtableConfigured()) {
    return [];
  }
  const response = await fetchFromAirtable<T>(tableName);
  return response.records.map((record) => ({ id: record.id, ...record.fields }));
}

export async function fetchWithFilter<T>(
  tableName: string,
  filterFormula: string
): Promise<T[]> {
  if (!isAirtableConfigured()) {
    return [];
  }
  const response = await fetchFromAirtable<T>(tableName, {
    filterByFormula: filterFormula,
  });
  return response.records.map((record) => ({ id: record.id, ...record.fields }));
}

export async function fetchFeatured<T>(tableName: string): Promise<T[]> {
  return fetchWithFilter<T>(tableName, '{Featured}=TRUE()');
}

export async function fetchBySlug<T>(
  tableName: string, 
  slug: string
): Promise<T | null> {
  try {
    // More robust formula with proper escaping
    const formula = `LOWER({Slug}) = LOWER('${slug.replace(/'/g, "\\'")}')`;
    
    const response = await fetchFromAirtable<T>(tableName, {
      filterByFormula: formula,
      maxRecords: 1,
    });

    if (response.records.length > 0) {
      const record = response.records[0];
      return { id: record.id, ...record.fields } as T;
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching slug ${slug} from ${tableName}:`, error);
    return null;
  }
}

export async function fetchByField<T>(
  tableName: string,
  fieldName: string,
  fieldValue: string
): Promise<T[]> {
  return fetchWithFilter<T>(tableName, `{${fieldName}}='${fieldValue}'`);
}

export async function postToAirtable<T extends Record<string, unknown>>(
  tableName: string,
  fields: T
): Promise<{ id: string; fields: T }> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    throw new Error('Airtable API key or Base ID not configured. Please set AIRTABLE_API_KEY and AIRTABLE_BASE_ID environment variables.');
  }

  const encodedTableName = encodeURIComponent(tableName);
  const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/${encodedTableName}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ records: [{ fields }] }),
  });

  if (!response.ok) {
    throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return { id: data.records[0].id, fields: data.records[0].fields };
}

export const TABLES = {
  SETTINGS: 'Settings',
  PORTFOLIO: 'Portfolio',
  ARTICLES: 'Articles',
  ESSAYS: 'Essays',
  VIDEOS: 'Videos',
  AI_NEWS: 'AI News',
  RESOURCES: 'Resources',
  LEARNINGS: 'Learnings',
  CURATED_READINGS: 'Curated Readings',
  QUOTES: 'Quotes',
  CONTACT_SUBMISSIONS: 'Contact Submissions',   // ← Add this
} as const;
