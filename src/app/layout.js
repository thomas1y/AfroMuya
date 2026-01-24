import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'
// Import Redux Provider
import ReduxProvider from '@/lib/redux/provider'

const Rootlayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
          {/* Wrap entire app with ReduxProvider */}
          <ReduxProvider>
            <Navbar/>
            {children}
            <Footer />
          </ReduxProvider>
        </body>
    </html>
  )
}

export default Rootlayout