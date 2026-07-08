import { postToAirtable } from './airtable';

export async function createLead(data: {
  Name: string;
  Email: string;
  Role?: string;
  IsSubscribed?: boolean;
}) {
  try {
    const result = await postToAirtable('Leads', data, true); // true = Jobs base
    console.log('Lead created successfully:', result);
    return { success: true, recordId: result.id };
  } catch (error) {
    console.error('Lead creation error:', error);
    return { success: false };
  }
}

console.log('Using Jobs Base:', {
  hasKey: !!process.env.JOBS_API_KEY,
  hasBaseId: !!process.env.JOBS_BASE_ID,
  table: 'Leads'
});