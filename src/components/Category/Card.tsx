interface CardProps {
  categoryName: string
}
function Card({ categoryName }: CardProps) {
  return (
    <>
      <div className="card w-96 shadow-xl hover:bg-slate-100">
        <div className="card-body">
          <h2 className="card-title flex-row justify-center text-center">
            {categoryName}
          </h2>
        </div>
      </div>
    </>
  )
}

export default Card
