import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

export const metadata: Metadata = {
  title: 'Contact | Han Dongyun',
  description: 'Get in touch with Han Dongyun. Contact for collaboration, inquiries, or questions about development and education.',
  keywords: ['contact', 'collaboration', 'inquiry', 'Han Dongyun', 'developer', 'educator'],
  authors: [{ name: 'Han Dongyun' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${baseUrl}/contact`,
    siteName: 'Han Dongyun Portfolio',
    title: 'Contact | Han Dongyun',
    description: 'Get in touch with Han Dongyun. Contact for collaboration, inquiries, or questions about development and education.',
    images: [
      {
        url: `${baseUrl}/og-contact.jpg`,
        width: 1200,
        height: 630,
        alt: 'Contact Han Dongyun',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Han Dongyun',
    description: 'Get in touch with Han Dongyun. Contact for collaboration, inquiries, or questions.',
    images: [`${baseUrl}/og-contact.jpg`],
  },
  alternates: {
    canonical: '/contact',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
