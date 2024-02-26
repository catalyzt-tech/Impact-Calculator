import { gql } from '@apollo/client'
import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import TempGraph from '../components/ImpactCatalyst/Graph'
import ImpactVector from '../components/ImpactCatalyst/ImpactVector'
import Table from '../components/ImpactCatalyst/Table'
import { client } from '../main'
import {
  EventMonthProject,
  GetMonthlyType,
  QueryGetProjectId,
  SeriesGraphType,
} from '../types/impactCata'
import { Project } from '../types/project'

interface TotalStats {
  'Total Contributors': number
  'Total Forks': number
  'Total Stars': number
  'Funding: Governance Fund': number
  'Funding: RPGF2': number
}

const ImpactCalculator: FC = () => {
  const location = useLocation()
  const selectedProject: Project[] = location.state?.selectedProject || []
  const opAllocation: number = 10000000
  const [loading, setLoading] = useState(true)
  const [weight, setWeight] = useState([20, 20, 20, 20, 20])
  const [totalStats, setTotalStats] = useState<TotalStats>({
    'Total Contributors': 0,
    'Total Forks': 0,
    'Total Stars': 0,
    'Funding: Governance Fund': 0,
    'Funding: RPGF2': 0,
  })

  const [star, setStar] = useState<SeriesGraphType[]>([])
  const [fork, setFork] = useState<SeriesGraphType[]>([])
  const [download, setDownLoad] = useState<SeriesGraphType[]>([])

  useEffect(() => {
    const updatedStats = selectedProject.reduce(
      (acc, project) => {
        const contributors = Number(project['OSO: Total Contributors'])
        const forks = Number(project['OSO: Total Forks'])
        const stars = Number(project['OSO: Total Stars'])
        const governanceFund = Number(project['Funding: Partner Fund'])
        const rpgf2 = Number(project['Funding: RPGF2'])
        return {
          'Total Contributors': acc['Total Contributors'] + contributors,
          'Total Forks': acc['Total Forks'] + forks,
          'Total Stars': acc['Total Stars'] + stars,
          'Funding: Governance Fund':
            acc['Funding: Governance Fund'] + governanceFund,
          'Funding: RPGF2': acc['Funding: RPGF2'] + rpgf2,
        }
      },
      {
        'Total Contributors': 0,
        'Total Forks': 0,
        'Total Stars': 0,
        'Funding: Governance Fund': 0,
        'Funding: RPGF2': 0,
      }
    )
    setTotalStats(updatedStats)
    setLoading(false)
  }, [])

  if (loading === true) return <div>Loading...</div>

  // function handleGetProjectId() {
  //   if (selectedProject.length !== 0) {
  //     selectedProject.forEach((item) => {
  //       // console.log(item["Meta: Project Name"]);

  //       // get projectId
  //       const GET_PROJECT_ID = gql`
  //       query nameToID {
  //         project(where: { name: { _eq: "${item['Meta: Project Name']}" } }) {
  //           id
  //           name
  //           description
  //         }
  //       }
  //       `

  //       // get projectId
  //       client
  //         .query({
  //           query: GET_PROJECT_ID,
  //         })
  //         .then((result: QueryGetProjectId) => {
  //           const projectId = result?.data?.project[0]?.id
  //           const typeId = result?.data?.project[0]?.__typename

  //           if (projectId && typeId) {
  //             const GET_MONTHLY = gql`
  //             query idToMonthlyEvent {
  //               events_monthly_to_project(where:{projectId:{_eq:${projectId}}}){
  //                 typeId
  //                 bucketMonthly
  //                 amount
  //               }
  //             }
  //           `
  //             client
  //               .query({
  //                 query: GET_MONTHLY,
  //               })
  //               .then((res: GetMonthlyType) => {
  //                 let forkedArr: EventMonthProject[] = []
  //                 let staredArr: EventMonthProject[] = []
  //                 let downloadArr: EventMonthProject[] = []

  //                 res.data.events_monthly_to_project.forEach((elem) => {
  //                   // 21 = star
  //                   // 23 = forked
  //                   if (elem.typeId === 21) {
  //                     staredArr.push(elem)
  //                   } else if (elem.typeId === 23) {
  //                     forkedArr.push(elem)
  //                   } else if (elem.typeId === 13) {
  //                     downloadArr.push(elem)
  //                   }
  //                 })
  //                 staredArr = staredArr
  //                   .sort(
  //                     (a, b) =>
  //                       new Date(a.bucketMonthly) - new Date(b.bucketMonthly)
  //                   )
  //                   .filter(
  //                     (e) => new Date(e.bucketMonthly).getFullYear() == 2023
  //                   )
  //                 forkedArr = forkedArr
  //                   .sort(
  //                     (a, b) =>
  //                       new Date(a.bucketMonthly) - new Date(b.bucketMonthly)
  //                   )
  //                   .filter(
  //                     (e) => new Date(e.bucketMonthly).getFullYear() == 2023
  //                   )
  //                 downloadArr = downloadArr
  //                   .sort(
  //                     (a, b) =>
  //                       new Date(a.bucketMonthly) - new Date(b.bucketMonthly)
  //                   )
  //                   .filter(
  //                     (e) => new Date(e.bucketMonthly).getFullYear() == 2023
  //                   )

  //                 // star
  //                 //@ts-ignore
  //                 let objStar: SeriesGraphType = {}
  //                 objStar.name = result?.data?.project[0].name

  //                 let tempStarArr: number[] = []
  //                 staredArr.forEach((starItem) => {
  //                   tempStarArr.push(starItem.amount)
  //                 })
  //                 // star

  //                 // forked
  //                 //@ts-ignore
  //                 let objforked: SeriesGraphType = {}
  //                 objforked.name = result?.data?.project[0].name

  //                 let tempforkedArr: number[] = []
  //                 forkedArr.forEach((forkedItem) => {
  //                   tempforkedArr.push(forkedItem.amount)
  //                 })
  //                 // forked

  //                 // download
  //                 //@ts-ignore
  //                 let objdownload: SeriesGraphType = {}
  //                 objdownload.name = result?.data?.project[0].name

  //                 let tempdownloadArr: number[] = []
  //                 downloadArr.forEach((downloadItem) => {
  //                   tempdownloadArr.push(downloadItem.amount)
  //                 })
  //                 // download

  //                 objdownload.data = tempdownloadArr
  //                 objforked.data = tempforkedArr
  //                 objStar.data = tempStarArr

  //                 setStar((prev) => [...prev, objStar])
  //                 setFork((prev) => [...prev, objforked])
  //                 setDownLoad((prev) => [...prev, objdownload])
  //                 console.log
  //               })
  //           }
  //         })
  //     })
  //   }
  // }

  // console.log(download)
  // console.log(star)
  // console.log(fork)

  const handleGetProjectId = () => {
    const mockStar = {
      name: 'Project 1',
      data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
    }
    const mockFork = {
      name: 'Project 2',
      data: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240],
    }
    const mockDownload = {
      name: 'Project 3',
      data: [30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360],
    }
    setStar((prev) => [...prev, mockStar])
    setFork((prev) => [...prev, mockFork])
    setDownLoad((prev) => [...prev, mockDownload])
  }
  return (
    <>
      <h1 className="text-center font-bold text-2xl my-8">
        Impact Calculator
      </h1>
      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-3 border pt-10">
          <TempGraph downloadArr={download} staredArr={star} forkedArr={fork} />
        </div>
        <div className="flex flex-col justify-center border ">
          <ImpactVector weightData={weight} weightHandler={setWeight} />
        </div>
        <div className="col-span-3 border">
          <Table
            selectedProject={selectedProject}
            totalStats={totalStats}
            weight={weight}
          />
        </div>
      </div>
    </>
  )
}
export default ImpactCalculator
