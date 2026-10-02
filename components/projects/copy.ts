import type { Category } from '@/data/projects'
import type { Locale } from '@/translations'

// 프로젝트 목록·상세 화면의 문구 (확정되면 translations 로 옮긴다).
// 분류 이름은 홈의 "맡길 수 있는 일"과 같은 말로 맞춘다
export const PROJECT_COPY: Record<
    Locale,
    {
        title: string[]
        intro: string
        all: string
        count: string
        categories: Record<Category, string>
        empty: string
        back: string
        role: string
        stack: string
        background: string
        requirements: string
        approach: string
        architecture: string
        myRole: string
        outcome: string
        learnings: string
        nda: string
        prev: string
        next: string
        endTitle: string
        endText: string
        endCta: string
        notFound: string
    }
> = {
    ko: {
        title: ['2015년부터', '{count}개를 만들었습니다'],
        intro: '웹 서비스, 모바일 앱, AI 기능, 업무 시스템. 고객사 요청으로 이름을 밝히지 않은 것이 많아, 무엇을 왜 만들었는지를 중심으로 적었습니다.',
        all: '전체',
        count: '{count}개',
        categories: { Platform: '웹 서비스와 플랫폼', Mobile: '모바일 앱', AI: 'AI와 자동화', Enterprise: '업무 시스템' },
        empty: '이 분류에는 아직 프로젝트가 없습니다.',
        back: '프로젝트 목록',
        role: '역할',
        stack: '기술',
        background: '배경',
        requirements: '필요했던 것',
        approach: '이렇게 풀었습니다',
        architecture: '구조',
        myRole: '맡은 일',
        outcome: '결과',
        learnings: '배운 것',
        nda: '고객사와의 약속으로 일부 정보만 공개합니다.',
        prev: '이전 프로젝트',
        next: '다음 프로젝트',
        endTitle: '비슷한 것을 만들고 싶다면',
        endText: '만들고 싶은 것을 몇 줄로 보내 주세요. 범위와 일정, 예상 비용을 정리해 답장드립니다.',
        endCta: '프로젝트 문의하기',
        notFound: '프로젝트를 찾을 수 없습니다',
    },
    en: {
        title: ['{count} products', 'built since 2015'],
        intro: 'Web services, mobile apps, AI features and internal systems. Many clients asked not to be named, so each entry focuses on what was built and why.',
        all: 'All',
        count: '{count} projects',
        categories: { Platform: 'Web services and platforms', Mobile: 'Mobile apps', AI: 'AI and automation', Enterprise: 'Internal systems' },
        empty: 'No projects in this category yet.',
        back: 'All projects',
        role: 'Role',
        stack: 'Stack',
        background: 'Background',
        requirements: 'What was needed',
        approach: 'How I solved it',
        architecture: 'Structure',
        myRole: 'My part',
        outcome: 'Outcome',
        learnings: 'What I learned',
        nda: 'Only part of this project is public, as agreed with the client.',
        prev: 'Previous project',
        next: 'Next project',
        endTitle: 'Want something similar?',
        endText: 'Send a few lines about what you want to make. I will reply with scope, schedule and an estimate.',
        endCta: 'Start a project',
        notFound: 'Project not found',
    },
    de: {
        title: ['{count} Produkte', 'seit 2015 gebaut'],
        intro: 'Web-Services, mobile Apps, KI-Funktionen und interne Systeme. Viele Kunden möchten nicht genannt werden, daher steht im Mittelpunkt, was gebaut wurde und warum.',
        all: 'Alle',
        count: '{count} Projekte',
        categories: { Platform: 'Web-Services und Plattformen', Mobile: 'Mobile Apps', AI: 'KI und Automatisierung', Enterprise: 'Interne Systeme' },
        empty: 'In dieser Kategorie gibt es noch keine Projekte.',
        back: 'Alle Projekte',
        role: 'Rolle',
        stack: 'Technik',
        background: 'Hintergrund',
        requirements: 'Was gebraucht wurde',
        approach: 'So habe ich es gelöst',
        architecture: 'Aufbau',
        myRole: 'Mein Anteil',
        outcome: 'Ergebnis',
        learnings: 'Was ich gelernt habe',
        nda: 'Nach Absprache mit dem Kunden ist nur ein Teil öffentlich.',
        prev: 'Vorheriges Projekt',
        next: 'Nächstes Projekt',
        endTitle: 'Etwas Ähnliches geplant?',
        endText: 'Schreiben Sie mir in ein paar Zeilen, was Sie bauen möchten. Ich antworte mit Umfang, Zeitplan und Kostenschätzung.',
        endCta: 'Projekt anfragen',
        notFound: 'Projekt nicht gefunden',
    },
}
