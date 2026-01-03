'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import ContactForm from '@/components/dom/ContactForm'
import styles from './page.module.css'
import Link from 'next/link'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export default function ContactPage() {
    const { t } = useLanguage()

    return (
        <main className={styles.main}>
            {/* Contact Content Section */}
            <section className={styles.contactSection}>
                <div className={styles.contactContainer}>
                    {/* Info Side */}
                    <div className={styles.infoSide}>
                        <h2 className={styles.infoTitle}>
                            {t?.contact_page?.info?.title || "Let's Connect"}
                        </h2>

                        <div className={styles.infoItem}>
                            <span className={styles.label}>
                                {t?.contact_page?.info?.email_label || 'Email'}
                            </span>
                            <a 
                                href={`mailto:${t?.contact_page?.info?.email || 'hdy20201004@gmail.com'}`}
                                className={styles.value}
                            >
                                {t?.contact_page?.info?.email || 'hdy20201004@gmail.com'}
                            </a>
                        </div>

                        <div className={styles.infoItem}>
                            <span className={styles.label}>
                                {t?.contact_page?.info?.social_label || 'Socials'}
                            </span>
                            <div className={styles.socialLinks}>
                                <Link 
                                    href="https://github.com/david-han-0831" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={styles.socialLink}
                                >
                                    <FaGithub className={styles.socialIcon} />
                                    <span>{t?.contact_page?.info?.github || 'GitHub'}</span>
                                </Link>
                                <Link 
                                    href="https://www.linkedin.com/in/davidhan88" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={styles.socialLink}
                                >
                                    <FaLinkedin className={styles.socialIcon} />
                                    <span>{t?.contact_page?.info?.linkedin || 'LinkedIn'}</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className={styles.formSide}>
                        <ContactForm />
                    </div>
                </div>
            </section>
        </main>
    )
}
