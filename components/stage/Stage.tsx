'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { stage } from '@/lib/stage'
import styles from './Stage.module.css'

const StageCanvas = dynamic(() => import('./StageCanvas'), { ssr: false })

/**
 * Fixed layer behind the page: a colour backdrop that follows the section in view,
 * and one WebGL canvas whose glass rings travel between [data-stage-anchor] elements.
 */
export default function Stage() {
    const backdropRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const root = document.documentElement
        let raf = 0

        const update = () => {
            raf = 0
            const mid = window.innerHeight / 2
            let bg = ''
            let tone = 'light'
            document.querySelectorAll<HTMLElement>('[data-bg]').forEach((el) => {
                const rect = el.getBoundingClientRect()
                if (rect.top <= mid && rect.bottom >= mid) {
                    bg = el.dataset.bg ?? ''
                    tone = el.dataset.tone ?? 'light'
                }
            })
            const color = bg || getComputedStyle(root).getPropertyValue('--bg').trim()
            stage.bg = color
            backdropRef.current?.style.setProperty('background-color', color)
            root.dataset.tone = tone
        }
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update)
        }

        update()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
            delete root.dataset.tone
            delete root.dataset.stage
        }
    }, [])

    return (
        <div className={styles.stage} aria-hidden="true">
            <div ref={backdropRef} className={styles.backdrop} />
            <StageCanvas />
        </div>
    )
}
