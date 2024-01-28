import { Link } from 'react-router-dom'

interface CardProps {
  categoryName: string
}
function Card({ categoryName }: CardProps) {
  return (
    <>
      <Link to="/">
        <div className="border-2 border-black  w-72 px-16 py-10 rounded-lg hover:bg-gray-100 transition ease-in-out duration-200">
          <h1 className="text-center">{categoryName}</h1>
        </div>
      </Link>
    </>
  )
}

export default Card
