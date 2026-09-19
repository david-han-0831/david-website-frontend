'use client'

import { useEffect, useRef } from 'react'
import clsx from 'clsx'
import styles from './Footage.module.css'

export type FootageVariant = 'code' | 'flow' | 'bars' | 'seats' | 'track' | 'ledger'

interface FootageProps {
    variant: FootageVariant
    /** Real clip. When set it replaces the generated footage. */
    src?: string
    poster?: string
    className?: string
}

const INK = '236, 231, 222'
const ACCENT = '255, 91, 46'

// Deterministic noise so shapes stay put between frames
function rand(n: number) {
    const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
    return x - Math.floor(x)
}

type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void

const drawCode: Draw = (ctx, w, h, t) => {
    const lh = Math.max(14, h / 22)
    const offset = (t * lh * 1.4) % lh
    const first = Math.floor((t * 1.4))
    for (let i = -1; i < h / lh + 1; i++) {
        const line = first + i
        const y = i * lh - offset + lh
        const indent = Math.floor(rand(line) * 4) * lh * 1.2
        let x = w * 0.08 + indent
        const tokens = 1 + Math.floor(rand(line + 0.5) * 4)
        if (rand(line + 0.9) < 0.12) continue
        for (let k = 0; k < tokens; k++) {
            const tw = (0.06 + rand(line * 7 + k) * 0.18) * w
            const hot = rand(line * 3 + k * 11) < 0.12
            ctx.fillStyle = hot ? `rgba(${ACCENT}, 0.9)` : `rgba(${INK}, ${0.12 + rand(line + k) * 0.3})`
            ctx.fillRect(x, y, tw, lh * 0.34)
            x += tw + lh * 0.6
        }
    }
    if (Math.floor(t * 2) % 2 === 0) {
        ctx.fillStyle = `rgba(${INK}, 0.9)`
        ctx.fillRect(w * 0.08, h - lh * 2, lh * 0.5, lh * 0.9)
    }
}

const drawFlow: Draw = (ctx, w, h, t) => {
    const cols = 5
    const rows = 4
    const nodes: [number, number][] = []
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
            if (rand(c * 13 + r * 7) < 0.3) continue
            nodes.push([
                ((c + 0.5 + (rand(c + r * 3) - 0.5) * 0.5) / cols) * w,
                ((r + 0.5 + (rand(c * 5 + r) - 0.5) * 0.5) / rows) * h,
            ])
        }
    }
    nodes.sort((a, b) => a[0] - b[0])
    ctx.lineWidth = 1
    for (let i = 0; i < nodes.length - 1; i++) {
        const a = nodes[i]
        const b = nodes[Math.min(nodes.length - 1, i + 1 + Math.floor(rand(i) * 2))]
        const mx = (a[0] + b[0]) / 2
        ctx.strokeStyle = `rgba(${INK}, 0.18)`
        ctx.beginPath()
        ctx.moveTo(a[0], a[1])
        ctx.bezierCurveTo(mx, a[1], mx, b[1], b[0], b[1])
        ctx.stroke()
        // pulse travelling along the edge
        const p = (t * 0.35 + rand(i * 9)) % 1
        const u = 1 - p
        const px = u * u * u * a[0] + 3 * u * u * p * mx + 3 * u * p * p * mx + p * p * p * b[0]
        const py = u * u * u * a[1] + 3 * u * u * p * a[1] + 3 * u * p * p * b[1] + p * p * p * b[1]
        ctx.fillStyle = `rgba(${ACCENT}, 1)`
        ctx.fillRect(px - 2.5, py - 2.5, 5, 5)
    }
    const s = Math.max(10, w * 0.022)
    nodes.forEach(([x, y], i) => {
        const on = (Math.floor(t * 0.35 + rand(i * 9)) + i) % 3 === 0
        ctx.fillStyle = '#0a0908'
        ctx.fillRect(x - s, y - s * 0.6, s * 2, s * 1.2)
        ctx.strokeStyle = on ? `rgba(${ACCENT}, 0.9)` : `rgba(${INK}, 0.45)`
        ctx.strokeRect(x - s, y - s * 0.6, s * 2, s * 1.2)
    })
}

const drawBars: Draw = (ctx, w, h, t) => {
    const n = 18
    const bw = (w * 0.84) / n
    const pts: [number, number][] = []
    for (let i = 0; i < n; i++) {
        const v = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(t * 0.8 + i * 0.7 + rand(i) * 6)) * (0.5 + rand(i + 2) * 0.5)
        const x = w * 0.08 + i * bw
        const bh = v * h * 0.62
        ctx.fillStyle = i === Math.floor(t * 1.5) % n ? `rgba(${ACCENT}, 0.95)` : `rgba(${INK}, 0.16)`
        ctx.fillRect(x, h * 0.86 - bh, bw * 0.62, bh)
        pts.push([x + bw * 0.31, h * 0.86 - bh - h * 0.08])
    }
    ctx.strokeStyle = `rgba(${INK}, 0.7)`
    ctx.lineWidth = 1.25
    ctx.beginPath()
    pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
    ctx.stroke()
    ctx.fillStyle = `rgba(${INK}, 0.2)`
    ctx.fillRect(w * 0.08, h * 0.86, w * 0.84, 1)
}

const drawSeats: Draw = (ctx, w, h, t) => {
    const rows = 9
    for (let r = 0; r < rows; r++) {
        const depth = r / (rows - 1)
        const y = h * (0.3 + depth * depth * 0.62)
        const count = 8 + r * 2
        const spread = w * (0.5 + depth * 0.62)
        const size = 2 + depth * 5
        for (let c = 0; c < count; c++) {
            const x = w / 2 + ((c + 0.5) / count - 0.5) * spread
            const wave = 0.5 + 0.5 * Math.sin(t * 1.6 - r * 0.7 + Math.abs(c - count / 2) * 0.35)
            const raised = rand(r * 31 + c + Math.floor(t * 0.5)) < 0.04
            ctx.fillStyle = raised ? `rgba(${ACCENT}, 1)` : `rgba(${INK}, ${0.1 + wave * 0.5})`
            ctx.beginPath()
            ctx.arc(x, y - (raised ? size * 1.5 : 0), size, 0, Math.PI * 2)
            ctx.fill()
        }
    }
    // the screen at the front of the room
    ctx.strokeStyle = `rgba(${INK}, 0.5)`
    ctx.lineWidth = 1
    ctx.strokeRect(w * 0.3, h * 0.07, w * 0.4, h * 0.15)
    ctx.fillStyle = `rgba(${INK}, 0.5)`
    ctx.fillRect(w * 0.33, h * 0.11, w * 0.18 * (0.4 + 0.6 * ((t * 0.3) % 1)), 2)
    ctx.fillRect(w * 0.33, h * 0.15, w * 0.26, 2)
}

const drawTrack: Draw = (ctx, w, h, t) => {
    const p = (t * 0.32) % 1.25
    const x0 = w * 0.16
    const x1 = w * 0.82
    const y0 = h * 0.72
    const peak = h * 0.62
    const at = (u: number): [number, number] => [x0 + (x1 - x0) * u, y0 - peak * 4 * u * (1 - u) * 0.9 - (h * 0.22) * u]
    for (let i = 0; i <= 24; i++) {
        const u = i / 24
        if (u > p) break
        const [x, y] = at(u)
        ctx.fillStyle = `rgba(${INK}, ${0.15 + u * 0.4})`
        ctx.fillRect(x - 1.5, y - 1.5, 3, 3)
    }
    const u = Math.min(p, 1)
    const [bx, by] = at(u)
    const s = Math.max(10, w * 0.03)
    ctx.strokeStyle = `rgba(${ACCENT}, 1)`
    ctx.lineWidth = 1.5
    ctx.strokeRect(bx - s, by - s, s * 2, s * 2)
    ctx.beginPath()
    ctx.arc(bx, by, s * 0.55, 0, Math.PI * 2)
    ctx.stroke()
    // hoop + shooter joints
    ctx.strokeStyle = `rgba(${INK}, 0.6)`
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(x1 - s, y0 - h * 0.22 + s * 1.4)
    ctx.lineTo(x1 + s * 1.4, y0 - h * 0.22 + s * 1.4)
    ctx.moveTo(x1 + s * 1.4, y0 - h * 0.34)
    ctx.lineTo(x1 + s * 1.4, y0 - h * 0.1)
    ctx.stroke()
    const joints: [number, number][] = [[0, 0], [-0.01, 0.1], [-0.02, 0.22], [0.01, 0.34], [0.03, 0.1], [0.05, -0.02]]
    ctx.beginPath()
    joints.forEach(([jx, jy], i) => {
        const x = x0 + jx * w
        const y = y0 + jy * h * 0.75 - h * 0.02
        if (i === 0) ctx.moveTo(x, y)
        else if (i < 4) ctx.lineTo(x, y)
        ctx.fillStyle = `rgba(${INK}, 0.8)`
        ctx.fillRect(x - 2, y - 2, 4, 4)
    })
    ctx.stroke()
}

const drawLedger: Draw = (ctx, w, h, t) => {
    const rows = 11
    const rh = (h * 0.8) / rows
    const size = Math.max(9, rh * 0.42)
    ctx.font = `${size}px ui-monospace, Menlo, monospace`
    ctx.textBaseline = 'middle'
    const active = Math.floor(t * 1.2) % rows
    for (let r = 0; r < rows; r++) {
        const y = h * 0.1 + r * rh + rh / 2
        ctx.fillStyle = `rgba(${INK}, 0.12)`
        ctx.fillRect(w * 0.08, y + rh / 2, w * 0.84, 1)
        const tick = r === active ? Math.floor(t * 14) : Math.floor(t * 0.4 + r)
        const amount = (Math.floor(rand(r * 17 + tick) * 900000) + 1000).toLocaleString('en-US')
        ctx.fillStyle = `rgba(${INK}, 0.22)`
        ctx.fillRect(w * 0.08, y - size * 0.2, w * (0.1 + rand(r) * 0.2), size * 0.4)
        ctx.fillStyle = r === active ? `rgba(${ACCENT}, 1)` : `rgba(${INK}, 0.6)`
        ctx.textAlign = 'right'
        ctx.fillText(amount, w * 0.92, y)
    }
}

const DRAW: Record<FootageVariant, Draw> = {
    code: drawCode,
    flow: drawFlow,
    bars: drawBars,
    seats: drawSeats,
    track: drawTrack,
    ledger: drawLedger,
}

export default function Footage({ variant, src, poster, className }: FootageProps) {
    const wrapRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const wrap = wrapRef.current
        if (!wrap) return
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (src) {
            const video = videoRef.current
            if (!video || reduced) return
            const io = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) video.play().catch(() => {})
                else video.pause()
            })
            io.observe(wrap)
            return () => io.disconnect()
        }

        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (!canvas || !ctx) return

        let w = 0
        let h = 0
        let raf = 0
        let visible = false
        let last = 0
        const draw = DRAW[variant]
        const seed = rand(variant.length * 3.7) * 40

        const render = (time: number) => {
            ctx.clearRect(0, 0, w, h)
            draw(ctx, w, h, seed + time / 1000)
        }
        const loop = (time: number) => {
            raf = requestAnimationFrame(loop)
            if (time - last < 33) return
            last = time
            render(time)
        }
        const start = () => {
            cancelAnimationFrame(raf)
            if (visible && !reduced) raf = requestAnimationFrame(loop)
        }

        const ro = new ResizeObserver(() => {
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
            w = wrap.clientWidth
            h = wrap.clientHeight
            canvas.width = Math.max(1, Math.round(w * dpr))
            canvas.height = Math.max(1, Math.round(h * dpr))
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            render(performance.now())
        })
        ro.observe(wrap)

        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting
            start()
        })
        io.observe(wrap)

        return () => {
            cancelAnimationFrame(raf)
            ro.disconnect()
            io.disconnect()
        }
    }, [variant, src])

    return (
        <div ref={wrapRef} className={clsx(styles.footage, className)} aria-hidden="true">
            {src ? (
                <video
                    ref={videoRef}
                    className={styles.media}
                    src={src}
                    poster={poster}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                />
            ) : (
                <canvas ref={canvasRef} className={styles.media} />
            )}
            <div className={styles.grain} />
        </div>
    )
}
