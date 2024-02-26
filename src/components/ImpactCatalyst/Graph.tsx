import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState } from 'react'
import { SeriesGraphType } from '../../types/impactCata'

interface TempGraphProps {
  staredArr: SeriesGraphType[]
  forkedArr: SeriesGraphType[]
  downloadArr: SeriesGraphType[]
}
const TempGraph = () => {
  const metrics = ['Pull Request Closed', 'Total Forks', 'Total Stars']
  const [currentMetric, setCurrentMetric] = useState<string>('Download')
  const [options, setOptions] = useState<Highcharts.Options>({})

  const mockDemo: SeriesGraphType[] = [
    {
      name: 'Project 1',
      data: [1, 3, 4, 7, 2],
    },
    {
      name: 'Project 2',
      data: [2, 4, 5, 6, 2],
    },
    {
      name: 'Project 3',
      data: [3, 4, 4, 2, 5],
    },
  ]
  const [mockData, setMockData] = useState<SeriesGraphType[]>(mockDemo)
  useEffect(() => {
    setOptions({
      chart: {
        type: 'area',
        height: 450,
      },
      title: {
        text: '',
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
          fillOpacity: 0.01,
        },
      },
      series: mockData,
    })
  }, [mockData, currentMetric])

  //   console.log(staredArr)
  //   console.log(forkedArr)
  //   console.log(downloadArr)

  const selectMetric = async (metric: string) => {
    await setCurrentMetric(metric)
    console.log(metric)
    if (metric === 'Pull Request Closed') {
      await setMockData(downloadArr)
    }
    if (metric === 'Total Forks') {
      await setMockData(forkedArr)
    }
    if (metric === 'Total Stars') {
      await setMockData(staredArr)
    }
    // console.log(mockData)
  }

  return (
    <div>
      <div className="px-2">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
      <div className="text-center mt-4"></div>
      {/* <div className="flex flex-row justify-center space-x-10 mt-4">
        {metrics.map((metric, index) => (
          <button
            key={index}
            className="btn px-4 border-2 rounded-lg"
            onClick={() => selectMetric(metric)}
            value={metric}
          >
            {metric}
          </button>
        ))}
      </div> */}
    </div>
  )
}

export default TempGraph
