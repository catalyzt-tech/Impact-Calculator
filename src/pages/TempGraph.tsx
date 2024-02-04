import { FC, useState, useEffect, MouseEvent } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const TempGraph: FC = () => {
  const metric = ['Total Contributors', 'Total Forks', 'Total Stars']
  const [options, setOptions] = useState({})

  const shuffle = (array: number[]) => {
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

  const mockDataSets = [
    {
      'Total Contributors': [
        100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200,
      ],
      'Total Forks': [30, 22, 11, 44, 64, 99, 36, 42, 32, 99, 193, 200],
      'Total Stars': [30, 44, 34, 55, 67, 45, 67, 98, 23, 45, 67, 89],
    },
    {
      'Total Contributors': [
        110, 210, 310, 410, 510, 610, 710, 810, 910, 1010, 1110, 1210,
      ],
      'Total Forks': [35, 25, 15, 50, 70, 105, 40, 48, 38, 105, 198, 210],
      'Total Stars': [35, 50, 40, 65, 77, 50, 77, 108, 28, 50, 72, 94],
    },
    {
      'Total Contributors': [
        120, 220, 320, 420, 520, 620, 720, 820, 920, 1020, 1120, 1220,
      ],
      'Total Forks': [40, 28, 18, 56, 78, 110, 44, 54, 42, 120, 185, 200],
      'Total Stars': [40, 56, 44, 70, 84, 54, 84, 120, 32, 56, 78, 100],
    },
    {
      'Total Contributors': [
        130, 240, 330, 440, 550, 660, 770, 880, 990, 1100, 1210, 1320,
      ],
      'Total Forks': [45, 30, 20, 62, 84, 120, 48, 60, 48, 130, 175, 190],
      'Total Stars': [45, 64, 54, 80, 92, 62, 92, 138, 40, 64, 86, 108],
    },
    {
      'Total Contributors': [
        140, 260, 350, 460, 570, 680, 790, 900, 1010, 1120, 1230, 1340,
      ],
      'Total Forks': [50, 35, 25, 68, 90, 130, 52, 66, 54, 140, 165, 180],
      'Total Stars': [50, 72, 60, 90, 100, 70, 100, 150, 48, 72, 94, 116],
    },
    {
      'Total Contributors': [
        150, 280, 370, 480, 590, 700, 810, 920, 1030, 1140, 1250, 1360,
      ],
      'Total Forks': [55, 40, 30, 74, 98, 140, 56, 72, 60, 150, 155, 170],
      'Total Stars': [55, 80, 70, 100, 108, 76, 108, 162, 56, 80, 102, 124],
    },
    {
      'Total Contributors': [
        160, 300, 390, 500, 610, 720, 830, 940, 1050, 1160, 1270, 1380,
      ],
      'Total Forks': [60, 45, 35, 80, 106, 150, 60, 78, 66, 160, 145, 160],
      'Total Stars': [60, 88, 80, 110, 120, 84, 120, 174, 64, 88, 110, 132],
    },
    {
      'Total Contributors': [
        170, 320, 410, 520, 630, 740, 850, 960, 1070, 1180, 1290, 1400,
      ],
      'Total Forks': [65, 50, 40, 86, 114, 160, 65, 84, 72, 170, 135, 150],
      'Total Stars': [65, 96, 90, 120, 132, 92, 132, 186, 72, 96, 118, 140],
    },
    {
      'Total Contributors': [
        180, 340, 430, 540, 650, 760, 870, 980, 1090, 1200, 1310, 1420,
      ],
      'Total Forks': [70, 55, 45, 92, 120, 170, 70, 90, 78, 180, 125, 140],
      'Total Stars': [70, 104, 100, 130, 144, 100, 144, 198, 80, 104, 126, 148],
    },
    {
      'Total Contributors': [
        190, 360, 450, 560, 670, 780, 890, 1000, 1110, 1220, 1330, 1440,
      ],
      'Total Forks': [75, 60, 50, 98, 126, 180, 75, 96, 84, 190, 115, 130],
      'Total Stars': [75, 112, 110, 140, 156, 108, 156, 210, 88, 112, 134, 156],
    },
  ]
  const [currentMetric, setCurrentMetric] = useState('Total Contributors')
  //   console.log(mockDataSets)
  const [mockData, setMockData] = useState(
    mockDataSets.map((data: any, index: number) => ({
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
        align: 'left',
        verticalAlign: 'top',
        x: 120,
        y: 70,
        floating: true,
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
          text: currentMetric,
        },
      },
      tooltip: {
        shared: true,
        valueSuffix: ' OP Points',
        headerFormat: '<b>Impact Month {point.x}</b><br>',
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

  const selectMetric = (event: MouseEvent) => {
    const newMetric: any = event.target.value
    const newMockData = mockDataSets.map((data: any, index: number) => ({
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
      <div className="text-center mt-4 mb-12">
        {/* <button
          className="border px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-all"
          onClick={randomData}
        >
          Random
        </button> */}
      </div>
      <div className="flex flex-row justify-center space-x-10 mt-4">
        {metric.map((metric, index) => (
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
