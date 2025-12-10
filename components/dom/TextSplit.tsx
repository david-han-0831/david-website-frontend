'use client'

import { motion, Variants } from 'framer-motion'

interface TextSplitProps {
    text: string
    direction?: 'left' | 'right'
    className?: string
    delay?: number
}

export default function TextSplit({ text, direction = 'left', className, delay = 0 }: TextSplitProps) {

    const xOffset = direction === 'left' ? -100 : 100

    const variants: Variants = {
        hidden: {
            opacity: 0,
            x: xOffset,
            filter: 'blur(10px)'
        },
        visible: {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1], // Custom cubic bezier for smooth "luxury" feel
                delay: delay
            }
        }
    }

    return (
        <motion.div
            className={className}
            initial="hidden"
            animate="visible"
            variants={variants}
            key={text} // Re-animate on text/language change
        >
            {text}
        </motion.div>
    )
}
