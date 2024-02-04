import { FC, useState, useEffect, MouseEvent } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

interface ProjectData {
  'Total Contributors': number[]
  'Total Forks': number[]
  'Total Stars': number[]
}

const TempGraph: FC = () => {
  const metrics = ['Total Contributors', 'Total Forks', 'Total Stars']

  const shuffle = (array: number[]): number[] => {
    let currentIndex = array.length,
      randomIndex

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }

    return array
  }

  const mockDataSets: ProjectData[] = Array.from(
    { length: 10 },
    (_, index) => ({
      'Total Contributors': Array.from(
        { length: 12 },
        (_, month) => 100 + 100 * month
      ),
      'Total Forks': Array.from({ length: 12 }, (_, month) => 10 + 20 * month),
      'Total Stars': Array.from({ length: 12 }, (_, month) => 10 + 5 * month),
    })
  )

  const [currentMetric, setCurrentMetric] =
    useState<string>('Total Contributors')
  const [options, setOptions] = useState<Highcharts.Options>({})
  const [mockData, setMockData] = useState<any[]>(
    mockDataSets.map((data, index) => ({
      name: `Project ${index + 1}`,
      data: shuffle(data[currentMetric]),
    }))
  )

  useEffect(() => {
    setOptions({
      chart: {
        type: 'area',
        height: 450,
      },
      title: {
        text: 'Impact Calculator',
        align: 'center',
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        x: 0,
        y: 0,
        floating: false,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
      },
      xAxis: {
        title: {
          text: 'Month',
        },
      },
      yAxis: {
        title: {
          text: `${currentMetric}`,
        },
      },
      tooltip: {
        shared: true,
        valueSuffix: '',
        headerFormat: '<b>Month {point.x}</b><br>',
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        series: {
          pointStart: 1,
        },
        areaspline: {
          fillOpacity: 0.03,
        },
      },
      series: mockData,
    })
  }, [mockData, currentMetric])

  const selectMetric = (event: MouseEvent<HTMLButtonElement>) => {
    const newMetric = event.currentTarget.value
    const newMockData = mockDataSets.map((data, index) => ({
      name: `Project ${index + 1}`,
      data: shuffle(data[newMetric]),
    }))

    setCurrentMetric(newMetric)
    setMockData(newMockData)
  }

  return (
    <div>
      <div className="mx-40">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
      <div className="text-center mt-4 mb-12"></div>
      <div className="flex flex-row justify-center space-x-10 mt-4">
        {metrics.map((metric, index) => (
          <button
            key={index}
            className="btn px-4 border-2 rounded-lg"
            onClick={selectMetric}
            value={metric}
          >
            {metric}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TempGraph
