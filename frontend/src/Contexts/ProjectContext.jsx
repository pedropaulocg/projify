import React, { createContext, useState } from 'react'
import { io } from 'socket.io-client'
export const ProjectContext = createContext()

function ProjectProvider({children}) {
  const [ projects, setProjects ] = useState([])
  const [ isEdit, setIsEdit ] = useState(false)
  const [ selectedProject, setSelectedProject ] = useState()
  const [ projectLeader, setProjectLeader ] = useState()
  const socket = io(process.env.REACT_APP_API)
  
  return (
    <ProjectContext.Provider value={{projects, setProjects, isEdit, setIsEdit, selectedProject, setSelectedProject, projectLeader, setProjectLeader, socket}}>
      {children}
    </ProjectContext.Provider>
  )
}

export default ProjectProvider