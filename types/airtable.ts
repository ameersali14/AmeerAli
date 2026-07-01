// TypeScript interfaces for all Airtable tables

export interface Settings {
  Name: string;
  'About Title': string;
  'Bio Photo': Array<{ url: string }>;
  Biography: string;
  'Bio LinkedIn URL': string;
  'Hero Background Image': Array<{ url: string }>;
  'Hero Title': string;
  'Hero Subtitle': string;
  'Hero CTA Button Text': string;
  'Hero CTA Button URL': string;
  'Purpose / Sales Statement': string;
  'Site Footer Text': string;
}

export interface Portfolio {
  id: string;
  'Project Title': string;
  'Short Description': string;
  'Full Description': string;
  'Client / Role': string;
  Category: string;
  Technologies: string[];
  Images: Array<{ url: string }>;
  'Live URL': string;
  'Completion Date': string;
  Featured: boolean;
  Slug?: string;
}

export interface Article {
  id: string;
  Title: string;
  Excerpt: string;
  'Thumbnail Image': Array<{ url: string }>;
  'Publish Date': string;
  Tags: string[];
  Featured: boolean;
  'LinkedIn URL': string;
  Slug?: string;
}

export interface Essay {
  id: string;
  Title: string;
  'Cover Image': Array<{ url: string }>;
  Excerpt: string;
  'Full Content': string;
  'Publish Date': string;
  Slug: string;
  Featured: boolean;
}

export interface Video {
  id: string;
  Title: string;
  Category: string;
  Description: string;
  'Publish Date': string;
  Thumbnail: Array<{ url: string }>;
  'Video URL': string;
}

export interface AINews {
  id: string;
  Title: string;
  Image: Array<{ url: string }>;
  'Publish Date': string;
  Source: string;
  Summary: string;
  Tags: string[];
  URL: string;
}

export interface Resource {
  id: string;
  'Resource Name': string;
  Category: string;
  Description: string;
  'Extra Details': string;
  'Logo / Image': Array<{ url: string }>;
  URL: string;
  Featured: boolean;
}

export interface Learning {
  id: string;
  Title: string;
  Featured: boolean;
  'Key Lessons / Summary': string;
  'Publish Date': string;
  Source: string;
  'White Paper URL': string;
}

export interface CuratedReading {
  id: string;
  Title: string;
  Author: string;
  Category: string;
  'Cover Image': Array<{ url: string }>;
  URL: string;
  'Why I Recommend It': string;
}

export interface Quote {
  id: string;
  'Quote Text': string;
  Author: string;
  Category: string;
  Featured: boolean;
  'Source / Context': string;
}

// API Response types
export interface AirtableResponse<T> {
  records: Array<{
    id: string;
    fields: T;
    createdTime: string;
  }>;
}

// Filter types
export interface PortfolioFilters {
  category?: string;
  featured?: boolean;
}

export interface ContentFilters {
  featured?: boolean;
  tags?: string[];
}

export interface ContactSubmission {
  Name: string;
  Email: string;
  'Message / Question': string;
  'Source Page'?: string;
  Status?: string;
  'Submitted At'?: string;
}
