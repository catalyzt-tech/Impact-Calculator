import { FC, ChangeEvent } from 'react'

interface ImpactMetricProps {
  weightData: number[]
  weightHandler: (weight: number[]) => void
}

const ImpactMetric: FC<ImpactMetricProps> = ({ weightData, weightHandler }) => {
  const Metric = [
    'Total Contributors',
    'Total Forks',
    'Total Stars',
    'Funding: Governance Fund',
    'Funding: RPGF2',
  ]

  //const [totalWeightA, setTotalWeightA] = useState(100)

  const handleChange = (index: number, value: number) => {
    const newWeight = [...weightData]
    newWeight[index] = value
    const weightSum = newWeight.reduce((a, b) => a + b, 0)

    const nextIndex = index === 4 ? 0 : index + 1

    if (weightSum > 100) {
      newWeight[nextIndex] -= weightSum - 100
    } else {
      newWeight[nextIndex] += 100 - weightSum
    }

    console.log(newWeight)
    weightHandler(newWeight)
  }

  return (
    <>
      <div className="border-2 border-black w-96 py-8 px-8 rounded-lg">
        <div className="text-center font-semibold text-xl mb-4">
          Impact Metrics
        </div>
        <form className="space-y-6">
          {Metric.map((metric, index) => (
            <div className="flex flex-row" key={index}>
              <div>{metric}</div>
              <div className="flex-grow"></div>
              <input
                className="input input-bordered max-w-xs"
                type="number"
                placeholder="..%"
                min={0}
                max={100}
                value={weightData[index]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, Number(e.target.value))
                }
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
