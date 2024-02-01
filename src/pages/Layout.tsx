import { FC } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
const Layout: FC = () => {
  return (
    <>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </>
  )
}
export default Layout
