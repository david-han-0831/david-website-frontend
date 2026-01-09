import type { Metadata } from 'next'
import { PROJECTS } from '@/data/projects'
import StructuredData from '@/components/seo/StructuredData'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const projectId = Number(id)
  const project = PROJECTS.find((p) => p.id === projectId)

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

  return {
    title: project.title,
    description: project.summary,
    keywords: [
      ...project.techStack,
      project.category,
      'portfolio',
      'project',
      'development',
    ],
    openGraph: {
      title: `${project.title} | Han Dongyun`,
      description: project.summary,
      type: 'article',
      url: `${baseUrl}/projects/${project.id}`,
      images: project.heroImage
        ? [
            {
              url: project.heroImage,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ]
        : [
            {
              url: `${baseUrl}/og-image.jpg`,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Han Dongyun`,
      description: project.summary,
      images: project.heroImage
        ? [project.heroImage]
        : [`${baseUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: `/projects/${project.id}`,
    },
  }
}

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const projectId = Number(id)
  const project = PROJECTS.find((p) => p.id === projectId)

  if (!project) {
    return <>{children}</>
  }

  return (
    <>
      <StructuredData type="Article" projectId={projectId} />
      {children}
    </>
  )
}

