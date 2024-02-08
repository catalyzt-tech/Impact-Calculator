import { ChangeEvent, FC } from 'react'
import { Project } from '../types/project'

interface SearchProps {
  originData: Project[]
  setData: (data: Project[]) => void
}

const Search: FC<SearchProps> = ({ originData, setData }) => {
  const handleSearch = (query: string) => {
    const result = originData.filter((project: Project) => {
      return project['Meta: Project Name']
        .toLowerCase()
        .includes(query.toLowerCase())
    })
    setData(result)
  }

  return (
    <>
      <div className="relative flex items-center my-20 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="absolute right-2 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search here"
          className="input input-bordered w-[15rem] md:w-[25rem]"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleSearch(e.target.value)
          }
        />
      </div>
    </>
  )
}

export default Search
