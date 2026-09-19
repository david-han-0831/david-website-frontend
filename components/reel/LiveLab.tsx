'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { HandLandmarker } from '@mediapipe/tasks-vision'
import { stage } from '@/lib/stage'
import { useLanguage } from '@/contexts/LanguageContext'
import KineticText from './KineticText'
import styles from './LiveLab.module.css'

const WASM = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22-rc.20250304/wasm'
const MODEL = 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task'

type Status = 'idle' | 'loading' | 'live' | 'error'

export default function LiveLab() {
    const { t } = useLanguage()
    const copy = t.reel.lab
    const [status, setStatus] = useState<Status>('idle')
    const videoRef = useRef<HTMLVideoElement>(null)
    const session = useRef<{ stream?: MediaStream; landmarker?: HandLandmarker; raf: number }>({ raf: 0 })

    const stop = useCallback(() => {
        const s = session.current
        cancelAnimationFrame(s.raf)
        s.stream?.getTracks().forEach((track) => track.stop())
        s.landmarker?.close()
        session.current = { raf: 0 }
        stage.hand.active = false
        if (videoRef.current) videoRef.current.srcObject = null
        setStatus('idle')
    }, [])

    useEffect(() => stop, [stop])

    const start = async () => {
        setStatus('loading')
        try {
            // the camera is only ever requested from this click
            const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480, facingMode: 'user' } })
            session.current.stream = stream
            const { FilesetResolver, HandLandmarker } = await import('@mediapipe/tasks-vision')
            const vision = await FilesetResolver.forVisionTasks(WASM)
            const landmarker = await HandLandmarker.createFromOptions(vision, {
                baseOptions: { modelAssetPath: MODEL, delegate: 'GPU' },
                runningMode: 'VIDEO',
                numHands: 1,
            })
            session.current.landmarker = landmarker

            const video = videoRef.current
            if (!video) throw new Error('video element missing')
            video.srcObject = stream
            await video.play()
            setStatus('live')

            let lastTime = -1
            const loop = () => {
                session.current.raf = requestAnimationFrame(loop)
                if (video.currentTime === lastTime) return
                lastTime = video.currentTime
                const hand = landmarker.detectForVideo(video, performance.now()).landmarks[0]
                stage.hand.active = Boolean(hand)
                if (!hand) return
                const tip = hand[8]
                const thumb = hand[4]
                stage.hand.x = tip.x
                stage.hand.y = tip.y
                // thumb-to-index distance, normalised against the palm so it holds at any depth
                const palm = Math.hypot(hand[0].x - hand[9].x, hand[0].y - hand[9].y) || 1
                stage.hand.pinch = Math.min(1, Math.hypot(tip.x - thumb.x, tip.y - thumb.y) / palm)
            }
            loop()
        } catch {
            stop()
            setStatus('error')
        }
    }

    return (
        <section className={styles.lab}>
            <div className={styles.copy}>
                <p className={styles.kicker}>
                    <em>Live</em> Lab
                </p>
                <KineticText text={copy.title} className={styles.title} />
                <p className={styles.desc}>{copy.desc}</p>

                <button
                    type="button"
                    className={styles.button}
                    onClick={status === 'live' ? stop : start}
                    disabled={status === 'loading'}
                    aria-pressed={status === 'live'}
                >
                    <span className={styles.dot} data-live={status === 'live' || undefined} aria-hidden="true" />
                    {status === 'live' ? copy.stop : status === 'loading' ? copy.loading : copy.start}
                </button>

                <p className={styles.privacy}>{copy.privacy}</p>
                <p className={styles.status} role="status">
                    {status === 'error' ? copy.error : status === 'live' ? copy.hint_hand : copy.hint_mouse}
                </p>
            </div>

            <div className={styles.arena}>
                <div className={styles.anchor} data-stage-anchor data-hand aria-hidden="true" />
                <span className={styles.corner} aria-hidden="true" />
                <video ref={videoRef} className={styles.preview} data-live={status === 'live' || undefined} muted playsInline />
            </div>
        </section>
    )
}
