import s from './Wordmark.module.css'

// i의 점 자리에 지붕을 얹고 마침표를 찍은 워드마크. 지붕과 마침표가 포인트 색.
// 글자 크기와 색은 감싸는 쪽에서 정한다 (읽는 이름은 감싸는 링크의 aria-label 로 준다)
export default function Wordmark() {
    return (
        <span className={s.mark} aria-hidden>
            Dav
            <span className={s.i}>
                ı
                <svg viewBox="0 0 26 16" className={s.roof}>
                    <path d="M3 13 L13 3 L23 13" />
                </svg>
            </span>
            d<span className={s.dot} />
        </span>
    )
}
