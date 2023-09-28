import React from 'react'
import { Typography, Button, Card, CardContent, IconButton, Avatar, AvatarGroup } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AssignmentIcon from '@mui/icons-material/Assignment';

function ProjectCard({project}) {
  return (
    <Card sx={{width: '30%', minWidth: 350, margin: 2}}>
      <CardContent sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant='caption'>
          26 OCT 2023
        </Typography>
        <IconButton>
          <MoreHorizIcon />
        </IconButton>
      </CardContent>
      <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        <Avatar sx={{ width: 140, height: 140, bgcolor: 'transparent'}}>
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
        <Button color='error'>leave project</Button>
        <Button variant='contained'>Open project</Button>
      </CardContent>
    </Card>
  )
}

export default ProjectCard