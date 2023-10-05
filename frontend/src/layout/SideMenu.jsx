import React, { useContext, useEffect, useState } from 'react'
import { Drawer, List, ListItem, ListItemText, ListItemButton, ListItemIcon, Box, IconButton, Typography } from '@mui/material'
import logo from '../assets/logo.svg'
import { styled } from '@mui/material/styles';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import TaskIcon from '@mui/icons-material/Task';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation, useNavigate } from 'react-router-dom';
import { notify } from '../Utils/Notifications';
import { ProjectContext } from '../Contexts/ProjectContext';

function SideMenu({checkToken}) {
  const {setSelectedProject, selectedProject} = useContext(ProjectContext)
  const navigate = useNavigate()
  const location = useLocation()
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(3, 1),
    ...theme.mixins.toolbar,
  }));
  const [active, setActive] = useState()

  useEffect(() => {
    const [, loc] = location.pathname.split('/')
    setActive(loc)
  })

  const handleLeaveProject = () => {
    navigate('/projects')
  }
  const handleLogout = () => {
    notify(`Good bye ${localStorage.getItem("username", "success")}!`);
    localStorage.clear();
    checkToken();
    setSelectedProject(null)
  };

  const handleNavigation = (path) => {
    if (path === active) return
    navigate(`/${path}/${selectedProject}`)
  }
  return (
    <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { width: 280, boxSizing: 'border-box', backgroundColor: '#171f39', position: 'static', height: '100vh'},
          }}
        >
      <DrawerHeader onClick={handleLeaveProject}>
        <img src={logo} alt="" width={260}/>
      </DrawerHeader>
      <Box sx={{position: 'relative', height: '100%'}}>
        <List sx={{color: '#fff', mt: 10}}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigation('dashboard')} sx={active === 'dashboard' ? {color: '#f58e4b'} : {}}>
              <ListItemIcon>
                <DashboardIcon sx={active === 'dashboard' ? {color: '#f58e4b'} : {color: '#fff'}}/>
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigation('kanban')} sx={active === 'kanban' ? {color: '#f58e4b'} : {}}>
              <ListItemIcon>
                <ViewKanbanIcon sx={active === 'kanban' ? {color: '#f58e4b'} : {color: '#fff'}}/>
              </ListItemIcon>
              <ListItemText primary="Kanban"/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigation('tasks')} sx={active === 'tasks' ? {color: '#f58e4b'} : {}}>
              <ListItemIcon>
                <TaskIcon sx={active === 'tasks' ? {color: '#f58e4b'} : {color: '#fff'}}/>
              </ListItemIcon>
              <ListItemText primary="Tasks"/>
            </ListItemButton>
          </ListItem>
        </List>
        <Box sx={{position: 'absolute', bottom: 80, left: 10, width: '80%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', }}>
          {/* <IconButton>
            <AccountCircleIcon sx={{color: 'white'}}/>
          </IconButton> */}
          <IconButton onClick={handleLogout}>
            <LogoutIcon sx={{color: 'white'}}/>
          </IconButton>
        </Box>
      </Box>
    </Drawer>
    
  )
}

export default SideMenu