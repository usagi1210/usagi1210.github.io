import CursorEffect from '@/components/CursorEffect'
import LoaderWipe from '@/components/LoaderWipe'
import Spotlight from '@/components/Spotlight'
import Nav from '@/components/Nav'

export default function Home() {
  return (
    <main>
      <LoaderWipe />
      <CursorEffect />
      <Spotlight />
      <Nav />
    </main>
  )
}
