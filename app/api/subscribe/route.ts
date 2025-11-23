// app/api/subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    
    // Get the path to the JSON file
    const filePath = path.join(process.cwd(), 'public', 'subscriptions.json');
    
    // Read existing subscriptions
    let subscriptions = [];
    try {
      const data = await fs.readFile(filePath, 'utf8');
      subscriptions = JSON.parse(data);
    } catch {
      // If file doesn't exist, create empty array
      subscriptions = [];
    }
    
    // Add new subscription with timestamp
    const newSubscription = {
      id: Date.now(),
      email,
      timestamp: new Date().toISOString(),
    };
    
    subscriptions.push(newSubscription);
    
    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(subscriptions, null, 2));
    
    return NextResponse.json({ success: true, subscription: newSubscription });
  } catch {
    console.error('Error saving subscription');
    return NextResponse.json({ error: 'Failed to save subscription' }, { status: 500 });
  }
}