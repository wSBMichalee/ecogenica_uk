import Link from 'next/link'
// @ts-ignore
import type { Page } from '@/payload-types'
import { ArrowRight } from 'lucide-react'

export interface AudienceSplitProps {
  heading: string
  homeownerLabel: string
  homeownerTarget: Page | number
  installerLabel: string
  installerTarget: Page | number
}

export function AudienceSplitComponent({
  heading,
  homeownerLabel,
  homeownerTarget,
  installerLabel,
  installerTarget,
}: AudienceSplitProps) {
  const homeUrl =
    homeownerTarget && typeof homeownerTarget === 'object' ? `/${homeownerTarget.slug}` : '#'
  const installerUrl =
    installerTarget && typeof installerTarget === 'object' ? `/${installerTarget.slug}` : '#'

  return (
    <section className="bg-white text-black py-20 px-4 md:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">{heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href={homeUrl}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[var(--ipal-radius,1.5rem)] bg-[var(--ink-50,#f8fafc)] p-8 md:p-12 transition-all hover:bg-[var(--ink-100,#f1f5f9)] min-h-[300px]"
          >
            <div className="z-10">
              <h3 className="text-2xl font-semibold mb-2">{homeownerLabel}</h3>
              <p className="text-black/60 group-hover:text-black/80 transition-colors">
                Discover heat pumps designed to lower your bills and carbon footprint.
              </p>
            </div>
            <div className="z-10 mt-8 flex items-center gap-2 font-medium text-[var(--ipal-primary,#16a34a)]">
              Learn more
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </div>
            {/* Subtle decorative background element */}
            <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-[var(--ipal-primary,#16a34a)]/10 transition-transform group-hover:scale-110" />
          </Link>

          <Link
            href={installerUrl}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[var(--ipal-radius,1.5rem)] bg-[var(--ink-950,#0f172a)] text-white p-8 md:p-12 transition-all hover:bg-[var(--ink-900,#1e293b)] min-h-[300px]"
          >
            <div className="z-10">
              <h3 className="text-2xl font-semibold mb-2">{installerLabel}</h3>
              <p className="text-white/60 group-hover:text-white/80 transition-colors">
                Access technical specs, support, and join our partner network.
              </p>
            </div>
            <div className="z-10 mt-8 flex items-center gap-2 font-medium text-[var(--ipal-primary,#16a34a)]">
              Partner with us
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </div>
            <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-[var(--ipal-primary,#16a34a)]/20 transition-transform group-hover:scale-110" />
          </Link>
        </div>
      </div>
    </section>
  )
}
