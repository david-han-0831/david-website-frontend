'use client'

import { useEffect, useState } from 'react'
import h from './home.module.css'
import s from './EndCard.module.css'
import { EMAIL } from '@/lib/site'
import { INQUIRY_COPY, KIND_LECTURE } from './inquiryCopy'
import { BRIEF_PRESET_EVENT } from './useContactScroll'
import TypedText from './TypedText'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackGTMEvent } from '@/lib/utils/gtm'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const EMPTY_CONTACT = { name: '', email: '', company: '', phone: '' }

// 문의 작성기. 왼쪽에서 고르면 오른쪽 초안이 써지고, 같은 자리에서 바로 보낸다.
// 초안은 미리 써 둔 문장을 조합할 뿐이라 AI 나 외부 서버를 부르지 않는다.
// 홈 맨 아래와 /contact 페이지가 이 부품 하나를 같이 쓴다
export default function Inquiry() {
    const { locale } = useLanguage()
    const copy = INQUIRY_COPY[locale]

    // 언어를 바꿔도 고른 것이 유지되도록 글자가 아니라 순번으로 기억한다
    const [kinds, setKinds] = useState<number[]>([])
    const [note, setNote] = useState('')
    const [stage, setStage] = useState<number | null>(null)
    const [when, setWhen] = useState<number | null>(null)
    const [who, setWho] = useState<number | null>(null)
    const [size, setSize] = useState<number | null>(null)
    const [lectureWhen, setLectureWhen] = useState('')
    const [contact, setContact] = useState(EMPTY_CONTACT)
    const [extra, setExtra] = useState('')
    const [status, setStatus] = useState<Status>('idle')
    const [problem, setProblem] = useState('')

    const addKind = (kind: number) => setKinds((prev) => (prev.includes(kind) ? prev : [...prev, kind].sort()))
    const toggleKind = (kind: number) =>
        setKinds((prev) => (prev.includes(kind) ? prev.filter((k) => k !== kind) : [...prev, kind].sort()))

    useEffect(() => {
        // 다른 영역의 버튼(예: 강의 문의하기)이 미리 고를 항목을 보내온다
        const preset = (e: Event) => addKind((e as CustomEvent<number>).detail)
        window.addEventListener(BRIEF_PRESET_EVENT, preset)
        // 다른 페이지에서 /contact?kind=lecture 로 넘어온 경우
        const frame = requestAnimationFrame(() => {
            if (new URLSearchParams(window.location.search).get('kind') === 'lecture') addKind(KIND_LECTURE)
        })
        return () => {
            window.removeEventListener(BRIEF_PRESET_EVENT, preset)
            cancelAnimationFrame(frame)
        }
    }, [])

    // 강의를 고르면 강의용 질문이, 그 밖의 것을 고르면(또는 아직 안 골랐으면) 개발용 질문이 나온다
    const lecture = kinds.includes(KIND_LECTURE)
    const build = !lecture || kinds.length > 1

    const rows = [
        { label: copy.fields.kind, value: kinds.map((i) => copy.kinds[i]).join(copy.join), live: false, show: true },
        // 직접 치고 있는 글은 타이핑 효과 없이 그대로 따라간다
        { label: copy.fields.note, value: note.trim(), live: true, show: true },
        { label: copy.fields.stage, value: stage === null ? '' : copy.stages[stage].line, live: false, show: build },
        { label: copy.fields.when, value: when === null ? '' : copy.whens[when].line, live: false, show: build },
        { label: copy.fields.who, value: who === null ? '' : copy.whos[who], live: false, show: lecture },
        { label: copy.fields.size, value: size === null ? '' : copy.sizes[size], live: false, show: lecture },
        { label: copy.fields.lectureWhen, value: lectureWhen.trim(), live: true, show: lecture },
    ].filter((row) => row.show)
    const filled = rows.filter((row) => row.value)

    const reset = () => {
        setKinds([])
        setNote('')
        setStage(null)
        setWhen(null)
        setWho(null)
        setSize(null)
        setLectureWhen('')
        setContact(EMPTY_CONTACT)
        setExtra('')
        setProblem('')
        setStatus('idle')
    }

    const send = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!contact.name.trim() || !contact.email.trim()) return setProblem(copy.needContact)
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) return setProblem(copy.badEmail)
        if (!filled.length && !extra.trim()) return setProblem(copy.needBody)
        setProblem('')
        setStatus('sending')

        const message = [
            `[${copy.header}]`,
            ...filled.map((row) => `${row.label}: ${row.value}`),
            ...(extra.trim() ? [`${copy.extraLabel}: ${extra.trim()}`] : []),
        ].join('\n')

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: contact.name.trim(),
                    email: contact.email.trim(),
                    company: contact.company.trim(),
                    phone: contact.phone.trim(),
                    inquiryType: lecture ? 'teaching' : 'collaboration',
                    message,
                }),
            })
            if (!response.ok) throw new Error(String(response.status))
            // 어떤 조합으로 문의가 들어오는지 본다. 직접 쓴 글과 연락처는 보내지 않고 고른 항목의 순번만 보낸다
            trackGTMEvent({
                event: 'form_submit',
                button_name: 'inquiry',
                button_location: 'contact_form',
                language: locale,
                category: kinds.join(',') || 'none',
                brief_stage: stage ?? -1,
                brief_when: when ?? -1,
                value: filled.length,
            })
            setStatus('sent')
        } catch {
            setStatus('error')
        }
    }

    const chips = (labels: string[], picked: (i: number) => boolean, pick: (i: number) => void) => (
        <div className={s.chips}>
            {labels.map((label, i) => (
                <button key={label} type="button" className={s.chip} aria-pressed={picked(i)} onClick={() => pick(i)}>
                    {label}
                </button>
            ))}
        </div>
    )
    const one = (value: number | null, set: (v: number | null) => void) =>
        [(i: number) => value === i, (i: number) => set(value === i ? null : i)] as const

    if (status === 'sent') {
        return (
            <div className={s.sent} role="status">
                <h3 className={s.sentTitle}>{copy.sentTitle}</h3>
                <p className={s.sentText}>{copy.sentText}</p>
                <button type="button" className={h.link} onClick={reset}>
                    {copy.again}
                </button>
            </div>
        )
    }

    return (
        <form className={s.builder} onSubmit={send} noValidate>
            <div className={s.questions}>
                <fieldset className={s.group}>
                    <legend>{copy.kindQ}</legend>
                    {chips(copy.kinds, (i) => kinds.includes(i), toggleKind)}
                </fieldset>

                <div className={s.group}>
                    <label htmlFor="inquiry-note">{copy.noteQ}</label>
                    <input
                        id="inquiry-note"
                        className={s.input}
                        value={note}
                        maxLength={120}
                        placeholder={copy.notePlaceholder}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </div>

                {build && (
                    <>
                        <fieldset className={s.group}>
                            <legend>{copy.stageQ}</legend>
                            {chips(copy.stages.map((o) => o.label), ...one(stage, setStage))}
                        </fieldset>
                        <fieldset className={s.group}>
                            <legend>{copy.whenQ}</legend>
                            {chips(copy.whens.map((o) => o.label), ...one(when, setWhen))}
                        </fieldset>
                    </>
                )}

                {lecture && (
                    <>
                        <fieldset className={s.group}>
                            <legend>{copy.whoQ}</legend>
                            {chips(copy.whos, ...one(who, setWho))}
                        </fieldset>
                        <fieldset className={s.group}>
                            <legend>{copy.sizeQ}</legend>
                            {chips(copy.sizes, ...one(size, setSize))}
                        </fieldset>
                        <div className={s.group}>
                            <label htmlFor="inquiry-lecture-when">{copy.lectureWhenQ}</label>
                            <input
                                id="inquiry-lecture-when"
                                className={s.input}
                                value={lectureWhen}
                                maxLength={80}
                                placeholder={copy.lectureWhenPlaceholder}
                                onChange={(e) => setLectureWhen(e.target.value)}
                            />
                        </div>
                    </>
                )}
            </div>

            <div className={s.doc}>
                <p className={s.docTitle}>{copy.docTitle}</p>
                <dl className={s.docRows} aria-live="polite">
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

                <div className={s.fields}>
                    <input
                        className={s.input}
                        aria-label={copy.name}
                        placeholder={copy.name}
                        autoComplete="name"
                        value={contact.name}
                        onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    />
                    <input
                        className={s.input}
                        type="email"
                        aria-label={copy.email}
                        placeholder={copy.email}
                        autoComplete="email"
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    />
                    <input
                        className={s.input}
                        aria-label={copy.company}
                        placeholder={copy.company}
                        autoComplete="organization"
                        value={contact.company}
                        onChange={(e) => setContact({ ...contact, company: e.target.value })}
                    />
                    <input
                        className={s.input}
                        type="tel"
                        aria-label={copy.phone}
                        placeholder={copy.phone}
                        autoComplete="tel"
                        value={contact.phone}
                        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    />
                    <textarea
                        className={`${s.input} ${s.extra}`}
                        aria-label={copy.extra}
                        placeholder={copy.extra}
                        rows={3}
                        maxLength={2000}
                        value={extra}
                        onChange={(e) => setExtra(e.target.value)}
                    />
                </div>

                {(problem || status === 'error') && (
                    <p className={s.problem} role="alert">
                        {problem || copy.error}
                    </p>
                )}

                <div className={s.actions}>
                    <button type="submit" className={h.button} disabled={status === 'sending'}>
                        {status === 'sending' ? copy.sending : copy.send}
                    </button>
                    <a href={`mailto:${EMAIL}`} className={h.link}>
                        {EMAIL}
                    </a>
                </div>
            </div>
        </form>
    )
}
