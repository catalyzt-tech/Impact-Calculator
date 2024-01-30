import { FC, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ImpactMetric from '../components/ImpactCalculator/ImpactMetric'
import { Project } from '../types/project'
const ImpactCalculator: FC = () => {
  const location = useLocation()
  const selectedProject: Project = location.state?.selectedProject
  const opAllocation: number = 10000000
  let [loading, setLoading] = useState(true)
  let totalStats: object = {
    'Total Contributors': 0,
    'Total Forks': 0,
    'Total Stars': 0,
    'Funding: Governance Fund': 0,
    'Funding: RPGF2': 0,
  }
  const start = async () => {
    await selectedProject.map((project) => {
      totalStats['Total Contributors'] += project['OSO: Total Contributors']
      totalStats['Total Forks'] += project['OSO: Total Forks']
      totalStats['Total Stars'] += project['OSO: Total Stars']
      totalStats['Funding: Governance Fund'] += project['Funding: Partner Fund']
      totalStats['Funding: RPGF2'] += project['Funding: RPGF2']
    })
    await setLoading(false)
    console.log(totalStats)
  }
  start()
  if (loading) return <div>Loading...</div>
  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-20">
        Impact Calculator
      </h1>
      <div className="flex flex-row justify-center mb-10">
        <ImpactMetric />
      </div>
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
                  (project['OSO: Total Contributors'] /
                    totalStats['Total Contributors']) *
                    20 || 0,
                'Total Forks':
                  (project['OSO: Total Forks'] / totalStats['Total Forks']) *
                    20 || 0,
                'Total Stars':
                  (project['OSO: Total Stars'] / totalStats['Total Stars']) *
                    20 || 0,
                'Funding: Governance Fund':
                  (project['Funding: Partner Fund'] /
                    totalStats['Funding: Governance Fund']) *
                    20 || 0,
                'Funding: RPGF2':
                  (project['Funding: RPGF2'] / totalStats['Funding: RPGF2']) *
                    20 || 0,
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
                    {((result * opAllocation) / 100)
                      .toFixed(2)
                      .toLocaleString()}{' '}
                    OP
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
export default ImpactCalculator
