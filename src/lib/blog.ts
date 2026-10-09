import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const blogDirectory = path.join(process.cwd(), 'prompts/blog')

export interface BlogPostMeta {
  title: string
  h1: string
  slug: string
  category: string
  primaryKeyword: string
  metaDescription: string
  excerpt: string
  author: string
  reviewedBy: string
  timeSensitive: boolean
  lastReviewedAt: string
  coverImage?: string
  keyTakeaways?: string[]
}

export interface BlogPost {
  meta: BlogPostMeta
  content: string
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) return []
  
  const fileNames = fs.readdirSync(blogDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md') && fileName !== 'README.md')
    .map(fileName => {
      const fullPath = path.join(blogDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      
      const { data, content } = matter(fileContents)
      
      return {
        meta: {
          title: data.title || '',
          h1: data.h1 || data.title || '',
          slug: data.slug || fileName.replace(/\.md$/, ''),
          category: data.category || '',
          primaryKeyword: data.primaryKeyword || '',
          metaDescription: data.metaDescription || '',
          excerpt: data.excerpt || '',
          author: data.author || '',
          reviewedBy: data.reviewedBy || '',
          timeSensitive: data.timeSensitive || false,
          lastReviewedAt: data.lastReviewedAt ? String(data.lastReviewedAt) : '',
          coverImage: data.coverImage,
          keyTakeaways: data.keyTakeaways || [],
        },
        content
      }
    })
    
  return allPostsData.sort((a, b) => {
    if (a.meta.lastReviewedAt < b.meta.lastReviewedAt) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts()
  return posts.find(post => post.meta.slug === slug)
}
