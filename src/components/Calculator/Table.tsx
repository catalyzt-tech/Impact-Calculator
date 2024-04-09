'use client'
import { WeightType } from '../../types/weight'
// import { ProjectType } from '../../types/project'
import { calculateAllocationTest } from '../../hooks/process'
import { ProjectType } from '../../types/project'
import { numberToString } from '../../hooks/format'
import { StatsType } from '../../types/stats'
import { useCallback, useEffect, useState } from 'react'

interface TableProp {
  selectedProject: ProjectType[]
  totalStats: StatsType[]
  weight: WeightType[]
}
const Table = ({ selectedProject, totalStats, weight }: TableProp) => {
  const opAllocation = 30000000
  const [loading, setLoading] = useState(true)
  const [allocation, setAllocation] = useState<any>([])
  // console.log(selectedProject, totalStats, weight)

  const calculateAllocation = useCallback(async () => {
    const result = await calculateAllocationTest(
      selectedProject,
      totalStats,
      opAllocation,
      weight
    )
    return result
  }, [selectedProject, totalStats, weight])

  useEffect(() => {
    const fetchData = async () => {
      const result = await calculateAllocation()
      setAllocation(result)
      setLoading(false)
    }
    fetchData()
  }, [calculateAllocation, selectedProject, totalStats, weight])

  const sum = allocation.reduce((acc: number, item: any) => {
    return acc + Number(item.amount)
  }, 0)
  // console.log('sum', sum)

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-sm text-black ">
              <th className="border-r bg-yellow-200">Project Name</th>
              <th className="bg-slate-100">In Ballot</th>
              {weight.map((item: WeightType, index: number) => (
                <th className="bg-slate-100" key={index}>
                  {item.metric}
                </th>
              ))}
              <th className="border-l flex bg-red-200">
                <span> Allocation </span>
                <span className="ml-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 500 500"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="250" cy="250" r="250" fill="#FF0420" />
                    <path
                      d="M177.133 316.446C162.247 316.446 150.051 312.943 140.544 305.938C131.162 298.808 126.471 288.676 126.471 275.541C126.471 272.789 126.784 269.411 127.409 265.408C129.036 256.402 131.35 245.581 134.352 232.947C142.858 198.547 164.812 181.347 200.213 181.347C209.845 181.347 218.476 182.973 226.107 186.225C233.738 189.352 239.742 194.106 244.12 200.486C248.498 206.74 250.688 214.246 250.688 223.002C250.688 225.629 250.375 228.944 249.749 232.947C247.873 244.08 245.621 254.901 242.994 265.408C238.616 282.546 231.048 295.368 220.29 303.874C209.532 312.255 195.147 316.446 177.133 316.446ZM179.76 289.426C186.766 289.426 192.707 287.362 197.586 283.234C202.59 279.106 206.155 272.789 208.281 264.283C211.158 252.524 213.348 242.266 214.849 233.51C215.349 230.883 215.599 228.194 215.599 225.441C215.599 214.058 209.657 208.366 197.774 208.366C190.768 208.366 184.764 210.43 179.76 214.558C174.882 218.687 171.379 225.004 169.253 233.51C167.001 241.891 164.749 252.149 162.498 264.283C161.997 266.784 161.747 269.411 161.747 272.163C161.747 283.672 167.752 289.426 179.76 289.426Z"
                      fill="white"
                    />
                    <path
                      d="M259.303 314.57C257.927 314.57 256.863 314.132 256.113 313.256C255.487 312.255 255.3 311.13 255.55 309.879L281.444 187.914C281.694 186.538 282.382 185.412 283.508 184.536C284.634 183.661 285.822 183.223 287.073 183.223H336.985C350.87 183.223 362.003 186.1 370.384 191.854C378.891 197.609 383.144 205.927 383.144 216.81C383.144 219.937 382.769 223.19 382.018 226.567C378.891 240.953 372.574 251.586 363.067 258.466C353.685 265.346 340.8 268.786 324.413 268.786H299.082L290.451 309.879C290.2 311.255 289.512 312.38 288.387 313.256C287.261 314.132 286.072 314.57 284.822 314.57H259.303ZM325.727 242.892C330.98 242.892 335.546 241.453 339.424 238.576C343.427 235.699 346.054 231.571 347.305 226.192C347.68 224.065 347.868 222.189 347.868 220.563C347.868 216.935 346.805 214.183 344.678 212.307C342.551 210.305 338.924 209.305 333.795 209.305H311.278L304.148 242.892H325.727Z"
                      fill="white"
                    />
                  </svg>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedProject.map((project: ProjectType, index: number) => {
              return (
                <tr
                  className="text-sm transition-all duration-300 ease-in-out even:bg-gray-50 hover:bg-gray-100"
                  key={project['Project ID']}
                >
                  <td className="flex flex-row items-center border-r py-3 bg-yellow-50 font-semibold min-w-64">
                    <img
                      src={
                        project['Profile'] !== ''
                          ? project['Profile']
                          : 'https://optimism-agora-prod.agora-prod.workers.dev/static/media/ProjectPlaceholder.4224b1d8645af5053465c412b73a25a0.svg'
                      }
                      alt="project icon"
                      className="w-9 h-9 rounded-lg border border-white bg-white "
                    />
                    <div className="ml-3 ">
                      <div>{project['Meta: Project Name']}</div>
                      <div className="text-xs opacity-60 font-light min-w-96 truncate text-wrap">
                        {project['Meta: Bio']}
                      </div>
                    </div>
                  </td>
                  <td className="py-2 font-normal">
                    {project['Result: # Ballots']}
                  </td>
                  {weight.map((item: WeightType, index: number) => (
                    <td className="py-2 font-normal" key={index}>
                      {/* {new Intl.NumberFormat('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(Number((project[item.metric] as number) || 0))} */}
                      {numberToString(
                        Number((project[item.metric] as number) || 0)
                      )}
                    </td>
                  ))}
                  <td className="border-l border-b bg-red-50 ">
                    <div className="w-full">
                      {loading
                        ? 'Loading ...'
                        : numberToString(
                            Number(
                              (allocation[index].amount * opAllocation) / sum ||
                                0
                            )
                          )}
                      {/* {console.log(allocation[index])} */}
                    </div>
                    {/* <div className="flex flex-row justify-end ml-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 500 500"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="250" cy="250" r="250" fill="#FF0420" />
                        <path
                          d="M177.133 316.446C162.247 316.446 150.051 312.943 140.544 305.938C131.162 298.808 126.471 288.676 126.471 275.541C126.471 272.789 126.784 269.411 127.409 265.408C129.036 256.402 131.35 245.581 134.352 232.947C142.858 198.547 164.812 181.347 200.213 181.347C209.845 181.347 218.476 182.973 226.107 186.225C233.738 189.352 239.742 194.106 244.12 200.486C248.498 206.74 250.688 214.246 250.688 223.002C250.688 225.629 250.375 228.944 249.749 232.947C247.873 244.08 245.621 254.901 242.994 265.408C238.616 282.546 231.048 295.368 220.29 303.874C209.532 312.255 195.147 316.446 177.133 316.446ZM179.76 289.426C186.766 289.426 192.707 287.362 197.586 283.234C202.59 279.106 206.155 272.789 208.281 264.283C211.158 252.524 213.348 242.266 214.849 233.51C215.349 230.883 215.599 228.194 215.599 225.441C215.599 214.058 209.657 208.366 197.774 208.366C190.768 208.366 184.764 210.43 179.76 214.558C174.882 218.687 171.379 225.004 169.253 233.51C167.001 241.891 164.749 252.149 162.498 264.283C161.997 266.784 161.747 269.411 161.747 272.163C161.747 283.672 167.752 289.426 179.76 289.426Z"
                          fill="white"
                        />
                        <path
                          d="M259.303 314.57C257.927 314.57 256.863 314.132 256.113 313.256C255.487 312.255 255.3 311.13 255.55 309.879L281.444 187.914C281.694 186.538 282.382 185.412 283.508 184.536C284.634 183.661 285.822 183.223 287.073 183.223H336.985C350.87 183.223 362.003 186.1 370.384 191.854C378.891 197.609 383.144 205.927 383.144 216.81C383.144 219.937 382.769 223.19 382.018 226.567C378.891 240.953 372.574 251.586 363.067 258.466C353.685 265.346 340.8 268.786 324.413 268.786H299.082L290.451 309.879C290.2 311.255 289.512 312.38 288.387 313.256C287.261 314.132 286.072 314.57 284.822 314.57H259.303ZM325.727 242.892C330.98 242.892 335.546 241.453 339.424 238.576C343.427 235.699 346.054 231.571 347.305 226.192C347.68 224.065 347.868 222.189 347.868 220.563C347.868 216.935 346.805 214.183 344.678 212.307C342.551 210.305 338.924 209.305 333.795 209.305H311.278L304.148 242.892H325.727Z"
                          fill="white"
                        />
                      </svg>
                    </div> */}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Table
