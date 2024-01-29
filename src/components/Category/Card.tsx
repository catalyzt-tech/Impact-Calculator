import { Link } from 'react-router-dom'

interface CardProps {
  categoryName: string
}
function Card({ categoryName }: CardProps) {
  const saveCategory = () => {
    localStorage.setItem('category', categoryName)
    if (localStorage.getItem('projectselection')) {
      localStorage.removeItem('projectselection')
    }
  }
  return (
    <>
      <Link to="/projectselection">
        <div className="border-2 border-black  w-72 px-16 py-10 rounded-lg hover:bg-gray-100 transition ease-in-out duration-200">
          <h1 className="text-center" onClick={saveCategory}>
            {categoryName}
          </h1>
        </div>
      </Link>
    </>
  )
}

export default Card
