import { PROJECTS } from '@/data/projects'
import { SITE_URL } from '@/lib/site'

interface StructuredDataProps {
  type: 'Person' | 'Organization' | 'WebSite' | 'BreadcrumbList' | 'Article' | 'SoftwareApplication'
  data?: Record<string, any>
  projectId?: number
  /** head 가 아니라 본문에 둘 때 켠다 */
  inBody?: boolean
}

export default function StructuredData({ type, data, projectId, inBody }: StructuredDataProps) {
  const baseUrl = SITE_URL

  const getStructuredData = () => {
    switch (type) {
      case 'Person':
        return {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Han Dongyun',
          jobTitle: 'CEO of ColonB Inc., Developer and Instructor',
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

  // JSON 안의 '<'가 태그로 읽히지 않게 바꾼다
  const json = JSON.stringify(structuredData).replace(/</g, '\\u003c')

  // 본문(body)에 둘 때는 감싸는 칸 안에 넣는다. 분석 도구가 첫 script 앞에 자기 script 를 끼워 넣는데,
  // 그 자리가 React 가 관리하는 형제 사이면 화면 불일치 오류가 난다. 칸 안쪽은 React 가 비교하지 않는다
  if (inBody) {
    return (
      <div
        hidden
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: `<script type="application/ld+json">${json}</script>` }}
      />
    )
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}

