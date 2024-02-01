import { Link } from 'react-router-dom'
import { FC } from 'react'

const Home: FC = () => {
  return (
    <>
        <div className="hero h-[calc(100vh-5rem)]">
          <div className="hero-content flex-col lg:flex-row-reverse mx-40">
            <img src="/img/rocket-min.png" className="max-w-sm" />
            <div>
              <h1 className="text-5xl font-bold">Impact Catalyzt</h1>
              <p className="py-6 lg:pr-12">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
              <Link to="/category" className="mt-2">
                Enter site
              </Link>
            </div>
          </div>
        </div>
    </>
  )
}
export default Home
