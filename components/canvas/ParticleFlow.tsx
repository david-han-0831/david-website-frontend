'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleFlow() {
    const count = 2000
    const mesh = useRef<THREE.InstancedMesh>(null)

    const particles = useMemo(() => {
        const temp = []
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

    const dummy = useMemo(() => new THREE.Object3D(), [])

    useFrame((state) => {
        if (!mesh.current) return

        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle

            // Update time
            t = particle.t += speed / 2
            const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.sin(t) + Math.cos(t * 2) / 10
            const s = Math.cos(t)

            // Update position - U shape approximation (Flowing down then up)
            // We'll use a parametric curve that resembles a flow
            // x = simple linear flow or sin
            // y = curve

            // Let's create a flow field type motion
            // Particles move in a gentle U curve?
            // Actually U-shaped flow sounds like a specific visual composition.
            // Let's make them flow in a generic nice way for now, 
            // focusing on "Flow" + "Particles" unless specific math is requested.
            // Re-interpreting "U-shaped": Maybe a literal U-curve path in 3D space.

            // Curve: x = t, y = x^2 (Parabola = U shape)
            // Let's modify 't' to represent position along path.

            const t_mod = (t % 20) - 10 // range -10 to 10

            // U-shape path
            const x = t_mod * 1.5 // spread width
            const y = (t_mod * t_mod) * 0.15 - 5 // U curve centered, shifted down
            const z = (particle.zFactor / 10) // random depth thickness

            dummy.position.set(x, y, z)
            dummy.scale.setScalar(1)
            dummy.rotation.set(s * 5, s * 5, s * 5)
            dummy.updateMatrix()

            mesh.current!.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <>
            <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
                <dodecahedronGeometry args={[0.05, 0]} />
                <meshBasicMaterial color="#2575FC" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
            </instancedMesh>
        </>
    )
}
