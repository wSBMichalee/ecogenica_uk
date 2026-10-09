'use client'

import React, { useState, useEffect, useRef } from 'react'

export interface RefrigerantCompareProps {
  heading: string
  subheading?: string
}

export function RefrigerantCompareComponent({
  heading,
  subheading,
}: RefrigerantCompareProps) {
  const [inView, setInView] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (chartRef.current) {
      observer.observe(chartRef.current)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-[#1C2517] text-white py-24 px-4 md:px-8">
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">{heading}</h2>
          {subheading && <p className="text-xl text-white/70 leading-relaxed">{subheading}</p>}
          <div className="pt-8">
            <p className="text-lg font-medium text-white/90 mb-4">Why Global Warming Potential (GWP) matters:</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#CDDC94]/20 text-[#CDDC94]">
                  ✓
                </div>
                <p className="text-white/70">Traditional refrigerants (like R410A) trap thousands of times more heat than CO2.</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#CDDC94]/20 text-[#CDDC94]">
                  ✓
                </div>
                <p className="text-white/70">R290 is a natural refrigerant with a negligible impact on global warming.</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-1 w-full max-w-lg lg:max-w-none" ref={chartRef}>
          <div className="rounded-3xl bg-white/5 border border-white/10 p-8 shadow-2xl backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-8 text-center text-white/50 uppercase tracking-widest">GWP Comparison</h3>
            
            <div className="space-y-8">
              {/* R410A Bar */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-red-400">R410A (Old Standard)</span>
                  <span className="font-mono text-red-400">2,088</span>
                </div>
                <div className="h-6 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-[1500ms] ease-out" style={{ width: inView ? '100%' : '0%' }} />
                </div>
              </div>

              {/* R32 Bar */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-amber-400">R32 (Transitional)</span>
                  <span className="font-mono text-amber-400">675</span>
                </div>
                <div className="h-6 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-[1500ms] ease-out delay-300" style={{ width: inView ? '32%' : '0%' }} />
                </div>
              </div>

              {/* R290 Bar */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-[#CDDC94] flex items-center gap-2">
                    R290 (Outback Range) <span className="text-xs bg-[#CDDC94]/20 text-[#CDDC94] px-2 py-0.5 rounded-full">Future-proof</span>
                  </span>
                  <span className="font-mono font-bold text-[#CDDC94]">3</span>
                </div>
                <div className="h-6 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-[#CDDC94] shadow-[0_0_15px_rgba(205,220,148,0.5)] transition-all duration-[1500ms] ease-out delay-700" style={{ width: inView ? '3%' : '0%' }} />
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}
