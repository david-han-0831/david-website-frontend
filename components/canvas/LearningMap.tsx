'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { CubicBezierLine, Text, Float } from '@react-three/drei'
import * as THREE from 'three'

const pathPoints = [
    new THREE.Vector3(-2, -1, 0),
    new THREE.Vector3(-1, 0, 1),
    new THREE.Vector3(1, 0, -1),
    new THREE.Vector3(2, 1, 0),
]

const milestones = [
    { label: 'Programming Basics', position: [-2, -1.2, 0] },
    { label: 'Web Architecture', position: [-1, -0.2, 1] },
    { label: 'AI Integration', position: [1, -0.2, -1] },
    { label: 'Automation', position: [2, 0.8, 0] },
]

export default function LearningMap() {
    const lineRef = useRef<any>(null)

    useFrame((state) => {
        if (lineRef.current) {
            // Gentle floating animation for the whole path
            lineRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
        }
    })

    return (
        <group>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 5, 5]} intensity={1} />

            <Float>
                <group ref={lineRef} rotation={[0, -Math.PI / 6, 0]}>
                    <CubicBezierLine
                        start={pathPoints[0]}
                        end={pathPoints[3]}
                        midA={pathPoints[1]}
                        midB={pathPoints[2]}
                        color="#2575FC"
                        lineWidth={3}
                        dashed={false}
                    />

                    {milestones.map((m, i) => (
                        <group key={i} position={m.position as [number, number, number]}>
                            <mesh>
                                <sphereGeometry args={[0.05, 16, 16]} />
                                <meshStandardMaterial color="#6A11CB" emissive="#6A11CB" emissiveIntensity={2} />
                            </mesh>
                            <Text
                                position={[0, 0.2, 0]}
                                fontSize={0.15}
                                color="white"
                                anchorX="center"
                                anchorY="bottom"
                                outlineWidth={0.01}
                                outlineColor="#000"
                            >
                                {m.label}
                            </Text>
                        </group>
                    ))}
                </group>
            </Float>
        </group>
    )
}
