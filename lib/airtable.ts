import { AirtableResponse } from '@/types/airtable';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

const JOBS_API_KEY = process.env.JOBS_API_KEY;
const JOBS_BASE_ID = process.env.JOBS_BASE_ID;

const AIRTABLE_API_URL = 'https://api.airtable.com/v0';

function isMainConfigured(): boolean {
  return Boolean(AIRTABLE_API_KEY && AIRTABLE_BASE_ID);
}

function isJobsConfigured(): boolean {
  return Boolean(JOBS_API_KEY && JOBS_BASE_ID);
}

// Main Base Fetch
async function fetchFromMainBase<T>(
  tableName: string,
  params: Record<string, string> = {}
): Promise<AirtableResponse<T>> {
  if (!isMainConfigured()) return { records: [] };

  const encodedTableName = encodeURIComponent(tableName);
  const queryString = new URLSearchParams(params).toString();
  const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/${encodedTableName}${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
    cache: 'no-store',

  });

  if (!response.ok) throw new Error(`Airtable error: ${response.status}`);
  return response.json();
}

// Jobs Base Fetch
async function fetchFromJobsBase<T>(
  tableName: string,
  params: Record<string, string> = {}
): Promise<AirtableResponse<T>> {
  if (!isJobsConfigured()) return { records: [] };

  const encodedTableName = encodeURIComponent(tableName);
  const queryString = new URLSearchParams(params).toString();
  const url = `${AIRTABLE_API_URL}/${JOBS_BASE_ID}/${encodedTableName}${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${JOBS_API_KEY}` },
    cache: 'no-store',

  });

  if (!response.ok) throw new Error(`Airtable error: ${response.status}`);
  return response.json();
}

// General fetchAllRecords
export async function fetchAllRecords<T>(tableName: string, isJobsTable = false): Promise<T[]> {
  const fetchFn = isJobsTable ? fetchFromJobsBase : fetchFromMainBase;
  const response = await fetchFn<T>(tableName);
  return response.records.map((record) => ({ id: record.id, ...record.fields }));
}

export async function fetchFeatured<T>(tableName: string, isJobsTable = false): Promise<T[]> {
  return fetchWithFilter<T>(tableName, '{Featured}=TRUE()', isJobsTable);
}

export async function fetchWithFilter<T>(
  tableName: string,
  filterFormula: string,
  isJobsTable = false
): Promise<T[]> {
  const fetchFn = isJobsTable ? fetchFromJobsBase : fetchFromMainBase;
  const response = await fetchFn<T>(tableName, { filterByFormula: filterFormula });
  return response.records.map((record) => ({ id: record.id, ...record.fields }));
}

export async function fetchBySlug<T>(
  tableName: string, 
  slug: string,
  isJobsTable = false
): Promise<T | null> {
  try {
    const formula = `LOWER({Slug}) = LOWER('${slug.replace(/'/g, "\\'")}')`;
    const fetchFn = isJobsTable ? fetchFromJobsBase : fetchFromMainBase;
    
    const response = await fetchFn<T>(tableName, {
      filterByFormula: formula,
      maxRecords: '1',
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
  fieldValue: string,
  isJobsTable = false
): Promise<T[]> {
  return fetchWithFilter<T>(tableName, `{${fieldName}}='${fieldValue}'`, isJobsTable);
}

export async function postToAirtable<T extends Record<string, unknown>>(
  tableName: string,
  fields: T,
  isJobsTable = false
): Promise<{ id: string; fields: T }> {
  const apiKey = isJobsTable ? JOBS_API_KEY : AIRTABLE_API_KEY;
  const baseId = isJobsTable ? JOBS_BASE_ID : AIRTABLE_BASE_ID;

  console.log('postToAirtable called with:', { 
    tableName, 
    isJobsTable, 
    hasApiKey: !!apiKey, 
    hasBaseId: !!baseId 
  });

  if (!apiKey || !baseId) {
    throw new Error(`Airtable configuration missing for this base. isJobsTable=${isJobsTable}`);
  }

  const encodedTableName = encodeURIComponent(tableName);
  const url = `${AIRTABLE_API_URL}/${baseId}/${encodedTableName}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
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
  AI_TIMELINE: 'AI Timeline',
  AI_LAUNCHES: 'AI Launches',
  AI_JOBS: 'AI Jobs Database',
  LEADS: 'Leads',
} as const;