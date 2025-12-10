'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, Line } from '@react-three/drei'
import * as THREE from 'three'

function Node({ position, color = "#6A11CB" }: { position: [number, number, number], color?: string }) {
    return (
        <mesh position={position}>
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>
    )
}

export default function TechSphere() {
    const group = useRef<THREE.Group>(null)

    // Generate random points on a sphere
    const points = useMemo(() => {
        const count = 50
        const temp = []
        for (let i = 0; i < count; i++) {
            const phi = Math.acos(-1 + (2 * i) / count)
            const theta = Math.sqrt(count * Math.PI) * phi

            const x = Math.cos(theta) * Math.sin(phi)
            const y = Math.sin(theta) * Math.sin(phi)
            const z = Math.cos(phi)
            temp.push(new THREE.Vector3(x, y, z).multiplyScalar(1.4))
        }
        return temp
    }, [])

    useFrame((state) => {
        if (group.current) {
            const t = state.clock.getElapsedTime()

            // Auto-rotation (Slow and steady)
            group.current.rotation.y = t * 0.05

            // Scroll influence for Depth
            let scrollY = 0
            if (typeof window !== 'undefined') {
                scrollY = window.scrollY
            }
            const targetZ = Math.max(-5, -scrollY * 0.005)

            // Lerp for smooth transition
            group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetZ, 0.1)
            group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, scrollY * 0.0005, 0.1)
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={group}>
                {/* Nodes */}
                {points.map((pos, i) => (
                    <Node key={i} position={[pos.x, pos.y, pos.z]} color={i % 2 === 0 ? "#6A11CB" : "#2575FC"} />
                ))}

                {/* Connections */}
                {points.map((pos, i) => {
                    const connections = []
                    const next = points[(i + 1) % points.length]
                    const next2 = points[(i + 3) % points.length]

                    if (i % 2 === 0) {
                        connections.push(
                            <Line
                                key={`line-1-${i}`}
                                points={[pos, next]}
                                color="#6A11CB"
                                transparent
                                opacity={0.15}
                                lineWidth={1}
                            />
                        )
                    }
                    if (i % 5 === 0) {
                        connections.push(
                            <Line
                                key={`line-2-${i}`}
                                points={[pos, next2]}
                                color="#2575FC"
                                transparent
                                opacity={0.1}
                                lineWidth={1}
                            />
                        )
                    }
                    return connections
                })}

                {/* Core Glow */}
                <pointLight position={[0, 0, 0]} intensity={2} color="#6A11CB" distance={4} />
            </group>
        </Float>
    )
}
