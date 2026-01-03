'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
// Link import removed as it is inside ContactButton now
import ContactButton from './ContactButton'
import styles from './Closing.module.css'

export default function Closing() {
    const { t } = useLanguage()
    
    return (
        <section className={styles.section}>
            <motion.p
                className={styles.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                {t?.about_page?.closing?.text_1 || '함께 이야기해볼 주제가 있다면,'}<br />
                {t?.about_page?.closing?.text_2 || '언제든 환영합니다'}
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
            >
                <ContactButton />
            </motion.div>
        </section>
    )
}
