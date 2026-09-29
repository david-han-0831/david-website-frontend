import h from '@/components/home/home.module.css'
import Hero from '@/components/home/Hero'
import Build from '@/components/home/Build'
import Work from '@/components/home/Work'
import Services from '@/components/home/Services'
import EndCard from '@/components/home/EndCard'

// The Build: 아이디어(스케치) → 설계 → 완성된 빌드 → 다음 빌드 문의
export default function Home() {
  return (
    <main className={h.home} data-page="home">
      <Hero />
      <Build />
      <Work />
      <Services />
      <EndCard />
    </main>
  )
}
