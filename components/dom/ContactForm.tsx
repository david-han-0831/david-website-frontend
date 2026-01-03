'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import styles from './ContactForm.module.css'

interface FormData {
    name: string
    company: string
    email: string
    phone: string
    inquiryType: string
    message: string
}

export default function ContactForm() {
    const { t } = useLanguage()
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
    const [formData, setFormData] = useState<FormData>({
        name: '',
        company: '',
        email: '',
        phone: '',
        inquiryType: 'general',
        message: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('sending')

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Failed to send message')
            }

            // 성공 처리
            setStatus('sent')

            // 폼 초기화
            setFormData({
                name: '',
                company: '',
                email: '',
                phone: '',
                inquiryType: 'general',
                message: '',
            })

            // 3초 후 상태 초기화
            setTimeout(() => {
                setStatus('idle')
            }, 3000)
        } catch (error: any) {
            console.error('Failed to send message:', error)
            setStatus('error')

            // 에러 상태 5초 후 초기화
            setTimeout(() => {
                setStatus('idle')
            }, 5000)
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {/* Name */}
            <motion.div
                className={styles.inputGroup}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
            >
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t?.contact_page?.form?.name_placeholder || 'Name'}
                    className={styles.input}
                    required
                />
            </motion.div>

            {/* Company (Optional) */}
            <motion.div
                className={styles.inputGroup}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
            >
                <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={t?.contact_page?.form?.company_placeholder || 'Company / Organization (Optional)'}
                    className={styles.input}
                />
            </motion.div>

            {/* Email */}
            <motion.div
                className={styles.inputGroup}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t?.contact_page?.form?.email_placeholder || 'Email'}
                    className={styles.input}
                    required
                />
            </motion.div>

            {/* Phone (Optional) */}
            <motion.div
                className={styles.inputGroup}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
            >
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t?.contact_page?.form?.phone_placeholder || 'Phone Number (Optional)'}
                    className={styles.input}
                />
            </motion.div>

            {/* Inquiry Type */}
            <motion.div
                className={styles.inputGroup}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
            >
                <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className={styles.select}
                >
                    <option value="general">
                        {t?.contact_page?.form?.inquiry_type_options?.general || 'General Inquiry'}
                    </option>
                    <option value="teaching">
                        {t?.contact_page?.form?.inquiry_type_options?.teaching || 'Teaching / Lecture Request'}
                    </option>
                    <option value="collaboration">
                        {t?.contact_page?.form?.inquiry_type_options?.collaboration || 'Project Collaboration'}
                    </option>
                    <option value="other">
                        {t?.contact_page?.form?.inquiry_type_options?.other || 'Other'}
                    </option>
                </select>
            </motion.div>

            {/* Message */}
            <motion.div
                className={styles.inputGroup}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
            >
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t?.contact_page?.form?.message_placeholder || 'Message'}
                    className={styles.textarea}
                    required
                />
            </motion.div>

            {/* Status Message */}
            {status === 'sent' && (
                <motion.div
                    className={styles.statusMessage}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className={styles.successMessage}>
                        {t?.contact_page?.form?.success_message || 'Thank you for your message. I\'ll get back to you soon!'}
                    </span>
                </motion.div>
            )}

            {status === 'error' && (
                <motion.div
                    className={styles.statusMessage}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className={styles.errorMessage}>
                        {t?.contact_page?.form?.error_message || 'Failed to send message. Please try again or contact directly via email.'}
                    </span>
                </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
                type="submit"
                className={styles.button}
                whileHover={{ scale: status === 'idle' ? 1.05 : 1 }}
                whileTap={{ scale: status === 'idle' ? 0.95 : 1 }}
                disabled={status !== 'idle'}
            >
                {status === 'sending' 
                    ? (t?.contact_page?.form?.sending || 'Sending...') 
                    : status === 'sent' 
                        ? (t?.contact_page?.form?.sent || 'Message Sent!') 
                        : (t?.contact_page?.form?.send_button || 'Send Message')}
            </motion.button>
        </form>
    )
}
