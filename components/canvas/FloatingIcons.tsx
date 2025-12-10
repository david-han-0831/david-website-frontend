'use client'

import { Float, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

const icons = [
    { text: 'React', color: '#61dafb', position: [-4, 2, -5] },
    { text: 'Next.js', color: '#ffffff', position: [4, 2, -4] },
    { text: 'TS', color: '#3178c6', position: [-5, -2, -6] },
    { text: 'Python', color: '#ffde57', position: [5, -1, -5] },
    { text: 'AI', color: '#ff6b6b', position: [0, 3.5, -8] },
    { text: 'Three', color: '#ffffff', position: [0, -3.5, -8] },
]

function Icon({ text, color, position }: { text: string; color: string; position: number[] }) {
    const mesh = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.lookAt(0, 0, 5) // Face towards camera
        }
    })

    // Removed custom font path to fallback to default CDN font
    // Increased fontSize and opacity for better visibility
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <Text
                ref={mesh}
                position={position as [number, number, number]}
                fontSize={0.5}
                color={color}
                anchorX="center"
                anchorY="middle"
                fillOpacity={0.7}
                outlineWidth={0.02}
                outlineColor="#000000"
            >
                {text}
            </Text>
        </Float>
    )
}

export default function FloatingIcons() {
    return (
        <group>
            {icons.map((icon, i) => (
                <Icon key={i} {...icon} />
            ))}
        </group>
    )
}
