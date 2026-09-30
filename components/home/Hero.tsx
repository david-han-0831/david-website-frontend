'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import s from './Hero.module.css'
import Screen from './screens/Screen'
import { SCREENS, type ScreenKey } from './screens/markup'
import { BRIEFS, BRIEF_STORAGE_KEY, matchBrief, type Brief } from './briefs'
import { useLanguage } from '@/contexts/LanguageContext'
import { PROJECTS } from '@/data/projects'
import { trackButtonClick } from '@/lib/utils/gtm'

export const EMAIL = 'hdy20201004@gmail.com'

// 뒤편 작업 벽 (1440×900 기준 좌표). 멀수록 흐리게.
const WALL: { name: ScreenKey; w: number; x: number; y: number; ry: number; rx: number; z: number; depth: 'near' | 'far' | 'farther' }[] = [
    { name: 'trade', w: 560, x: -210, y: 210, ry: 30, rx: 4, z: -360, depth: 'far' },
    { name: 'shot', w: 540, x: 1090, y: 215, ry: -30, rx: 4, z: -360, depth: 'far' },
    { name: 'pos', w: 470, x: -120, y: 500, ry: 26, rx: -3, z: -240, depth: 'near' },
    { name: 'exam', w: 200, x: 1215, y: 470, ry: -26, rx: -2, z: -220, depth: 'near' },
    { name: 'erp', w: 420, x: 330, y: 760, ry: 14, rx: -14, z: -620, depth: 'farther' },
]

const PHONES: ScreenKey[] = ['tele', 'exam']
const MATCH_W = 250
const MATCH_H = 168

export default function Hero() {
    const { t, locale } = useLanguage()
    const ask = t.home.ask
    const router = useRouter()
    const wall = useRef<HTMLDivElement>(null)
    const [text, setText] = useState(BRIEFS[0].prompt[locale])
    // null 이면 예시에 없는 요청
    const [brief, setBrief] = useState<Brief | null>(BRIEFS[0])
    const [edited, setEdited] = useState(false)
    const [lastLocale, setLastLocale] = useState(locale)

    // 언어가 바뀌면 손대지 않은 예시 문장도 그 언어로 바꾼다
    if (locale !== lastLocale) {
        setLastLocale(locale)
        if (!edited && brief) setText(brief.prompt[locale])
    }

    // 작업 벽은 1440px 기준으로 그리고 화면 폭에 맞춰 키운다
    useEffect(() => {
        const fit = () => wall.current?.style.setProperty('--k', String(Math.min(1.35, Math.max(0.8, window.innerWidth / 1440))))
        fit()
        window.addEventListener('resize', fit)
        return () => window.removeEventListener('resize', fit)
    }, [])

    // 한국어는 '8~10주', 나머지는 '8–10 weeks'
    const weeks = (w: string) => (locale === 'ko' ? `${w.replace('–', '~')}${ask.weeks_unit}` : `${w} ${ask.weeks_unit}`)

    const pick = (b: Brief) => {
        setBrief(b)
        setText(b.prompt[locale])
        setEdited(false)
    }

    const submit = (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!text.trim()) return
        setBrief(matchBrief(text))
        trackButtonClick('brief_submit', 'hero', undefined, locale)
    }

    const send = () => {
        const lines = [text.trim()]
        if (brief) {
            lines.push('', `${ask.draft}: ${brief.title[locale]}`, `${ask.weeks}: ${weeks(brief.weeks)}`, `${ask.builds}: ${brief.builds[locale]}`)
        }
        try {
            sessionStorage.setItem(BRIEF_STORAGE_KEY, lines.join('\n'))
        } catch {
            // 저장이 막힌 브라우저면 빈 폼으로 간다
        }
        trackButtonClick('brief_send', 'hero', '/contact', locale)
        router.push('/contact')
    }

    const project = brief ? PROJECTS.find((p) => p.id === brief.projectId) : null
    const phone = brief ? PHONES.includes(brief.screen) : false

    return (
        <section className={s.hero}>
            <div ref={wall} className={s.wall} aria-hidden>
                {WALL.map((c) => (
                    <div
                        key={c.name}
                        className={clsx(s.card, s[c.depth])}
                        style={{ left: c.x, top: c.y, transform: `translateZ(${c.z}px) rotateY(${c.ry}deg) rotateX(${c.rx}deg)` }}
                    >
                        <Screen name={c.name} width={c.w} />
                    </div>
                ))}
            </div>

            <div className={s.center}>
                <h1 className={s.title}>{ask.title}</h1>
                <p className={s.sub}>{ask.sub}</p>

                <form className={s.prompt} onSubmit={submit}>
                    <label htmlFor="brief" className={s.srOnly}>
                        {ask.placeholder}
                    </label>
                    <textarea
                        id="brief"
                        className={s.input}
                        value={text}
                        rows={2}
                        maxLength={500}
                        placeholder={ask.placeholder}
                        onChange={(e) => {
                            setText(e.target.value)
                            setEdited(true)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) submit(e)
                        }}
                    />
                    <div className={s.row}>
                        <div className={s.chips}>
                            {BRIEFS.map((b) => (
                                <button
                                    key={b.key}
                                    type="button"
                                    className={clsx(s.chip, brief?.key === b.key && !edited && s.chipOn)}
                                    onClick={() => pick(b)}
                                >
                                    {b.chip[locale]}
                                </button>
                            ))}
                        </div>
                        <button type="submit" className={s.submit}>
                            {ask.submit}
                        </button>
                    </div>
                </form>

                {/* 답이 바뀔 때만 움직인다 (key 로 다시 그림) */}
                <div key={brief?.key ?? 'none'} className={clsx(s.answer, !brief && s.answerSolo)} aria-live="polite">
                    <div className={s.draft}>
                        <p className={s.draftLabel}>
                            <i />
                            {ask.draft}
                        </p>
                        {brief ? (
                            <>
                                <h2 className={s.draftTitle}>{brief.title[locale]}</h2>
                                <dl className={s.facts}>
                                    <div>
                                        <dt>{ask.weeks}</dt>
                                        <dd>{weeks(brief.weeks)}</dd>
                                    </div>
                                    <div>
                                        <dt>{ask.screens}</dt>
                                        <dd>{brief.screens[locale]}</dd>
                                    </div>
                                    <div>
                                        <dt>{ask.builds}</dt>
                                        <dd>{brief.builds[locale]}</dd>
                                    </div>
                                </dl>
                            </>
                        ) : (
                            <>
                                <h2 className={s.draftTitle}>{ask.fallback_title}</h2>
                                <p className={s.fallback}>{ask.fallback_desc}</p>
                            </>
                        )}
                    </div>

                    {brief && project && (
                        <Link href={`/projects/${project.id}`} className={s.match}>
                            <Screen
                                name={brief.screen}
                                // 가로 화면은 카드 높이를 꽉 채우도록 폭을 정한다
                                width={phone ? MATCH_W : Math.max(MATCH_W, Math.ceil((MATCH_H * SCREENS[brief.screen].w) / SCREENS[brief.screen].h))}
                                offsetY={phone ? -86 : 0}
                            />
                            <span className={s.matchCap}>
                                <small>{ask.match}</small>
                                {project.title}, {project.year}
                            </span>
                        </Link>
                    )}
                </div>

                <div className={s.send}>
                    <button type="button" className={s.sendButton} onClick={send}>
                        {ask.send}
                    </button>
                    <span>{ask.count.replace('{count}', String(PROJECTS.length))}</span>
                </div>
                <p className={s.note}>{ask.note}</p>
            </div>
        </section>
    )
}
