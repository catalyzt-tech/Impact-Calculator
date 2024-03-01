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
  // TODO: change weight scheme =>
  // {
  //   "Total Contributors": 0,
  //   "Total Forks": 0,
  //   "Total Stars": 0,
  //   "Funding: Governance Fund": 0,
  //   "Funding: RPGF2": 0,
  // }

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
      console.log('realSelectedProject', realSelectedProject)
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
          <Graph
            selectedProject={osoData}
            totalStats={totalStats}
            weight={weight}
          />
        </div>
        <div className="flex flex-col justify-center border  overflow-hidden rounded-xl bg-white">
          <ImpactMetrices weightData={weight} setWeight={setWeight} />
        </div>
        <div className="col-span-4 border overflow-hidden rounded-xl bg-white">
          <Table
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
