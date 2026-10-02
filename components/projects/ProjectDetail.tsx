'use client'

import Link from 'next/link'
import h from '@/components/home/home.module.css'
import s from './ProjectDetail.module.css'
import HomeShell from '@/components/home/HomeShell'
import { PROJECT_COPY } from './copy'
import { PROJECTS } from '@/data/projects'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackButtonClick } from '@/lib/utils/gtm'

// 프로젝트 상세. 데이터에 있는 항목만 그린다 (결과가 없는 프로젝트는 결과 단락이 나오지 않는다)
export default function ProjectDetail({ id }: { id: number }) {
    const { locale } = useLanguage()
    const copy = PROJECT_COPY[locale]
    const index = PROJECTS.findIndex((p) => p.id === id)
    const project = PROJECTS[index]

    if (!project) {
        return (
            <HomeShell>
                <section className={s.intro}>
                    <div className={h.container}>
                        <h1 className={s.title}>{copy.notFound}</h1>
                        <Link href="/projects" className={`${h.link} ${s.back}`}>
                            {copy.back}
                        </Link>
                    </div>
                </section>
            </HomeShell>
        )
    }

    // 목록에 나오는 순서대로 앞뒤 프로젝트를 잇는다
    const prev = PROJECTS[index - 1]
    const next = PROJECTS[index + 1]
    const { problem, approach, outcome } = project

    return (
        <HomeShell>
            <section className={s.intro}>
                <div className={h.container}>
                    <Link href="/projects" className={`${h.link} ${s.back}`}>
                        {copy.back}
                    </Link>
                    <p className={s.kind}>
                        {copy.categories[project.category]}, {project.year}
                    </p>
                    <h1 className={s.title}>{project.title}</h1>
                    <p className={s.lead}>{project.summary}</p>
                </div>
            </section>

            <section className={s.body}>
                <div className={h.container}>
                    <dl className={s.meta}>
                        <div>
                            <dt>{copy.role}</dt>
                            <dd>{project.role}</dd>
                        </div>
                        <div>
                            <dt>{copy.stack}</dt>
                            <dd>{project.techStack.join(', ')}</dd>
                        </div>
                    </dl>

                    {problem && (
                        <div className={s.block}>
                            <h2 className={h.h2}>{copy.background}</h2>
                            <div className={s.prose}>
                                <p>{problem.background}</p>
                                {problem.requirements.length > 0 && (
                                    <>
                                        <h3>{copy.requirements}</h3>
                                        <ul className={s.needs}>
                                            {problem.requirements.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {approach && (
                        <div className={s.block}>
                            <h2 className={h.h2}>{copy.approach}</h2>
                            <div className={s.prose}>
                                <p>{approach.strategy}</p>
                                {approach.architecture && (
                                    <>
                                        <h3>{copy.architecture}</h3>
                                        <p>{approach.architecture}</p>
                                    </>
                                )}
                                <h3>{copy.myRole}</h3>
                                <p>{approach.myRoleFocus}</p>
                            </div>
                        </div>
                    )}

                    {outcome && (
                        <div className={s.block}>
                            <h2 className={h.h2}>{copy.outcome}</h2>
                            <div className={s.prose}>
                                <p>{outcome.result.replaceAll('->', '→')}</p>
                                {outcome.performance && <p>{outcome.performance}</p>}
                                <h3>{copy.learnings}</h3>
                                <p>{outcome.learnings}</p>
                            </div>
                        </div>
                    )}

                    {project.nda && <p className={s.nda}>{copy.nda}</p>}

                    <nav className={s.pager} aria-label={copy.back}>
                        {prev ? (
                            <Link href={`/projects/${prev.id}`} className={s.page}>
                                <span>{copy.prev}</span>
                                <strong>{prev.title}</strong>
                            </Link>
                        ) : (
                            <span />
                        )}
                        {next && (
                            <Link href={`/projects/${next.id}`} className={`${s.page} ${s.pageNext}`}>
                                <span>{copy.next}</span>
                                <strong>{next.title}</strong>
                            </Link>
                        )}
                    </nav>
                </div>
            </section>

            <section className={s.end}>
                <div className={h.container}>
                    <h2 className={s.endTitle}>{copy.endTitle}</h2>
                    <p className={s.endText}>{copy.endText}</p>
                    <Link
                        href="/contact"
                        className={h.button}
                        onClick={() => trackButtonClick(`contact_project_${project.id}`, 'cta', '/contact', locale)}
                    >
                        {copy.endCta}
                    </Link>
                </div>
            </section>
        </HomeShell>
    )
}
