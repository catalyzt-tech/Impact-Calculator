import { Project } from '../../types/project'

interface TableProps {
  selectedProject: Project[]
  totalStats: TotalStats
  weight: number[]
}
const Table = ({ selectedProject, totalStats, weight }: TableProps) => {
  const opAllocation = 30000000
  console.log(selectedProject, totalStats, weight)
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-sm text-black bg-slate-100">
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
            {selectedProject.map((project) => {
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
                  <td className="border-r">{project['Meta: Project Name']}</td>
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
    </>
  )
}
export default Table
