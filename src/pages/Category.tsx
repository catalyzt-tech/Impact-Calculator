import Card from '../components/Category/Card'
import React from 'react'

const Category: React.FC = () =>{
  const categoryList: string[] = [
    'OP Stack',
    'Developer Ecosystem',
    'Collective Governance',
    'End User Experience and Adoption',
  ]
  return (
    <>
      <h1 className="text-center font-bold text-3xl my-20">Category</h1>
      <div className="flex flex-col items-center justify-center">
        {categoryList.map((categoryName) => (
          <div className="mt-6">
            <Card categoryName={categoryName} />
          </div>
        ))}
      </div>
    </>
  )
}
export default Category
