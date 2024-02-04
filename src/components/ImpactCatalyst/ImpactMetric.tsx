import {  FC, ChangeEvent } from 'react'

interface ImpactMetricProps {
  weightData: number[]
  weightHandler: (weight: number[]) => void
}

const ImpactMetric: FC<ImpactMetricProps> = ({ weightData, weightHandler}) => {
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
                type="number"
                placeholder="..%"
                min={0}
                max={100}
                value={weightData[index]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, Number(e.target.value))
                }
                className={`border-2 border-black bg-gray-200 px-4 w-20 h-8 rounded-lg ml-4`}
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
