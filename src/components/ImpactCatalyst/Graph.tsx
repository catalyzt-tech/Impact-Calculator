'use client'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useCallback, useEffect, useState } from 'react'
import { calculateAllocationTest } from '../../hooks/process'
import { StatsType } from '../../types/stats'
import { ProjectType } from '../../types/project'
import { WeightType } from '../../types/weight'
import { numberToString } from '../../hooks/format'

interface allocationResultType {
  project: string
  amount: string
}
interface GraphProp {
  selectedProject: ProjectType[]
  totalStats: StatsType[]
  weight: WeightType[]
}
const TempGraph = ({ selectedProject, totalStats, weight }: GraphProp) => {
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
        categories: projectName,
        labels: {
          style: {
            fontSize: '10px',
            textOverflow: 'ellipsis',
            // whiteSpace: 'nowrap',
            overflow: 'hidden',
          },
          formatter: function () {
            return this.value.length > 12
              ? this.value.substring(0, 12) + '...'
              : this.value
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
        padding: 15,
        style: {
          minWidth: '200px',
        },
        formatter: function (this: Highcharts.TooltipFormatterContextObject) {
          let s = '<b>' + this.x + '</b> <br/>'
          this.points?.forEach(function (point: Highcharts.Point) {
            s +=
              '<br/>' +
              point.series?.name +
              ': ' +
              numberToString(point.y || 0) +
              '<img src ="/static/op_logo.svg" style= "width:1.5em; display:inline; margin-right:1.5em; margin-left:0.5em"/>'
          })

          return s + '<br/>'
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
