'use client'

import styles from './Footer.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import Wordmark from './Wordmark'
import { useLanguage } from '@/contexts/LanguageContext'
import { useContactScroll } from '@/components/home/useContactScroll'
import type { Locale } from '@/translations'

const EMAIL = 'hdy20201004@gmail.com'

const COPY: Record<Locale, { desc: string; menu: string; contact: string; place: string; name: string }> = {
    ko: {
        desc: '웹, 앱, AI 제품을 만들고 가르칩니다.',
        menu: '메뉴',
        contact: '연락',
        place: '서울에서 일합니다',
        name: '한동윤',
    },
    en: {
        desc: 'I build and teach web, app and AI products.',
        menu: 'Menu',
        contact: 'Contact',
        place: 'Based in Seoul',
        name: 'Han Dongyun',
    },
    de: {
        desc: 'Ich baue und unterrichte Web-, App- und KI-Produkte.',
        menu: 'Menü',
        contact: 'Kontakt',
        place: 'Arbeitet in Seoul',
        name: 'Han Dongyun',
    },
}

export default function Footer() {
    const pathname = usePathname()
    const { t, locale } = useLanguage()
    const copy = COPY[locale]
    const toContact = useContactScroll()

    const menu = [
        { name: t.nav.about, path: '/about' },
        { name: t.nav.projects, path: '/projects' },
        { name: t.nav.teaching, path: '/teaching' },
        { name: t.nav.skills, path: '/skills' },
        { name: t.nav.contact, path: '/contact' },
    ]

    return (
        <footer className={clsx(styles.footer, pathname === '/' && styles.home)}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <Link href="/" className={styles.logo} aria-label="David">
                        <Wordmark />
                    </Link>
                    <p className={styles.desc}>{copy.desc}</p>
                </div>

                <nav className={styles.column} aria-label={copy.menu}>
                    <h2 className={styles.title}>{copy.menu}</h2>
                    <ul className={styles.links}>
                        {menu.map((item) => (
                            <li key={item.path}>
                                <Link
                                    href={item.path}
                                    onClick={item.path === '/contact' ? (e) => toContact(e) : undefined}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className={styles.column}>
                    <h2 className={styles.title}>{copy.contact}</h2>
                    <ul className={styles.links}>
                        <li>
                            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                        </li>
                        <li>
                            <a href="https://github.com/david-han-0831" target="_blank" rel="noopener noreferrer">
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/davidhan88" target="_blank" rel="noopener noreferrer">
                                LinkedIn
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.bottom}>
                <p>
                    &copy; {new Date().getFullYear()} {copy.name}
                </p>
                <p>{copy.place}</p>
            </div>
        </footer>
    )
}
