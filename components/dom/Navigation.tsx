'use client'

import Link from 'next/link'
import styles from './Navigation.module.css'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'
import { useState } from 'react'
import { trackLinkClick } from '@/lib/utils/gtm'
import { HiMenu, HiX } from 'react-icons/hi'
import Wordmark from './Wordmark'
import { useContactScroll } from '@/components/home/useContactScroll'

export default function Navigation() {
    const pathname = usePathname()
    const { t, locale } = useLanguage()

    const navItems = [
        { name: t.nav.about, path: '/about' },
        { name: t.nav.projects, path: '/projects' },
        { name: t.nav.teaching, path: '/teaching' },
        { name: t.nav.skills, path: '/skills' },
        { name: t.nav.contact, path: '/contact' },
    ]

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toContact = useContactScroll()

    return (
        <nav className={clsx(styles.nav, pathname === '/' && styles.light)}>
            <Link href="/" className={styles.logo} onClick={() => setIsMenuOpen(false)} aria-label="David">
                <Wordmark />
            </Link>

            {/* Desktop Links */}
            <div className={styles.links}>
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={clsx(
                            styles.link,
                            pathname === item.path && styles.active,
                            item.path === '/contact' && styles.cta
                        )}
                        onClick={(e) => {
                            if (item.path === '/contact') toContact(e)
                            trackLinkClick(item.name, 'navigation', item.path, locale)
                        }}
                    >
                        <span className={styles.roll} data-text={item.name}>
                            <span>{item.name}</span>
                        </span>
                    </Link>
                ))}
            </div>

            {/* Mobile Hamburger */}
            <button className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <HiX /> : <HiMenu />}
            </button>

            {/* Mobile Overlay */}
            <div className={clsx(styles.mobileOverlay, isMenuOpen && styles.open)}>
                <div className={styles.mobileLinks}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={clsx(styles.mobileLink, pathname === item.path && styles.active)}
                            onClick={(e) => {
                                setIsMenuOpen(false)
                                if (item.path === '/contact') toContact(e)
                                trackLinkClick(item.name, 'navigation', item.path, locale)
                            }}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>

            <LanguageSwitcher />
        </nav>
    )
}
