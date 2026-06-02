import CursorEffect from '@/components/CursorEffect'
import LoaderWipe from '@/components/LoaderWipe'
import Spotlight from '@/components/Spotlight'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import StatsRow from '@/components/StatsRow'
import Marquee from '@/components/Marquee'

export default function Home() {
  return (
    <main>
      <LoaderWipe />
      <CursorEffect />
      <Spotlight />
      <Nav />
      <Hero />
      <StatsRow />
      <Marquee />
    </main>
  )
}
