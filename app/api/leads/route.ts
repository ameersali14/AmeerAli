import { NextResponse } from 'next/server';
import { createLead } from '@/lib/leadGate';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { Name, Email, Role, IsSubscribed } = body;

    if (!Name || !Email) {
      return NextResponse.json({ error: 'Name and Email are required' }, { status: 400 });
    }

    const result = await createLead({ Name, Email, Role, IsSubscribed });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead API error:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}