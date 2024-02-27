import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Graph from '../components/ImpactCatalyst/Graph'
import ImpactMetrices from '../components/ImpactCatalyst/ImpactMetrics'
import Table from '../components/ImpactCatalyst/Table'
import { WeightType } from '../types/ImpactMetric'
import { ProjectType } from '../types/project'
import { everyProjectStatSum } from '../hooks/process'

const ImpactCalculator: FC = () => {
  const location = useLocation()
  const selectedProject: ProjectType[] = location.state?.selectedProject

  const [loading, setLoading] = useState(true)
  const [totalStats, setTotalStats] = useState<Partial<ProjectType>>()
  const [osoData, setOsoData] = useState<ProjectType[]>([])
  const [weight, setWeight] = useState<WeightType[]>([
    {
      metric: "OSO: Total Contributors",
      value: 20,
    },
    {
      metric: "OSO: Total Forks",
      value: 20,
    },
    {
      metric: "OSS: Total Stars",
      value: 20,
    }
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
      const updatedStatsSum = everyProjectStatSum(osoJson)

      setOsoData(osoJson)
      setTotalStats(updatedStatsSum as Partial<ProjectType>)
      setLoading(false)
    }
    fetchData()
  }, [selectedProject])

  if (loading === true) return <div>Loading...</div>

  return (
    <>
      <h1 className="text-center font-bold text-2xl my-8">Impact Calculator</h1>
      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-3 border pt-10">
          <Graph
            selectedProject={osoData}
            totalStats={totalStats}
            weight={weight}
          />
        </div>
        <div className="flex flex-col justify-center border ">
          <ImpactMetrices weightData={weight} setWeight={setWeight} />
        </div>
        <div className="col-span-4 border">
          <Table
            selectedProject={osoData}
            totalStats={totalStats}
            weight={weight}
          />
        </div>
      </div>
    </>
  )
}
export default ImpactCalculator
