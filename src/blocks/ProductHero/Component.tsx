import React from 'react'
import Image from 'next/image'

export interface ProductHeroProps {
  heading: string
  paragraphs: string[]
  imageUrl: string
}

export function ProductHeroComponent({ heading, paragraphs, imageUrl }: ProductHeroProps) {
  return (
    <section className="bg-white py-24 md:py-32 px-4 md:px-8">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--ipal-primary,#57703C)] uppercase mb-8 leading-tight">{heading}</h1>
          <div className="space-y-6 text-black/70 text-lg leading-relaxed">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <div className="relative aspect-square md:aspect-video lg:aspect-square bg-[var(--ink-50,#f8fafc)] rounded-3xl overflow-hidden flex items-center justify-center p-8 shadow-xl">
          <Image src={imageUrl} alt={heading} fill className="object-cover md:object-contain rounded-2xl" />
        </div>
      </div>
    </section>
  )
}
