import React, { useContext, useState } from 'react'
import { Typography, Button, Card, CardContent, IconButton, Avatar, AvatarGroup, Menu, MenuItem } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';
import { ProjectContext } from '../Contexts/ProjectContext'
import { ChangeProjectStatus, LeaveProject } from '../services/ProjectRequest';
import { useConfirm } from 'material-ui-confirm';
import { notify } from '../Utils/Notifications';
import { format } from 'date-fns'
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';

function ProjectCard({project, listProjects, handleEditModal}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const confirm = useConfirm()
  const navigate = useNavigate()
  const { setSelectedProject, setProjectLeader } = useContext(ProjectContext)

  const openProject = () => {
    setSelectedProject(project._id)
    setProjectLeader(project.leader)
    navigate(`/kanban/${project._id}`)
  }

  const handleLeaveProject = () => {
    confirm({ description: `Do you really want to leave ${project.name}? This action is irreversible` })
    .then(async () => {
      await LeaveProject(project._id)
      notify("You left the project successfully", "success")
      listProjects()
    })
    .catch(() => {
    });
  }

  const handleProjectStatus = () => {
    confirm({ description: `Do you really want to deactivate ${project.name}? You can activate again.` })
    .then(async () => {
      await ChangeProjectStatus(project._id)
      notify("You deactivated the project successfully", "success")
      listProjects()
    })
    .catch(() => {
    });
  }
  return (
    <Card sx={{width: '40%', minWidth: 350, margin: 2}}>
      <CardContent sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant='caption'>
          {format(new Date(project.updatedAt), 'dd LLL yyyy')}
        </Typography>
        <div>
          <IconButton onClick={handleOpenMenu}>
            <MoreHorizIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleCloseMenu}><InfoIcon sx={{mr: 1}}/>Info</MenuItem>
            { project.leader === localStorage.getItem('userId') && <MenuItem onClick={() => handleEditModal(project)}><EditIcon sx={{mr: 1}}/>  Edit</MenuItem> }
          </Menu>
        </div>
      </CardContent>
      <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        <Avatar sx={{ width: 140, height: 140, bgcolor: '#DDDDD'}}>
          { project.picture ? 
            <img src={project.picture} alt="" style={{width: '-webkit-fill-available'}}/>
            :
            <AssignmentIcon color='light' sx={{fontSize: 100}}/>
          }
        </Avatar>
        <Typography variant='h5' sx={{marginTop: 3}}>
          {project.name}
        </Typography>
        <Typography variant='body1' sx={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', width: '90%', textAlign: 'center'}}>
          {project.description}
        </Typography>
        <AvatarGroup max={4}>
          {project.participants.map(item => (
            <Avatar key={item._id} alt={item.name} src={item.profilePic ? item.profilePic : './assets'} />
          ))}
        </AvatarGroup>
      </CardContent>
      <CardContent sx={{marginTop: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Button color='error' onClick={project.leader === localStorage.getItem('userId') ? handleProjectStatus : handleLeaveProject}>{ project.leader === localStorage.getItem('userId') ? 'Deactivate project' : 'Leave project' }</Button>
        <Button variant='contained' onClick={openProject}>Open project</Button>
      </CardContent>
    </Card>
  )
}

export default ProjectCard