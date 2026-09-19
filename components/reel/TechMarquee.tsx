'use client'

import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import styles from './reel.module.css'

const STACK = [
    'Next.js', 'FastAPI', 'Python', 'TypeScript', 'Supabase', 'GPT API', 'LangChain',
    'React', 'Node.js', 'Flutter', 'Docker', 'AWS', 'PostgreSQL', 'OpenCV',
]

/** Drifts on its own; scrolling speeds it up, leans it, and sets its direction. */
export default function TechMarquee() {
    const { scrollY } = useScroll()
    const velocity = useSpring(useVelocity(scrollY), { stiffness: 300, damping: 50 })
    const skewX = useTransform(velocity, [-3000, 0, 3000], [14, 0, -14], { clamp: true })
    const offset = useMotionValue(0)
    const x = useTransform(offset, (v) => `${-(((v % 50) + 50) % 50)}%`)
    const direction = useRef(1)

    useAnimationFrame((_, delta) => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const v = velocity.get()
        if (v > 40) direction.current = 1
        else if (v < -40) direction.current = -1
        offset.set(offset.get() + direction.current * (delta / 1000) * (1.1 + Math.abs(v) / 260))
    })

    return (
        <div className={styles.marquee}>
            <motion.ul className={styles.marqueeTrack} style={{ x, skewX }}>
                {[...STACK, ...STACK].map((name, i) => (
                    <li key={i} aria-hidden={i >= STACK.length || undefined}>
                        {name}
                    </li>
                ))}
            </motion.ul>
        </div>
    )
}
