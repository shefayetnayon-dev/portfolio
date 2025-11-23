// app/api/blog/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'blog.json');
    const fileData = await fs.readFile(filePath, 'utf8');
    const posts: BlogPost[] = JSON.parse(fileData);
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error reading blog file:', error);
    return NextResponse.json({ error: 'Failed to read blog data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newPost: BlogPost = await request.json();
    
    // Validate required fields
    if (!newPost.title || !newPost.slug || !newPost.category || !newPost.excerpt || !newPost.content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const filePath = path.join(process.cwd(), 'public', 'blog.json');
    const fileData = await fs.readFile(filePath, 'utf8');
    const posts: BlogPost[] = JSON.parse(fileData);
    
    // Generate new ID
    const newId = posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1;
    
    // Set date if not provided
    if (!newPost.date) {
      newPost.date = new Date().toISOString().split('T')[0];
    }
    
    // Add new post
    const postToAdd = { ...newPost, id: newId };
    posts.push(postToAdd);
    
    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(posts, null, 2), 'utf8');
    
    return NextResponse.json({ success: true, post: postToAdd });
  } catch (error) {
    console.error('Error updating blog file:', error);
    return NextResponse.json({ error: 'Failed to update blog data' }, { status: 500 });
  }
}