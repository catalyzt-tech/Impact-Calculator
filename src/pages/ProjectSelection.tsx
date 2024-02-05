import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Project } from '../types/project'
import { FC } from 'react'

const ProjectSelection: FC = () => {
  const location = useLocation()
  const selectedCategory: string = location.state?.category

  //to work on

  const [selectedProject, setSelectedProject] = useState<Project[]>([])
  const [Data, setData] = useState<Project[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [showProject, setShowProject] = useState<number>(20)

  const shuffle = (array: Project[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  useEffect(() => {
    if (selectedCategory) {
      console.log('fetching data')
      fetch('/static/rpgf3.json')
        .then((res) => res.json())
        .then((data) => {
          const temp = data.filter(
            (project: Project) =>
              project[`Category: ${selectedCategory}` as keyof Project] == 1
          )
          setData(shuffle(temp))
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
    console.log(selectedProject)
  }

  const handleSeemore = () => {
    setShowProject(showProject + 20)
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
      <h1 className="text-center font-bold text-3xl my-20">Projects</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Category</th>
              <th>In List</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Data.slice(0, showProject).map((project) => (
              <tr>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-secondary border-accent"
                      onChange={() => handleCheckboxChange(project)}
                    />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src="https://optimism-agora-prod.agora-prod.workers.dev/static/media/ProjectPlaceholder.4224b1d8645af5053465c412b73a25a0.svg"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {project['Meta: Project Name']}
                      </div>
                      <div className="text-sm opacity-50">
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
                <td>19</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
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
      <Link to="/impact" state={{ selectedProject: selectedProject }}>
        <button className="btn btn-secondary  self-end mt-8 px-20">
          Continue
        </button>
      </Link>
    </div>
  )
}

export default ProjectSelection
