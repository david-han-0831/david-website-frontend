import type { Metadata } from 'next'
import styles from './page.module.css'
import Timeline from '@/components/dom/Timeline'
import Intro from '@/components/dom/Intro'
import Perspective from '@/components/dom/Perspective'
import Closing from '@/components/dom/Closing'
import StructuredData from '@/components/seo/StructuredData'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn more about Han Dongyun, a full-stack developer and educator specializing in Next.js, React, Python, and modern web technologies.',
  keywords: ['about', 'developer', 'full-stack', 'portfolio', 'Han Dongyun'],
  authors: [{ name: 'Han Dongyun' }],
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: `${baseUrl}/about`,
    siteName: 'Han Dongyun Portfolio',
    title: 'About Me | Han Dongyun',
    description: 'Learn more about Han Dongyun, a full-stack developer and educator specializing in Next.js, React, Python, and modern web technologies.',
    images: [
      {
        url: `${baseUrl}/og-about.jpg`,
        width: 1200,
        height: 630,
        alt: 'Han Dongyun - About',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Me | Han Dongyun',
    description: 'Learn more about Han Dongyun, a full-stack developer and educator.',
    images: [`${baseUrl}/og-about.jpg`],
  },
  alternates: {
    canonical: '/about',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AboutPage() {
    return (
        <>
            <StructuredData
                type="Person"
                data={{
                    jobTitle: 'Full-Stack Developer & Educator',
                    description: 'Full-stack developer specializing in Next.js, React, Python, and modern web technologies.',
                }}
            />
            <main className={styles.main}>
                <Intro />

                <Perspective />

                <section className={styles.section}>
                    <Timeline />
                </section>

                <Closing />
            </main>
        </>
    )
}
