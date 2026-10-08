'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export interface SpecModel {
  name: string
  specs: { label: string; value: string }[]
  imageUrl: string
  brochureUrl?: string
  manualUrl?: string
}

export interface ProductSpecsTabProps {
  models: SpecModel[]
}

export function ProductSpecsTabComponent({ models }: ProductSpecsTabProps) {
  const [activeTab, setActiveTab] = useState(0)
  const activeModel = models[activeTab]

  return (
    <section className="bg-[var(--ink-50,#f8fafc)] py-24 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          {models.map((model, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`rounded-full px-8 py-3 text-sm font-semibold transition-colors ${
                activeTab === idx
                  ? 'bg-[var(--ipal-primary,#57703C)] text-white shadow-md'
                  : 'bg-[var(--ipal-secondary,#CDDC94)] text-black hover:bg-[var(--ipal-primary,#57703C)] hover:text-white'
              }`}
            >
              {model.name}
            </button>
          ))}
        </div>
        
        {activeModel && (
          <div className="grid md:grid-cols-2 gap-12 items-start bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
            <div>
              <h3 className="text-2xl font-bold text-[var(--ipal-primary,#57703C)] mb-8 flex items-center gap-3">
                <CheckCircle2 className="text-[var(--ipal-accent,#92ab33)] h-8 w-8" />
                {activeModel.name}
              </h3>
              <ul className="space-y-4 text-black/80 text-sm">
                {activeModel.specs.map((spec, i) => (
                  <li key={i} className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="font-semibold text-black">{spec.label}</span>
                    <span className="text-right ml-4">{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-full aspect-square mb-8 bg-gray-50 rounded-2xl p-4">
                <Image src={activeModel.imageUrl} alt={activeModel.name} fill className="object-contain mix-blend-multiply" />
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                {activeModel.brochureUrl && (
                  <Link href={activeModel.brochureUrl} target="_blank" className="rounded-full bg-[var(--ipal-secondary,#CDDC94)] px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-[var(--ipal-primary,#57703C)] hover:text-white shadow-sm">
                    Download Brochure
                  </Link>
                )}
                {activeModel.manualUrl && (
                  <Link href={activeModel.manualUrl} target="_blank" className="rounded-full bg-[var(--ipal-secondary,#CDDC94)] px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-[var(--ipal-primary,#57703C)] hover:text-white shadow-sm">
                    Download Manual
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
