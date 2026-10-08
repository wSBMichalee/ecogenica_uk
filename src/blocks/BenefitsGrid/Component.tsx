import React from 'react'
import * as LucideIcons from 'lucide-react'

export interface Benefit {
  title: string
  description: string
  iconName: string
}

export interface BenefitsGridProps {
  heading: string
  subheading?: string
  benefits: Benefit[]
}

export function BenefitsGridComponent({ heading, subheading, benefits }: BenefitsGridProps) {
  return (
    <section className="bg-white py-24 px-4 md:px-8 border-t border-gray-100">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-black uppercase mb-4 max-w-3xl mx-auto">{heading}</h2>
        {subheading && <p className="text-lg text-black/60 mb-16 max-w-2xl mx-auto">{subheading}</p>}
        <div className="flex flex-wrap justify-center gap-y-12 lg:gap-y-16">
          {benefits.map((b, i) => {
            const Icon = (LucideIcons as any)[b.iconName] || LucideIcons.CheckCircle2
            return (
              <div key={i} className="flex flex-col items-center px-4 sm:px-6 lg:px-5 group w-full sm:w-1/2 lg:w-1/4">
                <div className="h-24 w-24 rounded-3xl bg-[var(--ink-50,#f8fafc)] flex items-center justify-center mb-8 text-[var(--ipal-primary,#57703C)] transition-transform group-hover:scale-110 shadow-sm border border-gray-100">
                  <Icon className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-bold text-[var(--ipal-primary,#57703C)] uppercase mb-4 text-center">{b.title}</h3>
                <p className="text-black/70 text-center leading-relaxed text-sm">{b.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
