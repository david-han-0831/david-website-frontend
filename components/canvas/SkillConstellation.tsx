'use client'

import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float, OrbitControls, Line } from '@react-three/drei'
import * as THREE from 'three'

interface Skill {
    name: string
    category: string
    color: string
}

const skills: Skill[] = [
    { name: 'React', category: 'Frontend', color: '#61dafb' },
    { name: 'Next.js', category: 'Frontend', color: '#ffffff' },
    { name: 'TypeScript', category: 'Language', color: '#3178c6' },
    { name: 'Three.js', category: 'Frontend', color: '#ffffff' },
    { name: 'Python', category: 'Backend', color: '#3776ab' },
    { name: 'FastAPI', category: 'Backend', color: '#009688' },
    { name: 'Node.js', category: 'Backend', color: '#339933' },
    { name: 'Docker', category: 'DevOps', color: '#2496ed' },
    { name: 'AWS', category: 'Cloud', color: '#ff9900' },
    { name: 'PostgreSQL', category: 'Database', color: '#336791' },
]

function SkillNode({ skill, position }: { skill: Skill, position: THREE.Vector3 }) {
    const [hovered, setHovered] = useState(false)

    return (
        <group position={position}>
            <mesh
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial
                    color={skill.color}
                    emissive={skill.color}
                    emissiveIntensity={hovered ? 3 : 1}
                />
            </mesh>
            <Text
                position={[0, 0.2, 0]}
                fontSize={0.2}
                color="white"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="#000"
            >
                {skill.name}
            </Text>
        </group>
    )
}

export default function SkillConstellation() {
    const group = useRef<THREE.Group>(null)

    const nodes = useMemo(() => {
        return skills.map((skill, i) => {
            const phi = Math.acos(-1 + (2 * i) / skills.length)
            const theta = Math.sqrt(skills.length * Math.PI) * phi

            const x = Math.cos(theta) * Math.sin(phi)
            const y = Math.sin(theta) * Math.sin(phi)
            const z = Math.cos(phi)

            return {
                skill,
                position: new THREE.Vector3(x, y, z).multiplyScalar(3)
            }
        })
    }, [])

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y += 0.001
        }
    })

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />

            <Float floatIntensity={0.5} rotationIntensity={0.5}>
                <group ref={group}>
                    {nodes.map((node, i) => (
                        <SkillNode key={i} skill={node.skill} position={node.position} />
                    ))}

                    {/* Constellation Lines */}
                    {nodes.map((node, i) => {
                        const next = nodes[(i + 1) % nodes.length]
                        return (
                            <Line
                                key={`line-${i}`}
                                points={[node.position, next.position]}
                                color="white"
                                transparent
                                opacity={0.1}
                                lineWidth={1}
                            />
                        )
                    })}
                </group>
            </Float>
        </>
    )
}
