import SplitHero from '@/components/reel/SplitHero'
import StatsStrip from '@/components/reel/StatsStrip'
import ColumnRun from '@/components/reel/ColumnRun'
import BuildList from '@/components/reel/BuildList'
import TeachMosaic from '@/components/reel/TeachMosaic'
import TechMarquee from '@/components/reel/TechMarquee'
import EndCard from '@/components/reel/EndCard'

export default function Home() {
  return (
    <main>
      <SplitHero />
      <StatsStrip />
      <ColumnRun />
      <BuildList />
      <TeachMosaic />
      <TechMarquee />
      <EndCard />
    </main>
  )
}
