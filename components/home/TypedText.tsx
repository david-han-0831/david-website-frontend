'use client'

import { useEffect, useState } from 'react'

// 글이 타이핑되듯 써진다. 글이 바뀔 때 다시 쓰게 하려면 쓰는 쪽에서 key 로 글을 넘긴다
export default function TypedText({ text, step = 18 }: { text: string; step?: number }) {
    const [typed, setTyped] = useState(0)

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const frame = requestAnimationFrame(() => setTyped(text.length))
            return () => cancelAnimationFrame(frame)
        }
        if (typed >= text.length) return
        const timer = setTimeout(() => setTyped((n) => n + 1), step)
        return () => clearTimeout(timer)
    }, [typed, text, step])

    return (
        <span aria-label={text}>
            <span aria-hidden>{text.slice(0, typed)}</span>
        </span>
    )
}
