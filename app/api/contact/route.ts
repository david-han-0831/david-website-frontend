import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

// 문의 접수. 노션 DB 에 기록하고 슬랙으로 알린다.
// 둘은 서로 막지 않는다: 하나라도 받았으면 방문자에게는 성공으로 답하고, 실패한 쪽은 로그로 남긴다.
// (예전에는 노션이 실패하면 슬랙 알림까지 나가지 않아 문의가 통째로 사라졌다)

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
})

// Rate Limiting을 위한 간단한 메모리 저장소 (서버리스 인스턴스마다 따로라 완벽하지 않다)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
    const now = Date.now()
    const limit = rateLimitMap.get(ip)

    if (!limit || now > limit.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }) // 1분당 5회 제한
        return true
    }

    if (limit.count >= 5) {
        return false
    }

    limit.count++
    return true
}

type Inquiry = {
    name: string
    email: string
    company?: string
    phone?: string
    inquiryType?: string
    message: string
}

const INQUIRY_TYPES: Record<string, string> = {
    general: '일반 문의',
    teaching: '강의 / 출강 문의',
    collaboration: '프로젝트 협업',
    other: '기타',
}

// 노션 rich_text 한 칸은 2000자까지 받는다
const clip = (text: string) => text.slice(0, 2000)

async function saveToNotion(data: Inquiry) {
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) throw new Error('notion env missing')
    await notion.pages.create({
        parent: { database_id: process.env.NOTION_DATABASE_ID },
        properties: {
            '이름': { title: [{ text: { content: data.name } }] },
            '회사': { rich_text: [{ text: { content: data.company || '' } }] },
            '이메일': { email: data.email },
            '연락처': { phone_number: data.phone || null },
            '문의유형': { select: { name: data.inquiryType || 'general' } },
            '메시지': { rich_text: [{ text: { content: clip(data.message) } }] },
            '상태': { select: { name: '신규' } },
            '등록일': { date: { start: new Date().toISOString() } },
        },
    })
}

async function notifySlack(data: Inquiry, notionSaved: boolean) {
    const url = process.env.SLACK_WEBHOOK_URL
    if (!url) throw new Error('slack env missing')
    const type = INQUIRY_TYPES[data.inquiryType || ''] || data.inquiryType || '-'
    const when = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            // 알림 미리보기에 뜨는 한 줄
            text: `새 문의: ${data.name} (${type})`,
            blocks: [
                { type: 'header', text: { type: 'plain_text', text: `새 문의 · ${type}` } },
                {
                    type: 'section',
                    fields: [
                        { type: 'mrkdwn', text: `*이름*\n${data.name}` },
                        { type: 'mrkdwn', text: `*이메일*\n<mailto:${data.email}|${data.email}>` },
                        { type: 'mrkdwn', text: `*회사·기관*\n${data.company || '-'}` },
                        { type: 'mrkdwn', text: `*연락처*\n${data.phone || '-'}` },
                    ],
                },
                { type: 'section', text: { type: 'mrkdwn', text: '```' + data.message.slice(0, 2800) + '```' } },
                {
                    type: 'context',
                    elements: [
                        {
                            type: 'mrkdwn',
                            text: `${when} · ${notionSaved ? '노션에 저장됨' : '⚠️ 노션 저장 실패, 이 메시지가 유일한 기록'}`,
                        },
                    ],
                },
            ],
        }),
    })
    // 웹훅이 폐기되거나 채널이 지워지면 4xx 를 돌려준다. 확인하지 않으면 조용히 사라진다
    if (!response.ok) throw new Error(`slack ${response.status} ${await response.text()}`)
}

export async function POST(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(ip)) {
        return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    let data: Inquiry
    try {
        data = await request.json()
    } catch {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    if (!data.name || !data.email || !data.message) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // 노션을 먼저 시도해 그 결과를 슬랙 메시지에 적는다
    let notionSaved = false
    try {
        await saveToNotion(data)
        notionSaved = true
    } catch (error) {
        console.error('Contact: Notion save failed', error)
    }

    let slackSent = false
    try {
        await notifySlack(data, notionSaved)
        slackSent = true
    } catch (error) {
        console.error('Contact: Slack notify failed', error)
    }

    if (!notionSaved && !slackSent) {
        return NextResponse.json({ error: 'Failed to submit contact form. Please try again later.' }, { status: 500 })
    }
    return NextResponse.json({ success: true, notion: notionSaved, slack: slackSent })
}

// OPTIONS 메서드 (CORS preflight)
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    })
}
