import { FC, useEffect, useState, Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import Graph from '../components/Calculator/Graph'
import ImpactMetrices from '../components/Calculator/ImpactMetrics'
import Table from '../components/Calculator/Table'
import { WeightType } from '../types/weight'
import { ProjectType } from '../types/project'
import { everyProjectStatSum } from '../hooks/process'
import { StatsType } from '../types/stats'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const ImpactCalculator: FC = () => {
  const location = useLocation()
  const selectedProject: ProjectType[] = location.state?.selectedProject

  const [loading, setLoading] = useState(true)
  const [selectedCalculateMethod, setSelectedCalculateMethod] = useState(
    'Linear Wieghted Average'
  )
  const [totalStats, setTotalStats] = useState<StatsType>()
  const [osoData, setOsoData] = useState<ProjectType[]>([])
  const [graphTypeSelected, setGraphTypeSelected] = useState('pie')
  const [weight, setWeight] = useState<WeightType[]>([
    {
      metric: 'OSO: Total Contributors',
      value: 100,
    },
    {
      metric: 'OSO: Total Forks',
      value: 100,
    },
    {
      metric: 'OSO: Total Stars',
      value: 100,
    },
  ])

  const graphType = [
    { name: 'Pie Chart', value: 'pie' },
    { name: 'Column Chart', value: 'column' },
  ]
  const calculateImpactMethod = [
    'Linear Wieghted Average',
    'Logarithmic Weighted Average',
    'Percentile',
  ]
  useEffect(() => {
    const fetchData = async () => {
      const osoDataResponse = await fetch('/static/rpgf3_oso.json')
      const osoJson = await osoDataResponse.json()
      const realSelectedProject = selectedProject.map(
        (project: ProjectType) => {
          return osoJson.find((osoProject: ProjectType) => {
            return (
              osoProject['Meta: Project Name'] === project['Meta: Project Name']
            )
          })
        }
      )
      // console.log('realSelectedProject', realSelectedProject)
      const updatedStatsSum = everyProjectStatSum(realSelectedProject)

      setOsoData(realSelectedProject)
      setTotalStats(updatedStatsSum as StatsType)
      setLoading(false)
    }
    fetchData()
  }, [selectedProject])

  if (loading === true)
    return (
      <div className="flex flex-row justify-center items-center text-xl font-medium h-[calc(100vh-10em)]">
        Loading ...
      </div>
    )

  return (
    <div className=" px-10">
      <h1 className="text-center font-bold text-3xl py-8">Impact Calculator</h1>
      <div className="grid grid-cols-4 gap-3  ">
        <div className="col-span-3  border pt-10  overflow-hidden rounded-xl bg-white">
          <div className="flex justify-center gap-x-6">
            {graphType.map((item, index) => (
              <button
                key={index}
                className={`${
                  graphTypeSelected == item.value
                    ? 'bg-[#ff0420] text-white '
                    : 'text-[#ff0420]  bg-white '
                } px-7 py-2  rounded-lg border border-[#ff0420] transition-all duration-300 ease-in-out`}
                value={item.value}
                onClick={() => setGraphTypeSelected(item.value)}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className=" w-full text-right z-50 ">
            <Menu
              as="div"
              className="relative right-5 top-[-2.5rem] inline-block text-left z-3"
            >
              <div>
                <Menu.Button className="z-50 inline-flex w-full justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                  {selectedCalculateMethod}
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5 text-black hover:text-violet-100"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-200"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="z-50 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="p-3 ">
                    {calculateImpactMethod.map((eachMethod, index) => (
                      <Menu.Item key={index}>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? 'bg-[#ff0420] text-white'
                                : 'text-gray-900'
                            } group text-left flex w-full rounded-md px-4 py-2 text-sm`}
                            onClick={() =>
                              setSelectedCalculateMethod(eachMethod)
                            }
                          >
                            {eachMethod}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          {/* <button className="absolute right-9">Calculate Method</button> */}

          <br />
          <div className="z-0">
            <Graph
              key={graphTypeSelected}
              selectedProject={osoData}
              totalStats={totalStats}
              weight={weight}
              graphTypeSelected={graphTypeSelected}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center py-5  border  overflow-hidden rounded-xl bg-white w-full">
          <ImpactMetrices weightData={weight} setWeight={setWeight} />
        </div>
        <div className="col-span-4 border overflow-hidden rounded-xl bg-white">
          <Table
            key={osoData}
            selectedProject={osoData}
            totalStats={totalStats}
            weight={weight}
          />
        </div>
      </div>
    </div>
  )
}
export default ImpactCalculator
