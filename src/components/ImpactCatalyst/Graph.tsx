'use client'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useCallback, useEffect, useState } from 'react'
import { calculateAllocationTest } from '../../hooks/process'

interface allocationResultType {
  project: string
  amount: string
}
const TempGraph = ({ selectedProject, totalStats, weight }) => {
  const [options, setOptions] = useState<HighchartsReact.Props>({})
  const [allocationAmount, setAllocationAmount] = useState<number[]>([])
  const [projectName, setProjectName] = useState<string[]>([])
  const [cumulative, setCumulative] = useState<number[]>([])
  const opAllocation = 30000000
  const calculateAllocation = useCallback(async () => {
    return calculateAllocationTest(
      selectedProject,
      totalStats,
      opAllocation,
      weight
    )
  }, [selectedProject, totalStats, weight]) // Include weight in dependencies

  const transformData = useCallback(
    (allocationResult: allocationResultType[]) => {
      const sortedAllocation = allocationResult
        .sort((a, b) => Number(b.amount) - Number(a.amount))
        .filter((project) => Number(project.amount) > 0)
      const projectName = sortedAllocation.map((project) => project.project)
      let amount = sortedAllocation.map((project) => Number(project.amount))
      const sum = amount.reduce((a, b) => a + b, 0)
      if (sum !== opAllocation) {
        amount = amount.map((project) => (project / sum) * opAllocation)
      }
      const cumulative: number[] = amount.reduce<number[]>(
        (a, x, i) => [...a, x + (a[i - 1] || 0)],
        []
      )

      setCumulative(cumulative)
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
        style: {
          fontFamily: 'Rubik, sans-serif',
        },
      },

      title: {
        text: 'OP Allocation by Project',
      },
      subtitle: {
        text: '',
      },
      xAxis: {
        categories: projectName.map((name) =>
          name.length > 12 ? name.substring(0, 12) + '...' : name
        ),
        labels: {
          style: {
            fontSize: '10px',
          },
        },
        crosshair: true,
      },
      yAxis: [
        {
          min: 0,
          title: {
            text: 'OP Allocation',
            style: {
              fontWeight: '500',
              fontSize: '14px',
            },
            x: -10,
          },
          opposite: false,
        },
        {
          title: {
            text: 'Cumulative Amount',
            style: {
              //font weight and size
              fontWeight: '500',
              fontSize: '14px',
            },
            x: 10,
          },
          opposite: true,
        },
      ],

      colors: ['#FF0000'],
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        split: false,
        formatter: function (this: Highcharts.TooltipFormatterContextObject) {
          let s = '<b>' + this.x + '</b>'
          this.points?.forEach(function (point: Highcharts.Point) {
            s +=
              '<br/>' +
              point.series?.name +
              ': ' +
              point.y?.toFixed(2) +
              '<img src ="/static/op_logo.svg" style= "width:1.5em; display:inline; margin-right:1.5em; margin-left:0.5em"/>'
          })

          return s
        },
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.02,
          borderWidth: 0,
          groupPadding: 0,
          shadow: false,
        },
        areaspline: {
          fillOpacity: 0.05,
        },
        // series: { cumulative: true, pointStart: 0 },
      },
      series: [
        {
          type: 'column',
          yAxis: 0,
          name: 'Allocation',
          data: allocationAmount,
        },
        {
          type: 'areaspline',
          yAxis: 1,
          name: 'Cumulative',
          data: cumulative,
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
