import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

export const metadata: Metadata = {
  title: 'Projects | Han Dongyun',
  description: 'Explore the portfolio of Han Dongyun - Full-stack development projects including web applications, automation tools, and AI integrations.',
  keywords: ['projects', 'portfolio', 'full-stack', 'web development', 'Next.js', 'React', 'Python', 'projects'],
  authors: [{ name: 'Han Dongyun' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${baseUrl}/projects`,
    siteName: 'Han Dongyun Portfolio',
    title: 'Projects | Han Dongyun',
    description: 'Explore the portfolio of Han Dongyun - Full-stack development projects including web applications, automation tools, and AI integrations.',
    images: [
      {
        url: `${baseUrl}/og-projects.jpg`,
        width: 1200,
        height: 630,
        alt: 'Han Dongyun Projects Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Han Dongyun',
    description: 'Explore the portfolio of Han Dongyun - Full-stack development projects.',
    images: [`${baseUrl}/og-projects.jpg`],
  },
  alternates: {
    canonical: '/projects',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
