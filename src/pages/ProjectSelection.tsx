import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/ProjectSelection/Card'
import React from 'react'

const ProjectSelection:React.FC = () => {

  const [category, setCategory] = useState<any>('')
  const [newData, setNewData] = useState<any[]>([])
  const [selectedProject, setSelectedProject] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  
  useEffect(() => {
    const loadSite = async () => {
      setCategory(localStorage.getItem('category'))
      // await console.log(category)
    }
    loadSite()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })
  useEffect(() => {
    if (category !== '') {
      fetchData()
    }
  }, [category, fetchData])
  async function fetchData() {
    const data = await fetch('/static/rpgf3.json')
    let temp = await data.json()

    temp = await temp.filter((project: any) => {
      console.log(project[`Category: ${category}`])

      return project[`Category: ${category}`] == 1
    })
    await console.log(temp, `Category: ${category}`)
    await setNewData(temp)
    await setLoading(false)
    // console.log(newData)
  }
  // fetchData()
  // const sampleProject: string[] = [
  //   'Project 1',
  //   'Project 2',
  //   'Project 3',
  //   'Project 4',
  //   'Project 5',
  //   'Project 6',
  //   'Project 7',
  //   'Project 8',
  //   'Project 9',
  //   'Project 10',
  //   'Project 11',
  //   'Project 12',
  //   'Project 13',
  //   'Project 14',
  //   'Project 15',
  //   'Project 16',
  //   'Project 17',
  //   'Project 18',
  // ]

  useEffect(() => {
    console.log(selectedProject)
  }, [selectedProject])

  function handleProjectSelection(projectName: string) {
    if (selectedProject.includes(projectName) && selectedProject.length >= 1) {
      const temp = selectedProject.filter((project) => project !== projectName)
      setSelectedProject(temp)
    } else {
      setSelectedProject([...selectedProject, projectName])
    }
  }

  function saveProjectSelection() {
    localStorage.setItem('projectselection', JSON.stringify(selectedProject))
  }

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
      <div className="flex flex-row flex-wrap items-center justify-center mx-80 ">
        {newData.map((project) => (
          <div
            key={project['Project ID']}
            onClick={() =>
              handleProjectSelection(project['Meta: Project Name'])
            }
          >
            <Card
              projectName={project['Meta: Project Name']}
              projectCategory={category}
              isSelected={selectedProject.includes(
                project['Meta: Project Name']
              )}
            />
          </div>
        ))}
      </div>
      <div className="w-full text-center">
        <Link
          to="/impactcalculator"
          className="px-4 py-2 bg-black text-white rounded-lg"
          onClick={() => saveProjectSelection()}
        >
          Next Page
        </Link>
      </div>
    </>
  )
}

export default ProjectSelection
