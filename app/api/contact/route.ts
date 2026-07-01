import { NextResponse } from 'next/server';
import { postToAirtable } from '@/lib/airtable';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received form data:', body);

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const payload = {
      Name: name,
      Email: email,
      'Message / Question': message,
      'Source Page': 'Contact Form',
      Status: 'New',
    };

    console.log('Sending to Airtable:', payload);

    const result = await postToAirtable('Contact Submissions', payload);

    console.log('Success:', result);

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Full Error:', error);
    return NextResponse.json({ 
      error: error.message || 'Unknown error' 
    }, { status: 500 });
  }
}