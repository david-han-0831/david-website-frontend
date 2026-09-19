import Stage from '@/components/stage/Stage'
import GlassHero from '@/components/reel/GlassHero'
import StatsStrip from '@/components/reel/StatsStrip'
import Showreel from '@/components/reel/Showreel'
import ColumnRun from '@/components/reel/ColumnRun'
import BuildList from '@/components/reel/BuildList'
import LiveLab from '@/components/reel/LiveLab'
import TeachMosaic from '@/components/reel/TeachMosaic'
import Patents from '@/components/reel/Patents'
import TechMarquee from '@/components/reel/TechMarquee'
import EndCard from '@/components/reel/EndCard'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <Stage />
      <main data-reel className={styles.main}>
        <GlassHero />
        <StatsStrip />
        <Showreel />
        <ColumnRun />
        <BuildList />
        <LiveLab />
        <TeachMosaic />
        <Patents />
        <TechMarquee />
        <EndCard />
      </main>
    </>
  )
}
