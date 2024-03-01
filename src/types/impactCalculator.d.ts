export interface GetProjectIdType {
  __typename: string
  id: number
  name: string
  description: string | null
}

export interface QueryGetProjectId {
  data: {
    project: GetProjectIdType[]
  }
  loading: boolean
  networkStatus: number
}

export interface GetMonthlyType {
  data: {
    events_monthly_to_project: EventMonthProject[]
  }
}

export type EventMonthProject = {
  amount: number
  bucketMonthly: string
  typeId: number
  __typename: string
}

export type GraphData = {
  name: string
  data: number[]
}

export type SeriesGraphType = {
  name: string
  data: number[]
}
