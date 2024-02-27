import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useCallback, useEffect, useState, useRef } from 'react'

const calculateProjectAllocation = (
  project,
  totalStats,
  opAllocation,
  weight
) => {
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
            (project['OSO: Total Forks'] / totalStats['Total Forks']) *
              weight[1]
          )
        : 0,
    'Total Stars':
      totalStats['Total Stars'] !== 0
        ? Number(
            (project['OSO: Total Stars'] / totalStats['Total Stars']) *
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
            (project['Funding: RPGF2'] / totalStats['Funding: RPGF2']) *
              weight[4]
          )
        : 0,
  }
  const totalAllocation =
    allocation['Total Contributors'] +
    allocation['Total Forks'] +
    allocation['Total Stars'] +
    allocation['Funding: Governance Fund'] +
    allocation['Funding: RPGF2']
  return {
    project: project['Meta: Project Name'],
    amount: ((totalAllocation * opAllocation) / 100).toFixed(2),
  }
}

const TempGraph = ({ selectedProject, totalStats, weight }) => {
  const [options, setOptions] = useState({})
  const [allocationAmount, setAllocationAmount] = useState([])
  const [projectName, setProjectName] = useState([])

  const calculateAllocation = useCallback(async () => {
    const opAllocation = 30000000
    return selectedProject.map((project) =>
      calculateProjectAllocation(project, totalStats, opAllocation, weight)
    )
  }, [selectedProject, totalStats, weight]) // Include weight in dependencies

  const transformData = useCallback((allocationResult) => {
    const sortedAllocation = allocationResult
      .sort((a, b) => Number(b.amount) - Number(a.amount))
      .filter((project) => Number(project.amount) > 0)
    const projectName = sortedAllocation.map((project) => project.project)
    const amount = sortedAllocation.map((project) => Number(project.amount))
    setAllocationAmount(amount)
    setProjectName(projectName)
  }, [])

  useEffect(() => {
    setOptions({
      chart: {
        type: 'column',
        height: 500,
      },
      title: {
        text: 'OP Allocation by Project',
      },
      subtitle: {
        text: '',
      },
      xAxis: {
        categories: projectName,
        labels: {
          style: {
            fontSize: '10px',
          },
        },
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'OP Allocation',
        },
      },
      colors: ['#FF0000'],
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.2f} OP</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0,
          borderWidth: 0,
          groupPadding: 0,
          shadow: false,
        },
      },
      series: [
        {
          type: 'column',
          name: 'Amount',
          data: allocationAmount,
        },
      ],
    })
  }, [allocationAmount, projectName])

  useEffect(() => {
    calculateAllocation().then(transformData)
  }, [calculateAllocation, transformData])

  return (
    <div>
      <div className="px-2">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
      <div className="text-center mt-4"></div>
    </div>
  )
}

export default TempGraph
