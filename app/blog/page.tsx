// app/blog/page.tsx
import { getSortedPostsData } from '@/lib/blog';
import BlogClient from '../components/BlogClient';

export default function BlogPage() {
  const allPostsData = getSortedPostsData();

  return (
    <BlogClient posts={allPostsData} />
  );
};