import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Graph from '../components/ImpactCatalyst/Graph'
import ImpactVector from '../components/ImpactCatalyst/ImpactVector'
import Table from '../components/ImpactCatalyst/Table'
import { Project, TotalStats } from '../types/impactCalculator'

const ImpactCalculator: FC = () => {
  const location = useLocation()
  const selectedProject: Project[] = location.state?.selectedProject || []
  const [loading, setLoading] = useState(true)
  const [weight, setWeight] = useState([20, 20, 20, 20, 20])
  const [totalStats, setTotalStats] = useState<TotalStats>({
    'Total Contributors': 0,
    'Total Forks': 0,
    'Total Stars': 0,
    'Funding: Governance Fund': 0,
    'Funding: RPGF2': 0,
  })
  const [osoData, setOsoData] = useState<Project[]>([])
  const [filterDataSet, setFilterDataSet] = useState<Project[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const osoDataResponse = await fetch('/static/rpgf3_oso.json')
      const osoJson = await osoDataResponse.json()

      const updatedStats: TotalStats = osoJson.reduce(
        (acc, project) => {
          const contributors = Number(project['OSO: Total Contributors'])
          const forks = Number(project['OSO: Total Forks'])
          const stars = Number(project['OSO: Total Stars'])
          const governanceFund = Number(project['Funding: Partner Fund'])
          const rpgf2 = Number(project['Funding: RPGF2'])
          return {
            'Total Contributors': acc['Total Contributors'] + contributors,
            'Total Forks': acc['Total Forks'] + forks,
            'Total Stars': acc['Total Stars'] + stars,
            'Funding: Governance Fund':
              acc['Funding: Governance Fund'] + governanceFund,
            'Funding: RPGF2': acc['Funding: RPGF2'] + rpgf2,
          }
        },
        {
          'Total Contributors': 0,
          'Total Forks': 0,
          'Total Stars': 0,
          'Funding: Governance Fund': 0,
          'Funding: RPGF2': 0,
        }
      )

      const filter = osoJson //Assume select all project

      setOsoData(osoJson)
      setTotalStats(updatedStats)
      setFilterDataSet(filter)
      setLoading(false)
    }
    fetchData()
  }, [selectedProject])

  const filterData = async () => {
    // const filter = await osoData.filter((project: Project) => {
    //   return selectedProject.some(
    //     (selected: any) => selected === project['Meta: Project Name']
    //   )
    // })
    const filter = await osoData //Assume select all project
    console.log('filterDataSet')
    console.log(filterDataSet)
    await setFilterDataSet(filter)
  }
  useEffect(() => {
    if (osoData.length > 0 && selectedProject.length > 0) {
      filterData()
    }
  }, [osoData, selectedProject, filterData])

  if (loading === true) return <div>Loading...</div>

  return (
    <>
      <h1 className="text-center font-bold text-2xl my-8">Impact Calculator</h1>
      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-3 border pt-10">
          {!loading ? (
            <Graph
              selectedProject={filterDataSet}
              totalStats={totalStats}
              weight={weight}
            />
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="flex flex-col justify-center border ">
          <ImpactVector weightData={weight} weightHandler={setWeight} />
        </div>
        <div className="col-span-4 border">
          {!loading ? (
            <Table
              selectedProject={filterDataSet}
              totalStats={totalStats}
              weight={weight}
            />
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </>
  )
}
export default ImpactCalculator
