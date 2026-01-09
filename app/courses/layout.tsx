import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

export const metadata: Metadata = {
  title: 'Courses | Han Dongyun',
  description: 'Educational courses and curriculum by Han Dongyun - Full Stack Mastery, Automated Workflows, and Interactive 3D Web development courses.',
  keywords: ['courses', 'education', 'curriculum', 'full-stack', 'programming courses', 'web development', 'teaching'],
  authors: [{ name: 'Han Dongyun' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${baseUrl}/courses`,
    siteName: 'Han Dongyun Portfolio',
    title: 'Courses | Han Dongyun',
    description: 'Educational courses and curriculum by Han Dongyun - Full Stack Mastery, Automated Workflows, and Interactive 3D Web development courses.',
    images: [
      {
        url: `${baseUrl}/og-courses.jpg`,
        width: 1200,
        height: 630,
        alt: 'Han Dongyun Courses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Courses | Han Dongyun',
    description: 'Educational courses and curriculum by Han Dongyun - Full Stack Mastery, Automated Workflows, and more.',
    images: [`${baseUrl}/og-courses.jpg`],
  },
  alternates: {
    canonical: '/courses',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
