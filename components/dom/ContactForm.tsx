'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './ContactForm.module.css'

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('sending')
        // Simulate API call
        setTimeout(() => {
            setStatus('sent')
        }, 1500)
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <motion.div
                className={styles.inputGroup}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
            >
                <input
                    type="text"
                    placeholder="Name"
                    className={styles.input}
                    required
                />
            </motion.div>

            <motion.div
                className={styles.inputGroup}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                <input
                    type="email"
                    placeholder="Email"
                    className={styles.input}
                    required
                />
            </motion.div>

            <motion.div
                className={styles.inputGroup}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
            >
                <textarea
                    placeholder="Message"
                    className={styles.textarea}
                    required
                />
            </motion.div>

            <motion.button
                className={styles.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={status !== 'idle'}
            >
                {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message Sent!' : 'Send Message'}
            </motion.button>
        </form>
    )
}
