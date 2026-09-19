/**
 * Builds public/models/card.glb, the AR business card.
 * Geometry only (text is extruded from a typeface font), so it exports in Node without a canvas.
 *
 *   node scripts/build-ar-card.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'

// GLTFExporter only needs this much of FileReader
globalThis.FileReader = class {
    readAsArrayBuffer(blob) {
        blob.arrayBuffer().then((buffer) => {
            this.result = buffer
            this.onloadend?.()
        })
    }
}

const font = new FontLoader().parse(JSON.parse(readFileSync(new URL('./helvetiker_bold.typeface.json', import.meta.url))))

// Metres. Three times a real card, so it reads from across a desk.
const W = 0.27
const H = 0.15
const T = 0.006

const paper = new THREE.MeshStandardMaterial({ color: 0xf6f4ef, roughness: 0.55 })
const ink = new THREE.MeshStandardMaterial({ color: 0x0b0a09, roughness: 0.4 })
const accent = new THREE.MeshStandardMaterial({ color: 0xff5b2e, roughness: 0.35 })
const glass = new THREE.MeshStandardMaterial({ color: 0xdfe6ff, roughness: 0.05, metalness: 0.9 })

const card = new THREE.Group()
card.name = 'DavidHanCard'

const slab = new THREE.Mesh(new THREE.BoxGeometry(W, H, T), paper)
card.add(slab)

const text = (value, size, material, x, y) => {
    const geometry = new TextGeometry(value, { font, size, depth: 0.0012, curveSegments: 3 })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(x, y, T / 2)
    card.add(mesh)
}
const left = -W / 2 + 0.018
text('DAVID HAN', 0.026, ink, left, 0.022)
text('Developer & Educator', 0.0085, ink, left, 0.004)
text('AI / Automation / Web Engineering', 0.0062, ink, left, -0.012)
text('hdy20201004@gmail.com', 0.0062, ink, left, -0.05)
text('github.com/david-han-0831', 0.0062, ink, left, -0.062)

const bar = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.004, 0.0012), accent)
bar.position.set(left + 0.015, 0.058, T / 2 + 0.0006)
card.add(bar)

// the site's braces and caret, as the emblem
text('{', 0.03, glass, W / 2 - 0.075, -0.058)
text('}', 0.03, glass, W / 2 - 0.036, -0.058)
const caret = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.024, 0.0012), accent)
caret.position.set(W / 2 - 0.0475, -0.046, T / 2 + 0.0006)
card.add(caret)

// stands on the desk, leaning back on a small foot
const foot = new THREE.Mesh(new THREE.BoxGeometry(W * 0.5, 0.004, 0.06), ink)
foot.position.set(0, 0.002, -0.02)
card.position.y = H / 2 + 0.004
card.rotation.x = -0.22

const scene = new THREE.Scene()
scene.add(card, foot)

const glb = await new GLTFExporter().parseAsync(scene, { binary: true })
const out = new URL('../public/models/card.glb', import.meta.url)
writeFileSync(out, Buffer.from(glb))
console.log(`card.glb ${(glb.byteLength / 1024).toFixed(0)} KB`)
