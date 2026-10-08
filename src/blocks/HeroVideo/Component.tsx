import Link from 'next/link'
import { getSystemPagePath } from '@intecion/ipal-kit'
import { CheckCircle2, ChevronRight, Zap } from 'lucide-react'
// @ts-ignore (Assuming proper type definitions are generated)
import type { Page, Media } from '@/payload-types'

export interface HeroVideoProps {
  heading: string
  subheading?: string
  posterImage: Media
  videoMp4?: Media
  videoWebm?: Media
  videoMobile?: Media
  ctaLabel?: string
  ctaTarget?: Page | number
  ctaSecondaryLabel?: string
  ctaSecondaryTarget?: Page | number
}

export function HeroVideoComponent({
  heading,
  subheading,
  posterImage,
  videoMp4,
  videoWebm,
  videoMobile,
  ctaLabel,
  ctaTarget,
  ctaSecondaryLabel,
  ctaSecondaryTarget,
}: HeroVideoProps) {
  const ctaUrl = ctaTarget && typeof ctaTarget === 'object' ? `/${ctaTarget.slug}` : '#'
  const ctaSecondaryUrl =
    ctaSecondaryTarget && typeof ctaSecondaryTarget === 'object'
      ? `/${ctaSecondaryTarget.slug}`
      : '#'

  return (
    <section className="relative flex h-[100svh] min-h-[600px] w-full flex-col justify-end bg-[var(--ink-950)] text-white overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={posterImage?.url || ''}
          className="h-full w-full object-cover"
        >
          {videoWebm && <source src={videoWebm.url || ''} type="video/webm" />}
          {videoMp4 && <source src={videoMp4.url || ''} type="video/mp4" />}
        </video>
        {/* Scrim Gradient & Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--ink-950)_0%,transparent_65%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_left,var(--ink-950)_0%,transparent_65%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-16 max-w-[800px] pb-24 md:pb-32 ml-auto w-full">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20 mb-8 animate-bounce-subtle">
          <Zap className="h-4 w-4 text-[var(--ipal-secondary)]" />
          <span className="text-sm font-semibold text-white tracking-wide uppercase">Boiler Upgrade Scheme 2026</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow-lg">{heading}</h1>
        {subheading && <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl font-light leading-relaxed">{subheading}</p>}
        
        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center gap-6 mb-12">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-[var(--ipal-secondary)]" />
            <span className="font-medium text-white/90">MCS Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-[var(--ipal-secondary)]" />
            <span className="font-medium text-white/90">Zero upfront cost surveys</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-[var(--ipal-secondary)]" />
            <span className="font-medium text-white/90">UK-based support</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
          {ctaLabel && (
            <Link
              href={ctaUrl}
              className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto text-lg"
            >
              {ctaLabel}
              <ChevronRight className="h-5 w-5" />
            </Link>
          )}
          {ctaSecondaryLabel && (
            <Link
              href={ctaSecondaryUrl}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full glass-panel px-8 py-4 font-semibold text-white transition-all hover:bg-white/20 hover:scale-105 sm:w-auto text-lg"
            >
              {ctaSecondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
