'use client'

import { useRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import h from './home.module.css'
import s from './Work.module.css'
import WorkThumb, { type ThumbVariant } from './WorkThumb'
import { PROJECTS } from '@/data/projects'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackCardClick } from '@/lib/utils/gtm'
import { gsap, useGSAP, MQ, BEAT } from '@/lib/motion'

// 케이스 스터디 대표 8건 (2026-09-30 확정, 성과·해외·AI·업종 다양성 기준)
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

export default function Work() {
    const { t, locale } = useLanguage()
    const work = t.home.work
    const root = useRef<HTMLElement>(null)

    useGSAP(
        () => {
            const el = root.current!
            const track = el.querySelector<HTMLElement>(`.${s.track}`)!
            const mm = gsap.matchMedia()

            mm.add(MQ.motion, () => {
                // 밝은 무대에서 어두운 상영관으로: 패널이 화면 가득 펼쳐진다
                gsap.fromTo(
                    el,
                    { clipPath: 'inset(0% 3% 0% 3% round 28px)' },
                    {
                        clipPath: 'inset(0% 0% 0% 0% round 0px)',
                        ease: 'none',
                        scrollTrigger: { trigger: el, start: 'top bottom', end: 'top top', scrub: true },
                    },
                )
            })

            mm.add(MQ.desktop, () => {
                // 마지막 카드 오른쪽에 좌측과 같은 여백이 남을 때까지 이동
                const distance = () => {
                    const last = track.lastElementChild as HTMLElement
                    const gutter = parseFloat(getComputedStyle(track).paddingLeft)
                    return Math.max(0, last.offsetLeft + last.offsetWidth + gutter - track.clientWidth)
                }
                gsap.to(track, {
                    x: () => -distance(),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top top',
                        end: () => `+=${distance()}`,
                        pin: true,
                        scrub: 0.8,
                        invalidateOnRefresh: true,
                    },
                })
                gsap.from(`.${s.card}`, {
                    y: 60,
                    autoAlpha: 0,
                    duration: BEAT * 2,
                    ease: 'expo.out',
                    stagger: BEAT / 4,
                    scrollTrigger: { trigger: el, start: 'top 60%' },
                })
            })

            return () => mm.revert()
        },
        { scope: root, dependencies: [locale], revertOnUpdate: true },
    )

    return (
        <section ref={root} id="work" className={s.work} aria-labelledby="work-title">
            <div className={clsx(h.container, s.head)}>
                <div>
                    <p className={clsx(h.eyebrow, s.eyebrow)}>{work.eyebrow}</p>
                    <h2 id="work-title" className={h.sectionTitle}>
                        {work.title}
                    </h2>
                </div>
                <p className={s.desc}>{work.desc}</p>
            </div>

            <div className={s.track}>
                {ITEMS.map(({ project: p, thumb }, i) => (
                    <Link
                        key={p.id}
                        href={`/projects/${p.id}`}
                        className={s.card}
                        onClick={() => trackCardClick(`home_work_${p.id}`, `/projects/${p.id}`, locale)}
                    >
                        <div className={s.thumb}>
                            <WorkThumb variant={thumb} />
                            <span className={s.index}>{String(i + 1).padStart(2, '0')}</span>
                            {p.nda && <span className={s.nda}>NDA</span>}
                        </div>
                        <div className={s.meta}>
                            <span>{p.category}</span>
                            <span>{p.year}</span>
                        </div>
                        <h3 className={s.cardTitle}>{p.title}</h3>
                        <p className={s.summary}>{p.summary}</p>
                        <ul className={s.stack}>
                            {p.techStack.slice(0, 4).map((tech) => (
                                <li key={tech}>{tech}</li>
                            ))}
                        </ul>
                        <span className={s.more}>
                            {work.view}
                            <ArrowUpRight size={16} weight="bold" />
                        </span>
                    </Link>
                ))}
                <Link href="/projects" className={clsx(s.card, s.allCard)}>
                    <span className={s.allCount}>{PROJECTS.length}</span>
                    <span className={s.allLabel}>
                        {work.all}
                        <ArrowRight size={22} weight="bold" />
                    </span>
                </Link>
            </div>
        </section>
    )
}
