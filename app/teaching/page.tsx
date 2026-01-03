'use client'

import { useRef, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaLaptopCode, FaServer, FaLayerGroup, FaRobot, FaCogs, FaGraduationCap } from 'react-icons/fa'
import { FiArrowRight, FiDownload, FiMail } from 'react-icons/fi'
import { useLanguage } from '@/contexts/LanguageContext'
import styles from './page.module.css'

// Wave effect doesn't need interface

// 3D removed in favor of 2D Flow Diagram
// const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })
// const LearningMap = dynamic(() => import('@/components/canvas/LearningMap'), { ssr: false })

// Flow steps will be defined with translations inside component

export default function TeachingPage() {
    const containerRef = useRef(null)
    const heroRef = useRef<HTMLElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { t, currentLanguage } = useLanguage()
    const smoothMousePosRef = useRef({ x: 0, y: 0 })
    const targetMousePosRef = useRef({ x: 0, y: 0 })
    const animationFrameRef = useRef<number>()

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const y = useTransform(scrollYProgress, [0, 0.2], [0, 200])
    const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

    // Mouse Spotlight Effect
    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (!heroRef.current) return
        const { left, top } = heroRef.current.getBoundingClientRect()
        const x = e.clientX - left
        const y = e.clientY - top
        targetMousePosRef.current = { x, y }
    }

    // Initialize star field effect
    useEffect(() => {
        if (!canvasRef.current || !heroRef.current) return

        const canvas = canvasRef.current
        const container = heroRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const resizeCanvas = () => {
            const rect = container.getBoundingClientRect()
            canvas.width = rect.width
            canvas.height = rect.height
        }

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Star interface
        interface Star {
            x: number
            y: number
            z: number // depth (0 = far, 1 = near)
            prevX: number
            prevY: number
            color: string // star color
        }

        // Star colors palette
        const starColors = [
            { r: 96, g: 165, b: 250 },   // Blue
            { r: 109, g: 213, b: 237 },  // Cyan
            { r: 139, g: 92, b: 246 },   // Purple
            { r: 59, g: 130, b: 246 },   // Blue-500
            { r: 147, g: 197, b: 253 },  // Blue-300
            { r: 167, g: 139, b: 250 },  // Purple-400
            { r: 251, g: 191, b: 36 },   // Yellow-400
            { r: 250, g: 204, b: 21 },   // Yellow-500
            { r: 252, g: 211, b: 77 },   // Yellow-300
            { r: 239, g: 68, b: 68 },   // Red-500
            { r: 248, g: 113, b: 113 }, // Red-400
            { r: 251, g: 146, b: 60 },  // Orange-400
        ]

        // Create stars
        const starCount = 200
        const stars: Star[] = []
        for (let i = 0; i < starCount; i++) {
            const colorIndex = Math.floor(Math.random() * starColors.length)
            const color = starColors[colorIndex]
            stars.push({
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2,
                z: Math.random(),
                prevX: 0,
                prevY: 0,
                color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`
            })
        }

        let time = 0
        const speed = 0.0005

        // Function to reset a star
        const resetStar = (star: Star) => {
            star.z = 0.01 + Math.random() * 0.1 // Start from very far away
            star.x = (Math.random() - 0.5) * 2
            star.y = (Math.random() - 0.5) * 2
            star.prevX = star.x
            star.prevY = star.y
            const colorIndex = Math.floor(Math.random() * starColors.length)
            const color = starColors[colorIndex]
            star.color = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`
        }

        // Animation loop
        const animate = () => {
            ctx.fillStyle = 'rgba(5, 5, 16, 0.1)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Update CSS variables for spotlight (no mouse interaction with stars)
            container.style.setProperty('--mouse-x', `${smoothMousePosRef.current.x}px`)
            container.style.setProperty('--mouse-y', `${smoothMousePosRef.current.y}px`)

            time += speed

            // Update and draw stars
            stars.forEach(star => {
                // Store previous position for trails (before updating)
                const prevZ = star.z
                const prevK = prevZ > 0.01 ? 128 / prevZ : 128 / 0.01
                const prevX = star.prevX * prevK + canvas.width / 2
                const prevY = star.prevY * prevK + canvas.height / 2

                // Move star forward (z increases)
                star.z += speed * (0.5 + star.z * 0.5)

                // Calculate 2D position with perspective
                const k = 128 / star.z
                const x = star.x * k + canvas.width / 2
                const y = star.y * k + canvas.height / 2

                // Check if star needs to be reset
                const needsReset = star.z >= 1 || 
                                 x < -300 || x > canvas.width + 300 || 
                                 y < -300 || y > canvas.height + 300

                if (needsReset) {
                    resetStar(star)
                    // Update previous position for next frame
                    star.prevX = star.x
                    star.prevY = star.y
                    // Don't draw trail or star this frame after reset
                    return
                }

                // Calculate size and opacity based on depth
                const size = Math.max(0.5, (1 - star.z) * 2)
                const opacity = 0.5 + star.z * 0.5

                // Draw star trail
                if (prevZ > 0.01 && star.z > 0.1 && 
                    Math.abs(prevX - x) < canvas.width * 2 && 
                    Math.abs(prevY - y) < canvas.height * 2) {
                    // Extract color from star.color
                    const colorMatch = star.color.match(/rgba\((\d+),\s*(\d+),\s*(\d+)/)
                    if (colorMatch) {
                        const [, r, g, b] = colorMatch
                        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.3})`
                    } else {
                        ctx.strokeStyle = `rgba(96, 165, 250, ${opacity * 0.3})`
                    }
                    ctx.lineWidth = size * 0.5
                    ctx.beginPath()
                    ctx.moveTo(prevX, prevY)
                    ctx.lineTo(x, y)
                    ctx.stroke()
                }

                // Draw star with its color
                const colorMatch = star.color.match(/rgba\((\d+),\s*(\d+),\s*(\d+)/)
                if (colorMatch) {
                    const [, r, g, b] = colorMatch
                    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`
                } else {
                    ctx.fillStyle = `rgba(96, 165, 250, ${opacity})`
                }
                ctx.beginPath()
                ctx.arc(x, y, size, 0, Math.PI * 2)
                ctx.fill()

                // Glow effect for brighter stars
                if (star.z > 0.7) {
                    const colorMatch = star.color.match(/rgba\((\d+),\s*(\d+),\s*(\d+)/)
                    if (colorMatch) {
                        const [, r, g, b] = colorMatch
                        ctx.shadowBlur = 15
                        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`
                    } else {
                        ctx.shadowBlur = 15
                        ctx.shadowColor = 'rgba(96, 165, 250, 0.8)'
                    }
                    ctx.fill()
                    ctx.shadowBlur = 0
                }

                // Update previous position for next frame
                star.prevX = star.x
                star.prevY = star.y
            })

            animationFrameRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [])

    // Flow steps with translations
    const flowSteps = [
        { 
            id: 'basics', 
            title: t?.teaching_page?.flow?.steps?.basics?.title || 'Programming Fundamentals', 
            desc: t?.teaching_page?.flow?.steps?.basics?.desc || 'Code Logic & Syntax', 
            icon: FaGraduationCap 
        },
        { 
            id: 'engineering', 
            title: t?.teaching_page?.flow?.steps?.engineering?.title || 'Frontend / Backend', 
            desc: t?.teaching_page?.flow?.steps?.engineering?.desc || 'Web Engineering Core', 
            icon: FaLaptopCode 
        },
        { 
            id: 'project', 
            title: t?.teaching_page?.flow?.steps?.project?.title || 'Full Stack Project', 
            desc: t?.teaching_page?.flow?.steps?.project?.desc || 'Integrated Service Build', 
            icon: FaLayerGroup 
        },
        { 
            id: 'ai', 
            title: t?.teaching_page?.flow?.steps?.ai?.title || 'AI Integration', 
            desc: t?.teaching_page?.flow?.steps?.ai?.desc || 'LLM & Generative AI', 
            icon: FaRobot 
        },
        { 
            id: 'automation', 
            title: t?.teaching_page?.flow?.steps?.automation?.title || 'Automation', 
            desc: t?.teaching_page?.flow?.steps?.automation?.desc || 'Workflow Optimization', 
            icon: FaCogs 
        },
    ]

    return (
        <main className={styles.main} ref={containerRef}>
            {/* ① Hero Text Section (Clean, Typographic) */}
            <section 
                className={styles.heroTextSection}
                ref={heroRef}
                onMouseMove={handleMouseMove}
            >
                {/* Canvas Particles */}
                <canvas ref={canvasRef} className={styles.canvas} />

                {/* Grid Background */}
                <div className={styles.heroBackground}></div>

                {/* Spotlight Overlay */}
                <div className={styles.spotlightOverlay}></div>

                <motion.div
                    className={styles.heroContent}
                    style={{ y, opacity }}
                >
                    <h1 className={styles.heroTitle}>{t?.teaching_page?.hero?.title || 'Teaching Journey'}</h1>
                    <p className={styles.heroSubtitle}>
                        {t?.teaching_page?.hero?.subtitle_1 || 'Teaching technology and'}<br />
                        <span className={styles.highlightText}>{t?.teaching_page?.hero?.subtitle_2 || 'designing thinking'}</span>
                    </p>
                </motion.div>
            </section>

            {/* ①-2 Learning Flow Diagram (Replaces 3D Map) */}
            <section className={styles.flowSection}>
                <div className={styles.flowHeader}>
                    <h2 className={styles.flowTitle}>
                        {t?.teaching_page?.flow?.title || 'Curriculum Flow'}
                    </h2>
                    <p className={styles.flowDesc}>
                        {t?.teaching_page?.flow?.desc || 'A systematic roadmap from basics to practical automation'}
                    </p>
                </div>
                <div className={styles.flowContainer}>
                    {/* Vertical Line */}
                    <div className={styles.flowLine}>
                        <motion.div
                            className={styles.flowLineFill}
                            initial={{ height: 0 }}
                            whileInView={{ height: '100%' }}
                            viewport={{ margin: "-20% 0px -20% 0px" }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                    </div>

                    {/* Flow Steps */}
                    {flowSteps.map((step, i) => (
                        <motion.div
                            key={step.id}
                            className={styles.flowStep}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2, duration: 0.5 }}
                            viewport={{ margin: "-50px" }}
                        >
                            <div className={styles.stepMarker} data-step={i + 1}>
                                <step.icon className={styles.stepIcon} />
                            </div>
                            <div className={styles.stepContent}>
                                <h3 className={styles.stepTitle}>{step.title}</h3>
                                <p className={styles.stepDesc}>{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <div className={styles.contentSections}>
                {/* ② Teaching Summary */}
                <section className={styles.section} id="summary">
                    <div className={styles.summaryGrid}>
                        {t?.teaching_page?.summary && [
                            t.teaching_page.summary.years,
                            t.teaching_page.summary.target,
                            t.teaching_page.summary.fields,
                            t.teaching_page.summary.method
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                className={styles.summaryCard}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <span className={styles.summaryValue}>{stat.value}</span>
                                <span className={styles.summaryLabel}>{stat.label}</span>
                                <span className={styles.summarySub}>{stat.sub}</span>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ③ Teaching Domains */}
                <section className={styles.section} id="domains">
                    <header className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>{t?.teaching_page?.domains?.title || 'Teaching Domains'}</h2>
                        <p className={styles.sectionDesc}>{t?.teaching_page?.domains?.desc || '6 lecture areas connecting practice and education'}</p>
                    </header>

                    <div className={styles.grid3x2}>
                        {t?.teaching_page?.domains && [
                            { key: 'frontend', icon: FaLaptopCode },
                            { key: 'backend', icon: FaServer },
                            { key: 'fullstack', icon: FaLayerGroup },
                            { key: 'ai', icon: FaRobot },
                            { key: 'automation', icon: FaCogs },
                            { key: 'basics', icon: FaGraduationCap }
                        ].map((domain, i) => {
                            const domainData = t.teaching_page.domains[domain.key as keyof typeof t.teaching_page.domains]
                            if (!domainData || typeof domainData === 'string') return null
                            return (
                                <motion.div
                                    key={i}
                                    className={styles.domainCard}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.08)' }}
                                >
                                    <div className={styles.cardIcon}>
                                        <domain.icon />
                                    </div>
                                    <h3 className={styles.cardTitle}>{domainData.title}</h3>
                                    <p className={styles.cardDesc}>{domainData.desc}</p>

                                    <div className={styles.cardMeta}>
                                        <div className={styles.metaRow}>
                                            <span className={styles.metaLabel}>{t.teaching_page.domains.meta?.content || 'Content'}</span>
                                            <span className={styles.metaValue}>{domainData.content}</span>
                                        </div>
                                        <div className={styles.metaRow}>
                                            <span className={styles.metaLabel}>{t.teaching_page.domains.meta?.target || 'Target'}</span>
                                            <span className={styles.metaValue}>{domainData.target}</span>
                                        </div>
                                        <div className={styles.metaRow}>
                                            <span className={styles.metaLabel}>{t.teaching_page.domains.meta?.result || 'Result'}</span>
                                            <span className={styles.metaValue}>{domainData.result}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </section>

                {/* ④ Teaching Experience */}
                <section className={styles.section} id="experience">
                    <header className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>{t?.teaching_page?.experience?.title || 'Experience'}</h2>
                        <p className={styles.sectionDesc}>{t?.teaching_page?.experience?.desc || 'Proven educational achievements in the field'}</p>
                    </header>

                    <div className={styles.timeline}>
                        {t?.teaching_page?.experience?.items && Object.entries(t.teaching_page.experience.items).map(([year, items], i) => (
                            <motion.div
                                key={i}
                                className={styles.timelineItem}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className={styles.yearCol}>{year === '2023-current' ? '2023–Current' : year}</div>
                                <div className={styles.contentCol}>
                                    <ul className={styles.expList}>
                                        {Array.isArray(items) && items.map((item, j) => (
                                            <li key={j}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ⑤ Teaching Style & ⑥ Operation */}
                <section className={styles.dualSection}>
                    <motion.div
                        className={styles.infoBlock}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className={styles.subTitle}>{t?.teaching_page?.style?.title || 'Teaching Style'}</h3>
                        <p 
                            className={styles.philosophy}
                            dangerouslySetInnerHTML={{ 
                                __html: t?.teaching_page?.style?.philosophy || 'We focus on <strong>practice and results</strong> rather than theory.' 
                            }}
                        />
                        <ul className={styles.featureList}>
                            {t?.teaching_page?.style?.features?.map((feature, i) => (
                                <li key={i}>{feature}</li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        className={styles.infoBlock}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3 className={styles.subTitle}>{t?.teaching_page?.operation?.title || 'Operation & Tools'}</h3>
                        <div className={styles.toolsGroup}>
                            <h4>{t?.teaching_page?.operation?.format?.label || 'Class Format'}</h4>
                            <div className={styles.tags}>
                                {t?.teaching_page?.operation?.format?.items?.map((item, i) => (
                                    <span key={i}>{item}</span>
                                ))}
                            </div>
                        </div>
                        <div className={styles.toolsGroup}>
                            <h4>{t?.teaching_page?.operation?.tools?.label || 'Collaboration Tools'}</h4>
                            <div className={styles.tags}>
                                {t?.teaching_page?.operation?.tools?.items?.map((item, i) => (
                                    <span key={i}>{item}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* ⑦ Call To Action */}
                <section className={styles.ctaSection}>
                    <motion.div
                        className={styles.ctaCard}
                        initial={{ scale: 0.95, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.ctaTitle}>{t?.teaching_page?.cta?.title || 'Start Your Journey'}</h2>
                        <p className={styles.ctaText}>{t?.teaching_page?.cta?.text || 'Need on-site lectures, special lectures, or custom curriculum?'}</p>
                        <div className={styles.ctaButtons}>
                            <a href="/contact" className={styles.primaryBtn}>
                                <FiMail style={{ marginRight: '8px' }} />
                                {t?.teaching_page?.cta?.btn || 'Inquiry'}
                            </a>
                        </div>
                    </motion.div>
                </section>

                <footer className={styles.footerSpacing} />
            </div>
        </main>
    )
}
