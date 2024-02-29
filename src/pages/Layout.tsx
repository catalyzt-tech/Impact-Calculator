import { FC } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
const Layout: FC = () => {
  return (
    <>
      <div className="mx-16">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}
export default Layout
