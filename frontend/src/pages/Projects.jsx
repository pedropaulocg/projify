import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, Grid } from '@mui/material'
import ProjectCard from '../Components/ProjectCard'
import { ListProjects } from '../services/ProjectRequest'
import { notify } from '../Utils/Notifications';
import ModalProject from '../Components/ModalProject';

function Projects() {
  const [projects, setProjects] = useState([])
  const [projectModal, setProjectModal] = useState(false)

  const listProjects = async () => {
    try {
      const { data } = await ListProjects()

      setProjects(data)

    } catch(e){
      notify('Inexpected error', 'error')
    }
  }
  useEffect(()=>{
    listProjects()
  }, [])

  return (
    <Box element='div' sx={{margin: 'auto', width: '75%'}}>
      <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginY: 5}}>
        <Typography variant="h4">
          Project list
        </Typography>
        <Button variant='contained' onClick={() => setProjectModal(true)}>Create project</Button>
      </Box>
      <Grid container sx={{margin: 'auto', width: '100%'}} justifyContent={'start'}>
        {projects.map(item => (
          <Grid lg={4} md={6} xs={12} key={item._id}>
            <ProjectCard project={item} style={{margin: 10}}/>
          </Grid>
        ))}
      </Grid>
      <ModalProject setProjectModal={setProjectModal} projectModal={projectModal} listProjects={listProjects}/>
    </Box>
  )
}

export default Projects