const Navbar = () => {
  return (
    <nav className="h-20">
      <div className="max-w-[1296px] mx-auto px-20 h-full"> {/* Added missing " */}
        <div className="flex items-center justify-between py-3">
          <div className="items-center">
         
            <span className="text-2xl font-bold text-gray-100">JobPortal</span>
          </div>

          {/* Navigation Menu */}
          <div className="flex items-center space-x-8">
            <a href="/home" className="text-gray-100 hover:text-gray-200 font-medium text-base">Home</a>
            <a href="/jobs" className="text-gray-100 hover:text-gray-200 font-medium text-base">Jobs</a>
            <a href="/about us" className="text-gray-100 hover:text-gray-200 font-medium text-base">About Us</a>
            <a href="/contact us" className="text-gray-100 hover:text-gray-200 font-medium text-base">Contact Us</a>
          </div>

          <div className="flex items-center space-x-6">
            <button className="text-gray-100 text-base font-medium">Login</button>
            <button className='bg-primary text-gray-100 font-medium px-6 py-2 rounded-lg hover:bg-primary-dark'>Register</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

