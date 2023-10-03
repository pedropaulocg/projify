import React from 'react'
import { Drawer, List, ListItem, ListItemText, ListItemButton, ListItemIcon, Box, IconButton } from '@mui/material'
import logo from '../assets/logo.svg'
import { styled } from '@mui/material/styles';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import TaskIcon from '@mui/icons-material/Task';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

function SideMenu() {
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(3, 1),
    ...theme.mixins.toolbar,
  }));
  return (
    <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { width: 280, boxSizing: 'border-box', backgroundColor: '#171f39', position: 'static', height: '100vh'},
          }}
        >
      <DrawerHeader>
        <img src={logo} alt="" width={260}/>
      </DrawerHeader>
      <Box sx={{position: 'relative', height: '100%'}}>
        <List sx={{color: '#fff', mt: 10}}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon sx={{color: '#fff'}}/>
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ViewKanbanIcon sx={{color: '#fff'}}/>
              </ListItemIcon>
              <ListItemText primary="Kanban"/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <TaskIcon sx={{color: '#fff'}}/>
              </ListItemIcon>
              <ListItemText primary="Tasks"/>
            </ListItemButton>
          </ListItem>
        </List>
        <Box sx={{position: 'absolute', bottom: 80, left: 10, width: '80%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', }}>
          <IconButton>
            <SettingsIcon sx={{color: 'white'}}/>
          </IconButton>
          <IconButton>
            <LogoutIcon sx={{color: 'white'}}/>
          </IconButton>
        </Box>
      </Box>
    </Drawer>
    
  )
}

export default SideMenu