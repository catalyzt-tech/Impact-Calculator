import { ChangeEvent, FC } from 'react'
import { WeightType } from '../../types/ImpactMetric'

interface ImpactMetricsProps {
  weightData: WeightType[]
  setWeight: React.Dispatch<React.SetStateAction<WeightType[]>>
}

const ImpactMetrics: FC<ImpactMetricsProps> = ({ weightData, setWeight }) => {
  const Metric = [
    'Total Contributors',
    'Total Forks',
    'Total Stars',
    'Funding: Governance Fund',
    'Funding: RPGF2',
  ]

  const handleChange = (metric: string, value: number) => {
    setWeight(prevWeight => {
      const updatedWeight = [...prevWeight];
      const index = updatedWeight.findIndex(item => item.metric === metric);
      if (index !== -1) {
        updatedWeight[index] = { ...updatedWeight[index], value: value };
      }
      return updatedWeight;
    });
  }

  console.log(weightData)

  return (
    <div className='flex flex-col justify-center items-center'>
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
          {weightData.map((item, index) => (
            <div className="flex flex-row" key={index}>
              <div className="text-sm">{item.metric}</div>
              <div className="flex-grow"></div>
              <input
                className="border px-2 py-1 rounded-md w-20 text-center  "
                type="number"
                placeholder="..%"
                min={0}
                max={100}
                value={item.value}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(item.metric, Number(e.target.value))
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
    </div>
  )
}

export default ImpactMetrics