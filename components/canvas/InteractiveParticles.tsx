'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleData {
    t: number
    factor: number
    speed: number
    xFactor: number
    yFactor: number
    zFactor: number
    mx: number
    my: number
}

export default function InteractiveParticles({ count = 200 }) {
    const mesh = useRef<THREE.InstancedMesh>(null)
    const dummy = useMemo(() => new THREE.Object3D(), [])
    // const { viewport, mouse } = useThree() // Unused if no interaction

    // Generate initial random positions
    const particles = useMemo(() => {
        const temp: ParticleData[] = []
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100
            const factor = 20 + Math.random() * 100
            const speed = 0.01 + Math.random() / 200
            const xFactor = -50 + Math.random() * 100
            const yFactor = -50 + Math.random() * 100
            const zFactor = -50 + Math.random() * 100
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
        }
        return temp
    }, [count])

    useFrame((state) => {
        if (!mesh.current) return

        particles.forEach((particle, i) => {
            // Destructure for easier access
            let { factor, speed, xFactor, yFactor, zFactor } = particle

            // Update time
            particle.t += speed / 2
            const t = particle.t

            // Calculate movement factors
            const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.sin(t) + Math.cos(t * 2) / 10
            const s = Math.cos(t)

            // Simple floating logic (No mouse interaction as requested)
            const x = (xFactor + Math.cos(t) * 2)
            const y = (yFactor + Math.sin(t) * 2)
            const z = (zFactor + Math.cos(t))

            dummy.position.set(x, y, z)

            // Scale based on sine wave for "breathing" effect
            const s2 = Math.max(0.2, Math.cos(t) * 0.5 + 0.5)
            dummy.scale.set(s2, s2, s2)

            // Rotate individually
            dummy.rotation.set(s * 5, s * 5, s * 5)
            dummy.updateMatrix()

            // Apply to instance
            mesh.current!.setMatrixAt(i, dummy.matrix)
        })

        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[0.1, 0]} />
            <meshPhongMaterial
                color="#6A11CB"
                emissive="#2575FC"
                emissiveIntensity={0.5}
                transparent
                opacity={0.6}
            />
        </instancedMesh>
    )
}
