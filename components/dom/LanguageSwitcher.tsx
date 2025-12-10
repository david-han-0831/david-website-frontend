'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import styles from './LanguageSwitcher.module.css'

export default function LanguageSwitcher() {
    const { locale, setLocale } = useLanguage()

    return (
        <div className={styles.switcher}>
            <button
                className={`${styles.btn} ${locale === 'ko' ? styles.active : ''}`}
                onClick={() => setLocale('ko')}
            >
                KO
            </button>
            <span className={styles.divider}>/</span>
            <button
                className={`${styles.btn} ${locale === 'en' ? styles.active : ''}`}
                onClick={() => setLocale('en')}
            >
                EN
            </button>
            <span className={styles.divider}>/</span>
            <button
                className={`${styles.btn} ${locale === 'de' ? styles.active : ''}`}
                onClick={() => setLocale('de')}
            >
                DE
            </button>
        </div>
    )
}
