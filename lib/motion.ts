'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

/**
 * 모션 타이밍을 박자로 맞춘다 (음악 전공 정체성 → 섹션 전환을 박자처럼).
 * 120 BPM 기준 한 박 = 0.5초, 등장 간격은 8분음표/16분음표 단위로 쓴다.
 */
export const BEAT = 0.5
export const EIGHTH = BEAT / 2
export const SIXTEENTH = BEAT / 4

export const EASE_OUT = 'expo.out'
export const EASE_IN_OUT = 'power3.inOut'

// 데스크탑에서만 핀 고정·가로 스크롤을 쓰고, 움직임 최소화 설정이면 모든 연출을 끈다
export const MQ = {
    desktop: '(min-width: 900px) and (prefers-reduced-motion: no-preference)',
    mobile: '(max-width: 899px) and (prefers-reduced-motion: no-preference)',
    motion: '(prefers-reduced-motion: no-preference)',
    reduced: '(prefers-reduced-motion: reduce)',
}

export { gsap, ScrollTrigger, SplitText, useGSAP }
