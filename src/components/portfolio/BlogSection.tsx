"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import SectionHeader from "./SectionHeader";
import { useEffect, useState } from "react";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  tags: string[];
  author: string;
  readTime: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch blog posts client-side to avoid SSR issues with file system
    async function fetchPosts() {
      try {
        // For now, we'll use static data until you provide the actual MDX files
        const staticPosts: BlogPost[] = [
          {
            slug: "building-modern-web-apps",
            title: "Building Modern Web Applications with Next.js and TypeScript",
            date: "2024-01-15",
            excerpt: "Learn how to build scalable, modern web applications using Next.js 15, TypeScript, and best practices for performance optimization.",
            image: "/images/blog/nextjs-typescript.svg",
            tags: ["Next.js", "TypeScript", "React", "Web Development"],
            author: "Jordan Lang",
            readTime: "5 min read",
            content: ""
          },
          {
            slug: "self-hosted-solutions",
            title: "The Power of Self-Hosted Solutions: Taking Control of Your Data",
            date: "2024-01-10",
            excerpt: "Explore the benefits of self-hosted applications and how they can provide better privacy, control, and customization for your digital life.",
            image: "/images/blog/self-hosted.svg",
            tags: ["Self-Hosting", "Privacy", "Docker", "Home Lab"],
            author: "Jordan Lang",
            readTime: "7 min read",
            content: ""
          },
          {
            slug: "mobile-app-development",
            title: "Mobile App Development: React Native vs. Native Development",
            date: "2024-01-05",
            excerpt: "A comprehensive comparison of React Native and native iOS/Android development based on real-world project experience.",
            image: "/images/blog/mobile-development.svg",
            tags: ["React Native", "iOS", "Swift", "Mobile Development"],
            author: "Jordan Lang",
            readTime: "6 min read",
            content: ""
          }
        ];
        setPosts(staticPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const floatVariants = {
    animate: {
      y: [-8, 8, -8],
      x: [-4, 4, -4],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  if (loading) {
    return (
      <motion.section
        id="blog"
        className="mb-16 md:mb-24 lg:mb-32 relative overflow-hidden"
      >
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      </motion.section>
    );
  }

  if (posts.length === 0) {
    return null; // Don't show section if no posts
  }

  return (
    <motion.section
      id="blog"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
      className="mb-16 md:mb-24 lg:mb-32 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          variants={floatVariants}
          animate="animate"
          className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-xl"
        />
        <motion.div
          variants={floatVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
          className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-violet-400/10 to-pink-400/10 rounded-full blur-xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10"
      >
        {/* Section Header */}
        <SectionHeader
          tagText="Latest Insights"
          tagIcon="solar:document-text-bold"
          heading="Blog Posts"
          description="Thoughts on web development, self-hosting, mobile apps, and technology trends"
          showUnderline={true}
          centered={true}
        />

        {/* Blog Cards Grid */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                variants={cardVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group cursor-pointer"
                onClick={() => trackEvent(AnalyticsEvents.PROJECT_CLICKED, { project: `Blog: ${post.title}` })}
              >
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/40 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-xl">
                  
                  {/* Blog Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20"></div>
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          // Fallback to gradient background if image fails to load
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                        <Icon icon="solar:document-text-bold" className="text-indigo-500 w-12 h-12" />
                      </div>
                    )}
                    
                    {/* Reading Time Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full">
                      <span className="text-white text-xs font-medium flex items-center gap-1">
                        <Icon icon="solar:clock-circle-bold" width={12} height={12} />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Blog Content */}
                  <div className="p-6">
                    {/* Date and Tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(post.date)}
                      </span>
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Author and Read More */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">J</span>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{post.author}</span>
                      </div>
                      
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          trackEvent(AnalyticsEvents.PROJECT_LINK_CLICKED, { destination: 'blog', project: post.title });
                        }}
                      >
                        <span>Read More</span>
                        <Icon icon="solar:arrow-right-outline" width={14} height={14} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* View All Blog Posts Link */}
          <motion.div
            variants={cardVariants}
            className="text-center mt-12"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-indigo-500/20 dark:border-purple-500/20 rounded-xl hover:from-indigo-500/20 hover:to-purple-500/20 transition-all duration-300"
              onClick={() => trackEvent(AnalyticsEvents.PROJECT_LINK_CLICKED, { destination: 'blog-all', project: 'All Blog Posts' })}
            >
              <Icon icon="solar:document-text-bold" className="text-indigo-500 dark:text-purple-400" width={20} height={20} />
              <span className="text-gray-700 dark:text-gray-300 font-medium">View All Posts</span>
              <Icon icon="solar:arrow-right-outline" width={16} height={16} className="text-indigo-500 dark:text-purple-400" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
