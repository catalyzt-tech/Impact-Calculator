import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState } from 'react'
import { SeriesGraphType } from '../../types/impactCata'

const TempGraph = ({ selectedProject, totalStats }) => {
  const [options, setOptions] = useState<Highcharts.Options>({})

  useEffect(() => {
    const calculateAllocation = async () => {
      const opAllocation: number = 30000000
      const result = await selectedProject.map((project) => {
        const allocation = {
          'Total Contributors':
            totalStats['Total Contributors'] !== 0
              ? Number(
                  (project['OSO: Total Contributors'] /
                    totalStats['Total Contributors']) *
                    20
                )
              : 0,
          'Total Forks':
            totalStats['Total Forks'] !== 0
              ? Number(
                  (project['OSO: Total Forks'] / totalStats['Total Forks']) * 20
                )
              : 0,
          'Total Stars':
            totalStats['Total Stars'] !== 0
              ? Number(
                  (project['OSO: Total Stars'] / totalStats['Total Stars']) * 20
                )
              : 0,
          'Funding: Governance Fund':
            totalStats['Funding: Governance Fund'] !== 0
              ? Number(
                  (project['Funding: Partner Fund'] /
                    totalStats['Funding: Governance Fund']) *
                    20
                )
              : 0,
          'Funding: RPGF2':
            totalStats['Funding: RPGF2'] !== 0
              ? Number(
                  (project['Funding: RPGF2'] / totalStats['Funding: RPGF2']) *
                    20
                )
              : 0,
        }
        const result =
          allocation['Total Contributors'] +
          allocation['Total Forks'] +
          allocation['Total Stars'] +
          allocation['Funding: Governance Fund'] +
          allocation['Funding: RPGF2']
        return {
          project: project['Meta: Project Name'],
          amount: ((result * opAllocation) / 100).toFixed(2),
        }
      })
      return result
    }

    const transformData = (allocationResult: any[]) => {
      const sortedAllocation = allocationResult
        .sort((a, b) => Number(b.amount) - Number(a.amount))
        .filter((project) => Number(project.amount) > 0)
      const projectName = sortedAllocation.map((project) => project.project)
      const amount = sortedAllocation.map((project) => Number(project.amount))
      // const projectName = allocationResult.map((project) => project.project)
      // const amount = allocationResult.map((project) => Number(project.amount))
      console.log('projectName', projectName)
      console.log('amount', amount)
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
          //fontsize
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
            text: '',
          },
        },
        legend: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        tooltip: {
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} OP</b></td></tr>',
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
            name: 'Amount',
            data: amount,
          },
        ],
      })
    }

    calculateAllocation().then((allocationResult) =>
      transformData(allocationResult)
    )
  }, [selectedProject, totalStats])

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
