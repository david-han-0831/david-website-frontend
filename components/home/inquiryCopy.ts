import type { Locale } from '@/translations'

// 문의 작성기(Inquiry)의 문구 (확정되면 translations 로 옮긴다).
// 선택지는 순번으로 기억하므로 세 언어의 순서를 똑같이 맞춘다
type Option = { label: string; line: string }

export type InquiryCopy = {
    kindQ: string
    kinds: string[]
    noteQ: string
    notePlaceholder: string
    stageQ: string
    stages: Option[]
    whenQ: string
    whens: Option[]
    whoQ: string
    whos: string[]
    sizeQ: string
    sizes: string[]
    lectureWhenQ: string
    lectureWhenPlaceholder: string
    docTitle: string
    fields: { kind: string; note: string; stage: string; when: string; who: string; size: string; lectureWhen: string }
    empty: string
    join: string
    name: string
    email: string
    company: string
    phone: string
    extra: string
    extraLabel: string
    send: string
    sending: string
    sentTitle: string
    sentText: string
    again: string
    error: string
    needContact: string
    badEmail: string
    needBody: string
    header: string
}

// "무엇을 만드나요" 선택지에서 강의 요청의 순번
export const KIND_LECTURE = 4

export const INQUIRY_COPY: Record<Locale, InquiryCopy> = {
    ko: {
        kindQ: '무엇이 필요하신가요? (여러 개 가능)',
        kinds: ['웹 서비스', '모바일 앱', 'AI 기능', '기계 연동', '강의 요청'],
        noteQ: '한 줄로 설명해 주세요',
        notePlaceholder: '예: 동네 병원 예약 앱이 필요해요',
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
        whoQ: '누구를 대상으로 하나요?',
        whos: ['대학생', '재직자', '취업 준비생', '그 외'],
        sizeQ: '몇 명인가요?',
        sizes: ['10명 이하', '10~30명', '30명 이상', '아직 미정'],
        lectureWhenQ: '언제쯤 원하시나요?',
        lectureWhenPlaceholder: '예: 11월 둘째 주, 하루 4시간',
        docTitle: '문의 초안',
        fields: {
            kind: '분야',
            note: '설명',
            stage: '현재 상태',
            when: '희망 시기',
            who: '강의 대상',
            size: '인원',
            lectureWhen: '강의 희망 일정',
        },
        empty: '왼쪽에서 고르면 여기에 써집니다',
        join: ', ',
        name: '이름',
        email: '이메일',
        company: '회사나 기관 (선택)',
        phone: '연락처 (선택)',
        extra: '더 전하고 싶은 말이 있으면 적어 주세요 (선택)',
        extraLabel: '추가 내용',
        send: '문의 보내기',
        sending: '보내는 중',
        sentTitle: '잘 받았습니다',
        sentText: '보내 주신 내용을 확인하고 답장드리겠습니다.',
        again: '새로 작성하기',
        error: '보내지 못했습니다. 잠시 후 다시 시도하거나 아래 이메일로 보내 주세요.',
        needContact: '이름과 이메일을 적어 주세요.',
        badEmail: '이메일 주소를 확인해 주세요.',
        needBody: '왼쪽에서 하나 이상 고르거나, 전하고 싶은 말을 적어 주세요.',
        header: '홈페이지 문의',
    },
    en: {
        kindQ: 'What do you need? (pick any)',
        kinds: ['Web service', 'Mobile app', 'AI feature', 'Connected device', 'A course'],
        noteQ: 'Describe it in one line',
        notePlaceholder: 'e.g. We need a booking app for our clinic',
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
        whoQ: 'Who is the course for?',
        whos: ['University students', 'Employees', 'Job seekers', 'Other'],
        sizeQ: 'How many people?',
        sizes: ['Up to 10', '10 to 30', 'More than 30', 'Not decided'],
        lectureWhenQ: 'When would you like it?',
        lectureWhenPlaceholder: 'e.g. second week of November, 4 hours a day',
        docTitle: 'Inquiry draft',
        fields: {
            kind: 'Area',
            note: 'Description',
            stage: 'Current state',
            when: 'Timing',
            who: 'Audience',
            size: 'Group size',
            lectureWhen: 'Preferred dates',
        },
        empty: 'Your choices on the left are written here',
        join: ', ',
        name: 'Name',
        email: 'Email',
        company: 'Company or institution (optional)',
        phone: 'Phone (optional)',
        extra: 'Anything else you want to tell me (optional)',
        extraLabel: 'Additional notes',
        send: 'Send inquiry',
        sending: 'Sending',
        sentTitle: 'Received',
        sentText: 'I will read your message and reply.',
        again: 'Write another',
        error: 'Could not send. Try again in a moment, or use the email below.',
        needContact: 'Enter your name and email.',
        badEmail: 'Check the email address.',
        needBody: 'Pick at least one option on the left, or write what you want to tell me.',
        header: 'Website inquiry',
    },
    de: {
        kindQ: 'Was brauchen Sie? (Mehrfachauswahl)',
        kinds: ['Web-Service', 'Mobile App', 'KI-Funktion', 'Vernetztes Gerät', 'Ein Kurs'],
        noteQ: 'Beschreiben Sie es in einer Zeile',
        notePlaceholder: 'z. B. Wir brauchen eine Buchungsapp für unsere Praxis',
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
        whoQ: 'Für wen ist der Kurs?',
        whos: ['Studierende', 'Berufstätige', 'Bewerber', 'Andere'],
        sizeQ: 'Wie viele Personen?',
        sizes: ['Bis 10', '10 bis 30', 'Mehr als 30', 'Noch offen'],
        lectureWhenQ: 'Wann soll er stattfinden?',
        lectureWhenPlaceholder: 'z. B. zweite Novemberwoche, 4 Stunden pro Tag',
        docTitle: 'Anfrage-Entwurf',
        fields: {
            kind: 'Bereich',
            note: 'Beschreibung',
            stage: 'Aktueller Stand',
            when: 'Zeitpunkt',
            who: 'Zielgruppe',
            size: 'Gruppengröße',
            lectureWhen: 'Wunschtermine',
        },
        empty: 'Ihre Auswahl links wird hier eingetragen',
        join: ', ',
        name: 'Name',
        email: 'E-Mail',
        company: 'Firma oder Einrichtung (optional)',
        phone: 'Telefon (optional)',
        extra: 'Was Sie mir sonst noch mitteilen möchten (optional)',
        extraLabel: 'Weitere Angaben',
        send: 'Anfrage senden',
        sending: 'Wird gesendet',
        sentTitle: 'Angekommen',
        sentText: 'Ich lese Ihre Nachricht und melde mich.',
        again: 'Neue Anfrage',
        error: 'Senden fehlgeschlagen. Bitte versuchen Sie es gleich noch einmal oder nutzen Sie die E-Mail unten.',
        needContact: 'Bitte Name und E-Mail angeben.',
        badEmail: 'Bitte die E-Mail-Adresse prüfen.',
        needBody: 'Wählen Sie links mindestens eine Option oder schreiben Sie, was Sie mitteilen möchten.',
        header: 'Anfrage über die Website',
    },
}
