import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Graph from '../components/ImpactCatalyst/Graph'
import ImpactMetrices from '../components/ImpactCatalyst/ImpactMetrics'
import Table from '../components/ImpactCatalyst/Table'
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

  if (loading === true) return <div>Loading...</div>

  return (
    <div className=" px-10">
      <h1 className="text-center font-bold text-3xl py-8">Impact Calculator</h1>
      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-3 border pt-10  overflow-hidden rounded-xl bg-white">
          <div className="flex justify-center gap-x-6">
            {graphType.map((item, index) => (
              <button
                key={index}
                className="px-4 py-2 mb-3 rounded-md bg-white border border-black text-black"
                value={item.value}
                onClick={() => setGraphTypeSelected(item.value)}
              >
                {item.name}
              </button>
            ))}
          </div>
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
