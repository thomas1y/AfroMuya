import { Briefcase, Users, Building } from 'lucide-react'

const HeroStats = () => {
  return (
    <div className='mt-14 ml-106 flex flex-col md:flex-row gap-8'>
        {/* Jobs Stat */}
        <div className='flex items-center gap-2'>
           <div className='bg-primary rounded-full p-4'>
              <Briefcase />
           </div>
           <div>
               <div>25,850</div>
               <div className='text-gray-100'>Jobs</div>
           </div>
        </div>

         {/* Candidates Stat */}
         <div className='flex items-center gap-2'>
            <div className='bg-primary rounded-full p-4'>
              <Users/>
            </div>
            <div>
              <div>10,250</div>
              <div className='text-gray-100'>Candidates</div>
            </div> 
         </div>

         {/* Companies Stat */}
         <div className='flex items-center gap-2'>
           <div className='bg-primary rounded-full p-4'>
             <Building />
           </div>
           <div>
            <div>18,400</div>
            <div className='text-gray-100'>campanies</div>
           </div>
         </div>
    </div>
  )
}

export default HeroStats