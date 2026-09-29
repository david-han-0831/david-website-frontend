// 모션 릴 공용 렌더러: <릴 폴더>/index.html 의 장면을 시각 단위로 멈춰 찍고 ffmpeg 로 인코딩한다.
//
//   node motion/render.mjs <릴 폴더> --stills     # 확인용 정지 컷 → <릴>/out/
//   node motion/render.mjs <릴 폴더>              # 미리보기 영상 → <릴>/out/preview.mp4
//   node motion/render.mjs <릴 폴더> --publish    # 사이트용 인코딩 → public/media/hero/
//   --sub 8                                        # 모션블러 서브프레임 수 (기본 4)
//
// 릴 페이지 약속: window.__ready === true 가 되면 window.__reel = { seek(t), duration, stills? }
// 모션블러: 한 프레임을 SUB 장의 서브프레임으로 찍어 평균낸다 (120fps → tmix → 30fps).
// 크롬 경로: CHROME_PATH 환경변수 > 설치된 Google Chrome (WebGL 에 GPU 사용)
import { chromium } from 'playwright-core'
import { spawn } from 'node:child_process'
import { createServer } from 'node:http'
import { createReadStream, existsSync, mkdirSync, statSync } from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const reelArg = process.argv.slice(2).find((a, i, all) => !a.startsWith('--') && all[i - 1] !== '--sub')
if (!reelArg) throw new Error('사용법: node motion/render.mjs <릴 폴더> [--stills|--publish]')
const reelDir = resolve(reelArg)
const workDir = join(reelDir, 'out')
const publishDir = join(root, 'public/media/hero')
const FPS = 30
// --sub N: 무늬가 촘촘하거나 카메라가 빠른 릴은 서브프레임을 늘려야 겹쳐 보이지 않는다
const subArg = process.argv.indexOf('--sub')
const SUB = subArg > 0 ? Number(process.argv[subArg + 1]) : 4
const stillsOnly = process.argv.includes('--stills')
const publish = process.argv.includes('--publish')
mkdirSync(workDir, { recursive: true })

// ES 모듈은 file:// 에서 못 불러오므로 frontend 루트를 잠깐 서빙한다
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.glb': 'model/gltf-binary' }
const server = createServer((req, res) => {
    const file = join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname))
    if (!file.startsWith(root) || !existsSync(file) || statSync(file).isDirectory()) return res.writeHead(404).end()
    res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' })
    createReadStream(file).pipe(res)
})
await new Promise((r) => server.listen(0, '127.0.0.1', r))
const url = `http://127.0.0.1:${server.address().port}/${relative(root, reelDir).replaceAll('\\', '/')}/index.html?render`

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' })
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 })
page.on('pageerror', (e) => console.error('page error:', e.message))
page.on('console', (m) => m.type() === 'error' && !m.text().includes('404') && console.error('console:', m.text()))
await page.goto(url, { waitUntil: 'load' })
await page.waitForFunction(() => window.__ready === true, null, { timeout: 90000 })
const { duration, stills, poster } = await page.evaluate(() => ({ duration: window.__reel.duration, stills: window.__reel.stills, poster: window.__reel.poster }))

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
    const times = stills ?? Array.from({ length: 10 }, (_, i) => +((i * duration) / 10).toFixed(2))
    for (const t of times) {
        await seek(t)
        await page.screenshot({ path: join(workDir, `t${t.toFixed(2)}.png`) })
    }
    console.log('stills →', workDir)
    await done()
    process.exit(0)
}

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

await seek(poster ?? duration * 0.8)
await page.screenshot({ path: posterPng })
await done()

// 2) 인코딩
const run = (args) =>
    new Promise((ok, fail) => {
        const p = spawn('ffmpeg', ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit' })
        p.on('close', (code) => (code === 0 ? ok() : fail(new Error('ffmpeg ' + code))))
    })
const common = ['-an', '-movflags', '+faststart', '-pix_fmt', 'yuv420p']

if (!publish) {
    await run(['-i', master, '-c:v', 'libx264', '-preset', 'slow', '-crf', '21', ...common, join(workDir, 'preview.mp4')])
    console.log('\npreview →', join(workDir, 'preview.mp4'))
    process.exit(0)
}

mkdirSync(publishDir, { recursive: true })
await run(['-i', master, '-c:v', 'libx264', '-preset', 'veryslow', '-crf', '23', ...common, join(publishDir, 'reel-1080.mp4')])
await run(['-i', master, '-vf', 'scale=1280:-2:flags=lanczos', '-c:v', 'libx264', '-preset', 'veryslow', '-crf', '24', ...common, join(publishDir, 'reel-720.mp4')])
await run(['-i', master, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '34', '-row-mt', '1', '-deadline', 'good', '-an', join(publishDir, 'reel-1080.webm')])
await run(['-i', posterPng, '-q:v', '4', join(publishDir, 'poster.jpg')])
console.log('\npublished →', publishDir)
