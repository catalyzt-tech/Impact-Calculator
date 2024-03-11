interface CardProps {
  categoryName: string
}
function Card({ categoryName }: CardProps) {
  return (
    <>
      <div className="card w-full  h-40 border-black border hover:bg-[#ff0420] hover:border-[#ff0420] hover:text-white transition ease-in-out duration-500">
        <div className="card-body  flex flex-row  justify-center items-center">
          <h2 className="card-title text-center">{categoryName}</h2>
        </div>
      </div>
    </>
  )
}

export default Card
