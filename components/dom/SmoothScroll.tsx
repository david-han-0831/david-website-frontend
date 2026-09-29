'use client'

import { useEffect, useRef } from 'react'
import { ReactLenis, useLenis, type LenisRef } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Lenis 가 스크롤할 때마다 ScrollTrigger 위치를 갱신
function ScrollTriggerSync() {
    useLenis(ScrollTrigger.update)
    return null
}

// Lenis 를 GSAP ticker 로 구동해 ScrollTrigger 와 같은 프레임에서 스크롤을 계산한다
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<LenisRef>(null)

    useEffect(() => {
        // 움직임 최소화 설정이면 휠 관성 스크롤을 끈다 (Lenis 는 옵션을 매 이벤트마다 읽음)
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        const update = (time: number) => {
            const lenis = lenisRef.current?.lenis
            if (!lenis) return
            lenis.options.smoothWheel = !mq.matches
            lenis.raf(time * 1000)
        }
        gsap.ticker.add(update)
        gsap.ticker.lagSmoothing(0)
        return () => gsap.ticker.remove(update)
    }, [])

    return (
        <ReactLenis
            root
            ref={lenisRef}
            options={{ lerp: 0.1, duration: 1.5, autoRaf: false }}
        >
            <ScrollTriggerSync />
            {children}
        </ReactLenis>
    )
}
