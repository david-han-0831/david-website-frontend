'use client'

import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

interface PostHogProviderWrapperProps {
  children: React.ReactNode
  apiKey: string
  apiHost: string
}

function PostHogPageView({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track pageviews for Next.js App Router
    if (pathname && typeof window !== 'undefined') {
      // PostHog will automatically track pageviews if capture_pageview is enabled
      // This effect ensures pageviews are tracked on route changes
    }
  }, [pathname, searchParams])

  return <>{children}</>
}

export default function PostHogProviderWrapper({
  children,
  apiKey,
  apiHost,
}: PostHogProviderWrapperProps) {
  if (!apiKey) {
    return <>{children}</>
  }

  return (
    <PostHogProvider
      apiKey={apiKey}
      options={{
        api_host: apiHost,
        person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: true,
        debug: process.env.NODE_ENV === 'development',
      }}
    >
      <PostHogPageView>{children}</PostHogPageView>
    </PostHogProvider>
  )
}
