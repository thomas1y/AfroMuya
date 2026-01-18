import HeroSearch from './HeroSearch'
import HeroStats from './HeroStats'

const HeroContent = () => {
  return (
    <div className="text-white pt-12 md:pt-20 pb-16">
      <div className="max-w-[1296px] mx-auto px-4 md:px-8 lg:px-12 xl:px-20">
        
        {/* Main Heading - More Impactful */}
        <div className="max-w-3xl mx-auto text-center mb-2 py-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Find Your 
            <span className="bg-gradient-to-r from-[#44a095] to-[#4aa89d] bg-clip-text text-transparent"> Dream Job</span> 
            Faster
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Connect with top employers and discover opportunities that match your skills and ambitions
          </p>
        </div>

      </div>
    </div>
  )
}

export default HeroContent