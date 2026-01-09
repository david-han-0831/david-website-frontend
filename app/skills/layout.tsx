import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

export const metadata: Metadata = {
  title: 'Skills | Han Dongyun',
  description: 'Technical skills and expertise of Han Dongyun - Full-stack development, AI/ML, automation, and modern web technologies.',
  keywords: ['skills', 'technical skills', 'full-stack', 'programming', 'Next.js', 'React', 'Python', 'AI', 'ML'],
  authors: [{ name: 'Han Dongyun' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${baseUrl}/skills`,
    siteName: 'Han Dongyun Portfolio',
    title: 'Skills | Han Dongyun',
    description: 'Technical skills and expertise of Han Dongyun - Full-stack development, AI/ML, automation, and modern web technologies.',
    images: [
      {
        url: `${baseUrl}/og-skills.jpg`,
        width: 1200,
        height: 630,
        alt: 'Han Dongyun Skills',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skills | Han Dongyun',
    description: 'Technical skills and expertise of Han Dongyun - Full-stack development, AI/ML, and automation.',
    images: [`${baseUrl}/og-skills.jpg`],
  },
  alternates: {
    canonical: '/skills',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
