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
    <div className="flex flex-col h-[calc(100vh-12.5em)] ">
      <h1 className="text-center font-bold text-3xl mt-10">Category</h1>
      <div className="flex flex-cols justify-center items-center h-screen">
        <div className="grid grid-cols-2 items-center justify-center justify-items-center lg:mx-64 gap-10">
          {categoryList.map((categoryName, index) => (
            <Link
              key={index}
              to={categoryName.replace(/ /g, '-').toLowerCase()}
              state={{ category: categoryName }}
              className="w-full"
            >
              <div>
                <Card categoryName={categoryName} />
              </div>
            </Link>
          ))}
        </div>
        {/* <div className="flex flex-grow"></div> */}
      </div>
    </div>
  )
}
export default Category
