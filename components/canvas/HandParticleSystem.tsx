'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { FilesetResolver, HandLandmarker, DrawingUtils } from '@mediapipe/tasks-vision'

// Types
type ParticleTemplate = 'hearts' | 'flowers' | 'saturn' | 'fireworks'

interface HandParticleSystemProps {
    template: ParticleTemplate
    color: string
}

const PARTICLE_COUNT = 2000

// Helper to create different shapes
const getPosition = (template: ParticleTemplate, i: number, count: number, time: number) => {
    const x = (Math.random() - 0.5) * 10
    const y = (Math.random() - 0.5) * 10
    const z = (Math.random() - 0.5) * 10
    return new THREE.Vector3(x, y, z)
}

const Particles = ({ template, color, tension, handPresent, rotation }: { template: ParticleTemplate, color: string, tension: number, handPresent: boolean, rotation: number }) => {
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const dummy = useMemo(() => new THREE.Object3D(), [])
    const smoothedRotation = useRef(0)

    // Initial random positions
    const initialPositions = useMemo(() => {
        const arr = []
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            arr.push({
                x: (Math.random() - 0.5) * 15,
                y: (Math.random() - 0.5) * 15,
                z: (Math.random() - 0.5) * 5
            })
        }
        return arr
    }, [])

    useFrame((state) => {
        if (!meshRef.current) return
        const time = state.clock.getElapsedTime()

        // Smooth rotation using lerp
        smoothedRotation.current += (rotation - smoothedRotation.current) * 0.1
        // Apply rotation to the entire group container effectively by rotating individual positions or container
        // Actually, rotating the mesh instance itself is easier if we want global rotation.
        // But let's rotate the calculation logic or the mesh. 
        // Rotating the mesh is most performant.
        meshRef.current.rotation.z = smoothedRotation.current
        meshRef.current.rotation.y = time * 0.05 // Gentle auto-spin

        // Scale factor based on hand tension (0 = open, 1 = closed)
        // OLD: scale = handPresent ? 1 + tension * 2 : 1 + Math.sin(time) * 0.2
        // NEW: tension 1 (Close) -> Scale Small (0.5), tension 0 (Open) -> Scale Large (2.5)
        const scale = handPresent ? 2.5 - (tension * 2) : 1 + Math.sin(time) * 0.2

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const { x: ix, y: iy, z: iz } = initialPositions[i]
            let tx = ix, ty = iy, tz = iz

            if (template === 'hearts') {
                // Heart shape math
                const t = (i / PARTICLE_COUNT) * Math.PI * 2
                // Distribute points 
                const r = Math.sqrt(Math.random())
                const phi = Math.random() * Math.PI * 2
                // Heart curve in 2D projected to 3D
                // x = 16sin^3(t)
                // y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
                // We just use a noise distribution for a cloud that looks vaguely "lovely" or exact math
                // Let's use exact math for a ring and bias
                const angle = (i * 0.1) + time * 0.1
                const hx = 16 * Math.pow(Math.sin(angle), 3)
                const hy = 13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle)
                tx = hx * 0.1
                ty = hy * 0.1
                tz = (Math.random() - 0.5) * 2
            } else if (template === 'flowers') {
                const angle = i * 137.5 * (Math.PI / 180)
                const r = 0.1 * Math.sqrt(i)
                tx = r * Math.cos(angle) + Math.sin(time + i * 0.01)
                ty = r * Math.sin(angle) + Math.cos(time + i * 0.01)
                tz = Math.sin(r + time)
            } else if (template === 'saturn') {
                // Sphere + Ring
                if (i < PARTICLE_COUNT * 0.7) {
                    // Sphere
                    const u = Math.random()
                    const v = Math.random()
                    const theta = 2 * Math.PI * u
                    const phi = Math.acos(2 * v - 1)
                    const r = 1.5
                    tx = r * Math.sin(phi) * Math.cos(theta)
                    ty = r * Math.sin(phi) * Math.sin(theta)
                    tz = r * Math.cos(phi)
                } else {
                    // Ring
                    const angle = (i / (PARTICLE_COUNT * 0.3)) * Math.PI * 2
                    const r = 3 + Math.random() * 0.5
                    tx = r * Math.cos(angle)
                    ty = (Math.random() - 0.5) * 0.2
                    tz = r * Math.sin(angle)
                }
            } else if (template === 'fireworks') {
                // Explosive
                const r = Math.pow(Math.random(), 1 / 3) * 4 * (1 + Math.sin(time * 3 + i) * 0.5)
                const theta = Math.random() * Math.PI * 2
                const phi = Math.acos(2 * Math.random() - 1)
                tx = r * Math.sin(phi) * Math.cos(theta)
                ty = r * Math.sin(phi) * Math.sin(theta)
                tz = r * Math.cos(phi)
            }

            // Apply Interaction
            dummy.position.set(tx * scale, ty * scale, tz * scale)
            dummy.rotation.set(0, 0, 0)

            // Dynamic scaling of individual particles
            const pScale = (template === 'fireworks' ? 0.05 : 0.03) * (handPresent ? 1.5 : 1)
            dummy.scale.set(pScale, pScale, pScale)

            dummy.updateMatrix()
            meshRef.current.setMatrixAt(i, dummy.matrix)
        }

        meshRef.current.instanceMatrix.needsUpdate = true
        if (meshRef.current.material instanceof THREE.MeshBasicMaterial) {
            meshRef.current.material.color.set(color)
        }
    })

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshBasicMaterial transparent opacity={0.6} blending={THREE.AdditiveBlending} />
        </instancedMesh>
    )
}

export default function HandParticleSystem({ template = 'fireworks', color = '#00ffff', showCamera = false }: HandParticleSystemProps & { showCamera?: boolean }) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(null)
    const [tension, setTension] = useState(0) // 0 to 1
    const [rotation, setRotation] = useState(0) // Radians
    const [handPresent, setHandPresent] = useState(false)
    const requestRef = useRef<number>(null)

    useEffect(() => {
        const initLandmarker = async () => {
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
            )
            const landmarker = await HandLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
                    delegate: "GPU"
                },
                runningMode: "VIDEO",
                numHands: 2
            })
            setHandLandmarker(landmarker)
        }
        initLandmarker()
    }, [])

    useEffect(() => {
        if (!handLandmarker || !videoRef.current) return

        const enableCam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true })
                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                    videoRef.current.addEventListener('loadeddata', predictWebcam)
                }
            } catch (e) {
                console.error("Camera access denied or error:", e)
            }
        }

        enableCam()

        return () => {
            // Cleanup
        }
    }, [handLandmarker])

    const predictWebcam = () => {
        if (!handLandmarker || !videoRef.current) return
        let startTimeMs = performance.now();
        if (videoRef.current.videoWidth > 0 && videoRef.current.videoHeight > 0) {
            const result = handLandmarker.detectForVideo(videoRef.current, startTimeMs)

            if (result.landmarks && result.landmarks.length > 0) {
                if (!handPresent) console.log("Hand Detected!", result.landmarks)
                setHandPresent(true)
                // Calculate tension from first hand
                const landmarks = result.landmarks[0]
                const wrist = landmarks[0]
                const middleTip = landmarks[12]

                // Tension Calculation
                const distance = Math.sqrt(
                    Math.pow(wrist.x - middleTip.x, 2) +
                    Math.pow(wrist.y - middleTip.y, 2) +
                    Math.pow(wrist.z - middleTip.z, 2)
                )

                let t = (0.4 - distance) / 0.3
                t = Math.max(0, Math.min(1, t))
                setTension(t)

                // Rotation Check (Roll)
                // Calculate angle of Wrist -> Middle Finger vector relative to vertical Up
                // In image coords, y is down.
                const dy = middleTip.y - wrist.y
                const dx = middleTip.x - wrist.x
                // atan2(y, x) gives angle. we want 0 to be "up".
                // video is mirrored in UI but landmarks might check orientation.
                // dx, dy are normalized [0,1].
                const angle = Math.atan2(dy, dx)
                // Normal "Up" (middle finger above wrist) -> y decreases. dy is negative.
                // atan2(-1, 0) -> -PI/2.
                // We want to map this to 0 rotation.
                // angle + PI/2 should be 0.
                setRotation(-(angle + Math.PI / 2))

            } else {
                setHandPresent(false)
                setTension(0)
                // Keep last rotation or reset? Let's keep smooth via lerp in component, but state reset is safer for now.
                // setRotation(0) // Optional: Reset on lost hand
            }
        }
        requestRef.current = requestAnimationFrame(predictWebcam)
    }

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {/* Hidden Video Feed for MediaPipe */}
            <video
                ref={videoRef}
                style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    opacity: showCamera ? 1 : 0,
                    pointerEvents: 'none',
                    width: showCamera ? '320px' : '1px',
                    height: showCamera ? '240px' : '1px',
                    zIndex: 200,
                    transform: 'scaleX(-1)', // Mirror effect
                    border: '2px solid white',
                    borderRadius: '8px'
                }}
                autoPlay
                playsInline
            />

            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <Particles template={template} color={color} tension={tension} handPresent={handPresent} rotation={rotation} />
                <ambientLight intensity={0.5} />
            </Canvas>
        </div>
    )
}
