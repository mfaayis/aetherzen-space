import fs from 'fs';
import path from 'path';

export interface BlogPostMetadata {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  slug: string;
}

export interface BlogPost {
  metadata: BlogPostMetadata;
  content: string;
}

const contentDir = path.join(process.cwd(), 'src/content/blog');

function parseFrontmatter(fileContent: string): { metadata: any; content: string } {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  
  if (!match) {
    return { metadata: {}, content: fileContent };
  }
  
  const frontmatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, '').trim();
  
  const metadata: Record<string, any> = {};
  frontmatterBlock.split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    
    // Remove wrapping quotes
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    
    // Simple array parsing for tags: ["a", "b"]
    if (value.startsWith('[') && value.endsWith(']')) {
      const arrContent = value.slice(1, -1);
      metadata[key] = arrContent.split(',').map(s => {
        let clean = s.trim();
        if (clean.startsWith('"') && clean.endsWith('"')) clean = clean.slice(1, -1);
        return clean;
      }).filter(Boolean);
    } else {
      metadata[key] = value;
    }
  });
  
  return { metadata, content };
}

export function getAllBlogPosts(): BlogPostMetadata[] {
  if (!fs.existsSync(contentDir)) return [];
  
  const files = fs.readdirSync(contentDir);
  const posts = files
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(contentDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { metadata } = parseFrontmatter(fileContent);
      
      return {
        ...metadata,
        slug: filename.replace(/\.md$/, ''),
      } as BlogPostMetadata;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
  return posts;
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const filePath = path.join(contentDir, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { metadata, content } = parseFrontmatter(fileContent);
    
    return {
      metadata: {
        ...metadata,
        slug,
      } as BlogPostMetadata,
      content,
    };
  } catch (e) {
    return null;
  }
}
