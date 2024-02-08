import { gql } from '@apollo/client';
import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TempGraph from '../components/Graph';
import ImpactMetric from '../components/ImpactCatalyst/ImpactMetric';
import { client } from '../main';
import { EventMonthProject, GetMonthlyType, QueryGetProjectId, SeriesGraphType } from '../types/impactCata';
import { Project } from '../types/project';

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


    handleGetProjectId()


  }, [])

  if (loading === true) return <div>Loading...</div>

  function handleGetProjectId() {


    if (selectedProject.length !== 0) {


      selectedProject.forEach((item) => {
        // console.log(item["Meta: Project Name"]);

        // get projectId
        const GET_PROJECT_ID = gql`
        query nameToID {
          project(where: { name: { _eq: "${item["Meta: Project Name"]}" } }) {
            id
            name
            description
          }
        }
        `

        // get projectId
        client.query({
          query: GET_PROJECT_ID
        }).then((result: QueryGetProjectId) => {
          const projectId = result?.data?.project[0]?.id
          const typeId = result?.data?.project[0]?.__typename


          if (projectId && typeId) {
            const GET_MONTHLY = gql`
              query idToMonthlyEvent {
                events_monthly_to_project(where:{projectId:{_eq:${projectId}}}){
                  typeId
                  bucketMonthly
                  amount
                }
              }
            `
            client.query({
              query: GET_MONTHLY,

            }).then((res: GetMonthlyType) => {
              let forkedArr:EventMonthProject[] = []
              let staredArr:EventMonthProject[] = []
              let downloadArr:EventMonthProject[] = []

              res.data.events_monthly_to_project.forEach(elem => {
                // 21 = star
                // 23 = forked
                if(elem.typeId === 21){
                  staredArr.push(elem)
                }
                else if(elem.typeId === 23){
                  forkedArr.push(elem)
                }
                else if(elem.typeId === 13){
                  downloadArr.push(elem)
                }
              }); 
              staredArr = staredArr.sort((a, b) => new Date(a.bucketMonthly) - new Date(b.bucketMonthly)).filter((e) => new Date(e.bucketMonthly).getFullYear() == 2023)
              forkedArr = forkedArr.sort((a, b) => new Date(a.bucketMonthly) - new Date(b.bucketMonthly)).filter((e) => new Date(e.bucketMonthly).getFullYear() == 2023)
              downloadArr = downloadArr.sort((a, b) => new Date(a.bucketMonthly) - new Date(b.bucketMonthly)).filter((e) => new Date(e.bucketMonthly).getFullYear() == 2023)
              
              // star
              //@ts-ignore
              let objStar:SeriesGraphType = {}
              objStar.name = result?.data?.project[0].name
              
              let tempStarArr:number[] = []
              staredArr.forEach(starItem => {
                tempStarArr.push(starItem.amount)
              });
              // star
              
              // forked
              //@ts-ignore
              let objforked:SeriesGraphType = {}
              objforked.name = result?.data?.project[0].name
              
              let tempforkedArr:number[] = []
              forkedArr.forEach(forkedItem => {
                tempforkedArr.push(forkedItem.amount)
              });
              // forked
              
              // download
              //@ts-ignore
              let objdownload:SeriesGraphType = {}
              objdownload.name = result?.data?.project[0].name
              
              let tempdownloadArr:number[] = []
              downloadArr.forEach(downloadItem => {
                tempdownloadArr.push(downloadItem.amount)
              });
              // download
              
              objdownload.data = tempdownloadArr
              objforked.data = tempforkedArr
              objStar.data = tempStarArr

              setStar(prev => [...prev, objStar])
              setFork(prev => [...prev, objforked])
              setDownLoad(prev => [...prev, objdownload])
              

            })
          }
        });

      });
    }
  }

  // console.log(download)
  // console.log(star)
  // console.log(fork)


  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-20">
        Impact Calculator
      </h1>
        {download.length !== 0 && star.length !== 0 && fork.length !== 0 ?
      <div className="mb-8">
          <TempGraph
        downloadArr={download}
        staredArr={star}
        forkedArr={fork}
        
        />
     </div>
      :
      <div className="flex justify-center my-16">

      <div role="status">
          <svg aria-hidden="true" className="text-center w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-secondary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
      </div>

      </div>
      }
      <div className="flex flex-row justify-center mb-10">
        <ImpactMetric weightData={weight} weightHandler={setWeight} />

        <div className="overflow-x-auto mx-20">
          <table className="table">
            <thead>
              <tr className="text-base   font-bold text-black">
                <th className="border-r">Project Name</th>
                <th>Total Contributors</th>
                <th>Total Forks</th>
                <th>Total Stars</th>
                <th>Funding: Governance Fund</th>
                <th>Funding: RPGF2</th>
                <th className="border-l">Allocation</th>
              </tr>
            </thead>
            <tbody>
              {selectedProject.map((project: Project) => {
                const allocation = {
                  'Total Contributors':
                    totalStats['Total Contributors'] !== 0
                      ? Number(
                        (project['OSO: Total Contributors'] /
                          totalStats['Total Contributors']) *
                        weight[0]
                      )
                      : 0,
                  'Total Forks':
                    totalStats['Total Forks'] !== 0
                      ? Number(
                        (project['OSO: Total Forks'] /
                          totalStats['Total Forks']) *
                        weight[1]
                      )
                      : 0,
                  'Total Stars':
                    totalStats['Total Stars'] !== 0
                      ? Number(
                        (project['OSO: Total Stars'] /
                          totalStats['Total Stars']) *
                        weight[2]
                      )
                      : 0,
                  'Funding: Governance Fund':
                    totalStats['Funding: Governance Fund'] !== 0
                      ? Number(
                        (project['Funding: Partner Fund'] /
                          totalStats['Funding: Governance Fund']) *
                        weight[3]
                      )
                      : 0,
                  'Funding: RPGF2':
                    totalStats['Funding: RPGF2'] !== 0
                      ? Number(
                        (project['Funding: RPGF2'] /
                          totalStats['Funding: RPGF2']) *
                        weight[4]
                      )
                      : 0,
                }
                const result =
                  allocation['Total Contributors'] +
                  allocation['Total Forks'] +
                  allocation['Total Stars'] +
                  allocation['Funding: Governance Fund'] +
                  allocation['Funding: RPGF2']

                // console.log(weight, allocation, result, opAllocation)
                return (
                  <tr key={project['Project ID']}>
                    {/* <th>{project['Project ID']}</th> */}
                    <td className="border-r">
                      {project['Meta: Project Name']}
                    </td>
                    <td>{project['OSO: Total Contributors']}</td>
                    <td>{project['OSO: Total Forks']}</td>
                    <td>{project['OSO: Total Stars']}</td>
                    <td>{project['Funding: Partner Fund']}</td>
                    <td>{project['Funding: RPGF2']}</td>
                    <td className="flex flex-row border-l">
                      <div>
                        {new Intl.NumberFormat('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(Number((result * opAllocation) / 100))}
                      </div>
                      <div className="flex flex-row justify-end ml-2">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 500 500"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="250" cy="250" r="250" fill="#FF0420" />
                          <path
                            d="M177.133 316.446C162.247 316.446 150.051 312.943 140.544 305.938C131.162 298.808 126.471 288.676 126.471 275.541C126.471 272.789 126.784 269.411 127.409 265.408C129.036 256.402 131.35 245.581 134.352 232.947C142.858 198.547 164.812 181.347 200.213 181.347C209.845 181.347 218.476 182.973 226.107 186.225C233.738 189.352 239.742 194.106 244.12 200.486C248.498 206.74 250.688 214.246 250.688 223.002C250.688 225.629 250.375 228.944 249.749 232.947C247.873 244.08 245.621 254.901 242.994 265.408C238.616 282.546 231.048 295.368 220.29 303.874C209.532 312.255 195.147 316.446 177.133 316.446ZM179.76 289.426C186.766 289.426 192.707 287.362 197.586 283.234C202.59 279.106 206.155 272.789 208.281 264.283C211.158 252.524 213.348 242.266 214.849 233.51C215.349 230.883 215.599 228.194 215.599 225.441C215.599 214.058 209.657 208.366 197.774 208.366C190.768 208.366 184.764 210.43 179.76 214.558C174.882 218.687 171.379 225.004 169.253 233.51C167.001 241.891 164.749 252.149 162.498 264.283C161.997 266.784 161.747 269.411 161.747 272.163C161.747 283.672 167.752 289.426 179.76 289.426Z"
                            fill="white"
                          />
                          <path
                            d="M259.303 314.57C257.927 314.57 256.863 314.132 256.113 313.256C255.487 312.255 255.3 311.13 255.55 309.879L281.444 187.914C281.694 186.538 282.382 185.412 283.508 184.536C284.634 183.661 285.822 183.223 287.073 183.223H336.985C350.87 183.223 362.003 186.1 370.384 191.854C378.891 197.609 383.144 205.927 383.144 216.81C383.144 219.937 382.769 223.19 382.018 226.567C378.891 240.953 372.574 251.586 363.067 258.466C353.685 265.346 340.8 268.786 324.413 268.786H299.082L290.451 309.879C290.2 311.255 289.512 312.38 288.387 313.256C287.261 314.132 286.072 314.57 284.822 314.57H259.303ZM325.727 242.892C330.98 242.892 335.546 241.453 339.424 238.576C343.427 235.699 346.054 231.571 347.305 226.192C347.68 224.065 347.868 222.189 347.868 220.563C347.868 216.935 346.805 214.183 344.678 212.307C342.551 210.305 338.924 209.305 333.795 209.305H311.278L304.148 242.892H325.727Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default ImpactCalculator
