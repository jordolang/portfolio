import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
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

export interface BlogFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  tags: string[];
  author: string;
  readTime: string;
}

const BLOG_DIRECTORY = path.join(process.cwd(), 'content/blog');

export function getAllBlogPosts(): BlogPost[] {
  try {
    // Check if blog directory exists
    if (!fs.existsSync(BLOG_DIRECTORY)) {
      return [];
    }

    const fileNames = fs.readdirSync(BLOG_DIRECTORY);
    const posts = fileNames
      .filter((name) => name.endsWith('.mdx'))
      .map((name) => {
        const slug = name.replace(/\.mdx$/, '');
        const fullPath = path.join(BLOG_DIRECTORY, name);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        const frontmatter = data as BlogFrontmatter;
        
        return {
          slug,
          title: frontmatter.title,
          date: frontmatter.date,
          excerpt: frontmatter.excerpt,
          image: frontmatter.image,
          tags: frontmatter.tags,
          author: frontmatter.author,
          readTime: frontmatter.readTime,
          content,
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export function getLatestBlogPosts(limit: number = 3): BlogPost[] {
  const allPosts = getAllBlogPosts();
  return allPosts.slice(0, limit);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
