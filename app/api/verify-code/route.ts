import { NextResponse } from 'next/server';
import { fetchWithFilter } from '@/lib/airtable';

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json({ error: 'Email and code are required' }, { status: 400 });
    }

    const leads = await fetchWithFilter('Leads', `{Email}='${email}'`, true);

    if (leads.length === 0) {
      return NextResponse.json({ error: 'No record found for this email' }, { status: 404 });
    }

    const lead = leads[0] as any; // ← Cast to any for safety

    console.log('Stored code:', lead['Verification Code'], 'Entered code:', code);

    if (lead['Verification Code'] === code) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Invalid code' }, { status: 400 });
    }
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}