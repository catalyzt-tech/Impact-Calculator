import { useState, FC } from 'react'

interface ImpactMetricProps {
  weightData: (weight: number[]) => void
}

const ImpactMetric: FC<ImpactMetricProps> = ({ weightData }) => {
  const Metric = [
    'Total Contributors',
    'Total Forks',
    'Total Stars',
    'Funding: Governance Fund',
    'Funding: RPGF2',
  ]

  const [weight, setWeight] = useState([20, 20, 20, 20, 20])

  const changeWeight = (index: number, value: number) => {
    const total = weight.reduce((a, b) => a + b, 0)
    const newWeight = [...weight]
    newWeight[index] = value

    // Check if the sum of new weights exceeds 100%
    if (total + value - weight[index] > 100) {
      console.error('Sum of weights cannot exceed 100%.')
      return
    }
    setWeight(newWeight)
    // Use the weightData prop to update the weights in the parent component
    weightData(newWeight)
  }

  return (
    <>
      <div className="border-2 border-black w-96 py-8 px-8 rounded-lg">
        <div className="text-center font-semibold text-xl mb-4">
          Impact Metrics
        </div>
        <form action="" className="space-y-6">
          {Metric.map((metric, index) => (
            <div className="flex flex-row" key={index}>
              <div>{metric}</div>
              <div className="flex-grow"></div>
              <input
                type="number"
                placeholder="..%"
                min={0}
                max={100}
                defaultValue={weight[index]}
                onChange={(e) => changeWeight(index, Number(e.target.value))}
                className="border-2 border-black bg-gray-200 px-4 w-20 h-8 rounded-lg ml-4"
              />
              <div className="ml-4">%</div>
            </div>
          ))}
        </form>
      </div>
    </>
  )
}

export default ImpactMetric
