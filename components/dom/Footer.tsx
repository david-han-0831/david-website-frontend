'use client'

import styles from './Footer.module.css'
import Link from 'next/link'
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa'
import { SiThreads } from 'react-icons/si'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* 1. Brand / Bio */}
                <div className={styles.column}>
                    <h3 className={styles.logo}>HDY</h3>
                    <p className={styles.desc}>
                        Full-stack Developer &<br />
                        AI Automation Engineer
                    </p>
                    <p className={styles.sub}>Based in Seoul, Korea</p>
                </div>

                {/* 2. Quick Links */}
                <div className={styles.column}>
                    <h4 className={styles.title}>Menu</h4>
                    <ul className={styles.links}>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/projects">Projects</Link></li>
                        <li><Link href="/teaching">Teaching</Link></li>
                        <li><Link href="/skills">Skills</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </div>

                {/* 3. Contact & Social */}
                <div className={styles.column}>
                    <h4 className={styles.title}>Connect</h4>
                    <ul className={styles.links}>
                        <li>
                            <a href="mailto:hdy20201004@gmail.com">
                                <FaEnvelope className={styles.icon} />
                                <span>hdy20201004@gmail.com</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/david-han-0831" target="_blank" rel="noopener noreferrer">
                                <FaGithub className={styles.icon} />
                                <span>GitHub</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/davidhan88" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin className={styles.icon} />
                                <span>LinkedIn</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://threads.net" target="_blank" rel="noopener noreferrer">
                                <SiThreads className={styles.icon} />
                                <span>Threads</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className={styles.icon} />
                                <span>Instagram</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.bottom}>
                <p>&copy; 2025 Han Dongyun. All rights reserved.</p>
            </div>
        </footer>
    )
}
