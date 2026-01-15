import Image from 'next/image'

const CompanyLogos = () => {
  const logos = [
    { 
      src: '/images/companies/spotify.jpg', 
      alt: 'Spotify', 
      width: 120,  // REQUIRED
      height: 40   // REQUIRED
    },
    { 
      src: '/images/companies/amazon.png', 
      alt: 'Amazon', 
      width: 120, 
      height: 40 
    },
    { 
      src: '/images/companies/Sprint.png', 
      alt: 'Sprint', 
      width: 120, 
      height: 40 
    },
    { 
      src: '/images/companies/Samsung.png', 
      alt: 'Samsung', 
      width: 120, 
      height: 40 
    },
    { 
      src: '/images/companies/flowbite.png', 
      alt: 'Flowwbite', 
      width: 120, 
      height: 40 
    },
  ]
  
  return (
    <div className="bg-black py-2">
      <div className="max-w-[1296px] mx-auto px-20">
        
        
        
      
        <div className="flex justify-between items-center">
          {logos.map((logo, index) => (
            <div 
              key={index} 
              className="h-20 w-28 flex items-center justify-center p-4"
            >
              <Image 
                src={logo.src}
                alt={logo.alt}
                width={logo.width}      // REQUIRED
                height={logo.height}    // REQUIRED
                className="object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
        
      </div>
    </div>
  )
}

export default CompanyLogos