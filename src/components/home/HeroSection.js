import HeroContent from './HeroContent'
import HeroSearch from './HeroSearch'
import HeroStats from './HeroStats'

const HeroSection = () => {
  return (
    <section>
      <div className="max-w-[1296px] mx-auto">
        <HeroContent />
        <HeroSearch />
        <HeroStats />
      </div>
    </section>
  )
}

export default HeroSection