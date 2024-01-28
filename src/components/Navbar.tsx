// Navbar.js
import { Link, Outlet } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <nav>
        <ul className="flex flex-row space-x-6 justify-center mt-6">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/">Back to main</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
}

export default Navbar
