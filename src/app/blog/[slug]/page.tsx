"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  tags: string[];
  author: string;
  readTime: string;
  content: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    async function fetchPost() {
      try {
        const response = await fetch('/api/blog');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const posts: BlogPost[] = await response.json();
        const foundPost = posts.find(p => p.slug === slug);
        
        if (foundPost) {
          setPost(foundPost);
          trackEvent(AnalyticsEvents.PROJECT_CLICKED, { project: `Blog Post: ${foundPost.title}` });
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white flex items-center justify-center">
        <div className="text-center">
          <Icon icon="solar:document-text-bold" className="mx-auto text-gray-400 mb-4" width={64} height={64} />
          <h1 className="text-3xl font-bold mb-2">Blog Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors"
          >
            <Icon icon="solar:arrow-left-outline" width={20} height={20} />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            <Icon icon="solar:arrow-left-outline" width={20} height={20} />
            <span>Back to Blog</span>
          </Link>
        </div>
      </header>

      {/* Article */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 py-12"
      >
        {/* Featured Image */}
        {post.image && (
          <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20"></div>
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">J</span>
            </div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">{post.author}</span>
          </div>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600 dark:text-gray-400">{formatDate(post.date)}</span>
          <span className="text-gray-400">•</span>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <Icon icon="solar:clock-circle-bold" width={16} height={16} />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          {post.title}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Excerpt */}
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          {post.excerpt}
        </p>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div 
            className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: post.content.split('\n').map(line => {
              if (line.startsWith('# ')) {
                return `<h1 class="text-3xl font-bold mt-8 mb-4">${line.slice(2)}</h1>`;
              } else if (line.startsWith('## ')) {
                return `<h2 class="text-2xl font-bold mt-6 mb-3">${line.slice(3)}</h2>`;
              } else if (line.startsWith('### ')) {
                return `<h3 class="text-xl font-bold mt-4 mb-2">${line.slice(4)}</h3>`;
              } else if (line.startsWith('- ')) {
                return `<li class="ml-6">${line.slice(2)}</li>`;
              } else if (line.trim() === '') {
                return '<br />';
              } else if (line.match(/^\d+\./)) {
                return `<li class="ml-6 list-decimal">${line.replace(/^\d+\.\s*/, '')}</li>`;
              } else {
                return `<p class="mb-4">${line}</p>`;
              }
            }).join('')}}
          />
        </div>

        {/* Share/Actions */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl hover:from-indigo-500/20 hover:to-purple-500/20 transition-all"
            >
              <Icon icon="solar:arrow-left-outline" width={20} height={20} className="text-indigo-600 dark:text-indigo-400" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">More Posts</span>
            </Link>
            
            <Link 
              href="/#blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors"
            >
              <span>Back to Portfolio</span>
              <Icon icon="solar:home-2-bold" width={20} height={20} />
            </Link>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
