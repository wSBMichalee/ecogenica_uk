'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export interface ProductSliderProps {
  heading: string
  paragraphs: string[]
  images: string[]
  brochureUrl?: string
}

export function ProductSliderComponent({ heading, paragraphs, images, brochureUrl }: ProductSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <section className="bg-white py-24 md:py-32 px-4 md:px-8 border-t border-gray-100">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
        <div className="flex flex-col items-center order-2 md:order-1">
          <div className="relative w-full aspect-square bg-[var(--ink-50,#f8fafc)] rounded-3xl overflow-hidden mb-8 p-8 flex items-center justify-center shadow-lg border border-gray-100">
            {images.map((img, i) => (
              <Image 
                key={i}
                src={img} 
                alt={`${heading} ${i}`} 
                fill 
                className={`object-contain mix-blend-multiply transition-opacity duration-1000 ${i === currentIndex ? 'opacity-100' : 'opacity-0'}`} 
              />
            ))}
          </div>
          <div className="flex gap-3 mb-8">
            {images.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentIndex(i)}
                className={`h-3 w-3 rounded-full transition-colors ${i === currentIndex ? 'bg-[var(--ipal-primary,#57703C)] scale-125' : 'bg-gray-300'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          {brochureUrl && (
            <Link href={brochureUrl} target="_blank" className="rounded-full bg-[var(--ipal-secondary,#CDDC94)] px-8 py-4 text-sm font-semibold text-black transition-colors hover:bg-[var(--ipal-primary,#57703C)] hover:text-white shadow-md">
              Download Brochure
            </Link>
          )}
        </div>
        <div className="order-1 md:order-2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--ipal-primary,#57703C)] uppercase mb-8 leading-tight">{heading}</h2>
          <div className="space-y-6 text-black/70 text-lg leading-relaxed">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
