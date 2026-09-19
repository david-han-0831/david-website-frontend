'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'

interface RevealProps {
    as?: 'div' | 'section' | 'ul' | 'ol'
    className?: string
    /** Colour the stage floods with while this block is in view */
    bg?: string
    tone?: 'dark' | 'accent'
    children: React.ReactNode
}

/** Sets data-inview once the element enters the viewport; the motion itself lives in CSS. */
export default function Reveal({ as: Tag = 'div', className, bg, tone, children }: RevealProps) {
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: true, amount: 0.25 })

    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Tag ref={ref as any} className={className} data-inview={inView || undefined} data-bg={bg} data-tone={tone}>
            {children}
        </Tag>
    )
}
