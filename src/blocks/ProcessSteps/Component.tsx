import React from 'react'

export interface ProcessStep {
  title: string
  description: string
  number: string
}

export interface ProcessStepsProps {
  heading: string
  subheading?: string
  steps: ProcessStep[]
}

export function ProcessStepsComponent({
  heading,
  subheading,
  steps,
}: ProcessStepsProps) {
  return (
    <section className="bg-white text-black py-24 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{heading}</h2>
          {subheading && <p className="text-xl text-black/60 max-w-2xl mx-auto">{subheading}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col group">
              {/* Connector Line (hidden on mobile, visible on desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-[2px] bg-gradient-to-r from-[var(--ipal-primary,#16a34a)] to-transparent opacity-20" />
              )}
              
              <div className="flex flex-row lg:flex-col items-center lg:items-start gap-6 lg:gap-8 z-10 bg-white">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-[var(--ink-50,#f8fafc)] shadow-sm font-black text-3xl text-[var(--ipal-primary,#16a34a)] transition-transform group-hover:scale-110 group-hover:shadow-md">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-black/60 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
