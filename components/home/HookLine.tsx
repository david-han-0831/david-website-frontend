'use client'

import { useRef } from 'react'
import s from './HookLine.module.css'
import { useLanguage } from '@/contexts/LanguageContext'
import { gsap, useGSAP, MQ } from '@/lib/motion'
import type { Locale } from '@/translations'

// 히어로 바로 아래에서 문의를 망설이게 하는 걱정을 먼저 꺼낸다 (문구는 확정되면 translations 로 옮긴다)
const COPY: Record<Locale, string[]> = {
    ko: ['기획서가 없어도,', '디자이너가 없어도,', '설명이 서툴러도 괜찮습니다.', '이야기만 들려주세요.'],
    en: ['No spec,', 'no designer,', 'no tech vocabulary? That is fine.', 'Just tell me what you need.'],
    de: [
        'Kein Konzept,',
        'kein Designer,',
        'kein Fachvokabular? Kein Problem.',
        'Erzählen Sie mir einfach, was Sie brauchen.',
    ],
}

export default function HookLine() {
    const { locale } = useLanguage()
    const root = useRef<HTMLElement>(null)
    const pin = useRef<HTMLDivElement>(null)

    // 화면을 고정한 채 스크롤만큼 단어가 차례로 진해진다
    useGSAP(
        () => {
            const mm = gsap.matchMedia()
            mm.add(MQ.motion, () => {
                gsap.fromTo(
                    '[data-word]',
                    { opacity: 0.16 },
                    {
                        opacity: 1,
                        ease: 'none',
                        duration: 1.2,
                        stagger: 0.5,
                        scrollTrigger: {
                            trigger: pin.current,
                            start: 'top top',
                            end: '+=110%',
                            pin: true,
                            anticipatePin: 1,
                            scrub: 0.4,
                        },
                    },
                )
            })
            return () => mm.revert()
        },
        { scope: root, dependencies: [locale], revertOnUpdate: true },
    )

    return (
        // 고정할 때 GSAP 이 요소를 감싸는 칸을 끼워 넣는다. 그 칸이 React 가 관리하는 형제 자리에
        // 끼어들지 않도록 바깥 section 은 그대로 두고 안쪽 div 를 고정한다
        <section ref={root}>
            <div ref={pin} className={s.hook}>
                <p className={s.line}>
                    {COPY[locale].map((phrase) => (
                        <span key={phrase} className={s.phrase}>
                            {phrase.split(' ').map((word, i) => (
                                <span key={i} data-word className={s.word}>
                                    {word}{' '}
                                </span>
                            ))}
                        </span>
                    ))}
                </p>
            </div>
        </section>
    )
}
