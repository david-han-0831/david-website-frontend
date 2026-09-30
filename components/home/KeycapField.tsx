'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

// 모델: motion/keycap/build_keycap.py → public/models/keycaps.glb (Key1u · Key2u, 재질 Body · Top)
const MODEL = '/models/keycaps.glb'

type Tone = 'white' | 'alu' | 'graphite' | 'cobalt'
const TONES: Record<Tone, { body: string; legend: string }> = {
    white: { body: '#f4f4f6', legend: '#1b1c20' },
    alu: { body: '#c4c8d1', legend: '#1b1c20' },
    graphite: { body: '#2a2c32', legend: '#e9ebef' },
    cobalt: { body: '#1e3cff', legend: '#ffffff' },
}

type Key = { x: number; z: number; w: 1 | 2.25; tone: Tone; legend?: string; tilt?: [number, number, number]; lift?: number; enter?: boolean }

// 만들다 만 키보드 한 조각: 일부 키는 아직 빠져 있고, 몇 개는 기울어 놓여 있다
const P = 1.08 // 키 간격
const KEYS: Key[] = [
    { x: 0, z: 0, w: 1, tone: 'graphite', legend: 'Esc' },
    { x: 1, z: 0, w: 1, tone: 'white' },
    { x: 2, z: 0, w: 1, tone: 'white' },
    { x: 4, z: 0, w: 1, tone: 'white', tilt: [0.25, 0.4, -0.2], lift: 0.5 },
    { x: 5, z: 0, w: 1, tone: 'alu' },
    { x: 6, z: 0, w: 1, tone: 'alu' },
    { x: 0, z: 1, w: 1, tone: 'alu', legend: 'Tab' },
    { x: 1, z: 1, w: 1, tone: 'white', legend: 'ㅂ' },
    { x: 2, z: 1, w: 1, tone: 'white', legend: 'ㅈ' },
    { x: 3, z: 1, w: 1, tone: 'white', legend: 'ㄷ' },
    { x: 4, z: 1, w: 1, tone: 'white', legend: 'ㄱ' },
    { x: 6, z: 1, w: 1, tone: 'white', tilt: [-0.5, -0.3, 0.35], lift: 0.6 },
    { x: 0, z: 2, w: 1, tone: 'alu', legend: 'Fn' },
    { x: 1, z: 2, w: 1, tone: 'white', legend: 'ㅁ' },
    { x: 2, z: 2, w: 1, tone: 'white', legend: 'ㄴ' },
    { x: 3, z: 2, w: 1, tone: 'white', legend: 'ㅇ' },
    { x: 4, z: 2, w: 1, tone: 'white' },
    { x: 5.62, z: 2, w: 2.25, tone: 'cobalt', legend: 'Enter', enter: true },
    { x: 0, z: 3, w: 1, tone: 'graphite', legend: '⌘' },
    { x: 1, z: 3, w: 1, tone: 'graphite', legend: '한/영' },
    { x: 2, z: 3, w: 1, tone: 'white' },
    { x: 3, z: 3, w: 1, tone: 'white', legend: 'A' },
    { x: 5, z: 3, w: 1, tone: 'alu', tilt: [0.15, 1.1, 0.1], lift: 0.05 },
    { x: 7.4, z: 0.4, w: 1, tone: 'white', tilt: [1.2, 0.6, 0.3], lift: 0.35 },
]

function legendTexture(text: string | undefined, tone: Tone, units: number) {
    const w = 256 * units
    const c = document.createElement('canvas')
    c.width = w
    c.height = 256
    const x = c.getContext('2d')!
    x.fillStyle = TONES[tone].body
    x.fillRect(0, 0, w, 256)
    if (text) {
        x.fillStyle = TONES[tone].legend
        const hangul = /[가-힣ㄱ-ㅎ]/.test(text)
        x.font = `${hangul ? 800 : 600} ${text.length > 3 ? 54 : 72}px ${hangul ? '"Wanted Sans Variable", "Wanted Sans"' : 'Unbounded'}, sans-serif`
        x.textBaseline = 'top'
        x.fillText(text, 34, 30)
    }
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    t.flipY = false // glTF UV 는 위아래가 뒤집혀 있다
    t.anisotropy = 8
    return t
}

function Keycaps({ reduced, onEnter }: { reduced: boolean; onEnter: () => void }) {
    const { nodes } = useGLTF(MODEL) as unknown as { nodes: Record<string, THREE.Object3D> }
    const geo = useMemo(() => {
        const pick = (name: string) => {
            const out: { body?: THREE.BufferGeometry; top?: THREE.BufferGeometry } = {}
            nodes[name].traverse((o) => {
                const m = o as THREE.Mesh
                if (!m.isMesh) return
                if ((m.material as THREE.Material).name === 'Top') out.top = m.geometry
                else out.body = m.geometry
            })
            return out
        }
        return { 1: pick('Key1u'), 2.25: pick('Key2u') }
    }, [nodes])

    const items = useMemo(
        () =>
            KEYS.map((k, i) => {
                const body = new THREE.MeshPhysicalMaterial({ color: TONES[k.tone].body, roughness: k.tone === 'cobalt' ? 0.22 : 0.34, clearcoat: 0.5, clearcoatRoughness: 0.3 })
                const top = new THREE.MeshPhysicalMaterial({ map: legendTexture(k.legend, k.tone, k.w), roughness: 0.38, clearcoat: 0.4, clearcoatRoughness: 0.35 })
                // 떨어지는 순서: 왼쪽 위부터 대각선으로, Enter 는 마지막
                const delay = k.enter ? 1.35 : (k.x + k.z) * 0.07 + (i % 3) * 0.03
                return { k, body, top, delay }
            }),
        [],
    )
    const groups = useRef<(THREE.Group | null)[]>([])
    const press = useRef(items.map(() => ({ target: 0, value: 0 })))
    const start = useRef<number | null>(null)
    const drop = useMemo(() => gsap.parseEase('back.out(1.4)'), [])

    useFrame((state, dt) => {
        if (start.current === null) start.current = state.clock.elapsedTime
        const t = state.clock.elapsedTime - start.current
        items.forEach(({ k, delay }, i) => {
            const g = groups.current[i]
            if (!g) return
            const p = reduced ? 1 : Math.min(1, Math.max(0, (t - delay) / 0.75))
            const pr = press.current[i]
            pr.value += (pr.target - pr.value) * Math.min(1, dt * 18)
            const baseY = k.lift ?? 0
            g.position.y = baseY + (1 - drop(p)) * 7 - pr.value * 0.2
            g.visible = p > 0
        })
    })

    return (
        <group position={[-4.3, 0, -1.4]}>
            {items.map(({ k, body, top }, i) => {
                const g = geo[k.w]
                return (
                    <group
                        key={i}
                        ref={(el) => {
                            groups.current[i] = el
                        }}
                        position={[k.x * P + (k.w - 1) / 2, k.lift ?? 0, k.z * P]}
                        rotation={k.tilt ?? [0, 0, 0]}
                        onPointerOver={(e) => {
                            e.stopPropagation()
                            press.current[i].target = 1
                            if (k.enter) document.body.style.cursor = 'pointer'
                        }}
                        onPointerOut={() => {
                            press.current[i].target = 0
                            document.body.style.cursor = ''
                        }}
                        onClick={k.enter ? onEnter : undefined}
                    >
                        <mesh geometry={g.body} material={body} castShadow />
                        <mesh geometry={g.top} material={top} />
                    </group>
                )
            })}
        </group>
    )
}

// 커서를 따라 카메라가 아주 조금 움직인다
function Rig({ reduced }: { reduced: boolean }) {
    const look = useMemo(() => new THREE.Vector3(0, 0, 0.4), [])
    useFrame(({ camera, pointer, size }) => {
        // 캔버스는 히어로 전체, 키캡은 필름 오프셋으로 오른쪽에 둔다 (모바일은 가운데)
        const cam = camera as THREE.PerspectiveCamera
        const offset = size.width >= 900 ? -6.8 : 0
        if (cam.filmOffset !== offset) {
            cam.filmOffset = offset
            cam.updateProjectionMatrix()
        }
        const tx = reduced ? 0 : pointer.x * 0.6
        const ty = reduced ? 0 : pointer.y * 0.35
        camera.position.x += (0.8 + tx - camera.position.x) * 0.05
        camera.position.y += (13.4 + ty - camera.position.y) * 0.05
        camera.lookAt(look)
    })
    return null
}

export default function KeycapField({ className }: { className?: string }) {
    const router = useRouter()
    const wrap = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(true)
    // ssr: false 로만 불리므로 window 를 바로 읽을 수 있다
    const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

    useEffect(() => {
        const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
        if (wrap.current) io.observe(wrap.current)
        return () => io.disconnect()
    }, [])

    return (
        <div ref={wrap} className={className}>
            <Canvas
                shadows
                dpr={[1, 2]}
                frameloop={visible ? 'always' : 'never'}
                camera={{ position: [0.8, 13.4, 14.4], fov: 30 }}
                gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
                aria-hidden
            >
                <ambientLight intensity={0.35} />
                <directionalLight position={[-4, 9, 5]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />
                {/* 스튜디오 조명판 — 외부 HDR 없이 반사광을 만든다 */}
                <Environment resolution={256}>
                    <Lightformer intensity={2.2} position={[0, 6, 2]} rotation-x={Math.PI / 2} scale={[12, 4, 1]} />
                    <Lightformer intensity={1.2} position={[-6, 2, 0]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
                    <Lightformer intensity={0.8} color="#c9d2ff" position={[6, 2, -2]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} />
                </Environment>
                <Keycaps reduced={reduced} onEnter={() => router.push('/contact')} />
                <ContactShadows position={[0, -0.01, 0]} opacity={0.42} scale={20} blur={2.4} far={3} color="#1b1c20" />
                <Rig reduced={reduced} />
            </Canvas>
        </div>
    )
}

useGLTF.preload(MODEL)
