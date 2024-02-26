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

  //const [totalWeightA, setTotalWeightA]   = useState(100)

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
      <div className=" pb-8 px-8 w-fit">
        <div className="text-center font-semibold text-lg mb-10">
          Impact Metrics
        </div>
        <div className="flex flex-row pb-3 mb-5 border-b border-slate-300 text-sm font-bold">
          <div>Impact Vector</div>
          <div className="flex-grow"></div>
          <div className="">Weight </div>
          <div className="mr-8"></div>
        </div>
        <form className="space-y-4">
          {Metric.map((metric, index) => (
            <div className="flex flex-row" key={index}>
              <div className="text-sm">{metric}</div>
              <div className="flex-grow"></div>
              <input
                className="border px-2 py-1 rounded-md w-20 text-center  "
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
      <div className="text-center">
        <button className="bg-[#ff0000] px-6 py-2 rounded-lg text-sm font-semibold border border-white text-white">
          Select Metric Vectors
        </button>
      </div>
    </>
  )
}

export default ImpactMetric
