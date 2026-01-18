//import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/home/HeroSection'
import CampanyLogos from '@/components/home/CampanyLogos'
import FeaturedJobs from '@/components/home/FeaturedJobs'
import JobCategories from '@/components/home/JobCategories'
import HowItWorks from '@/components/home/HowItWorks'
import Testimonials from '@/components/home/Testimonials'
import CallToAction from '@/components/home/CallToAction'


export default function Home() {
  return (
    <main>
      {/* This div wraps BOTH navbar and hero section with background */}
      <div 
        className=" min-h-screen bg-cover bg-center bg-fixed bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.85)), url('/images/hero-bg.jpg')`
        }}
      >
        
        
        {/* Hero Section (will have the background behind it) */}
        <div className="hero-area min-h-screen">
          <HeroSection />
        </div>
      </div>
      
      {/* Rest of homepage WITHOUT background */}
      <div className="bg-white">
        <CampanyLogos />
      </div>

      <div>
        <FeaturedJobs />
      </div>
        <JobCategories />
        <HowItWorks />
        <Testimonials />
        <CallToAction />
    </main>
  )
}