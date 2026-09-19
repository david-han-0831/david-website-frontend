'use client'

import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Center, Environment, Lightformer, MeshTransmissionMaterial, Text3D } from '@react-three/drei'
import * as THREE from 'three'
import { stage } from '@/lib/stage'
import styles from './Stage.module.css'

const FONT = '/fonts/helvetiker_bold.typeface.json'
const damp = THREE.MathUtils.damp

/** The "DAVID HAN" wordmark lives inside the scene so the glass can actually refract it. */
function Wordmark() {
    const mesh = useRef<THREE.Mesh>(null)
    const texture = useRef<THREE.CanvasTexture | null>(null)
    const { camera, size, viewport } = useThree()

    useEffect(() => {
        let cancelled = false
        const el = document.querySelector<HTMLElement>('[data-stage-wordmark]')
        if (!el) return

        const paint = () => {
            if (cancelled || !mesh.current) return
            const rect = el.getBoundingClientRect()
            if (!rect.width) return
            const cs = getComputedStyle(el)
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            const canvas = document.createElement('canvas')
            canvas.width = Math.round(rect.width * dpr)
            canvas.height = Math.round(rect.height * dpr)
            const ctx = canvas.getContext('2d')
            if (!ctx) return
            const px = parseFloat(cs.fontSize) * dpr
            ctx.font = `${cs.fontWeight} ${px}px ${cs.fontFamily}`
            // fontStretch / letterSpacing are newer canvas properties; older engines just skip them
            Object.assign(ctx, { fontStretch: 'extra-condensed', letterSpacing: `${parseFloat(cs.letterSpacing) * dpr || 0}px` })
            // the DOM copy turns transparent once the stage is ready, so the ink comes from the token
            ctx.fillStyle = cs.getPropertyValue('--ink').trim() || '#0b0a09'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'alphabetic'
            ctx.fillText((el.textContent ?? '').toUpperCase(), canvas.width / 2, canvas.height * 0.86)

            texture.current?.dispose()
            const tex = new THREE.CanvasTexture(canvas)
            tex.colorSpace = THREE.SRGBColorSpace
            tex.anisotropy = 4
            texture.current = tex
            const material = mesh.current.material as THREE.MeshBasicMaterial
            material.map = tex
            material.needsUpdate = true
            document.documentElement.dataset.stage = 'ready'
        }

        document.fonts.ready.then(paint)
        window.addEventListener('resize', paint)
        return () => {
            cancelled = true
            window.removeEventListener('resize', paint)
            texture.current?.dispose()
        }
    }, [])

    useFrame(() => {
        const el = document.querySelector<HTMLElement>('[data-stage-wordmark]')
        if (!mesh.current || !el) return
        const rect = el.getBoundingClientRect()
        mesh.current.visible = rect.bottom > 0 && rect.top < size.height
        if (!mesh.current.visible) return
        const z = -2
        const vp = viewport.getCurrentViewport(camera, [0, 0, z])
        mesh.current.position.set(
            ((rect.left + rect.width / 2) / size.width - 0.5) * vp.width,
            -((rect.top + rect.height / 2) / size.height - 0.5) * vp.height,
            z
        )
        mesh.current.scale.set((rect.width / size.width) * vp.width, (rect.height / size.height) * vp.height, 1)
    })

    return (
        <mesh ref={mesh} visible={false}>
            <planeGeometry />
            <meshBasicMaterial transparent toneMapped={false} />
        </mesh>
    )
}

function Monogram() {
    const group = useRef<THREE.Group>(null)
    const letterD = useRef<THREE.Group>(null)
    const letterH = useRef<THREE.Group>(null)
    const pointer = useRef({ x: 0, y: 0 })
    const spin = useRef({ angle: 0, lastScroll: 0 })
    const anchors = useRef<HTMLElement[]>([])
    const background = useMemo(() => new THREE.Color(stage.bg), [])
    const target = useMemo(() => new THREE.Color(), [])
    const { size, viewport } = useThree()
    const compact = size.width < 760

    useEffect(() => {
        const collect = () => {
            anchors.current = Array.from(document.querySelectorAll<HTMLElement>('[data-stage-anchor]'))
        }
        const onMove = (e: PointerEvent) => {
            pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
            pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
        }
        collect()
        // sections re-render on language change, so the anchor list is refreshed now and then
        const id = window.setInterval(collect, 1500)
        window.addEventListener('pointermove', onMove, { passive: true })
        return () => {
            window.clearInterval(id)
            window.removeEventListener('pointermove', onMove)
        }
    }, [])

    useFrame((state, dt) => {
        const g = group.current
        if (!g) return

        // ride the anchor closest to the middle of the viewport
        let best: HTMLElement | null = null
        let bestRect: DOMRect | null = null
        let bestDist = Infinity
        for (const el of anchors.current) {
            const rect = el.getBoundingClientRect()
            const dist = Math.abs(rect.top + rect.height / 2 - size.height / 2)
            if (dist < bestDist) {
                best = el
                bestRect = rect
                bestDist = dist
            }
        }
        if (!best || !bestRect) return

        const hand = stage.hand.active && best.dataset.hand !== undefined ? stage.hand : null
        let x = ((bestRect.left + bestRect.width / 2) / size.width - 0.5) * viewport.width
        let y = -((bestRect.top + bestRect.height / 2) / size.height - 0.5) * viewport.height
        let scale = (Math.min(bestRect.height, bestRect.width / 1.7) / size.height) * viewport.height
        const split = Number(best.dataset.split ?? 0)

        // scrolling throws the monogram into a spin; at rest it settles on the nearest full turn, face forward
        const turn = Math.PI * 2
        spin.current.angle += (window.scrollY - spin.current.lastScroll) * 0.004
        spin.current.lastScroll = window.scrollY
        spin.current.angle = damp(spin.current.angle, Math.round(spin.current.angle / turn) * turn, 2.5, dt)
        let rotY = Math.sin(state.clock.elapsedTime * 0.4) * 0.22 + pointer.current.x * 0.55 + spin.current.angle
        let rotX = pointer.current.y * 0.3
        if (hand) {
            // the camera image is mirrored, so x flips
            x += (0.5 - hand.x) * viewport.width * 0.45
            y += (0.5 - hand.y) * viewport.height * 0.45
            rotY = (0.5 - hand.x) * 3
            rotX = (hand.y - 0.5) * 2
            scale *= 0.6 + hand.pinch * 0.9
        }

        const speed = hand ? 8 : 3.2
        g.position.x = damp(g.position.x, x, speed, dt)
        g.position.y = damp(g.position.y, y, speed, dt)
        g.scale.setScalar(damp(g.scale.x, scale, speed, dt))
        g.rotation.y = damp(g.rotation.y, rotY, 4, dt)
        g.rotation.x = damp(g.rotation.x, rotX, 4, dt)
        if (letterD.current && letterH.current) {
            letterD.current.position.x = damp(letterD.current.position.x, -0.42 - split, 3, dt)
            letterH.current.position.x = damp(letterH.current.position.x, 0.42 + split, 3, dt)
        }

        background.lerp(target.set(stage.bg), 1 - Math.exp(-4 * dt))
    })

    const glass = (
        <MeshTransmissionMaterial
            background={background}
            samples={compact ? 4 : 8}
            resolution={compact ? 256 : 768}
            backside={!compact}
            backsideThickness={0.4}
            transmission={1}
            thickness={0.7}
            ior={1.4}
            roughness={0.04}
            chromaticAberration={0.55}
            anisotropicBlur={0.2}
            distortion={0.12}
            distortionScale={0.4}
            temporalDistortion={0.08}
            iridescence={1}
            iridescenceIOR={1.25}
            iridescenceThicknessRange={[120, 620]}
            clearcoat={1}
            attenuationColor="#ffffff"
            attenuationDistance={6}
        />
    )
    const text = { font: FONT, size: 1, height: 0.42, curveSegments: 10, bevelEnabled: true, bevelSize: 0.035, bevelThickness: 0.06, bevelSegments: 4 }

    return (
        <group ref={group} scale={0.001}>
            <group ref={letterD} position-x={-0.42}>
                <Center>
                    <Text3D {...text}>
                        D{glass}
                    </Text3D>
                </Center>
            </group>
            <group ref={letterH} position-x={0.42}>
                <Center>
                    <Text3D {...text}>
                        H{glass}
                    </Text3D>
                </Center>
            </group>
        </group>
    )
}

export default function StageCanvas() {
    return (
        <Canvas
            className={styles.canvas}
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 6], fov: 30 }}
            gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        >
            <Suspense fallback={null}>
                <Wordmark />
                <Monogram />
                {/* Procedural studio lighting: no HDR download */}
                <Environment resolution={256}>
                    <Lightformer form="rect" intensity={4} position={[0, 4, 2]} scale={[8, 3, 1]} />
                    <Lightformer form="rect" intensity={2.5} position={[-5, 0, 1]} rotation-y={Math.PI / 2} scale={[6, 4, 1]} />
                    <Lightformer form="rect" intensity={2} color="#ff5b2e" position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={[5, 3, 1]} />
                    <Lightformer form="ring" intensity={3} color="#9fb8ff" position={[0, -3, 3]} scale={3} />
                </Environment>
            </Suspense>
        </Canvas>
    )
}
