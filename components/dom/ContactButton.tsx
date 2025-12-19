'use client'

import Link from 'next/link'
import styles from './ContactButton.module.css'

interface ContactButtonProps {
    text?: string
    href?: string
    className?: string
}

export default function ContactButton({
    text = "Contact / Work With Me",
    href = "/contact",
    className
}: ContactButtonProps) {
    return (
        <Link href={href} className={`${styles.button} ${className || ''}`}>
            {text}
        </Link>
    )
}
