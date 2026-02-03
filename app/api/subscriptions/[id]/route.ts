// app/api/subscriptions/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Define a type for the subscription object
interface Subscription {
  id: number;
  email: string;
  timestamp: string;
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params to get the id
    const { id } = await context.params;
    const subscriptionId = parseInt(id);
    
    if (isNaN(subscriptionId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }
    
    // Get the path to the JSON file
    const filePath = path.join(process.cwd(), 'public', 'subscriptions.json');
    
    // Read existing subscriptions
    let subscriptions: Subscription[] = [];
    try {
      const data = await fs.readFile(filePath, 'utf8');
      subscriptions = JSON.parse(data);
    } catch {
      return NextResponse.json({ error: 'No subscriptions found' }, { status: 404 });
    }
    
    // Filter out the subscription to delete
    const updatedSubscriptions = subscriptions.filter((sub: Subscription) => sub.id !== subscriptionId);
    
    if (updatedSubscriptions.length === subscriptions.length) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }
    
    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(updatedSubscriptions, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting subscription:', error);
    return NextResponse.json({ error: 'Failed to delete subscription' }, { status: 500 });
  }
}