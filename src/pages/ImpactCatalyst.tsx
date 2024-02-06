import { FC, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ImpactMetric from '../components/ImpactCatalyst/ImpactMetric'
import { Project } from '../types/project'

interface TotalStats {
  'Total Contributors': number
  'Total Forks': number
  'Total Stars': number
  'Funding: Governance Fund': number
  'Funding: RPGF2': number
}

const ImpactCalculator: FC = () => {
  const location = useLocation()
  const selectedProject: Project[] = location.state?.selectedProject || []
  const opAllocation: number = 10000000
  const [loading, setLoading] = useState(true)
  const [weight, setWeight] = useState([20, 20, 20, 20, 20])
  const [totalStats, setTotalStats] = useState<TotalStats>({
    'Total Contributors': 0,
    'Total Forks': 0,
    'Total Stars': 0,
    'Funding: Governance Fund': 0,
    'Funding: RPGF2': 0,
  })

  useEffect(() => {
    selectedProject.map((project: Project) => {
      console.log(project)
      totalStats['Total Contributors'] += Number(
        project['OSO: Total Contributors']
      )
      totalStats['Total Forks'] += Number(project['OSO: Total Forks'])
      totalStats['Total Stars'] += Number(project['OSO: Total Stars'])
      totalStats['Funding: Governance Fund'] += Number(
        project['Funding: Partner Fund']
      )
      totalStats['Funding: RPGF2'] += Number(project['Funding: RPGF2'])
    })
    setLoading(false)
  }, [selectedProject, totalStats])

  if (loading === true) return <div>Loading...</div>

  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-20">
        Impact Calculator
      </h1>
      <div className="flex flex-row justify-center mb-10">
        <ImpactMetric weightData={weight} weightHandler={setWeight} />

        <div className="overflow-x-auto mx-20">
          <table className="table">
            <thead>
              <tr className="text-base   font-bold text-black">
                <th>Project Name</th>
                <th>Total Contributors</th>
                <th>Total Forks</th>
                <th>Total Stars</th>
                <th>Funding: Governance Fund</th>
                <th>Funding: RPGF2</th>
                <th>Allocation</th>
              </tr>
            </thead>
            <tbody>
              {selectedProject.map((project: Project) => {
                const allocation = {
                  'Total Contributors':
                    totalStats['Total Contributors'] !== 0
                      ? Number(
                          (project['OSO: Total Contributors'] /
                            totalStats['Total Contributors']) *
                            weight[0]
                        )
                      : 0,
                  'Total Forks':
                    totalStats['Total Forks'] !== 0
                      ? Number(
                          (project['OSO: Total Forks'] /
                            totalStats['Total Forks']) *
                            weight[1]
                        )
                      : 0,
                  'Total Stars':
                    totalStats['Total Stars'] !== 0
                      ? Number(
                          (project['OSO: Total Stars'] /
                            totalStats['Total Stars']) *
                            weight[2]
                        )
                      : 0,
                  'Funding: Governance Fund':
                    totalStats['Funding: Governance Fund'] !== 0
                      ? Number(
                          (project['Funding: Partner Fund'] /
                            totalStats['Funding: Governance Fund']) *
                            weight[3]
                        )
                      : 0,
                  'Funding: RPGF2':
                    totalStats['Funding: RPGF2'] !== 0
                      ? Number(
                          (project['Funding: RPGF2'] /
                            totalStats['Funding: RPGF2']) *
                            weight[4]
                        )
                      : 0,
                }
                const result =
                  allocation['Total Contributors'] +
                  allocation['Total Forks'] +
                  allocation['Total Stars'] +
                  allocation['Funding: Governance Fund'] +
                  allocation['Funding: RPGF2']
                return (
                  <tr key={project['Project ID']}>
                    {/* <th>{project['Project ID']}</th> */}
                    <td>{project['Meta: Project Name']}</td>
                    <td>{project['OSO: Total Contributors']}</td>
                    <td>{project['OSO: Total Forks']}</td>
                    <td>{project['OSO: Total Stars']}</td>
                    <td>{project['Funding: Partner Fund']}</td>
                    <td>{project['Funding: RPGF2']}</td>
                    <td>
                      {((result * opAllocation) / 100).toLocaleString()} OP
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default ImpactCalculator
