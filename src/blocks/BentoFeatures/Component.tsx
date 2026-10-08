import React from 'react'
import * as Icons from 'lucide-react'

export interface BentoFeature {
  id?: string
  title: string
  description?: string
  icon?: string
  size?: 'normal' | 'large'
}

export interface BentoFeaturesProps {
  heading: string
  subheading?: string
  features: BentoFeature[]
}

export function BentoFeaturesComponent({
  heading,
  subheading,
  features,
}: BentoFeaturesProps) {
  return (
    <section className="bg-white text-black py-24 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{heading}</h2>
          {subheading && <p className="text-xl text-black/60 max-w-2xl mx-auto">{subheading}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
          {features?.map((feature, index) => {
            // Dynamically get the Lucide icon
            const Icon = feature.icon && (Icons as any)[feature.icon] ? (Icons as any)[feature.icon] : Icons.CheckCircle
            
            return (
              <div
                key={feature.id || index}
                className={`group relative overflow-hidden rounded-[2rem] bg-[var(--ink-50,#f8fafc)] p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[var(--ipal-secondary)] border border-transparent ${
                  feature.size === 'large' ? 'md:col-span-2' : 'col-span-1'
                }`}
              >
                <div className="flex h-full flex-col justify-between z-10 relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm text-[var(--ipal-primary,#16a34a)] mb-6 transition-transform group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                    {feature.description && (
                      <p className="text-black/60">{feature.description}</p>
                    )}
                  </div>
                </div>
                {/* Decorative background element */}
                <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-[var(--ipal-primary,#16a34a)]/5 blur-2xl transition-all group-hover:bg-[var(--ipal-primary,#16a34a)]/10" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
