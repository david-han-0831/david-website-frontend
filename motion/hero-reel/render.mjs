// 히어로 릴 렌더러: index.html 의 three.js 장면을 시각 단위로 멈춰 찍고 ffmpeg 로 인코딩한다.
//
//   node motion/hero-reel/render.mjs            # 전체 렌더 (public/media/hero/)
//   node motion/hero-reel/render.mjs --stills   # 확인용 정지 컷만 (motion/hero-reel/out/)
//
// 모션블러: 한 프레임을 SUB 장의 서브프레임으로 찍어 평균낸다 (120fps → tmix → 30fps).
// 크롬 경로: CHROME_PATH 환경변수 > 설치된 Google Chrome (WebGL 에 GPU 사용)
import { chromium } from 'playwright-core'
import { spawn } from 'node:child_process'
import { createServer } from 'node:http'
import { createReadStream, existsSync, mkdirSync, statSync } from 'node:fs'
import { dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const outDir = join(root, 'public/media/hero')
const workDir = join(here, 'out')
const FPS = 30
const SUB = 4
const stillsOnly = process.argv.includes('--stills')
mkdirSync(workDir, { recursive: true })

// ES 모듈은 file:// 에서 못 불러오므로 frontend 루트를 잠깐 서빙한다
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json' }
const server = createServer((req, res) => {
    const file = join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname))
    if (!file.startsWith(root) || !existsSync(file) || statSync(file).isDirectory()) return res.writeHead(404).end()
    res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' })
    createReadStream(file).pipe(res)
})
await new Promise((r) => server.listen(0, '127.0.0.1', r))
const url = `http://127.0.0.1:${server.address().port}/motion/hero-reel/index.html?render`

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' })
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 })
page.on('pageerror', (e) => console.error('page error:', e.message))
page.on('console', (m) => m.type() === 'error' && console.error('console:', m.text()))
await page.goto(url, { waitUntil: 'load' })
await page.waitForFunction(() => window.__ready === true, null, { timeout: 60000 })
const duration = await page.evaluate(() => window.__reel.duration)

// seek() 결과를 그대로 반환하면 직렬화하다 멈추므로 아무것도 돌려주지 않는다
const seek = (t) =>
    page.evaluate((t) => {
        window.__reel.seek(t)
    }, t)

const done = async () => {
    await browser.close()
    server.close()
}

if (stillsOnly) {
    // 0 과 9.97 은 반복 이음새 확인용 (같아 보여야 한다)
    for (const t of [0, 0.8, 1.6, 2.6, 3.6, 4.6, 5.6, 6.2, 6.8, 7.6, 8.8, 9.5, 9.97]) {
        await seek(t)
        await page.screenshot({ path: join(workDir, `t${t.toFixed(1)}.png`) })
    }
    console.log('stills →', workDir)
    await done()
    process.exit(0)
}

mkdirSync(outDir, { recursive: true })
const master = join(workDir, 'master.mp4')
const posterPng = join(workDir, 'poster.png')

// 1) 서브프레임을 120fps 로 받아 평균낸 뒤 30fps 마스터로 저장
const ff = spawn(
    'ffmpeg',
    ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS * SUB), '-i', '-',
        '-vf', `tmix=frames=${SUB},fps=${FPS}`, '-c:v', 'libx264', '-preset', 'slow', '-crf', '10', '-pix_fmt', 'yuv420p', master],
    { stdio: ['pipe', 'inherit', 'inherit'] },
)
const total = Math.round(duration * FPS * SUB)
for (let i = 0; i < total; i++) {
    await seek(i / (FPS * SUB))
    const png = await page.screenshot({ type: 'png' })
    if (!ff.stdin.write(png)) await new Promise((r) => ff.stdin.once('drain', r))
    if (i % 60 === 0) process.stdout.write(`\rsubframe ${i}/${total}`)
}
ff.stdin.end()
await new Promise((r) => ff.on('close', r))

// 포스터: 조립이 끝나고 빛이 지나가는 순간
await seek(7.9)
await page.screenshot({ path: posterPng })
await done()

// 2) 웹 배포용 인코딩
const run = (args) =>
    new Promise((ok, fail) => {
        const p = spawn('ffmpeg', ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit' })
        p.on('close', (code) => (code === 0 ? ok() : fail(new Error('ffmpeg ' + code))))
    })

const common = ['-an', '-movflags', '+faststart', '-pix_fmt', 'yuv420p']
await run(['-i', master, '-c:v', 'libx264', '-preset', 'veryslow', '-crf', '23', ...common, join(outDir, 'reel-1080.mp4')])
await run(['-i', master, '-vf', 'scale=1280:-2:flags=lanczos', '-c:v', 'libx264', '-preset', 'veryslow', '-crf', '24', ...common, join(outDir, 'reel-720.mp4')])
await run(['-i', master, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '34', '-row-mt', '1', '-deadline', 'good', '-an', join(outDir, 'reel-1080.webm')])
await run(['-i', posterPng, '-q:v', '4', join(outDir, 'poster.jpg')])
console.log('\ndone →', outDir)
