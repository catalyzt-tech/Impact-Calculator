import { Link } from 'react-router-dom'
import { FC } from 'react'

const Home: FC = () => {
  return (
    <>
      <div className="hero h-[calc(100vh-11rem)]">
        <div className="hero-content flex-col lg:flex-row-reverse mx-40">
          <img src="img/sunny.svg" alt="pheonix" className="max-w-sm w-64" />
          <div>
            <h1 className="text-5xl font-bold">Impact Caculator</h1>
            <p className="font-normal py-6 lg:pr-12 w-[calc(100%-16rem)]">
              The Impact Calculator is designed to streamline the evaluation of
              projects in the Optimism RetroPGF voting process by quantifying
              their impact through various metrics.
            </p>
            <Link to="/category" className="mt-2 font-semibold">
              Enter site &rarr;
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
export default Home
