import { Link } from 'react-router-dom'
function Home() {
  return (
    <>
      <div className=" flex flex-col justify-center  items-center h-[calc(100vh-64px)]">
        <div className="text-2xl font-bold">Impact Calculator</div>
        <Link to="/Category" className="mt-2">
          Enter site
        </Link>
      </div>
    </>
  )
}
export default Home
