// app/api/subscriptions/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    // Get the path to the JSON file
    const filePath = path.join(process.cwd(), 'public', 'subscriptions.json');
    
    // Read existing subscriptions
    let subscriptions = [];
    try {
      const data = await fs.readFile(filePath, 'utf8');
      subscriptions = JSON.parse(data);
    } catch {
      // If file doesn't exist, return empty array
      subscriptions = [];
    }
    
    return NextResponse.json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 });
  }
}