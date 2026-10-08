'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

export interface TestimonialMock {
  id: string
  authorName: string
  authorLocation: string
  quote: string
  rating: number
  imageUrl?: string
}

export interface TestimonialsSliderProps {
  heading: string
  subheading?: string
  badgeImage?: string
  testimonials: TestimonialMock[]
}

export function TestimonialsSliderComponent({
  heading,
  subheading,
  badgeImage,
  testimonials,
}: TestimonialsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsToShow, setCardsToShow] = useState(1)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setCardsToShow(3)
      else if (window.innerWidth >= 768) setCardsToShow(2)
      else setCardsToShow(1)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!testimonials || testimonials.length === 0) return null

  const maxIndex = Math.max(0, testimonials.length - cardsToShow)

  const next = () => setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  const prev = () => setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))

  useEffect(() => {
    const timer = setInterval(() => {
      next()
    }, 4000)
    return () => clearInterval(timer)
  }, [maxIndex])

  return (
    <section className="bg-[var(--ink-50,#f8fafc)] text-black py-24 px-4 md:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl text-center md:text-left">
            {badgeImage && (
              <div className="mb-6 flex justify-center md:justify-start">
                <img src={badgeImage} alt="Google Reviews Badge" className="h-10" />
              </div>
            )}
            <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase text-[var(--ipal-primary,#57703C)]">{heading}</h2>
            {subheading && <p className="text-lg md:text-xl text-black/60">{subheading}</p>}
          </div>
          <div className="flex justify-center md:justify-end gap-4 shrink-0">
            <button
              onClick={prev}
              className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--ipal-secondary,#CDDC94)] bg-white text-[var(--ipal-primary,#57703C)] transition-all hover:bg-[var(--ipal-secondary,#CDDC94)] hover:text-black shadow-sm"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={next}
              className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--ipal-secondary,#CDDC94)] bg-white text-[var(--ipal-primary,#57703C)] transition-all hover:bg-[var(--ipal-secondary,#CDDC94)] hover:text-black shadow-sm"
              aria-label="Next reviews"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
          <div 
            ref={trackRef}
            className="flex transition-transform duration-500 ease-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` 
            }}
          >
            {testimonials.map((current, idx) => (
              <div 
                key={current.id || idx}
                className="px-4 shrink-0"
                style={{ width: `${100 / cardsToShow}%` }}
              >
                <div className="h-full bg-white rounded-3xl p-8 border border-gray-100 shadow-md flex flex-col hover:shadow-lg transition-shadow">
                  <div className="flex gap-1 mb-6 text-[#FBBC05]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-6 w-6 ${i < current.rating ? 'fill-current' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  
                  <blockquote className="flex-1 text-[15px] leading-relaxed text-black/80 mb-8 italic min-h-[120px]">
                    "{current.quote}"
                  </blockquote>
                  
                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-50">
                    <div className="h-12 w-12 rounded-full bg-[var(--ipal-primary,#57703C)] flex items-center justify-center text-white font-bold text-lg shrink-0">
                      {current.authorName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-base text-gray-900">{current.authorName}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Google Review
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
