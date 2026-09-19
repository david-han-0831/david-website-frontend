'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import clsx from 'clsx'
import styles from './KineticText.module.css'

interface KineticTextProps {
    as?: 'h1' | 'h2'
    text: string
    className?: string
    /** 'scroll' ties the wave to the element's way up the viewport, 'load' plays it once */
    trigger?: 'scroll' | 'load'
}

/**
 * Every character carries its index; CSS turns one progress value (--p) into a wave that
 * sweeps the line, taking each glyph from hairline to full weight. Scroll speed leans the line.
 */
export default function KineticText({ as = 'h2', text, className, trigger = 'scroll' }: KineticTextProps) {
    const ref = useRef<HTMLHeadingElement>(null)
    const { scrollY, scrollYProgress } = useScroll({ target: ref, offset: ['start 0.98', 'start 0.42'] })
    const lean = useSpring(useTransform(useVelocity(scrollY), [-2600, 0, 2600], [7, 0, -7], { clamp: true }), {
        stiffness: 220,
        damping: 30,
    })

    const Tag = as === 'h1' ? motion.h1 : motion.h2
    const lines = text.split('\n')
    const total = text.replace(/\s/g, '').length
    let index = 0

    return (
        <Tag
            ref={ref}
            className={clsx(styles.kinetic, trigger === 'load' && styles.load, className)}
            aria-label={text.replace(/\n/g, ' ')}
            style={{
                '--n': total,
                ...(trigger === 'scroll' ? { '--p': scrollYProgress } : null),
                skewX: lean,
            } as React.CSSProperties & Record<string, unknown>}
        >
            {lines.map((line, l) => (
                <span key={l} className={styles.line} aria-hidden="true">
                    {line.split(' ').map((word, w) => (
                        <span key={w} className={styles.word}>
                            {Array.from(word).map((char) => (
                                <span key={index} className={styles.char} style={{ '--i': index++ } as React.CSSProperties}>
                                    {char}
                                </span>
                            ))}
                        </span>
                    ))}
                </span>
            ))}
        </Tag>
    )
}
