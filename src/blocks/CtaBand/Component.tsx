import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
// @ts-ignore
import type { Page } from '@/payload-types'

export interface CtaBandProps {
  heading: string
  subheading?: string
  ctaLabel: string
  ctaTarget?: Page | number
  theme?: 'dark' | 'primary'
}

export function CtaBandComponent({
  heading,
  subheading,
  ctaLabel,
  ctaTarget,
  theme = 'primary',
}: CtaBandProps) {
  const url = ctaTarget && typeof ctaTarget === 'object' ? `/${ctaTarget.slug}` : '#'
  
  const isPrimary = theme === 'primary'
  
  return (
    <section className="px-4 md:px-8 py-12 md:py-24 bg-white">
      <div 
        className={`group mx-auto max-w-7xl overflow-hidden rounded-[3rem] px-8 py-16 md:p-24 text-center relative flex flex-col items-center justify-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(28,37,23,0.5)] ${
          isPrimary 
            ? 'bg-[#57703C] text-white' 
            : 'bg-[#1C2517] text-white'
        }`}
      >
        {/* Background blobs for visual interest */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl animate-blob transition-all duration-700 group-hover:bg-white/15" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl animate-blob transition-all duration-700 group-hover:bg-white/15 [animation-delay:2s]" />
        
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">{heading}</h2>
          {subheading && (
            <p className={`text-lg md:text-2xl mb-12 ${isPrimary ? 'text-white/90' : 'text-white/70'}`}>
              {subheading}
            </p>
          )}
          
          <Link
            href={url}
            className={`inline-flex items-center gap-2 rounded-full px-10 py-5 text-xl font-bold transition-all shadow-xl hover:-translate-y-1 hover:shadow-2xl ${
              isPrimary
                ? 'bg-white text-[#57703C] hover:bg-[#CDDC94] hover:text-black animate-pulse-slow'
                : 'btn-primary'
            }`}
          >
            {ctaLabel}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
