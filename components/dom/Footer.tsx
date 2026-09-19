'use client'

import styles from './Footer.module.css'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
    const { t } = useLanguage()

    const menu = [
        { name: t.nav.about, path: '/about' },
        { name: t.nav.projects, path: '/projects' },
        { name: t.nav.teaching, path: '/teaching' },
        { name: t.nav.skills, path: '/skills' },
        { name: t.nav.contact, path: '/contact' },
    ]

    return (
        <footer className={styles.footer}>
            <div className={styles.top}>
                <p className={styles.bio}>
                    Han Dongyun (David Han)
                    <br />
                    Developer &amp; Educator — Seoul, Korea
                </p>

                <ul className={styles.links}>
                    {menu.map((item) => (
                        <li key={item.path}>
                            <Link href={item.path}>{item.name}</Link>
                        </li>
                    ))}
                </ul>

                <ul className={styles.links}>
                    <li>
                        <a href="mailto:hdy20201004@gmail.com">hdy20201004@gmail.com</a>
                    </li>
                    <li>
                        <a href="https://github.com/david-han-0831" target="_blank" rel="noopener noreferrer">
                            GitHub ↗
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/davidhan88" target="_blank" rel="noopener noreferrer">
                            LinkedIn ↗
                        </a>
                    </li>
                </ul>
            </div>

            <p className={styles.bottom}>
                <span>© {new Date().getFullYear()} Han Dongyun</span>
                <span>Seoul 37.5665° N, 126.9780° E</span>
            </p>
        </footer>
    )
}
