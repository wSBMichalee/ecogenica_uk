import Image from 'next/image'
import Link from 'next/link'
// @ts-ignore
import type { Media } from '@/payload-types'

export interface ClimateRangeProps {
  heading: string
  body?: string
  temperatureValue: number
  temperatureUnit: string
  image?: Media
  ctaLabel?: string
  ctaTarget?: string
}

export function ClimateRangeComponent({
  heading,
  body,
  temperatureValue,
  temperatureUnit,
  image,
  ctaLabel,
  ctaTarget,
}: ClimateRangeProps) {
  return (
    <section className="bg-[var(--ipal-primary,#57703C)] text-white py-24 px-4 md:px-8 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] bg-white rounded-full blur-[120px] mix-blend-overlay"></div>
      </div>
      
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center gap-12 lg:gap-24 relative z-10">
        <div className="flex-1 space-y-8 max-w-xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight uppercase tracking-wide drop-shadow-md">{heading}</h2>
          {body && <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">{body}</p>}
          <div className="flex items-baseline gap-2 pt-4">
            <span className="text-7xl md:text-9xl font-black tracking-tighter text-[var(--ipal-secondary,#CDDC94)] drop-shadow-lg">
              {temperatureValue}
            </span>
            <span className="text-4xl md:text-5xl font-bold text-[var(--ipal-secondary,#CDDC94)]/80">
              {temperatureUnit}
            </span>
          </div>
          <p className="text-sm font-bold tracking-widest uppercase text-white/70">
            Guaranteed Operational Range
          </p>
          
          {ctaLabel && ctaTarget && (
            <div className="pt-8">
              <Link
                href={ctaTarget}
                className="inline-flex items-center justify-center rounded-full bg-[var(--ipal-secondary,#CDDC94)] px-10 py-5 font-bold text-black transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-[0_0_30px_rgba(205,220,148,0.5)] uppercase tracking-wide group"
              >
                {ctaLabel}
                <svg className="w-5 h-5 ml-3 transform transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>
          )}
        </div>

        <div className="flex-1 relative w-full aspect-square max-w-lg md:max-w-none group perspective-1000">
          {/* Decorative background circle */}
          <div className="absolute inset-0 m-auto h-[120%] w-[120%] rounded-full bg-[radial-gradient(circle,var(--ipal-secondary,rgba(205,220,148,0.25))_0%,transparent_70%)] -z-10 animate-pulse transition-transform duration-700 group-hover:scale-110" />
          
          {image?.url ? (
            <Image
              src={image.url}
              alt={image.alt || heading}
              fill
              className="object-contain drop-shadow-2xl"
            />
          ) : (
            <div className="w-full h-full border-4 border-white/10 border-dashed rounded-[3rem] flex items-center justify-center text-white/30 text-center p-8">
              Visualizer / Thermometer graphic goes here
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
