'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false)
    const isHovering = useMotionValue(0) // 0 = default, 1 = hovering

    // Mouse position (Direct mapping for ultra-responsiveness)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
            if (!isVisible) setIsVisible(true)
        }

        const handleMouseEnter = () => setIsVisible(true)
        const handleMouseLeave = () => setIsVisible(false)

        // Optional: Add hover detection for links/buttons to make it slightly interactive
        const handleLinkHoverStart = () => isHovering.set(1)
        const handleLinkHoverEnd = () => isHovering.set(0)

        window.addEventListener('mousemove', handleMouseMove)
        document.body.addEventListener('mouseenter', handleMouseEnter)
        document.body.addEventListener('mouseleave', handleMouseLeave)

        // Attach listeners to all interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, [role="button"]')
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleLinkHoverStart)
            el.addEventListener('mouseleave', handleLinkHoverEnd)
        })

        document.body.style.cursor = 'none'

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            document.body.removeEventListener('mouseenter', handleMouseEnter)
            document.body.removeEventListener('mouseleave', handleMouseLeave)

            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleLinkHoverStart)
                el.removeEventListener('mouseleave', handleLinkHoverEnd)
            })

            document.body.style.cursor = 'auto'
        }
    }, [mouseX, mouseY, isVisible, isHovering])

    if (!isVisible) return null

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                x: mouseX,
                y: mouseY,
                translateX: '-50%',
                translateY: '-50%',
                width: 10,
                height: 10,
                backgroundColor: 'white',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 9999,
                mixBlendMode: 'difference',
                // Scale up slightly on hover/active states for subtle feedback
                scale: isHovering.get() ? 1.5 : 1,
            }}
            // Animate scale changes smoothly
            animate={{
                scale: isHovering.get() ? 1.5 : 1
            }}
            transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25
            }}
        />
    )
}
