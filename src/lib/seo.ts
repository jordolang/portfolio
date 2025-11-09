import { Metadata } from 'next';

interface BlogSEOProps {
  title: string;
  description: string;
  slug: string;
  date: string;
  image?: string;
  author?: string;
  tags?: string[];
}

export function generateBlogMetadata({
  title,
  description,
  slug,
  date,
  image,
  author = 'Jordan Lang',
  tags = [],
}: BlogSEOProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jordanlang.dev';
  const postUrl = `${siteUrl}/blog/${slug}`;
  const imageUrl = image ? `${siteUrl}${image}` : `${siteUrl}/og-image.jpg`;

  return {
    title: `${title} | Jordan Lang`,
    description,
    authors: [{ name: author }],
    openGraph: {
      title,
      description,
      url: postUrl,
      siteName: 'Jordan Lang',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: date,
      authors: [author],
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@jordanlang',
    },
    alternates: {
      canonical: postUrl,
    },
    keywords: tags.join(', '),
  };
}

export function generateBlogListMetadata(): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jordanlang.dev';
  const blogUrl = `${siteUrl}/blog`;
  const imageUrl = `${siteUrl}/og-image.jpg`;

  return {
    title: 'Blog | Jordan Lang',
    description: 'Thoughts on web development, self-hosting, mobile apps, and technology trends',
    openGraph: {
      title: 'Blog | Jordan Lang',
      description: 'Thoughts on web development, self-hosting, mobile apps, and technology trends',
      url: blogUrl,
      siteName: 'Jordan Lang',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: 'Jordan Lang Blog',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog | Jordan Lang',
      description: 'Thoughts on web development, self-hosting, mobile apps, and technology trends',
      images: [imageUrl],
      creator: '@jordanlang',
    },
    alternates: {
      canonical: blogUrl,
    },
  };
}
