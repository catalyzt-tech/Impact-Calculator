import { FC, useState, useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const TempGraph: FC = () => {
  const [options, setOptions] = useState({})
  const mockData = Array.from({ length: 10 }, (_, index) => ({
    name: `Project ${index + 1}`, // Start from Project 3 to avoid conflict with your existing data
    data: Array.from(
      { length: 21 },
      () => Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000
    ),
  }))

  console.log(mockData)

  useEffect(() => {
    setOptions({
      chart: {
        type: 'areaspline',
      },
      title: {
        text: 'Impact Calculator',
        align: 'center',
      },
      //   subtitle: {
      //     text: 'Source: <a href="https://www.ssb.no/jord-skog-jakt-og-fiskeri/jakt" target="_blank">SSB</a>',
      //     align: 'left',
      //   },
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 120,
        y: 70,
        floating: true,
        borderWidth: 1,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
      },
      xAxis: {
        title: {
          text: 'Month',
        },
        //   plotBands: [
        //     {
        //       // Highlight the two last years
        //       from: 2019,
        //       to: 2020,
        //       color: 'rgba(68, 170, 213, .2)',
        //     },
        //   ],
      },
      yAxis: {
        title: {
          text: 'Impact Score',
        },
      },
      tooltip: {
        shared: true,
        valueSuffix: ' OP Points',
        // headerFormat: '<b>Hunting season starting autumn {point.x}</b><br>',
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        series: {
          pointStart: 1,
        },
        areaspline: {
          fillOpacity: 0.1,
        },
      },
      //   series: [
      //     {
      //       name: 'Project 1',
      //       data: [
      //         38000, 37300, 37892, 38564, 36770, 36026, 34978, 35657, 35620,
      //         35971, 36409, 36435, 34643, 34956, 33199, 31136, 30835, 31611,
      //         30666, 30319, 31766,
      //       ],
      //     },
      //     {
      //       name: 'Project 2',
      //       data: [
      //         22534, 23599, 24533, 25195, 25896, 27635, 29173, 32646, 35686,
      //         37709, 39143, 36829, 35031, 36202, 35140, 33718, 37773, 42556,
      //         43820, 46445, 50048,
      //       ],
      //     },
      //     //mock 10 more data with unique data values
      //     {
      //       name: 'Project 3',
      //       data: [
      //         38000, 37300, 37892, 38564, 36770, 36026, 34978, 35657, 35620,
      //         35971, 36409, 36435, 34643, 34956, 33199, 31136, 30835, 31611,
      //         30666, 30319, 31766,
      //       ],
      //     },
      //     {
      //       name: 'Project 4',
      //       data: [
      //         22534, 23599, 24533, 25195, 25896, 27635, 29173, 32646, 35686,
      //         37709, 39143, 36829, 35031, 36202, 35140, 33718, 37773, 42556,
      //         43820, 46445, 50048,
      //       ],
      //     },
      //     {
      //       name: 'Project 5',
      //       data: [
      //         38000, 37300, 37892, 38564, 36770, 36026, 34978, 35657, 35620,
      //         35971, 36409, 36435, 34643, 34956, 33199, 31136, 30835, 31611,
      //         30666, 30319, 31766,
      //       ],
      //     },
      //     {
      //       name: 'Project 6',
      //       data: [
      //         22534, 23599, 24533, 25195, 25896, 27635, 29173, 32646, 35686,
      //         37709, 39143, 36829, 35031, 36202, 35140, 33718, 37773, 42556,
      //         43820, 46445, 50048,
      //       ],
      //     },
      //     {
      //       name: 'Project 7',
      //       data: [
      //         38000, 37300, 37892, 38564, 36770, 36026, 34978, 35657, 35620,
      //         35971, 36409, 36435, 34643, 34956, 33199, 31136,
      //       ],
      //     },
      //   ],
      series: mockData,
    })
  }, [])
  return (
    <div>
      <div className="mx-40">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
      {/* <h1>Temperature Graph</h1>
      <p>Coming soon...</p> */}
    </div>
  )
}
export default TempGraph
