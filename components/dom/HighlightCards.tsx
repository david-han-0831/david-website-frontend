import Link from 'next/link'
import styles from './HighlightCards.module.css'
import { useLanguage } from '@/contexts/LanguageContext'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { MouseEvent } from 'react'
import { trackCardClick } from '@/lib/utils/gtm'

const ROTATION_RANGE = 20; // Deg
const HALF_ROTATION_RANGE = 20 / 2;

function InteractiveCard({ title, desc, link, linkText, locale }: { title: string, desc: string, link: string, linkText: string, locale: string }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        x.set(clientX - left);
        y.set(clientY - top);
    }

    function handleLeave() {
        x.set(0);
        y.set(0);
    }

    // Spotlight gradient
    const background = useMotionTemplate`radial-gradient(
        600px circle at ${mouseX}px ${mouseY}px,
        rgba(37, 117, 252, 0.15),
        transparent 80%
    )`;
    const border = useMotionTemplate`radial-gradient(
        400px circle at ${mouseX}px ${mouseY}px,
        rgba(37, 117, 252, 0.4),
        transparent 80%
    )`;

    return (
        <div
            className={styles.cardWrapper}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleLeave}
        >
            <div className={styles.card}>
                {/* Spotlight Overlay */}
                <motion.div
                    className={styles.spotlight}
                    style={{ background }}
                />

                {/* Border Highlight Effect (Mouse follow) */}
                <motion.div
                    className={styles.borderHighlight}
                    style={{ background: border }}
                />

                {/* Continuous Flowing Border (Always active) */}
                <div className={styles.flowBorder}>
                    <div className={styles.beam} />
                </div>

                <div className={styles.content}>
                    <div>
                        <h3 className={styles.cardTitle}>{title}</h3>
                        <p className={styles.cardDesc}>{desc}</p>
                    </div>
                    <Link 
                        href={link} 
                        className={styles.cardLink}
                        onClick={() => trackCardClick(title, link, locale)}
                    >
                        {linkText} <span>→</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default function HighlightCards() {
    const { t, locale } = useLanguage()

    const highlights = [
        {
            title: t.highlights.items.project.title,
            desc: t.highlights.items.project.desc,
            link: '/projects',
            linkText: t.highlights.items.project.link,
        },
        {
            title: t.highlights.items.course.title,
            desc: t.highlights.items.course.desc,
            link: '/teaching',
            linkText: t.highlights.items.course.link,
        },
        {
            title: t.highlights.items.stack.title,
            desc: t.highlights.items.stack.desc,
            link: '/skills',
            linkText: t.highlights.items.stack.link,
        },
    ]

    return (
        <div className={styles.grid}>
            {highlights.map((item, i) => (
                <InteractiveCard key={i} {...item} locale={locale} />
            ))}
        </div>
    )
}
