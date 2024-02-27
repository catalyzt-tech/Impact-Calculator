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
  'Result: # Ballots': number
  'Result: Median OP': number
  'Result: Quorum Reached': string
  'Result: Received OP': number
  'Meta: Project Name': string
  'Meta: Applicant Type': string
  'Meta: Website': string
  'Meta: Bio': string
  'Meta: Payout Address': string
  'Category: Collective Governance': number
  'Category: Developer Ecosystem': number
  'Category: End User Experience and Adoption': number
  'Category: OP Stack': number
  'Funding: Governance Fund': number
  'Funding: Other': number
  'Funding: Partner Fund': number
  'Funding: RPGF1': number
  'Funding: RPGF2': number
  'Funding: Revenue': number
  'Keywords: Base': number
  'Keywords: Farcaster': number
  'Keywords: Zora': number
  'Link: Contract on Base': number
  'Link: Contract on OP Mainnet': number
  'Link: Dune': number
  'Link: Flipside': number
  'Link: GitHub': number
  'Link: GitHub (duneanalytics)': number
  'Link: GitHub (ethereum)': number
  'Link: GitHub (ethereum-optimism)': number
  'Link: NPM Package': number
  'Link: Optimism Gov': number
  'Link: Substack': number
  'Link: Twitter': number
  'OSO: # GitHub Repos': number
  'OSO: Date First Commit': string
  'OSO: Total Stars': number
  'OSO: Total Forks': number
  'OSO: Total Contributors': number
  'OSO: Contributors Last 6 Months': number
  'OSO: Avg Monthly Active Devs Last 6 Months': number
  'OSO: # OP Contracts': number
  'OSO: Date First Txn': string
  'OSO: Total Onchain Users': number
  'OSO: Onchain Users Last 6 Months': number
  'OSO: Total Txns': string
  'OSO: Total Txn Fees (ETH)': string
  'OSO: Txn Fees Last 6 Months (ETH)': string
  'OSO: # NPM Packages': number
  'OSO: Date First Download': string
  'OSO: Total Downloads': string
  'OSO: Downloads Last 6 Months': string
  'OSO: Has Profile': number
  'GTP: VC Funding Amount': string
  'GTP: Has Token': string
  'GTP: Has VC Funding': number
}
