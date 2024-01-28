function Card({ projectName }: { projectName: string }) {
  return (
    <>
      <div className="flex flex-col w-80 h-56 mx-6 my-4 px-6 py-4 border-2 border-gray-600 rounded-lg">
        <div className="w-full mt-2">
          <img
            src="https://optimism-agora-prod.agora-prod.workers.dev/static/media/ProjectPlaceholder.4224b1d8645af5053465c412b73a25a0.svg"
            alt="profile"
            width={60}
            height={60}
            className="rounded-xl"
          />
        </div>
        <div className="font-semibold mt-2">{projectName}</div>
        <div className="line-clamp-2 mt-2 text-sm">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod maiores
          praesentium exercitationem maxime iusto ad iure, neque eaque alias
          atque veniam et dolor minus, soluta quas corporis, architecto dolorum
          quasi!
        </div>
        <div className="flex flex-row mt-4 text-xs">
          <div className="bg-gray-200 px-3 py-1 rounded-xl mr-2">Tag 1</div>
          <div className="bg-gray-200 px-3 py-1 rounded-xl mr-2">Tag 2</div>
          <div className="bg-gray-200 px-3 py-1 rounded-xl mr-2">Tag 3</div>
        </div>
      </div>
    </>
  )
}
export default Card
