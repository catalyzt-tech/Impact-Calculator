'use client'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useCallback, useEffect, useState } from 'react'
import { calculateAllocationTest } from '../../hooks/process'
import { StatsType } from '../../types/stats'
import { ProjectType } from '../../types/project'
import { WeightType } from '../../types/weight'
import {
  // numberToString,
  pieAllocation,
  pieChartOptions,
  columnChartOptions,
  columnAllocation,
} from '../../hooks/format'

interface allocationResultType {
  project: string
  amount: string
}
interface GraphProp {
  selectedProject: ProjectType[]
  totalStats: StatsType[]
  weight: WeightType[]
  graphTypeSelected: string
}
const TempGraph = ({
  selectedProject,
  totalStats,
  weight,
  graphTypeSelected,
}: GraphProp) => {
  const [options, setOptions] = useState<HighchartsReact.Props>({})
  const [allocationAmount, setAllocationAmount] = useState<any>([])
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
      if (graphTypeSelected === 'pie') {
        const transformedArray = pieAllocation(allocationResult)
        setAllocationAmount(transformedArray)
      } else if (graphTypeSelected === 'column') {
        // const sortedAllocation = allocationResult
        //   .sort((a, b) => Number(b.amount) - Number(a.amount))
        //   .filter((project) => Number(project.amount) > 0)
        // console.log('sortedAllocation', sortedAllocation)
        // const projectName = sortedAllocation.map((project) => project.project)
        // let amount = sortedAllocation.map((project) => Number(project.amount))
        // const sum = amount.reduce((a, b) => a + b, 0)
        // if (sum !== opAllocation) {
        //   amount = amount.map((project) => (project / sum) * opAllocation)
        // }

        const data = columnAllocation(allocationResult)
        // const cumulative: number[] = amount.reduce<number[]>(
        //   (a, x, i) => [...a, x + (a[i - 1] || 0)],
        //   []
        // )
        const cumulative: number[] = data.amount.reduce<number[]>(
          (a, x, i) => [...a, x + (a[i - 1] || 0)],
          []
        )

        setCumulative(cumulative)
        setAllocationAmount(data.amount)
        setProjectName(data.projectName)
      }
    },
    [graphTypeSelected]
  )
  // console.log('gra[phTypeSelected', graphTypeSelected)

  // const handleChangeTypeChart = () =>{
  //   graphTypeSelected
  // }
  useEffect(() => {
    // if (graphTypeSelected === 'pie') {
    // }
    if (graphTypeSelected === 'pie') {
      // console.log(pieChartOptions(allocationAmount))
      setOptions((prev) => pieChartOptions(allocationAmount))
      return
    } else if (graphTypeSelected === 'column') {
      setOptions((prev) =>
        columnChartOptions(allocationAmount, projectName, cumulative)
      )
    }
  }, [allocationAmount, projectName, graphTypeSelected, cumulative])

  useEffect(() => {
    const fetchData = async () => {
      const allocationResult = await calculateAllocation()
      transformData(allocationResult)
    }
    fetchData()
  }, [calculateAllocation, transformData, graphTypeSelected, weight])

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
