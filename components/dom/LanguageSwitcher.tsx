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
                aria-pressed={locale === 'ko'}
                aria-label="한국어"
                type="button"
            >
                KO
            </button>
            <span className={styles.divider} aria-hidden="true">/</span>
            <button
                className={`${styles.btn} ${locale === 'en' ? styles.active : ''}`}
                onClick={() => setLocale('en')}
                aria-pressed={locale === 'en'}
                aria-label="English"
                type="button"
            >
                EN
            </button>
            <span className={styles.divider} aria-hidden="true">/</span>
            <button
                className={`${styles.btn} ${locale === 'de' ? styles.active : ''}`}
                onClick={() => setLocale('de')}
                aria-pressed={locale === 'de'}
                aria-label="Deutsch"
                type="button"
            >
                DE
            </button>
        </div>
    )
}
