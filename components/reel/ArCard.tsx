'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import styles from './ArCard.module.css'

/**
 * AR business card. model-viewer hands off to AR Quick Look on iOS and Scene Viewer / WebXR on Android,
 * so nothing is installed. The viewer (and its copy of three) only loads once the dialog is opened.
 */
export default function ArCard({ className }: { className?: string }) {
    const { t } = useLanguage()
    const copy = t.reel.end
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [opened, setOpened] = useState(false)
    const [qr, setQr] = useState('')

    useEffect(() => {
        if (!opened) return
        import('@google/model-viewer')
        import('qrcode').then(({ toDataURL }) =>
            toDataURL(`${window.location.origin}/#ar`, { margin: 0, width: 320, color: { dark: '#0b0a09', light: '#0000' } }).then(setQr)
        )
    }, [opened])

    // a phone that scanned the code lands straight in the dialog
    useEffect(() => {
        if (window.location.hash === '#ar') {
            setOpened(true)
            dialogRef.current?.showModal()
        }
    }, [])

    const open = () => {
        setOpened(true)
        dialogRef.current?.showModal()
    }

    return (
        <>
            <button type="button" className={className} onClick={open}>
                {copy.ar} →
            </button>

            <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="ar-card-title" data-lenis-prevent>
                <div className={styles.viewer}>
                    {opened && (
                        <model-viewer
                            src="/models/card.glb"
                            alt="David Han business card"
                            ar
                            ar-modes="webxr scene-viewer quick-look"
                            ar-scale="fixed"
                            camera-controls
                            auto-rotate
                            camera-orbit="25deg 78deg auto"
                            shadow-intensity="1"
                            interaction-prompt="none"
                            exposure="1.1"
                            style={{ width: '100%', height: '100%' }}
                        >
                            <button slot="ar-button" className={styles.arButton}>
                                {copy.ar_view} →
                            </button>
                        </model-viewer>
                    )}
                </div>

                <div className={styles.side}>
                    <h2 id="ar-card-title" className={styles.title}>
                        {copy.ar_title}
                    </h2>
                    <p className={styles.desc}>{copy.ar_desc}</p>
                    {qr && (
                        <figure className={styles.qr}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={qr} alt="" width={160} height={160} />
                            <figcaption>{copy.ar_scan}</figcaption>
                        </figure>
                    )}
                    <form method="dialog">
                        <button className={styles.close}>{copy.ar_close}</button>
                    </form>
                </div>
            </dialog>
        </>
    )
}
