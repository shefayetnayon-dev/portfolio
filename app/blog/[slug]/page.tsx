// app/blog/[slug]/page.tsx
import { getPostBySlug, getSortedPostsData } from '@/lib/blog';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { FiTerminal, FiArrowLeft, FiClock, FiHash } from 'react-icons/fi';
import Image from 'next/image';
import rehypePrettyCode from 'rehype-pretty-code';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const baseUrl = 'https://shefayetnayon.netlify.app';
  const postUrl = `${baseUrl}/blog/${slug}`;
  const ogImageUrl = `${baseUrl}/og-image.png`;

  // Extract keywords from category and title
  const keywords = [
    post.category.toLowerCase(),
    ...post.title.toLowerCase().split(' ').filter(word => word.length > 3),
    'web development',
    'programming',
    'tutorial'
  ];

  return {
    title: post.title,
    description: post.excerpt,
    keywords: keywords,
    authors: [{ name: post.author }],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: 'Shefayet Nayon Portfolio',
      locale: 'en_US',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: [post.category],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      creator: '@ShefayetNayon',
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Formatting options
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const mdxOptions: any = {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: 'one-dark-pro',
          keepBackground: true,
        }
      ]
    ]
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-300 font-sans selection:bg-green-900/30 selection:text-green-400">

      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            image: "https://shefayetnayon.netlify.app/og-image.png",
            datePublished: post.date,
            dateModified: post.date,
            author: {
              "@type": "Person",
              name: post.author,
              url: "https://shefayetnayon.netlify.app",
            },
            publisher: {
              "@type": "Person",
              name: "Shefayet Nayon",
              logo: {
                "@type": "ImageObject",
                url: "https://shefayetnayon.netlify.app/og-image.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://shefayetnayon.netlify.app/blog/${slug}`,
            },
            keywords: post.category,
            articleSection: post.category,
            wordCount: post.content.split(' ').length,
          }),
        }}
      />

      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Home', url: 'https://shefayetnayon.netlify.app' },
              { name: 'Blog', url: 'https://shefayetnayon.netlify.app/blog' },
              { name: post.title, url: `https://shefayetnayon.netlify.app/blog/${slug}` },
            ])
          ),
        }}
      />

      {/* Immersive Header Background */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-blue-900/10 to-[#0d1117] pointer-events-none z-0"></div>

      {/* Sticky Top Bar (Terminal Header) */}
      <div className="sticky top-0 z-50 bg-[#0d1117]/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between font-mono text-xs md:text-sm">
          <Link
            href="/blog"
            className="flex items-center text-gray-500 hover:text-white transition-colors group"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden md:inline">cd ..</span>
          </Link>

          <div className="flex items-center space-x-2 text-gray-400">
            <FiTerminal className="text-gray-600" />
            <span className="opacity-50">/var/www/blog/</span>
            <span className="text-blue-400 font-bold">{slug}</span>
            <span className="opacity-50">.md</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="hidden md:flex items-center text-gray-600">
              <FiHash className="mr-1" /> {post.version}
            </span>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
        </div>
      </div>

      <main className="relative z-10 pt-16 pb-32 px-4 max-w-4xl mx-auto">

        {/* Article Meta */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-widest">
              {post.category}
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-sm text-gray-400 font-mono">{formatDate(post.date)}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight glow-text">
            {post.title}
          </h1>

          <div className="flex items-center justify-center space-x-6 text-sm text-gray-400 font-mono">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 mr-3 flex items-center justify-center text-white font-bold text-xs ring-2 ring-[#0d1117]">
                SN
              </div>
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <FiClock className="mr-2" />
              {post.readTime}
            </div>
          </div>
        </div>

        {/* Featured Image "Window" */}
        <div className="mb-16 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-20 blur transition duration-1000"></div>
          <div className="relative rounded-xl overflow-hidden border border-gray-700 bg-[#161b22] shadow-2xl">
            <div className="h-8 bg-[#0d1117] border-b border-gray-700 flex items-center px-4 space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              <div className="ml-4 text-[10px] text-gray-600 font-mono flex-1 text-center">preview_render.png</div>
            </div>

            <div className="relative h-[250px] md:h-[450px] w-full">
              <Image
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
                alt={post.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-code:text-yellow-200 prose-code:bg-gray-800/50 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[#161b22] prose-pre:border prose-pre:border-gray-700">
          <MDXRemote source={post.content} options={{ parseFrontmatter: true, mdxOptions }} />
        </div>

        {/* Footer Navigation */}
        <div className="mt-20 pt-10 border-t border-gray-800">
          <div className="flex justify-between items-center">
            <Link href="/blog" className="group flex items-center text-sm font-mono text-gray-500 hover:text-white transition-colors">
              <div className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center mr-3 group-hover:border-white transition-colors">
                <FiArrowLeft />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider opacity-50">Return</div>
                <div>All Logs</div>
              </div>
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}