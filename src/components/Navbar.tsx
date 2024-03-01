import { FC } from 'react'
import { Link } from 'react-router-dom'

const Navbar: FC = () => {
  return (
    <div className="navbar bg-base-100 h-20">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] shadow bg-base-100 rounded-box w-52 "
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/category">Browse</Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="ml-6 font-semibold text-xs  ">
          <div className="flex flex-row items-center">
            <img src="img/retropgfhub2.svg" alt="catalyzt" className="w-44" />
            {/* <div className="opacity-100 text-xl font-thin">| </div>
            <img
              src="img/optimism_text_logo.svg"
              alt="op_logo"
              className="w-32 ml-4"
            /> */}
          </div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-x-4 font-medium opacity-60">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/category">Browse</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">{/* <a className="btn">Sign In</a> */}</div>
    </div>
  )
}

export default Navbar
