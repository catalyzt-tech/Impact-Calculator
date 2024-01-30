import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import React from 'react'

const ProjectSelection: React.FC = () => {

  const location = useLocation();
  const selectedCategory: string = location.state?.category

  //to work on
  console.log(selectedCategory)

  const [selectedProject, setSelectedProject] = useState<any[]>([])
  const [newData, setNewData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (selectedCategory) {
      fetch('/static/rpgf3.json')
        .then((res) => res.json())
        .then((data) => {
          const temp = data.filter((project: any) => project[`Category: ${selectedCategory}`] == 1)
          setNewData(temp)
          setLoading(false)
        })
    }
  }, [selectedCategory])

  console.log(newData)



  // function handleProjectSelection(projectName: string) {
  //   if (selectedProject.includes(projectName) && selectedProject.length >= 1) {
  //     const temp = selectedProject.filter((project) => project !== projectName)
  //     setSelectedProject(temp)
  //   } else {
  //     setSelectedProject([...selectedProject, projectName])
  //   }
  // }

  if (loading) {
    return (
      <div className="flex flex-row justify-center items-center text-lg font-medium h-screen">
        {' '}
        Loading...
      </div>
    )
  }
  return (
    <>
      <h1 className="text-center font-bold text-3xl my-20">Projects</h1>
      <div className="overflow-x-auto mx-20">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Category</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {newData.map((project) => (
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src="https://optimism-agora-prod.agora-prod.workers.dev/static/media/ProjectPlaceholder.4224b1d8645af5053465c412b73a25a0.svg" alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{project["Meta: Project Name"]}</div>
                      <div className="text-sm opacity-50">{project["Meta: Bio"]}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {
                    project["Category: Collective Governance"] == 1 ? <span className="badge badge-neutral badge-sm">Collective Governance</span> : <></>
                  }
                  {
                    project["Category: Developer Ecosystem"] == 1 ? <span className="badge badge-neutral badge-sm">Developer Ecosystem</span> : <></>
                  }
                  {
                    project["Category: End User Experience and Adoption"] == 1 ? <span className="badge badge-neutral badge-sm">End User Experience and Adoption</span> : <></>
                  }
                  {
                    project["Category: OP Stack"] == 1 ? <span className="badge badge-neutral badge-sm">OP Stack</span> : <></>
                  }
                </td>
                <td>Purple</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            ))}
            {/* foot */}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </tfoot>

        </table>
      </div>

    </>
  )
}

export default ProjectSelection
