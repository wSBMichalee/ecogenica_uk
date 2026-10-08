'use client'

import React, { useState } from 'react'
import Image from 'next/image'
// @ts-ignore
import type { Media } from '@/payload-types'

export interface ExplodedViewFeature {
  id?: string
  title: string
  description?: string
  xPosition: number
  yPosition: number
}

export interface ExplodedViewProps {
  heading: string
  subheading?: string
  image: Media
  features: ExplodedViewFeature[]
}

export function ExplodedViewComponent({
  heading,
  subheading,
  image,
  features,
}: ExplodedViewProps) {
  const [activeFeature, setActiveFeature] = useState<number | null>(null)

  return (
    <section className="bg-[var(--ink-50,#f8fafc)] text-black py-20 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{heading}</h2>
          {subheading && <p className="text-lg text-black/60 max-w-2xl mx-auto">{subheading}</p>}
        </div>

        <div className="relative w-full max-w-5xl mx-auto aspect-square md:aspect-[16/9] bg-white rounded-3xl shadow-xl overflow-hidden p-8 flex items-center justify-center">
          {image?.url && (
            <div className="relative w-full h-full max-w-3xl mx-auto">
              <Image
                src={image.url}
                alt={image.alt || heading}
                fill
                className="object-contain"
              />
              
              {/* Hotspots */}
              {features?.map((feature, index) => (
                <div
                  key={feature.id || index}
                  className="absolute z-10"
                  style={{
                    left: `${feature.xPosition}%`,
                    top: `${feature.yPosition}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <button
                    onClick={() => setActiveFeature(activeFeature === index ? null : index)}
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full bg-[var(--ipal-primary,#16a34a)] text-white shadow-lg transition-transform hover:scale-110 ${
                      activeFeature === index ? 'ring-4 ring-[var(--ipal-primary,#16a34a)]/30' : ''
                    }`}
                  >
                    <span className="sr-only">{feature.title}</span>
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </button>

                  {/* Tooltip */}
                  {activeFeature === index && (
                    <div className="absolute left-1/2 top-full mt-4 w-64 -translate-x-1/2 rounded-xl bg-white p-4 shadow-2xl ring-1 ring-black/5 z-20">
                      <h4 className="font-bold text-lg mb-1">{feature.title}</h4>
                      {feature.description && (
                        <p className="text-sm text-black/70">{feature.description}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
