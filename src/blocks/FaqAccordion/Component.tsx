'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface FaqAccordionProps {
  heading: string
  subheading?: string
  faqs: FaqItem[]
}

export function FaqAccordionComponent({
  heading,
  subheading,
  faqs,
}: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section className="bg-white text-black py-24 px-4 md:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{heading}</h2>
          {subheading && <p className="text-xl text-black/60">{subheading}</p>}
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id
            
            return (
              <div 
                key={faq.id} 
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen ? 'border-[var(--ipal-primary,#16a34a)] bg-[var(--ink-50,#f8fafc)] shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}`}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <h3 className={`text-lg font-bold pr-8 ${isOpen ? 'text-[var(--ipal-primary,#16a34a)]' : 'text-black'}`}>
                    {faq.question}
                  </h3>
                  <span className={`flex shrink-0 items-center justify-center h-8 w-8 rounded-full transition-transform duration-300 ${isOpen ? 'bg-[var(--ipal-primary,#16a34a)] text-white rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                    <ChevronDown className="h-5 w-5" />
                  </span>
                </button>
                
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="p-6 pt-0 text-black/70 leading-relaxed">
                      {faq.answer}
                    </p>
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
