import React, { useContext, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { ProjectContext } from '../Contexts/ProjectContext'
import { GetProjectById } from '../services/ProjectRequest'
import { useParams } from 'react-router-dom'
import ParticipantsCard from '../Components/ParticipantsCard'
import TaskCard from '../Components/TaskCard'
import TaskPerUserChart from '../Components/TaskPerUserChart'

function Dashboard() {
  const [project, setProject, projectLeader] = useState(null)
  const { selectedProject, setSelectedProject } = useContext(ProjectContext)
  const { projectId } = useParams()
  const getProject = async () => {
    const { data } = await GetProjectById(projectId)
    setProject(data)
  } 
  useEffect(() => {
    getProject()
  }, [])
  useEffect(() => {
    if(!selectedProject) {
      setSelectedProject(projectId)
    }
  },[])

  return (
    <Box component={'div'} sx={{p: 2, width: '100%', height: '100vh', overflowY: 'auto'}}>
      <Box sx={{p: 2}}>
        <Box>
          <Typography variant="h4" color='primary'  sx={{fontWeight: 600}}>
            Welcome { localStorage.getItem('username') }!
          </Typography>
          <Typography variant="h6">
            Here is your dashboard for <strong>{ project && project.name }</strong>
          </Typography>
        </Box>
      </Box>
      <Box component={'div'} sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <ParticipantsCard project={project}/>
        <TaskCard project={project} />
      </Box>
      <Box component={'div'}>
        <TaskPerUserChart />
      </Box>
    </Box>
  )
}

export default Dashboard