import { Hero } from "./_components/hero"
import { RecentWork } from "./_components/recent-work"

export default function Home() {
  return (
    <>
      <Hero />
      <div className="bg-background">
        <RecentWork />
      </div>
    </>
  )
}
