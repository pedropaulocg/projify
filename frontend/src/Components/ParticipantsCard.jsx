import React from 'react'
import { Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';

function ParticipantsCard({project}) {
  return (
    <Card sx={{p:1, width: '30%', minWidth: 300, height: 300}}>
      <CardContent sx={{p: 0}}>
        <Typography variant="h6" sx={{fontWeight: 600}} color="primary">
          Project team
        </Typography>
      </CardContent>
      <CardContent sx={{p: 0, m: 0}}>
      <List sx={{maxHeight: 250, p: 0, overflowY: 'auto'}}>
        {project && project.participants.length > 0 ? project.participants.map((item, idx) => (
          <ListItem key={item._id}>
            <ListItemAvatar sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
              {project.leader === item._id && <StarIcon />}
              <Avatar src={item.profilePic ? item.profilePic : './assets'} alt={item.name} sx={{mr: 1}}/>
            </ListItemAvatar>
            <ListItemText sx={{flex: 10}} primary={item.name} secondary={item.email}/>
          </ListItem>
        )) : 'No participants'}
      </List>
      </CardContent>
    </Card>
  )
}

export default ParticipantsCard