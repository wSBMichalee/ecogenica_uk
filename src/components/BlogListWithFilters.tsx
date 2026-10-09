'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export function BlogListWithFilters({ posts }: { posts: any[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  
  // Extract unique categories and format them
  const categories = ['All', ...Array.from(new Set(posts.map(post => {
    const rawCat = post.meta.category || 'General'
    return rawCat.replace(/-/g, ' ')
  })))]

  // Filter posts
  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(post => {
        const rawCat = post.meta.category || 'General'
        return rawCat.replace(/-/g, ' ') === activeCategory
      })

  return (
    <div id="guides" className="max-w-7xl mx-auto px-4 w-full py-20">
      
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
              activeCategory === category
                ? 'bg-[#57703C] text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-[#CDDC94] hover:text-[#57703C]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map(post => (
          <Link key={post.meta.slug} href={`/en/blog/${post.meta.slug}`} className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 h-full">
            <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden flex items-center justify-center p-8">
              {/* Fallback pattern if no image */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1C2517] to-[#57703C] opacity-90"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)]"></div>
              <h3 className="text-white text-2xl font-bold z-10 text-center leading-tight">{post.meta.title}</h3>
            </div>
            <div className="p-8 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#57703C] bg-[#EFF1E3] px-3 py-1 rounded-full">{post.meta.category?.replace(/-/g, ' ') || 'General'}</span>
                <span className="text-xs text-gray-500">{post.meta.lastReviewedAt}</span>
              </div>
              <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#57703C] transition-colors line-clamp-2">{post.meta.title}</h2>
              <p className="text-gray-600 mb-6 line-clamp-3 text-sm">{post.meta.excerpt || post.meta.description}</p>
              <div className="mt-auto font-semibold text-[#57703C] group-hover:underline text-sm uppercase tracking-wide">
                Read guide &rarr;
              </div>
            </div>
          </Link>
        ))}
        {filteredPosts.length === 0 && (
          <div className="col-span-full py-20 text-center text-gray-500">
            No guides found in this category.
          </div>
        )}
      </div>
    </div>
  )
}
