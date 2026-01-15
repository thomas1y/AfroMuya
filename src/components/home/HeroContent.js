import HeroSearch from './HeroSearch'
import HeroStats from './HeroStats'

const HeroContent = () => {
  return (
    <div className='text-white items-center'>
       <div className='mb-10 items-center mt-18 ml-82'>
          <h1 className='text-5xl font-bold items-center mb-3'>
            Find your Dream Job Today!
          </h1>
          <p className='text-gray-50 ml-18'>
            Connecting talent with Opportunity. Your Gateway to Career Success.
          </p>
       </div>

       <div>
        <HeroSearch />
       </div>

       <div>
         <HeroStats />
       </div>
    </div>
  )
}

export default HeroContent