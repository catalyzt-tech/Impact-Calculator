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
export type Project = {
  'Project ID': string
  'Result: # Ballots': number | string
  'Result: Median OP': number | string
  'Result: Quorum Reached': string
  'Result: Received OP': number | string
  'Meta: Project Name': string
  'Meta: Applicant Type': string
  'Meta: Website': string
  'Meta: Bio': string
  'Meta: Payout Address': string
  'Category: Collective Governance': number | string
  'Category: Developer Ecosystem': number | string
  'Category: End User Experience and Adoption': number | string
  'Category: OP Stack': number | string
  'Funding: Governance Fund': number | string
  'Funding: Other': number | string
  'Funding: Partner Fund': number | string
  'Funding: RPGF1': number | string
  'Funding: RPGF2': number | string
  'Funding: Revenue': number | string
  'Keywords: Base': number | string
  'Keywords: Farcaster': number | string
  'Keywords: Zora': number | string
  'Link: Contract on Base': number | string
  'Link: Contract on OP Mainnet': number | string
  'Link: Dune': number | string
  'Link: Flipside': number | string
  'Link: GitHub': number | string
  'Link: GitHub (duneanalytics)': number | string
  'Link: GitHub (ethereum)': number | string
  'Link: GitHub (ethereum-optimism)': number | string
  'Link: NPM Package': number | string
  'Link: Optimism Gov': number | string
  'Link: Substack': number | string
  'Link: Twitter': number | string
  'OSO: # GitHub Repos': number | string
  'OSO: Date First Commit': string
  'OSO: Total Stars': number | string
  'OSO: Total Forks': number | string
  'OSO: Total Contributors': number | string
  'OSO: Contributors Last 6 Months': number | string
  'OSO: Avg Monthly Active Devs Last 6 Months': number | string
  'OSO: # OP Contracts': number | string
  'OSO: Date First Txn': string
  'OSO: Total Onchain Users': number | string
  'OSO: Onchain Users Last 6 Months': number | string
  'OSO: Total Txns': string
  'OSO: Total Txn Fees (ETH)': string
  'OSO: Txn Fees Last 6 Months (ETH)': string
  'OSO: # NPM Packages': number | string
  'OSO: Date First Download': string
  'OSO: Total Downloads': string
  'OSO: Downloads Last 6 Months': string
  'OSO: Has Profile': number | string
  'GTP: VC Funding Amount': string
  'GTP: Has Token': string
  'GTP: Has VC Funding': number | string
}
