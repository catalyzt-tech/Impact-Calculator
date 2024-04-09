import { ChangeEvent, FC } from 'react'
import { MetricsType } from '../../types/metrics'

interface SearchProps {
  originData: MetricsType[]
  setData: (data: MetricsType[]) => void
}

const Search: FC<SearchProps> = ({ originData, setData }) => {
  const handleSearch = (query: string) => {
    const result = originData.filter((metric: MetricsType) => {
      return metric['metric'].toLowerCase().includes(query.toLowerCase())
    })
    setData(result)
  }

  return (
    <div>
      <div className="relative flex items-center my-6 ">
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
          placeholder="Search Metrics"
          className="px-4 py-2 border w-full border-slate-300 rounded-lg font-normal text-base"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleSearch(e.target.value)
          }
        />
      </div>
    </div>
  )
}

export default Search
