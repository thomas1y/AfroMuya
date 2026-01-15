import { Search } from 'lucide-react'

const HeroSearch = () => {
  return (
    <div className='text-black w-full justify-center ml-86'>
        <div className='w-full max-w-[580px] rounded-lg' >
             <form className='rounded-lg'>
                <div className=' flex flex-col md:flex-row items-center'>
                      <div className= 'flex items-center bg-white gap-2 rounded-l-lg'>
                          <div className='flex-1 w-full '>
                            <input  
                            type='text'
                            placeholder='job title or company'
                            className='p-3 rounded-lg border border-gray-50'
                            />
                          </div>

                    <div className=''>
                        <select>
                            <option value=''>Search Location</option>
                            <option value='remote'> Remote</option>
                            <option value='onsite'>Onsite</option>
                            <option value='hybrid'> Hybrid</option>
                        </select>

                   </div>

                  <div>
                        <select>
                            <option value=''>Select Category</option>
                            <option value='tech'> Technology</option>
                            <option value='finanace'>Finance</option>
                            <option value='healthcare'> Healthcare</option>
                        </select>
                 </div>
                      </div>
                      
            <button 
            type='submit' 
            className='flex items-center p-0.5 bg-primary rounded-r-lg'>
                <Search />
                <span>Search Jobs</span>
            </button>
                </div>
            
           </form>
        </div>
        
    </div>
  )
}

export default HeroSearch