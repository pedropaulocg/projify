import React, { useContext, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { ProjectContext } from '../Contexts/ProjectContext'
import { GetProjectById } from '../services/ProjectRequest'
import { useParams } from 'react-router-dom'

function Dashboard() {
  const [project, setProject] = useState(null)
  const { projectId } = useParams()
  const getProject = async () => {
    const { data } = await GetProjectById(projectId)
    setProject(data)
  } 
  useEffect(() => {
    getProject()
  }, [])
  return (
    <Box component={'div'}>
      <Box sx={{}}>
        <Box>
          <Typography variant="h2">
            Welcome to { project && project.name} 
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard