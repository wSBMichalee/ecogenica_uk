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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features?.map((feature, index) => {
            const Icon = feature.icon && (Icons as any)[feature.icon] ? (Icons as any)[feature.icon] : Icons.CheckCircle
            const isLarge = feature.size === 'large'
            
            return (
              <div
                key={feature.id || index}
                className={`group relative overflow-hidden rounded-[2rem] p-8 md:p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between min-h-[220px] ${
                  isLarge 
                    ? 'md:col-span-2 lg:col-span-2 bg-[#57703C] text-white shadow-xl' 
                    : 'col-span-1 bg-white text-gray-900 border border-gray-100 shadow-sm hover:border-[#CDDC94]'
                }`}
              >
                {/* Background decorative elements */}
                {isLarge ? (
                  <>
                    <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_top_right,rgba(205,220,148,0.2),transparent_50%)] transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#1C2517] rounded-full mix-blend-overlay blur-3xl opacity-50 group-hover:scale-125 transition-transform duration-1000" />
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] opacity-50" />
                    <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#CDDC94] blur-[60px] opacity-0 transition-opacity duration-500 group-hover:opacity-40" />
                  </>
                )}

                <div className="flex h-full flex-col justify-between z-10 relative">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 mb-6 ${
                    isLarge 
                      ? 'bg-[#1C2517] text-[#CDDC94]' 
                      : 'bg-[#EFF1E3] text-[#57703C]'
                  }`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="mt-auto">
                    <h3 className={`text-xl md:text-2xl font-bold mb-2 ${isLarge ? 'text-white' : 'text-gray-900'}`}>
                      {feature.title}
                    </h3>
                    {feature.description && (
                      <p className={`text-sm md:text-base leading-relaxed ${isLarge ? 'text-white/80' : 'text-gray-600'}`}>
                        {feature.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
