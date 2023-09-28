import React, { createContext, useState } from 'react'

export const ProjectContext = createContext()

function ProjectProvider({children}) {
  const [ projects, setProjects ] = useState([])
  const [ isEdit, setIsEdit ] = useState(false)
  const [ selectedProject, setSelectedProject ] = useState()

  return (
    <ProjectContext.Provider value={{projects, setProjects, isEdit, setIsEdit, selectedProject, setSelectedProject}}>
      {children}
    </ProjectContext.Provider>
  )
}

export default ProjectProvider