import { WeightType } from '../types/weight'
import { ProjectType } from '../types/project'
import { StatsType } from '../types/stats'

//Impact Catalyst (Page) Hooks
export const everyProjectStatSum = (projects: ProjectType[]) => {
  return projects.reduce((acc, project) => {
    Object.keys(project).forEach((key) => {
      if (typeof project[key as keyof ProjectType] === 'number') {
        acc[key] = (acc[key] || 0) + +project[key as keyof ProjectType]
      }
    })
    return acc
  }, {} as Record<string, number>)
}

//Graph (Component) Hooks
export const calculateAllocationTest = (
  projects: ProjectType[],
  totalStats: Partial<StatsType>[],
  opAllocation: number,
  weight: WeightType[]
) => {
  return projects.map((project) => {
    let allocationByProject = 0
    weight.map((item: WeightType) => {
      if (
        !isNaN(project[item.metric]) &&
        !isNaN(totalStats[item.metric]) &&
        !isNaN(item.value) &&
        totalStats[item.metric] !== 0
      ) {
        allocationByProject +=
          (project[item.metric] / totalStats[item.metric]) * item.value
      }
    })
    return {
      project: project['Meta: Project Name'],
      amount: (
        (allocationByProject * opAllocation) /
        (weight.length * 100)
      ).toFixed(2),
    }
  })
}
