'use client'

import React, { useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export interface GrantCheckerProps {
  heading: string
  subheading?: string
  grantAmount: string
}

export function GrantCheckerComponent({
  heading,
  subheading,
  grantAmount,
}: GrantCheckerProps) {
  const [postcode, setPostcode] = useState('')
  const [status, setStatus] = useState<'idle' | 'checking' | 'eligible'>('idle')

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault()
    if (!postcode) return
    setStatus('checking')
    setTimeout(() => {
      setStatus('eligible')
    }, 1500)
  }

  return (
    <section className="bg-[var(--ink-50,#f8fafc)] py-24 px-4 md:px-8">
      <div className="mx-auto max-w-4xl relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1E2715] to-[#2B3B1C] text-white p-8 md:p-16 shadow-2xl">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 h-96 w-96 rounded-full bg-[#CDDC94]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 h-96 w-96 rounded-full bg-[#57703C]/20 blur-3xl" />

        <div className="relative z-10 text-center flex flex-col items-center">
          <div className="mb-6">
            <img src="https://ecogenica.co.uk/Logo-transparent.png" alt="Ecogenica" className="h-12 w-auto object-contain brightness-0 invert opacity-90" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{heading}</h2>
          {subheading && <p className="text-lg text-white/70 max-w-xl mx-auto mb-10">{subheading}</p>}

          <div className="w-full max-w-md bg-white/5 p-2 rounded-2xl backdrop-blur-sm border border-white/10">
            {status === 'idle' && (
              <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Enter your postcode (e.g. SW1A 1AA)"
                  className="flex-1 rounded-xl bg-white px-4 py-4 text-black outline-none focus:ring-2 focus:ring-[var(--ipal-primary,#16a34a)] placeholder:text-black/40 font-medium"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn-primary flex items-center justify-center whitespace-nowrap"
                >
                  Check Now
                </button>
              </form>
            )}

            {status === 'checking' && (
              <div className="py-4 flex items-center justify-center gap-3 font-medium">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                Checking eligibility for {postcode.toUpperCase()}...
              </div>
            )}

            {status === 'eligible' && (
              <div className="py-2 px-2 flex flex-col items-center animate-in fade-in zoom-in duration-300">
                <div className="flex items-center gap-3 text-xl font-bold text-[var(--ipal-primary,#16a34a)] mb-2">
                  <CheckCircle2 className="h-6 w-6" />
                  Great news!
                </div>
                <p className="text-white/80 mb-6">
                  Properties in {postcode.toUpperCase()} typically qualify for the {grantAmount} Boiler Upgrade Scheme.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-primary inline-flex w-full sm:w-auto items-center justify-center gap-2"
                >
                  Book Free Survey
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
          
          <p className="mt-8 text-xs text-white/40">
            Subject to property assessment and government terms and conditions.
          </p>
        </div>
      </div>
    </section>
  )
}
