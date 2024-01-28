// Navbar.js
import { Link, Outlet } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <nav>
        <ul className="flex flex-row space-x-6 justify-center mt-6 h-10">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/category">Category</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
}

export default Navbar
