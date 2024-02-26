import Card from '../components/Category/Card'
import { FC } from 'react'
import { Link } from 'react-router-dom'

const Category: FC = () => {
  const categoryList: string[] = [
    'OP Stack',
    'Developer Ecosystem',
    'Collective Governance',
    'End User Experience and Adoption',
  ]
  return (
    <>
      <h1 className="text-center font-bold text-3xl my-10">Category</h1>
      <div className="flex flex-col items-center justify-center">
        {categoryList.map((categoryName, index) => (
          <Link
            key={index}
            to={categoryName.replace(/ /g, '-').toLowerCase()}
            state={{ category: categoryName }}
          >
            <div className="mt-6">
              <Card categoryName={categoryName} />
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
export default Category
