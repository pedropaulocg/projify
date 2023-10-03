import React, { useContext, useEffect, useState } from 'react'
import { Box, Typography, Button, Grid, TextField, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ProjectCard from '../Components/ProjectCard'
import { ListFilteredProject, ListProjects } from '../services/ProjectRequest'
import { notify } from '../Utils/Notifications';
import ModalProject from '../Components/ModalProject';
import { ProjectContext } from '../Contexts/ProjectContext';
import { useLocation } from 'react-router-dom';

function Projects() {
  const location = useLocation()
  const { projects, setProjects, isEdit } = useContext(ProjectContext)
  const [projectModal, setProjectModal] = useState(false)
  const [filter, setFilter] = useState('')
  const { setSelectedProject } = useContext(ProjectContext)
  const [editProject, setEditProject] = useState()
  const filterProject = async (e) => {
    e.preventDefault()
    const params = {
      match: filter
    }
    const { data } = await ListFilteredProject(params)
    setProjects(data)
  }
  const listProjects = async () => {
    try {
      const { data } = await ListProjects()

      setProjects(data)

    } catch(e){
      notify('Something went wrong :(', 'error')
    }
  }
  useEffect(()=>{
    listProjects()
  }, [isEdit])
  useEffect(()=>{
    if(location.pathname === '/projects') {
      setSelectedProject(null)
    }
  }, [])

  const handleEditModal = (project) => {
    setEditProject(project)
    setProjectModal(true)
  }

  return (
    <Box element='div' sx={{margin: 'auto', width: '75%'}}>
      <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginY: 5}}>
        <Typography variant="h4">
          Project list
        </Typography>
        <Button variant='contained' onClick={() => setProjectModal(true)}>Create project</Button>
      </Box>
      <form onSubmit={filterProject}>
        <TextField
          id="outlined-start-adornment"
          placeholder='Search project'
          size='small'
          onChange={(e) => setFilter(e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end"><IconButton type='submit'><SearchIcon /></IconButton></InputAdornment>,
          }}
        />
      </form>
      <Grid container sx={{margin: 'auto', width: '100%'}} justifyContent={'start'}>
        {projects.map(item => (
          <Grid lg={4} md={6} xs={12} key={item._id}>
            <ProjectCard project={item} listProjects={listProjects} handleEditModal={handleEditModal}/>
          </Grid>
        ))}
      </Grid>
      <ModalProject setProjectModal={setProjectModal} projectModal={projectModal} listProjects={listProjects} editProject={editProject} setEditProject={setEditProject}/>
    </Box>
  )
}

export default Projects