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
        className={`mx-auto max-w-7xl overflow-hidden rounded-[3rem] px-8 py-16 md:p-24 text-center relative flex flex-col items-center justify-center ${
          isPrimary 
            ? 'bg-[var(--ipal-primary,#16a34a)] text-white' 
            : 'bg-[var(--ink-950,#0f172a)] text-white'
        }`}
      >
        {/* Background blobs for visual interest */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        
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
                ? 'bg-white text-[var(--ipal-primary)] hover:bg-[#CDDC94] hover:text-black animate-pulse-slow'
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
