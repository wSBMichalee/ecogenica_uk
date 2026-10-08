import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createLocaleMiddleware } from '@intecion/ipal-kit/next/middleware'
import { i18nConfig } from '@/i18n.config'

const localeMiddleware = createLocaleMiddleware({ config: i18nConfig })

export function proxy(request: NextRequest) {
  const result = localeMiddleware(request)

  const response =
    result.type === 'next'
      ? NextResponse.next()
      : NextResponse.redirect(result.location)

  if (result.cookie) {
    response.cookies.set(result.cookie.name, result.cookie.value)
  }
  return response
}

export const config = {
  matcher: ['/((?!api|admin|_next|.*\\..*).*)'],
}
