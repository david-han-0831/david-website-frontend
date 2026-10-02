'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import h from './home.module.css'
import s from './EndCard.module.css'
import { EMAIL } from './Hero'
import { BRIEF_STORAGE_KEY } from './briefs'
import { BRIEF_PRESET_EVENT } from './useContactScroll'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackGTMEvent } from '@/lib/utils/gtm'
import type { Locale } from '@/translations'
import TypedText from './TypedText'

// 버튼 몇 개를 고르면 문의 초안이 써진다. 서버나 AI 호출 없이 미리 써 둔 문장을 조합한다
// (문구는 확정되면 translations 로 옮긴다)
type Option = { label: string; line: string }

type Copy = {
    kindQ: string
    kinds: string[]
    stageQ: string
    stages: Option[]
    whenQ: string
    whens: Option[]
    noteQ: string
    notePlaceholder: string
    docTitle: string
    fields: { kind: string; note: string; stage: string; when: string }
    empty: string
    join: string
    send: string
    hint: string
    header: string
}

const COPY: Record<Locale, Copy> = {
    ko: {
        kindQ: '무엇을 만드나요? (여러 개 가능)',
        kinds: ['웹 서비스', '모바일 앱', 'AI 기능', '기계 연동', '강의 요청'],
        stageQ: '지금 어디까지 있나요?',
        stages: [
            { label: '아이디어만 있어요', line: '아이디어 단계입니다. 필요한 화면과 기능 목록 정리부터 부탁드립니다.' },
            { label: '기획서가 있어요', line: '기획서가 있습니다. 이를 바탕으로 범위와 일정을 알고 싶습니다.' },
            { label: '디자인 시안이 있어요', line: '디자인 시안이 있습니다. 시안대로 개발할 범위와 일정을 알고 싶습니다.' },
            { label: '이미 운영 중이에요', line: '운영 중인 서비스가 있습니다. 개선이나 기능 추가를 원합니다.' },
        ],
        whenQ: '언제까지 필요한가요?',
        whens: [
            { label: '가능한 빨리', line: '가능한 빨리 시작하고 싶습니다.' },
            { label: '두세 달 안에', line: '두세 달 안에 완성되면 좋겠습니다.' },
            { label: '아직 미정', line: '일정은 아직 정하지 않았습니다.' },
        ],
        noteQ: '한 줄로 설명해 주세요',
        notePlaceholder: '예: 동네 병원 예약 앱이 필요해요',
        docTitle: '문의 초안',
        fields: { kind: '분야', note: '만들고 싶은 것', stage: '현재 상태', when: '희망 시기' },
        empty: '왼쪽에서 고르면 여기에 써집니다',
        join: ', ',
        send: '이 내용으로 문의하기',
        hint: '다음 화면에서 고쳐 쓸 수 있습니다.',
        header: '홈에서 작성한 문의 초안',
    },
    en: {
        kindQ: 'What are you making? (pick any)',
        kinds: ['Web service', 'Mobile app', 'AI feature', 'Connected device', 'A course'],
        stageQ: 'Where are you now?',
        stages: [
            { label: 'Just an idea', line: 'It is at the idea stage. Please start by listing the screens and features it needs.' },
            { label: 'I have a spec', line: 'I have a written spec. I would like to know the scope and schedule based on it.' },
            { label: 'I have designs', line: 'I have designs. I would like to know the scope and schedule to build them as they are.' },
            { label: 'Already running', line: 'The service is already running. I want improvements or new features.' },
        ],
        whenQ: 'When do you need it?',
        whens: [
            { label: 'As soon as possible', line: 'I would like to start as soon as possible.' },
            { label: 'Within two or three months', line: 'I would like it finished within two or three months.' },
            { label: 'Not decided', line: 'The schedule is not decided yet.' },
        ],
        noteQ: 'Describe it in one line',
        notePlaceholder: 'e.g. We need a booking app for our clinic',
        docTitle: 'Inquiry draft',
        fields: { kind: 'Area', note: 'What I want to make', stage: 'Current state', when: 'Timing' },
        empty: 'Your choices on the left are written here',
        join: ', ',
        send: 'Send this inquiry',
        hint: 'You can edit it on the next screen.',
        header: 'Inquiry draft written on the home page',
    },
    de: {
        kindQ: 'Was möchten Sie bauen? (Mehrfachauswahl)',
        kinds: ['Web-Service', 'Mobile App', 'KI-Funktion', 'Vernetztes Gerät', 'Ein Kurs'],
        stageQ: 'Wo stehen Sie gerade?',
        stages: [
            { label: 'Nur eine Idee', line: 'Es ist noch eine Idee. Bitte beginnen Sie mit einer Liste der nötigen Screens und Funktionen.' },
            { label: 'Konzept vorhanden', line: 'Ein schriftliches Konzept liegt vor. Ich möchte Umfang und Zeitplan auf dieser Basis erfahren.' },
            { label: 'Design vorhanden', line: 'Entwürfe liegen vor. Ich möchte Umfang und Zeitplan für die Umsetzung erfahren.' },
            { label: 'Läuft bereits', line: 'Der Service läuft bereits. Ich wünsche Verbesserungen oder neue Funktionen.' },
        ],
        whenQ: 'Bis wann brauchen Sie es?',
        whens: [
            { label: 'So bald wie möglich', line: 'Ich möchte so bald wie möglich starten.' },
            { label: 'In zwei bis drei Monaten', line: 'Es sollte in zwei bis drei Monaten fertig sein.' },
            { label: 'Noch offen', line: 'Der Zeitplan steht noch nicht fest.' },
        ],
        noteQ: 'Beschreiben Sie es in einer Zeile',
        notePlaceholder: 'z. B. Wir brauchen eine Buchungsapp für unsere Praxis',
        docTitle: 'Anfrage-Entwurf',
        fields: { kind: 'Bereich', note: 'Was ich bauen möchte', stage: 'Aktueller Stand', when: 'Zeitpunkt' },
        empty: 'Ihre Auswahl links wird hier eingetragen',
        join: ', ',
        send: 'Diese Anfrage senden',
        hint: 'Auf der nächsten Seite können Sie den Text ändern.',
        header: 'Auf der Startseite erstellter Anfrage-Entwurf',
    },
}

export default function EndCard() {
    const { t, locale } = useLanguage()
    const { end } = t.home
    const copy = COPY[locale]
    const router = useRouter()

    // 언어를 바꿔도 고른 것이 유지되도록 글자가 아니라 순번으로 기억한다
    const [kinds, setKinds] = useState<number[]>([])
    const [stage, setStage] = useState<number | null>(null)
    const [when, setWhen] = useState<number | null>(null)
    const [note, setNote] = useState('')

    // 다른 영역의 버튼(예: 강의 문의하기)이 미리 고를 항목을 보내온다
    useEffect(() => {
        const preset = (e: Event) => {
            const kind = (e as CustomEvent<number>).detail
            setKinds((prev) => (prev.includes(kind) ? prev : [...prev, kind].sort()))
        }
        window.addEventListener(BRIEF_PRESET_EVENT, preset)
        return () => window.removeEventListener(BRIEF_PRESET_EVENT, preset)
    }, [])

    const toggleKind = (i: number) =>
        setKinds((prev) => (prev.includes(i) ? prev.filter((k) => k !== i) : [...prev, i].sort()))

    const rows = [
        { label: copy.fields.kind, value: kinds.map((i) => copy.kinds[i]).join(copy.join), live: false },
        // 직접 치고 있는 글은 타이핑 효과 없이 그대로 따라간다
        { label: copy.fields.note, value: note.trim(), live: true },
        { label: copy.fields.stage, value: stage === null ? '' : copy.stages[stage].line, live: false },
        { label: copy.fields.when, value: when === null ? '' : copy.whens[when].line, live: false },
    ]
    const filled = rows.filter((row) => row.value)

    // 문의 폼이 열릴 때 읽어 가도록 세션 저장소에 둔다 (주소에 내용을 싣지 않는다)
    const send = () => {
        if (filled.length) {
            const text = [`[${copy.header}]`, ...filled.map((row) => `${row.label}: ${row.value}`)].join('\n')
            try {
                sessionStorage.setItem(BRIEF_STORAGE_KEY, text)
            } catch {
                // 저장소를 못 쓰면 초안 없이 문의 폼만 연다
            }
        }
        // 어떤 조합으로 문의가 들어오는지 본다. 직접 쓴 설명은 보내지 않고 고른 항목의 순번만 보낸다
        trackGTMEvent({
            event: 'form_submit',
            button_name: 'brief_builder',
            button_location: 'cta',
            destination: '/contact',
            language: locale,
            category: kinds.join(',') || 'none',
            brief_stage: stage ?? -1,
            brief_when: when ?? -1,
            brief_has_note: note.trim() ? 1 : 0,
            value: filled.length,
        })
        router.push('/contact')
    }

    return (
        <section className={s.end} id="contact">
            <div className={h.container}>
                <h2 className={s.title}>{end.title}</h2>
                <p className={s.desc}>{end.desc}</p>

                <div className={s.builder}>
                    <div className={s.questions}>
                        <fieldset className={s.group}>
                            <legend>{copy.kindQ}</legend>
                            <div className={s.chips}>
                                {copy.kinds.map((label, i) => (
                                    <button
                                        key={label}
                                        type="button"
                                        className={s.chip}
                                        aria-pressed={kinds.includes(i)}
                                        onClick={() => toggleKind(i)}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </fieldset>

                        <div className={s.group}>
                            <label htmlFor="brief-note">{copy.noteQ}</label>
                            <input
                                id="brief-note"
                                className={s.input}
                                value={note}
                                maxLength={120}
                                placeholder={copy.notePlaceholder}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>

                        <fieldset className={s.group}>
                            <legend>{copy.stageQ}</legend>
                            <div className={s.chips}>
                                {copy.stages.map((option, i) => (
                                    <button
                                        key={option.label}
                                        type="button"
                                        className={s.chip}
                                        aria-pressed={stage === i}
                                        onClick={() => setStage(stage === i ? null : i)}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </fieldset>

                        <fieldset className={s.group}>
                            <legend>{copy.whenQ}</legend>
                            <div className={s.chips}>
                                {copy.whens.map((option, i) => (
                                    <button
                                        key={option.label}
                                        type="button"
                                        className={s.chip}
                                        aria-pressed={when === i}
                                        onClick={() => setWhen(when === i ? null : i)}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </fieldset>
                    </div>

                    <div className={s.doc} aria-live="polite">
                        <p className={s.docTitle}>{copy.docTitle}</p>
                        <dl className={s.docRows}>
                            {rows.map((row) => (
                                <div key={row.label} className={s.docRow} data-filled={row.value ? '' : undefined}>
                                    <dt>{row.label}</dt>
                                    <dd>
                                        {!row.value ? (
                                            copy.empty
                                        ) : row.live ? (
                                            row.value
                                        ) : (
                                            <TypedText key={row.value} text={row.value} />
                                        )}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                        <div className={s.actions}>
                            <button type="button" className={h.button} onClick={send}>
                                {filled.length ? copy.send : end.cta}
                            </button>
                            <a href={`mailto:${EMAIL}`} className={h.link}>
                                {EMAIL}
                            </a>
                        </div>
                        <p className={s.hint}>{copy.hint}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
