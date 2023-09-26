import React, { useEffect, useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import ProjectCard from '../Components/ProjectCard'
import { ListProjects } from '../services/ProjectRequest'
import { notify } from '../Utils/Notifications';

function Projects() {
  const [projects, setProjects] = useState([])
  const listProjects = async () => {
    try {
      const { data } = ListProjects()
      setProjects(data)
    } catch(e){
      notify('Inexpected error', 'error')
    }
  }
  useEffect(()=>{
    listProjects()
  }, [])
  return (
    <div style={{margin: 'auto', width: '80%'}}>
      <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginY: 5}}>
        <Typography variant="h4">
          Project list
        </Typography>
        <Button variant='contained'>Create project</Button>
      </Box>
      <div>
        <ProjectCard/>
      </div>
    </div>
  )
}

export default Projects