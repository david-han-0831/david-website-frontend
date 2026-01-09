import { PROJECTS } from '@/data/projects'

interface StructuredDataProps {
  type: 'Person' | 'Organization' | 'WebSite' | 'BreadcrumbList' | 'Article' | 'SoftwareApplication'
  data?: Record<string, any>
  projectId?: number
}

export default function StructuredData({ type, data, projectId }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

  const getStructuredData = () => {
    switch (type) {
      case 'Person':
        return {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Han Dongyun',
          jobTitle: 'Full-Stack Developer & Educator',
          url: baseUrl,
          sameAs: [
            // GitHub, LinkedIn 등 소셜 미디어 링크 추가 가능
          ],
          ...data,
        }

      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Han Dongyun Portfolio',
          url: baseUrl,
          ...data,
        }

      case 'WebSite':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Han Dongyun Portfolio',
          url: baseUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${baseUrl}/projects?search={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
          ...data,
        }

      case 'BreadcrumbList':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data?.items || [],
        }

      case 'Article':
        const project = projectId ? PROJECTS.find((p) => p.id === projectId) : null
        if (!project) return null

        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: project.title,
          description: project.summary,
          author: {
            '@type': 'Person',
            name: 'Han Dongyun',
          },
          datePublished: project.year,
          url: `${baseUrl}/projects/${project.id}`,
          ...data,
        }

      case 'SoftwareApplication':
        const appProject = projectId ? PROJECTS.find((p) => p.id === projectId) : null
        if (!appProject) return null

        return {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: appProject.title,
          description: appProject.summary,
          applicationCategory: 'WebApplication',
          operatingSystem: 'Web',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          ...data,
        }

      default:
        return null
    }
  }

  const structuredData = getStructuredData()

  if (!structuredData) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

