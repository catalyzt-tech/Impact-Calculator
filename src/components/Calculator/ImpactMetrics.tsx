import { ChangeEvent, FC, useState } from 'react'
import { WeightType } from '../../types/weight'
import MetricSelect from './ImpactMetrics/MetricSelector'
import { metrics } from '../../data/metric'
interface ImpactMetricsProps {
  weightData: WeightType[]
  setWeight: React.Dispatch<React.SetStateAction<WeightType[]>>
}

const ImpactMetrics: FC<ImpactMetricsProps> = ({ weightData, setWeight }) => {
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const handleChange = (metric: string, value: number) => {
    if (value < 0 || value > 100) {
      setErrors((prevErrors) => ({ ...prevErrors, [metric]: true }))
      return
    }
    setErrors((prevErrors) => ({ ...prevErrors, [metric]: false }))
    setWeight((prevWeight) => {
      const updatedWeight = [...prevWeight]
      const index = updatedWeight.findIndex((item) => item.metric === metric)
      if (index !== -1) {
        updatedWeight[index] = { ...updatedWeight[index], value: value }
      }
      return updatedWeight
    })
  }

  return (
    <div className="flex flex-col justify-center items-center mx-6">
      <img src="img/small_sunny.svg" alt="pheonix" className=" w-16 mb-4" />
      <div className=" pb-8 px-4  w-full ">
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
            <div className="flex flex-row items-center" key={index}>
              <div className="font-normal text-sm line-clamp-2 w-[calc(100%-9em)]">
                {metrics.map((each) => {
                  if (each.id == item.metric) {
                    return each.metric
                  }
                })}
                {/* {item.metric} */}
              </div>
              <div className="flex-grow"></div>
              <input
                className="border px-2 py-1 rounded-md w-20 text-center text-sm font-normal"
                type="number"
                placeholder="..%"
                min={0}
                max={100}
                value={item.value !== 0 ? item.value : ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(item.metric, Number(e.target.value))
                }
              />
              {errors[item.metric] && (
                <div className="flex flex-col text-red-500">Invalid Input</div>
              )}
              <div className="ml-4">%</div>
            </div>
          ))}
        </form>
      </div>
      <div className="text-center">
        <MetricSelect weightData={weightData} setWeight={setWeight} />
      </div>
    </div>
  )
}

export default ImpactMetrics
