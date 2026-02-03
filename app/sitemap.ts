import { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://shefayetnayon.netlify.app'; // Replace with your actual domain
    const posts = getSortedPostsData();

    const blogPosts = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    const routes = ['', '/blog', '/contact', '/projects'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1.0,
    }));

    return [...routes, ...blogPosts];
}
