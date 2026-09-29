// 히어로 릴 렌더러: index.html 의 GSAP 타임라인을 프레임 단위로 멈춰 찍고 ffmpeg 로 인코딩한다.
//
//   node motion/hero-reel/render.mjs            # 전체 렌더 (public/media/hero/)
//   node motion/hero-reel/render.mjs --stills   # 확인용 정지 컷만 (motion/hero-reel/out/)
//
// 크롬 경로: CHROME_PATH 환경변수 > 설치된 Google Chrome
import { chromium } from 'playwright-core'
import { spawn } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const outDir = join(root, 'public/media/hero')
const stillDir = join(here, 'out')
const FPS = 30
const stillsOnly = process.argv.includes('--stills')

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' })
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 })
page.on('pageerror', (e) => console.error('page error:', e.message))
await page.goto(pathToFileURL(join(here, 'index.html')).href + '?render', { waitUntil: 'load' })
await page.evaluate(() => window.__ready)
const duration = await page.evaluate(() => window.__reel.duration)

// seek() 는 타임라인 객체를 돌려주는데, 그대로 반환하면 직렬화하다 멈춘다
const seek = (t) =>
    page.evaluate((t) => {
        window.__reel.tl.seek(t, false)
    }, t)

if (stillsOnly) {
    mkdirSync(stillDir, { recursive: true })
    for (const t of [0, 1.0, 2.2, 3.4, 4.6, 5.8, 6.9, 7.9, 8.6]) {
        await seek(t)
        await page.screenshot({ path: join(stillDir, `t${t.toFixed(1)}.png`) })
    }
    console.log('stills →', stillDir)
    await browser.close()
    process.exit(0)
}

mkdirSync(outDir, { recursive: true })
mkdirSync(stillDir, { recursive: true })
// 마스터·PNG 포스터는 작업용이라 public 이 아닌 out/ 에 둔다
const master = join(stillDir, 'master.mp4')
const posterPng = join(stillDir, 'poster.png')

// 1) 무손실에 가까운 마스터 (프레임을 PNG 로 파이프)
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-', '-c:v', 'libx264', '-preset', 'slow', '-crf', '12', '-pix_fmt', 'yuv420p', master], { stdio: ['pipe', 'inherit', 'inherit'] })
const frames = Math.round(duration * FPS)
for (let i = 0; i < frames; i++) {
    await seek(i / FPS)
    const png = await page.screenshot({ type: 'png' })
    if (!ff.stdin.write(png)) await new Promise((r) => ff.stdin.once('drain', r))
    if (i % 30 === 0) process.stdout.write(`\rframe ${i}/${frames}`)
}
ff.stdin.end()
await new Promise((r) => ff.on('close', r))

// 포스터: 모든 단계가 보이는 빌드 막바지 프레임
await seek(6.9)
await page.screenshot({ path: posterPng })
await browser.close()

// 2) 웹 배포용 인코딩
const run = (args) =>
    new Promise((ok, fail) => {
        const p = spawn('ffmpeg', ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit' })
        p.on('close', (code) => (code === 0 ? ok() : fail(new Error('ffmpeg ' + code))))
    })

const common = ['-an', '-movflags', '+faststart', '-pix_fmt', 'yuv420p']
await run(['-i', master, '-c:v', 'libx264', '-preset', 'veryslow', '-crf', '26', '-tune', 'animation', ...common, join(outDir, 'reel-1080.mp4')])
await run(['-i', master, '-vf', 'scale=1280:-2:flags=lanczos', '-c:v', 'libx264', '-preset', 'veryslow', '-crf', '27', '-tune', 'animation', ...common, join(outDir, 'reel-720.mp4')])
await run(['-i', master, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '38', '-row-mt', '1', '-deadline', 'good', '-an', join(outDir, 'reel-1080.webm')])
await run(['-i', posterPng, '-q:v', '4', join(outDir, 'poster.jpg')])
console.log('\ndone →', outDir)
