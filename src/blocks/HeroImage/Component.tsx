import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export interface HeroImageProps {
  heading: string
  subheading?: string
  paragraphs?: string[]
  imageUrl: string
  ctaLabel?: string
  ctaTarget?: string
}

export function HeroImageComponent({
  heading,
  subheading,
  paragraphs,
  imageUrl,
  ctaLabel,
  ctaTarget,
}: HeroImageProps) {
  return (
    <section className="pt-32 md:pt-48 pb-12 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-20 px-4 md:px-8 mb-12">
        <div className="w-full lg:w-1/2">
          {/* Logo Hero replacement - optional if they want it, but for now we just use the text */}
          <h1 className="text-2xl md:text-3xl lg:text-[2.2rem] leading-snug uppercase font-bold text-black max-w-xl mb-6">
            {heading}
          </h1>
          {subheading && (
            <h3 className="text-xl md:text-2xl font-semibold text-[var(--ipal-primary,#57703C)] max-w-xl uppercase">
              {subheading}
            </h3>
          )}
        </div>
        <div className="w-full lg:w-1/2 hidden md:flex flex-col justify-center space-y-4">
          {paragraphs?.map((p, i) => (
            <p key={i} className="text-black/70 text-[15px] leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </div>

      <div className="w-full relative mx-auto">
        <div className="relative w-full aspect-video md:aspect-[21/9] max-h-[700px]">
          <Image
            src={imageUrl}
            alt="Hero Banner"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {ctaLabel && ctaTarget && (
          <div className="hidden md:flex absolute bottom-8 right-8 lg:bottom-12 lg:right-24 z-10">
            <div className="bg-[#7d7b5a]/30 backdrop-blur-sm rounded-full p-2 h-[150px] w-[150px] lg:h-[220px] lg:w-[220px]">
              <Link 
                href={ctaTarget}
                className="bg-[#2d2d20] flex flex-col items-center justify-center w-full h-full text-white font-bold text-sm lg:text-lg rounded-full hover:bg-[var(--ipal-primary,#57703C)] transition-colors text-center px-4"
              >
                {ctaLabel}
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="w-6 h-6 lg:w-8 lg:h-8 mt-2" xmlns="http://www.w3.org/2000/svg"><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-2 4.66h-6l-.117 .007a1 1 0 0 0 -.883 .993l.007 .117a1 1 0 0 0 .993 .883h3.584l-4.291 4.293l-.083 .094a1 1 0 0 0 1.497 1.32l4.293 -4.293v3.586l.007 .117a1 1 0 0 0 1.993 -.117v-6l-.007 -.117l-.029 -.149l-.035 -.105l-.054 -.113l-.071 -.111a1.01 1.01 0 0 0 -.097 -.112l-.09 -.08l-.096 -.067l-.098 -.052l-.11 -.044l-.112 -.03l-.126 -.017l-.075 -.003z"></path></svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
