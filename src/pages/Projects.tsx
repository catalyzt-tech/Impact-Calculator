import { FC, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Search from '../components/Search'
import { ProjectType } from '../types/project'

const Projects: FC = () => {
  const location = useLocation()
  const selectedCategory: string = location.state?.category

  const [selectedProject, setSelectedProject] = useState<ProjectType[]>([])
  const [displayData, setDisplayData] = useState<ProjectType[]>([])
  const [originData, setOriginData] = useState<ProjectType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [Pagination, setPagination] = useState<number>(20)
  const [checkMark, setCheckMark] = useState<number>(0)

  // const shuffle = (array: Project[]) => {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1))
  //     ;[array[i], array[j]] = [array[j], array[i]]
  //   }
  //   return array
  // }

  useEffect(() => {
    if (selectedCategory) {
      console.log('fetching displayData')
      fetch('/static/rpgf3_oso.json')
        .then((res) => res.json())
        .then((d) => {
          const temp = d.filter(
            (project: ProjectType) =>
              project[`Category: ${selectedCategory}`] == 1
          )
          setDisplayData(temp)
          setOriginData(temp)
          setLoading(false)
        })
    }
  }, [selectedCategory])

  const handleCheckboxChange = (project: Project) => {
    setSelectedProject((prevState) => {
      if (prevState.includes(project)) {
        return prevState.filter((proj) => proj !== project)
      } else {
        return [...prevState, project]
      }
    })
    // console.log('selectedProject')
    // console.log(selectedProject)
  }

  const handleSelectAll = () => {
    if (selectedProject.length === displayData.length) {
      setSelectedProject([])
      setCheckMark(0)
    } else {
      setSelectedProject(displayData)
      setCheckMark(1)
    }
  }

  const handleSeemore = () => {
    setPagination(Pagination + 20)
  }

  if (loading || !location.state?.category) {
    return (
      <div className="flex flex-row justify-center items-center text-lg font-medium h-screen">
        Loading...
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center mx-20 mb-28">
      <h1 className="text-center font-bold text-3xl mt-10">Projects</h1>
      <Search originData={originData} setData={setDisplayData} />
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}

          {/* {checkMark === 0 ? <div>Select All</div> : <div>Unselect All</div>} */}
          <thead>
            <tr>
              <th>
                {' '}
                <input
                  type="checkbox"
                  className="checkbox checkbox-marked"
                  onClick={() => handleSelectAll()}
                />
              </th>
              <th>Name</th>
              <th>
                <div className="ml-3">Category</div>
              </th>
              <th>In List</th>
            </tr>
          </thead>
          <tbody>
            {displayData.slice(0, Pagination).map((project) => (
              <tr key={project['Meta: Project Name']}>
                <th>
                  <form action="">
                    <label>
                      {''}
                      <input
                        type="checkbox"
                        className="checkbox checkbox-marked"
                        onChange={() => handleCheckboxChange(project)}
                        checked={selectedProject.includes(project)}
                      />
                    </label>
                  </form>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        {/* <img
                          src="https://optimism-agora-prod.agora-prod.workers.dev/static/media/ProjectPlaceholder.4224b1d8645af5053465c412b73a25a0.svg"
                          alt="Avatar Tailwind CSS Component"
                        /> */}
                        <img
                          src={
                            project['Profile'] != ''
                              ? project['Profile']
                              : 'https://optimism-agora-prod.agora-prod.workers.dev/static/media/ProjectPlaceholder.4224b1d8645af5053465c412b73a25a0.svg'
                          }
                          alt=""
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {project['Meta: Project Name']}
                      </div>
                      <div className="text-sm font-normal opacity-50">
                        {project['Meta: Bio']}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="">
                  {project['Category: Collective Governance'] == 1 ? (
                    <span className="badge badge-ghost badge-sm ml-2">
                      Collective Governance
                    </span>
                  ) : (
                    <></>
                  )}
                  {project['Category: Developer Ecosystem'] == 1 ? (
                    <span className="badge badge-ghost badge-sm ml-2">
                      Developer Ecosystem
                    </span>
                  ) : (
                    <></>
                  )}
                  {project['Category: End User Experience and Adoption'] ==
                  1 ? (
                    <span className="badge badge-ghost badge-sm ml-2">
                      End User Experience and Adoption
                    </span>
                  ) : (
                    <></>
                  )}
                  {project['Category: OP Stack'] == 1 ? (
                    <span className="badge badge-ghost badge-sm ml-2">
                      OP Stack
                    </span>
                  ) : (
                    <></>
                  )}
                </td>
                <td className="font-normal">{project['Result: # Ballots']}</td>
                {/* <th>
                  <button className="btn btn-ghost btn-xs">Details</button>
                </th> */}
              </tr>
            ))}
            {/* foot */}
          </tbody>
        </table>
        {}
        <div className="flex flex-row justify-center">
          <button
            onClick={() => handleSeemore()}
            className="btn btn-sm self-end my-4 justify-center"
          >
            See more
          </button>
        </div>
      </div>
      {/* link to impact page with state "selectedProject" */}

      {selectedProject.length > 0 ? (
        <Link to="/impact" state={{ selectedProject: selectedProject }}>
          <button className="btn btn-secondary mt-8 px-20 bg-[#ff0000] hover:bg-[#ff0000]">
            Continue
          </button>
        </Link>
      ) : (
        <button className="btn btn-secondary  mt-8 px-20" disabled>
          Continue
        </button>
      )}
    </div>
  )
}

export default Projects
