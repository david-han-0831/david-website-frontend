'use client'

import { useEffect, useRef, useState } from 'react'

// 숫자가 화면에 들어올 때 0에서 목표값까지 올라간다 (한 번만).
// 서버가 그린 화면과 낭독기에는 처음부터 목표값이 들어 있다
export default function CountUp({ value, duration = 900 }: { value: number; duration?: number }) {
    const el = useRef<HTMLSpanElement>(null)
    const [shown, setShown] = useState(value)

    useEffect(() => {
        const node = el.current
        if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        let frame = 0
        const io = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return
                io.disconnect()
                const start = performance.now()
                const tick = (now: number) => {
                    const t = Math.min(1, (now - start) / duration)
                    // 끝으로 갈수록 느려지게
                    setShown(Math.round(value * (1 - Math.pow(1 - t, 3))))
                    if (t < 1) frame = requestAnimationFrame(tick)
                }
                frame = requestAnimationFrame(tick)
            },
            { threshold: 0.6 }
        )
        io.observe(node)
        return () => {
            io.disconnect()
            cancelAnimationFrame(frame)
        }
    }, [value, duration])

    return (
        <span ref={el} aria-label={String(value)} style={{ fontVariantNumeric: 'tabular-nums' }}>
            <span aria-hidden>{shown}</span>
        </span>
    )
}
