'use client'

import { useRef, useState } from 'react'
import clsx from 'clsx'
import h from './home.module.css'
import s from './Build.module.css'
import BuildStage, { stageSel as q } from './BuildStage'
import { useLanguage } from '@/contexts/LanguageContext'
import { gsap, ScrollTrigger, useGSAP, MQ, BEAT, SIXTEENTH, EASE_OUT, EASE_IN_OUT } from '@/lib/motion'

export default function Build() {
    const { t, locale } = useLanguage()
    const build = t.home.build
    const root = useRef<HTMLElement>(null)
    const [phase, setPhase] = useState(0)
    const phaseRef = useRef(0)

    useGSAP(
        () => {
            const el = root.current!

            // 1) 스케치: 설계선이 그려진다 (시간 기반, 한 번만)
            const sketch = gsap
                .timeline({ paused: true, defaults: { ease: EASE_OUT } })
                .to(q.grid, { opacity: 1, duration: BEAT * 2 })
                .to(q.outline, { clipPath: 'inset(0% 0% 0% 0%)', duration: BEAT * 2, stagger: SIXTEENTH }, 0)
                .to(q.tag, { opacity: 1, duration: BEAT, stagger: SIXTEENTH }, BEAT)

            // 2) 스크롤: 설계 → 개발 → 출시
            const scroll = gsap
                .timeline({ paused: true, defaults: { ease: 'none' } })
                .to(q.sk, { opacity: 1, duration: 0.6, stagger: 0.04 })
                .addLabel('build', 1)
                .to(q.surface, { opacity: 1, duration: 0.5, stagger: 0.03 }, 'build')
                .to(q.outline, { opacity: 0, duration: 0.4 }, 'build')
                .to([q.sk, q.tag, q.grid], { opacity: 0, duration: 0.3 }, 'build')
                .to(q.real, { opacity: 1, duration: 0.5, stagger: 0.03 }, 'build+=0.15')
                                .to(q.trendClip, { attr: { width: 300 }, duration: 0.6 }, 'build+=0.45')
                .addLabel('ship', 2)
                .to(q.url, { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'steps(14)' }, 'ship')
                .to(q.stage, { y: -10, boxShadow: '0 0 0 1px rgba(12,13,16,.08), 0 50px 90px -40px rgba(39,71,245,.45)', duration: 0.5 }, 'ship')
                .fromTo(q.cursor, { opacity: 0, left: '48%', top: '72%' }, { opacity: 1, left: '93%', top: '14%', duration: 0.5, ease: 'power2.inOut' }, 'ship+=0.1')
                .to(q.button, { scale: 0.92, duration: 0.08, yoyo: true, repeat: 1 }, 'ship+=0.62')
                .to(q.live, { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(2)' }, 'ship+=0.7')
                .to({}, { duration: 0.2 })

            el.querySelectorAll<SVGRectElement>(q.bar).forEach((bar, i) => {
                scroll.to(bar, { attr: { y: +bar.dataset.y!, height: +bar.dataset.h! }, duration: 0.5, ease: EASE_IN_OUT }, `build+=${0.3 + i * 0.025}`)
            })

            // 스냅 지점 = 각 단계가 완성된 정지 화면 (스케치 · 설계 · 개발 · 출시)
            const total = scroll.duration()
            // 스크럽 지연으로 라벨을 살짝 넘어가도 다음 단계가 비치지 않게 조금 앞에 멈춘다
            const stops = [0, (scroll.labels.build - 0.08) / total, (scroll.labels.ship - 0.04) / total, 1]

            const onProgress = (progress: number) => {
                if (progress > 0 && sketch.progress() < 1 && !sketch.isActive()) sketch.play()
                let next = 0
                for (let i = 1; i < stops.length; i++) if (progress >= (stops[i - 1] + stops[i]) / 2) next = i
                if (next !== phaseRef.current) {
                    phaseRef.current = next
                    setPhase(next)
                }
                el.style.setProperty('--progress', progress.toFixed(3))
            }

            const mm = gsap.matchMedia()

            mm.add(MQ.desktop, () => {
                ScrollTrigger.create({ trigger: el, start: 'top 70%', once: true, onEnter: () => sketch.play() })
                gsap.to(scroll, {
                    progress: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top top',
                        end: '+=260%',
                        pin: true,
                        scrub: 0.6,
                        snap: { snapTo: stops, duration: { min: 0.2, max: BEAT }, delay: 0.1, ease: EASE_IN_OUT },
                        onUpdate: (self) => onProgress(self.progress),
                    },
                })
                return () => sketch.pause(0)
            })

            mm.add(MQ.mobile, () => {
                ScrollTrigger.create({ trigger: q.stage, start: 'top 90%', once: true, onEnter: () => sketch.play() })
                gsap.to(scroll, {
                    progress: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: q.stage,
                        start: 'top 55%',
                        end: 'bottom top',
                        scrub: 0.6,
                        onUpdate: (self) => onProgress(self.progress),
                    },
                })
                return () => sketch.pause(0)
            })

            mm.add(MQ.reduced, () => {
                sketch.progress(1)
                scroll.progress(1)
                onProgress(1)
            })

            return () => mm.revert()
        },
        { scope: root, dependencies: [locale], revertOnUpdate: true },
    )

    return (
        <section ref={root} className={s.build} aria-labelledby="build-title">
            <div className={clsx(h.container, s.grid)}>
                <div className={s.head}>
                    <p className={h.eyebrow}>{build.eyebrow}</p>
                    <h2 id="build-title" className={clsx(h.sectionTitle, s.title)}>
                        {build.title}
                    </h2>
                </div>
                <div className={s.steps}>
                    <ol className={s.phases}>
                        {build.phases.map((p, i) => (
                            <li key={p.title} className={clsx(s.phase, i === phase && s.active, i < phase && s.done)}>
                                <span className={s.num}>{String(i + 1).padStart(2, '0')}</span>
                                <span className={s.phaseBody}>
                                    <span className={s.phaseTitle}>{p.title}</span>
                                    <span className={s.phaseDesc}>{p.desc}</span>
                                </span>
                            </li>
                        ))}
                    </ol>
                    <div className={s.meter} aria-hidden>
                        <span />
                    </div>
                </div>
                <div className={s.stageWrap}>
                    <BuildStage app={build.app} />
                </div>
            </div>
        </section>
    )
}
