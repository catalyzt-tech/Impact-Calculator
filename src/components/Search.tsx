import { ChangeEvent, FC } from 'react'
import { ProjectType } from '../types/project'

interface SearchProps {
  originData: ProjectType[]
  setData: (data: ProjectType[]) => void
}

const Search: FC<SearchProps> = ({ originData, setData }) => {
  const handleSearch = (query: string) => {
    const result = originData.filter((project: ProjectType) => {
      return project['Meta: Project Name']
        .toLowerCase()
        .includes(query.toLowerCase())
    })
    setData(result)
  }

  return (
    <div>
      <div className="relative flex items-center my-10 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="absolute right-4 w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search Project"
          className="px-6 py-2 border w-72 border-slate-300 rounded-lg font-normal text-base md:w-[28rem]"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleSearch(e.target.value)
          }
        />
      </div>
    </div>
  )
}

export default Search
