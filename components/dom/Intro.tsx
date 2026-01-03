'use client'

import { motion, Variants } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import styles from './Intro.module.css'

// Network Node Interface
interface Node {
    x: number
    y: number
    vx: number
    vy: number
    radius: number
}

export default function Intro() {
    const { t } = useLanguage()
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLElement>(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const smoothMousePosRef = useRef({ x: 0, y: 0 })
    const targetMousePosRef = useRef({ x: 0, y: 0 })
    const nodesRef = useRef<Node[]>([])
    const animationFrameRef = useRef<number | undefined>(undefined)

    // 애니메이션 설정: 순차적 등장을 위한 variants
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3, // 0.3초 간격으로 자식 요소 등장
                delayChildren: 0.2,   // 0.2초 대기 후 시작
            }
        }
    }

    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.04, 0.62, 0.23, 0.98] // 부드러운 이징
            }
        }
    }

    // Initialize nodes
    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return

        const canvas = canvasRef.current
        const container = containerRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const resizeCanvas = () => {
            const rect = container.getBoundingClientRect()
            canvas.width = rect.width
            canvas.height = rect.height
        }

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Create nodes
        const nodeCount = 50
        const nodes: Node[] = []
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 2
            })
        }
        nodesRef.current = nodes

        // Mouse move handler - only update target, not smooth position
        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            targetMousePosRef.current = { x, y }
        }

        container.addEventListener('mousemove', handleMouseMove)

        // Smooth interpolation function (lerp)
        const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const nodes = nodesRef.current
            const maxDistance = 150

            // Smooth mouse position interpolation (slower = smoother)
            const smoothFactor = 0.08 // 0.05 = very smooth, 0.1 = less smooth
            smoothMousePosRef.current.x = lerp(
                smoothMousePosRef.current.x,
                targetMousePosRef.current.x,
                smoothFactor
            )
            smoothMousePosRef.current.y = lerp(
                smoothMousePosRef.current.y,
                targetMousePosRef.current.y,
                smoothFactor
            )

            // Update CSS variables for spotlight with smooth position
            container.style.setProperty('--mouse-x', `${smoothMousePosRef.current.x}px`)
            container.style.setProperty('--mouse-y', `${smoothMousePosRef.current.y}px`)

            // Update nodes
            nodes.forEach(node => {
                node.x += node.vx
                node.y += node.vy

                // Bounce off edges
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1

                // Keep in bounds
                node.x = Math.max(0, Math.min(canvas.width, node.x))
                node.y = Math.max(0, Math.min(canvas.height, node.y))
            })

            // Draw connections
            ctx.strokeStyle = 'rgba(96, 165, 250, 0.3)' // Blue-400
            ctx.lineWidth = 1

            const smoothMouse = smoothMousePosRef.current

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x
                    const dy = nodes[i].y - nodes[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < maxDistance) {
                        const opacity = 1 - (distance / maxDistance)
                        ctx.strokeStyle = `rgba(96, 165, 250, ${opacity * 0.4})`
                        ctx.beginPath()
                        ctx.moveTo(nodes[i].x, nodes[i].y)
                        ctx.lineTo(nodes[j].x, nodes[j].y)
                        ctx.stroke()
                    }
                }

                // Connect to smooth mouse position with stronger line
                const dx = nodes[i].x - smoothMouse.x
                const dy = nodes[i].y - smoothMouse.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < maxDistance * 1.5) {
                    const opacity = 1 - (distance / (maxDistance * 1.5))
                    ctx.strokeStyle = `rgba(109, 213, 237, ${opacity * 0.6})` // Cyan accent
                    ctx.lineWidth = 2
                    ctx.beginPath()
                    ctx.moveTo(nodes[i].x, nodes[i].y)
                    ctx.lineTo(smoothMouse.x, smoothMouse.y)
                    ctx.stroke()
                    ctx.lineWidth = 1
                }
            }

            // Draw nodes
            nodes.forEach(node => {
                ctx.fillStyle = 'rgba(96, 165, 250, 0.6)' // Blue-400
                ctx.beginPath()
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
                ctx.fill()

                // Glow effect
                ctx.shadowBlur = 10
                ctx.shadowColor = 'rgba(96, 165, 250, 0.8)'
                ctx.fill()
                ctx.shadowBlur = 0
            })

            animationFrameRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            container.removeEventListener('mousemove', handleMouseMove)
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [])

    return (
        <motion.section
            ref={containerRef}
            className={styles.intro}
            variants={container}
            initial="hidden"
            animate="show"
        >
            {/* Canvas Background */}
            <canvas ref={canvasRef} className={styles.canvas} />

            {/* Grid Background */}
            <div className={styles.gridBackground}></div>

            {/* Spotlight Overlay */}
            <div className={styles.spotlightOverlay}></div>

            {/* Content */}
            <div className={styles.content}>
                <motion.h1 className={styles.title} variants={item}>
                    {t?.about_page?.intro?.title_1 || '기술로 구조를 만들고,'}<br />
                    {t?.about_page?.intro?.title_2 || '지식으로 연결합니다'}
                </motion.h1>

                <motion.p className={styles.description} variants={item}>
                    {t?.about_page?.intro?.desc_1 || '저는 개발자이자 교육자이며,'}<br />
                    {t?.about_page?.intro?.desc_2 || '복잡한 문제를 구조화하고 자동화하는 일을 해왔습니다.'}
                </motion.p>

                <motion.p className={styles.description} variants={item}>
                    {t?.about_page?.intro?.desc_3 || '코드를 만들고, 시스템을 설계하며,'}<br />
                    {t?.about_page?.intro?.desc_4 || '그 과정을 사람들과 나누는 것을 중요하게 생각합니다.'}
                </motion.p>
            </div>
        </motion.section>
    )
}
