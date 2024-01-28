// Layout.tsx
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
function Layout() {
  return (
    <>
      <div>
        <Navbar></Navbar>
      </div>
    </>
  )
}
export default Layout
