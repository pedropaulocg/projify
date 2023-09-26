import React from 'react'
import { Typography, Button, Card, CardContent, IconButton, Avatar, AvatarGroup } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function ProjectCard() {
  return (
    <Card sx={{width: '30%', minWidth: 350}}>
      <CardContent sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant='caption'>
          26 OCT 2023
        </Typography>
        <IconButton>
          <MoreHorizIcon />
        </IconButton>
      </CardContent>
      <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        <Avatar sx={{ width: 140, height: 140, bgcolor: 'transparent', border: '.5px solid #424242', padding: 1 }}>
          <img src="http://localhost:3030/public/1695740291680logo.svg" alt="" />
        </Avatar>
        <Typography variant='h5' sx={{marginTop: 3}}>
          Projify
        </Typography>
        <Typography variant='body1'>
          This is a description
        </Typography>
        <AvatarGroup max={4}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
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