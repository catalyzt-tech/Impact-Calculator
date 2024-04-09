import { Dialog, Transition } from '@headlessui/react'
import { FC, Fragment, useEffect, useState } from 'react'
import { MetricsType } from '../../../types/metrics'
import { metrics } from '../../../data/metric'
import Search from '../../Search/SearchMetrics'
import { WeightType } from '../../../types/weight'

interface MetricSelectorProps {
  weightData: WeightType[]
  setWeight: React.Dispatch<React.SetStateAction<WeightType[]>>
}

const MetricSelect: FC<MetricSelectorProps> = ({ weightData, setWeight }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [searchMetrics, setSearchMetrics] = useState<MetricsType[]>(metrics)

  //set default selected metrics based on weightData
  useEffect(() => {
    const newSearchMetrics = searchMetrics.map((d) => {
      if (weightData.find((w) => w.metric === d.id)) {
        return { ...d, isSelected: true }
      }
      return { ...d, isSelected: false }
    })
    setSearchMetrics(newSearchMetrics)
  }, [])

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function handleSelect(metricSelected: MetricsType) {
    const newSearchMetrics = searchMetrics.map((d) => {
      if (d.metric === metricSelected.metric) {
        return { ...d, isSelected: !d.isSelected }
      }
      return d
    })
    setSearchMetrics(newSearchMetrics)

    setWeight((prevWeight) => {
      //if metric is already selected, remove it
      if (prevWeight.find((d) => d.metric === metricSelected.id)) {
        return prevWeight.filter((d) => d.metric !== metricSelected.id)
      } else {
        //if metric is not selected, add it
        return [...prevWeight, { metric: metricSelected.id, value: 100 }]
      }
    })
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="bg-[#ff0000] px-6 py-2 rounded-lg text-sm font-semibold border border-white text-white active:scale-90 transition ease-in-out duration-150"
      >
        Select Metric Vectors
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-6 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white px-7 py-9 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-center text-xl font-medium leading-6 text-gray-900"
                  >
                    Impact Metrics
                  </Dialog.Title>
                  {/* search bar */}
                  <Search originData={metrics} setData={setSearchMetrics} />

                  <div className="overflow-y-auto h-[60vh] gap-y-3">
                    {searchMetrics.length == 0 ? (
                      <div className="text-center">Metric Not found</div>
                    ) : (
                      searchMetrics.map((metric, index) => (
                        <div
                          className={`mt-3 border ${
                            metric.isSelected
                              ? 'border-red-400 bg-red-50'
                              : 'border-gray-300 hover:bg-gray-50'
                          }   rounded-xl p-4 transition ease-in-out duration-300  cursor-pointer `}
                          key={index}
                          onClick={() => handleSelect(metric)}
                        >
                          <div>
                            <div className="flex items-center">
                              <p className="text-md text-gray-900 pr-2">
                                {metric.metric}
                              </p>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
                                />
                              </svg>
                            </div>
                            <p className="text-sm text-gray-500 pt-2">
                              {metric.desc}
                            </p>
                            <p className="text-sm text-gray-400 pt-2">
                              {metric.provider}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="mt-8">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-[#ff0420] px-4 py-2.5 text-sm w-full font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Done!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MetricSelect
