'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'

interface RevealProps {
    as?: 'div' | 'section' | 'ul' | 'ol'
    className?: string
    children: React.ReactNode
}

/** Sets data-inview once the element enters the viewport; the motion itself lives in CSS. */
export default function Reveal({ as: Tag = 'div', className, children }: RevealProps) {
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: true, amount: 0.25 })

    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Tag ref={ref as any} className={className} data-inview={inView || undefined}>
            {children}
        </Tag>
    )
}
