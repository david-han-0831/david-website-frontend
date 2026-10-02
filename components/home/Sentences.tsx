import h from './home.module.css'
import CountUp from './CountUp'

// 문단을 문장 단위로 나눠, 넓은 화면에서는 한 문장을 한 줄에 둔다.
// 폭에 맡기면 "…기관 강의와 1:1 / 수업을 합쳐"처럼 문장 중간에서 줄이 넘어가 어색하다.
// 좁은 화면에서는 평소처럼 이어서 흐른다.
// countUp 에 숫자를 주면 글 속의 그 숫자가 화면에 들어올 때 0부터 올라간다
export default function Sentences({ text, countUp }: { text: string; countUp?: number }) {
    return (
        <>
            {text.split(/(?<=[.?!])\s+/).map((sentence) => {
                const [before, after] = countUp === undefined ? [sentence] : sentence.split(String(countUp))
                return (
                    <span key={sentence} className={h.sentence}>
                        {before}
                        {after !== undefined && countUp !== undefined && (
                            <>
                                <CountUp value={countUp} />
                                {after}
                            </>
                        )}{' '}
                    </span>
                )
            })}
        </>
    )
}
