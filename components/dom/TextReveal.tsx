'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

interface TextRevealProps {
    text: string
    className?: string
    delay?: number
}

export default function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
    // Split text into words or characters? 
    // For a headline, word-by-word or line-by-line is usually cleaner.
    // Let's go with word splitting for a semantic feel.

    const words = text.split(' ')

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i + delay },
        }),
    }

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            },
        },
    }

    // Key prop forces re-render/re-animation when text changes (language switch)
    return (
        <motion.div
            className={className}
            variants={container as any}
            initial="hidden"
            animate="visible"
            key={text}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25em', justifyContent: 'center' }} // Added justifyContent center for Hero title
        >
            {words.map((word, index) => (
                <motion.span variants={child as any} key={index}>
                    {word}
                </motion.span>
            ))}
        </motion.div>
    )
}
