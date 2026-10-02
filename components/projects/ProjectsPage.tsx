'use client'

import { useMemo, useState } from 'react'
import { flushSync } from 'react-dom'
import Link from 'next/link'
import h from '@/components/home/home.module.css'
import s from './ProjectsPage.module.css'
import HomeShell from '@/components/home/HomeShell'
import Sentences from '@/components/home/Sentences'
import Typewriter from '@/components/home/Typewriter'
import CountUp from '@/components/home/CountUp'
import { PROJECT_COPY } from './copy'
import { CATEGORIES, PROJECTS, type Category, type Project } from '@/data/projects'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackCardClick } from '@/lib/utils/gtm'

// 목록에서는 기술을 앞에서부터 몇 개만 보여준다 (전부는 상세 페이지에)
const MAX_TAGS = 5

// 범위로 적힌 연도("2015–2020")는 시작 연도로 묶는다
const yearOf = (project: Project) => project.year.slice(0, 4)

// 프로젝트 목록. 연도를 크게 세우고 그 해에 만든 것을 묶는다.
// 프로젝트가 늘어도 데이터만 추가하면 연도·개수·분류 숫자가 따라온다
export default function ProjectsPage() {
    const { locale } = useLanguage()
    const copy = PROJECT_COPY[locale]
    const [category, setCategory] = useState<Category | null>(null)

    // 분류를 바꾸면 남는 항목이 새 자리로 미끄러져 간다 (View Transitions 를 지원하는 브라우저에서만.
    // 지원하지 않거나 움직임 최소화 설정이면 바로 바뀐다)
    const pick = (next: Category | null) => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (!document.startViewTransition || reduced) return setCategory(next)
        document.startViewTransition(() => flushSync(() => setCategory(next)))
    }

    const groups = useMemo(() => {
        const shown = category ? PROJECTS.filter((p) => p.category === category) : PROJECTS
        const years = [...new Set(shown.map(yearOf))].sort((a, b) => Number(b) - Number(a))
        return years.map((year) => ({ year, items: shown.filter((p) => yearOf(p) === year) }))
    }, [category])

    const chips: { key: Category | null; label: string; count: number }[] = [
        { key: null, label: copy.all, count: PROJECTS.length },
        ...CATEGORIES.map((key) => ({
            key,
            label: copy.categories[key],
            count: PROJECTS.filter((p) => p.category === key).length,
        })),
    ]

    return (
        <HomeShell>
            <section className={s.intro}>
                <div className={h.container}>
                    <h1 className={s.title}>
                        <Typewriter
                            key={locale}
                            loop
                            lines={copy.title.map((line) => line.replace('{count}', String(PROJECTS.length)))}
                        />
                    </h1>
                    <p className={s.lead}>
                        <Sentences text={copy.intro} />
                    </p>
                </div>
            </section>

            <section className={s.list}>
                <div className={h.container}>
                    <div className={s.chips}>
                        {chips.map((chip) => (
                            <button
                                key={chip.label}
                                type="button"
                                className={s.chip}
                                aria-pressed={category === chip.key}
                                onClick={() => pick(chip.key)}
                            >
                                {chip.label}
                                <span className={s.count}>{chip.count}</span>
                            </button>
                        ))}
                    </div>

                    {groups.length === 0 && <p className={s.empty}>{copy.empty}</p>}

                    {groups.map((group) => (
                        <div key={group.year} className={s.year}>
                            <div className={s.yearHead}>
                                <h2 className={s.yearNum}>{group.year}</h2>
                                <p className={s.yearCount}>
                                    {copy.count.split('{count}')[0]}
                                    <CountUp key={group.items.length} value={group.items.length} duration={600} />
                                    {copy.count.split('{count}')[1]}
                                </p>
                            </div>
                            <ul className={s.items}>
                                {group.items.map((project) => (
                                    <li key={project.id} style={{ viewTransitionName: `project-${project.id}` }}>
                                        <Link
                                            href={`/projects/${project.id}`}
                                            className={s.item}
                                            onClick={() =>
                                                trackCardClick(
                                                    `project_${project.id}`,
                                                    `/projects/${project.id}`,
                                                    locale
                                                )
                                            }
                                        >
                                            <span className={s.kind}>{copy.categories[project.category]}</span>
                                            <span className={s.text}>
                                                <strong>{project.title}</strong>
                                                <span className={s.summary}>{project.summary}</span>
                                                <span className={s.tags}>
                                                    {project.techStack.slice(0, MAX_TAGS).map((tech) => (
                                                        <span key={tech} className={s.tag}>
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </span>
                                            </span>
                                            <span className={s.go} aria-hidden>
                                                →
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </HomeShell>
    )
}
