import { useEffect, useState } from 'react'
import Card from '../components/ProjectSelection/Card'

function ProjectSelection() {
  useEffect(() => {
    const data = localStorage.getItem('category')
    console.log(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sampleProject: string[] = [
    'Project 1',
    'Project 2',
    'Project 3',
    'Project 4',
    'Project 5',
    'Project 6',
    'Project 7',
    'Project 8',
    'Project 9',
    'Project 10',
    'Project 11',
    'Project 12',
    'Project 13',
    'Project 14',
    'Project 15',
    'Project 16',
    'Project 17',
    'Project 18',
  ]

  let [selectedProject, setSelectedProject] = useState<string[]>([])

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

  return (
    <>
      <h1 className="text-center font-bold text-3xl my-20">Projects</h1>
      <div className="flex flex-row flex-wrap items-center justify-center mx-80 ">
        {sampleProject.map((projectName) => (
          <div
            key={projectName}
            onClick={() => handleProjectSelection(projectName)}
          >
            <Card
              projectName={projectName}
              isSelected={selectedProject.includes(projectName)}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default ProjectSelection
