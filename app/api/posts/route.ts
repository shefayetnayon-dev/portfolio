import { NextResponse } from 'next/server';
import { getSortedPostsData } from '@/lib/blog';

export async function GET() {
    const allPosts = getSortedPostsData();
    return NextResponse.json(allPosts);
}
