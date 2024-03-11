export const numberToString = (number: number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number)
}

export const pieAllocation = (allocationResult: any[]) => {
  const sortedAllocation = allocationResult
    .sort((a, b) => Number(b.amount) - Number(a.amount))
    .filter((project) => Number(project.amount) > 0)
  const transformedArray = sortedAllocation.map((item) => {
    return { name: item.project, y: Number(item.amount) }
  })
  return transformedArray
}

export const columnAllocation = (allocationResult: any[]) => {
  const sortedAllocation = allocationResult
    .sort((a, b) => Number(b.amount) - Number(a.amount))
    .filter((project) => Number(project.amount) > 0)
  const projectName = sortedAllocation.map((project) => project.project)
  let amount = sortedAllocation.map((project) => Number(project.amount))
  const sum = amount.reduce((a, b) => a + b, 0)
  if (sum !== 30000000) {
    amount = amount.map((project) => (project / sum) * 30000000)
  }
  return { projectName, amount }
}

export const pieChartOptions = (allocationAmount: any) => {
  return {
    chart: {
      type: 'pie',
      height: 500,
      style: {
        fontFamily: 'Rubik, sans-serif',
      },
      spacing: [10, 0, 10, 0], // Add this line
    },
    credits: {
      enabled: false,
    },
    title: {
      text: 'OP Allocation by Project',
    },

    plotOptions: {
      pie: {
        size: '90%',
        center: ['50%', '50%'],
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          // format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          formatter: function () {
            return (
              '<b>' +
              this.point.name +
              '</b> - ' +
              numberToString(Number(this.point.percentage)) +
              '%'
            )
          },
        },
      },
    },
    tooltip: {
      // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      useHTML: true,
      shared: true,
      padding: 15,
      style: {
        minWidth: '200px',
      },
      formatter: function (this: Highcharts.TooltipFormatterContextObject) {
        return (
          '<b>' +
          this.point.name +
          '</b> - ' +
          numberToString(Number(this.point.percentage)) +
          '%' +
          '<br/><br/>Allocation: ' +
          numberToString(this.point.y) +
          '<img src ="/static/op_logo.svg" style= "width:1.5em; display:inline; margin-right:1.5em; margin-left:0.5em"/>'
        )
      },
    },
    // colors: ['#FF0000'],
    series: [
      {
        name: 'Amount',
        colorByPoint: true,
        data: allocationAmount,
      },
    ],
  }
}

export const columnChartOptions = (
  allocationAmount: any,
  projectName: any,
  cumulative: any
) => {
  return {
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
        pointPadding: 0.01,
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
  }
}
