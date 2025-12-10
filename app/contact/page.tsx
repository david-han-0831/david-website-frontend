import styles from './page.module.css'
import ContactForm from '@/components/dom/ContactForm'

export default function ContactPage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>

                <div className={styles.infoSide}>
                    <h1 className={styles.title}>Let's Connect</h1>

                    <div className={styles.infoItem}>
                        <span className={styles.label}>Email</span>
                        <div className={styles.value}>hello@handongyun.dev</div>
                    </div>

                    <div className={styles.infoItem}>
                        <span className={styles.label}>Socials</span>
                        <div className={styles.value}>GitHub / LinkedIn / Instagram</div>
                    </div>

                    {/* AR Business Card Mock */}
                    <div className={styles.arCard}>
                        <h3>AR Business Card</h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                            Scan this marker to see my 3D Card.
                        </p>
                        <div style={{ width: '100px', height: '100px', background: 'white', margin: '1rem 0' }}>
                            {/* QR Code Placeholder */}
                        </div>
                        <button className={styles.arButton}>
                            Launch WebXR Experience
                        </button>
                    </div>
                </div>

                <div className={styles.formSide}>
                    <ContactForm />
                </div>

            </div>
        </main>
    )
}
