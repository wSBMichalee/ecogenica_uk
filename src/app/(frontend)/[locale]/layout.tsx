import { notFound } from 'next/navigation'
import { getConsentTexts, getAnalyticsConfig } from '@intecion/ipal-kit'
import { ConsentProvider, CookieBanner, CookieButton, Analytics } from '@intecion/ipal-kit/client'
import { i18nConfig } from '@/i18n.config'
import { getCachedPayload, getConfiguredLocales } from '@/lib/content'
import { getSettings } from '@/lib/payload'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import '../styles.css'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const locales = await getConfiguredLocales()
  if (!locales.includes(locale)) notFound()

  // Temporarily disabled Payload for static frontend building
  // const payload = await getCachedPayload()
  // const settings = await getSettings(locale)
  // const privacyPage = (settings as { privacyPolicy?: unknown }).privacyPolicy

  const texts = {
    acceptAll: 'Accept All',
    acceptSelection: 'Accept Selection',
    rejectAll: 'Reject All',
    manageCookies: 'Manage Cookies',
    cookiePolicyLabel: 'Cookie Policy',
    privacyPolicyLabel: 'Privacy Policy',
    settings: {
      necessary: { title: 'Necessary', description: 'Required for site functionality.' },
      functional: { title: 'Functional', description: 'Enables advanced features.' },
      analytics: { title: 'Analytics', description: 'Helps us understand visitors.' },
      marketing: { title: 'Marketing', description: 'Used for ads.' },
    },
  } as any
  const analytics = {} as any

  return (
    <html lang={locale}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

export async function generateStaticParams() {
  const locales = await getConfiguredLocales()
  return locales.map((locale) => ({ locale }))
}
