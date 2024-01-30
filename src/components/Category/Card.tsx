interface CardProps {
  categoryName: string
}
function Card({ categoryName }: CardProps) {

  return (
    <>
        <div className="card w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{categoryName}</h2>
          </div>
        </div>
    </>
  )
}

export default Card
