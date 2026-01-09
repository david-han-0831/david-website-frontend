'use client'

import Link from 'next/link'
import styles from './ContactButton.module.css'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackButtonClick } from '@/lib/utils/gtm'

interface ContactButtonProps {
    text?: string
    href?: string
    className?: string
}

export default function ContactButton({
    text,
    href = "/contact",
    className
}: ContactButtonProps) {
    const { t, locale } = useLanguage()
    const buttonText = text || t.cta.contact_btn

    return (
        <Link 
            href={href} 
            className={`${styles.button} ${className || ''}`}
            onClick={() => trackButtonClick('contact', 'cta', href, locale)}
        >
            {buttonText}
        </Link>
    )
}
