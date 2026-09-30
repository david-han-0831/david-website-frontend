'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import h from './home.module.css'
import s from './WorkIndex.module.css'
import WorkThumb, { type ThumbVariant } from './WorkThumb'
import { PROJECTS } from '@/data/projects'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackCardClick } from '@/lib/utils/gtm'

// 케이스 스터디 대표 8건 (2026-09-30 확정)
const FEATURED: { id: number; thumb: ThumbVariant }[] = [
    { id: 6, thumb: 'market' },
    { id: 3, thumb: 'pos' },
    { id: 1, thumb: 'exam' },
    { id: 5, thumb: 'vision' },
    { id: 4, thumb: 'coach' },
    { id: 7, thumb: 'gallery' },
    { id: 9, thumb: 'phones' },
    { id: 10, thumb: 'sheet' },
]
const ITEMS = FEATURED.flatMap(({ id, thumb }) => {
    const project = PROJECTS.find((p) => p.id === id)
    return project ? [{ project, thumb }] : []
})

export default function WorkIndex() {
    const { t, locale } = useLanguage()
    const work = t.home.work
    const areas = work.areas as Record<string, string>
    const preview = useRef<HTMLDivElement>(null)
    const [active, setActive] = useState<ThumbVariant | null>(null)

    // 목록 위에서만 그림이 커서를 따라온다 (터치 기기에서는 나오지 않음)
    const follow = (e: React.PointerEvent) => {
        if (e.pointerType !== 'mouse' || !preview.current) return
        preview.current.style.transform = `translate3d(${e.clientX + 24}px, ${e.clientY - 90}px, 0)`
    }

    return (
        <section className={h.section} id="work">
            <div className={h.container}>
                <div className={s.head}>
                    <h2 className={h.h2}>{work.title}</h2>
                    <p className={s.note}>{work.note}</p>
                </div>

                <table className={s.table} onPointerMove={follow} onPointerLeave={() => setActive(null)}>
                    <thead>
                        <tr>
                            {work.cols.map((c) => (
                                <th key={c} scope="col">
                                    {c}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {ITEMS.map(({ project: p, thumb }) => (
                            <tr
                                key={p.id}
                                onPointerEnter={(e) => {
                                    follow(e)
                                    setActive(thumb)
                                }}
                            >
                                <td className={s.year}>{p.year}</td>
                                <td className={s.name}>
                                    <Link
                                        href={`/projects/${p.id}`}
                                        className={s.rowLink}
                                        onClick={() => trackCardClick(`home_work_${p.id}`, `/projects/${p.id}`, locale)}
                                    >
                                        {p.title}
                                    </Link>
                                </td>
                                <td className={s.area}>{areas[String(p.id)]}</td>
                                <td className={s.result}>{p.outcome?.result.replaceAll('->', '→')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Link href="/projects" className={`${h.link} ${s.all}`}>
                    {work.all.replace('{count}', String(PROJECTS.length))}
                </Link>
            </div>

            <div ref={preview} className={s.preview} data-show={active ? '' : undefined} aria-hidden>
                {active && <WorkThumb variant={active} />}
            </div>
        </section>
    )
}
