import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

// Notion 클라이언트 초기화
const notion = new Client({
    auth: process.env.NOTION_API_KEY,
})

// Rate Limiting을 위한 간단한 메모리 저장소 (프로덕션에서는 Redis 등 사용 권장)
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

export async function POST(request: NextRequest) {
    try {
        // Rate Limiting 체크
        const ip = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown'
        
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            )
        }

        // 요청 데이터 파싱
        const data = await request.json()

        // 입력값 검증
        if (!data.name || !data.email || !data.message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // 이메일 형식 검증
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(data.email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            )
        }

        // Notion에 데이터 저장
        const notionResponse = await notion.pages.create({
            parent: {
                database_id: process.env.NOTION_DATABASE_ID!,
            },
            properties: {
                '이름': {
                    title: [
                        {
                            text: {
                                content: data.name,
                            },
                        },
                    ],
                },
                '회사': {
                    rich_text: [
                        {
                            text: {
                                content: data.company || '',
                            },
                        },
                    ],
                },
                '이메일': {
                    email: data.email,
                },
                '연락처': {
                    phone_number: data.phone || null,
                },
                '문의유형': {
                    select: {
                        name: data.inquiryType || 'general',
                    },
                },
                '메시지': {
                    rich_text: [
                        {
                            text: {
                                content: data.message,
                            },
                        },
                    ],
                },
                '상태': {
                    select: {
                        name: '신규',
                    },
                },
                '등록일': {
                    date: {
                        start: new Date().toISOString(),
                    },
                },
            },
        })

        // Slack 알림 전송
        if (process.env.SLACK_WEBHOOK_URL) {
            try {
                const inquiryTypeMap: { [key: string]: string } = {
                    general: '일반 문의',
                    teaching: '강의 / 출강 문의',
                    collaboration: '프로젝트 협업',
                    other: '기타',
                }

                const inquiryTypeLabel = inquiryTypeMap[data.inquiryType] || data.inquiryType

                const slackMessage = {
                    text: '📧 새로운 문의가 도착했습니다!',
                    blocks: [
                        {
                            type: 'header',
                            text: {
                                type: 'plain_text',
                                text: '📧 새로운 문의',
                            },
                        },
                        {
                            type: 'section',
                            fields: [
                                {
                                    type: 'mrkdwn',
                                    text: `*이름:*\n${data.name}`,
                                },
                                {
                                    type: 'mrkdwn',
                                    text: `*이메일:*\n${data.email}`,
                                },
                                {
                                    type: 'mrkdwn',
                                    text: `*회사:*\n${data.company || '-'}`,
                                },
                                {
                                    type: 'mrkdwn',
                                    text: `*문의유형:*\n${inquiryTypeLabel}`,
                                },
                            ],
                        },
                        {
                            type: 'section',
                            text: {
                                type: 'mrkdwn',
                                text: `*메시지:*\n${data.message}`,
                            },
                        },
                        {
                            type: 'context',
                            elements: [
                                {
                                    type: 'mrkdwn',
                                    text: `등록일: ${new Date().toLocaleString('ko-KR')}`,
                                },
                            ],
                        },
                    ],
                }

                await fetch(process.env.SLACK_WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(slackMessage),
                })
            } catch (slackError) {
                // Slack 전송 실패해도 Notion 저장은 성공했으므로 에러 로그만 남김
                console.error('Slack notification failed:', slackError)
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Contact form submitted successfully',
        })
    } catch (error: any) {
        console.error('Contact form error:', error)

        // Notion API 에러 처리
        if (error.code === 'object_not_found') {
            return NextResponse.json(
                { error: 'Database not found. Please check NOTION_DATABASE_ID.' },
                { status: 500 }
            )
        }

        if (error.code === 'unauthorized') {
            return NextResponse.json(
                { error: 'Unauthorized. Please check NOTION_API_KEY.' },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { error: 'Failed to submit contact form. Please try again later.' },
            { status: 500 }
        )
    }
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

