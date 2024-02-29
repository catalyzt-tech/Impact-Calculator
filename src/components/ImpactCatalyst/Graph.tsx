import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useCallback, useEffect, useState } from 'react'
import { calculateAllocationTest } from '../../hooks/process'

interface allocationResultType {
  project: string
  amount: string
}
const TempGraph = ({ selectedProject, totalStats, weight }) => {
  const [options, setOptions] = useState({})
  const [allocationAmount, setAllocationAmount] = useState<number[]>([])
  const [projectName, setProjectName] = useState<string[]>([])

  console.log(
    calculateAllocationTest(selectedProject, totalStats, 30000000, weight)
  )

  const calculateAllocation = useCallback(async () => {
    return calculateAllocationTest(
      selectedProject,
      totalStats,
      30000000,
      weight
    )
  }, [selectedProject, totalStats, weight]) // Include weight in dependencies

  const transformData = useCallback(
    (allocationResult: allocationResultType[]) => {
      const sortedAllocation = allocationResult
        .sort((a, b) => Number(b.amount) - Number(a.amount))
        .filter((project) => Number(project.amount) > 0)
      const projectName = sortedAllocation.map((project) => project.project)
      const amount = sortedAllocation.map((project) => Number(project.amount))
      setAllocationAmount(amount)
      setProjectName(projectName)
    },
    []
  )

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
