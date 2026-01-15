//import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
//import { Children } from 'react'
import './globals.css'
const Rootlayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
          
          {children}
          <Footer />
        </body>
    </html>
  )
}

export default Rootlayout