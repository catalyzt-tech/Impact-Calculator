import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Graph from '../components/Calculator/Graph'
import ImpactMetrices from '../components/Calculator/ImpactMetrics'
import Table from '../components/Calculator/Table'
import { WeightType } from '../types/weight'
import { ProjectType } from '../types/project'
import { everyProjectStatSum } from '../hooks/process'
import { StatsType } from '../types/stats'

const ImpactCalculator: FC = () => {
  const location = useLocation()
  const selectedProject: ProjectType[] = location.state?.selectedProject

  const [loading, setLoading] = useState(true)
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
    {
      metric: 'Funding: Governance Fund',
      value: 100,
    },
    {
      metric: 'Funding: RPGF2',
      value: 100,
    },
  ])

  const graphType = [
    { name: 'Pie Chart', value: 'pie' },
    { name: 'Column Chart', value: 'column' },
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
        <div className="col-span-3 border pt-10  overflow-hidden rounded-xl bg-white">
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
          <br />
          <Graph
            key={graphTypeSelected}
            selectedProject={osoData}
            totalStats={totalStats}
            weight={weight}
            graphTypeSelected={graphTypeSelected}
          />
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
