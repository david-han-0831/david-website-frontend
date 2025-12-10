'use client'

import Link from 'next/link'
import styles from './Navigation.module.css'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navigation() {
    const pathname = usePathname()
    const { t } = useLanguage()

    const navItems = [
        { name: t.nav.about, path: '/about' },
        { name: t.nav.projects, path: '/projects' },
        { name: t.nav.teaching, path: '/teaching' },
        { name: t.nav.courses, path: '/courses' },
        { name: t.nav.skills, path: '/skills' },
        { name: t.nav.contact, path: '/contact' },
    ]

    return (
        <nav className={styles.nav}>
            <Link href="/" className={styles.logo}>
                HDY
            </Link>

            <div className={styles.links}>
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={clsx(styles.link, pathname === item.path && styles.active)}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
            <LanguageSwitcher />
        </nav>
    )
}
