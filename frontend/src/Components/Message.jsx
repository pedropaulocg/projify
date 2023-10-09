import { Avatar, Box, Card, Typography } from '@mui/material'
import React from 'react'

function Message({msg}) {
  const fromMe = () => {
    return Boolean(msg.owner._id === localStorage.getItem('userId'))
  }
  return (
    <Box sx={{width: '100%', display: 'flex',  justifyContent: fromMe() ? 'flex-end' : 'flex-start', alignItems: 'center'}}>
      { !fromMe() && <Avatar src={msg.owner.profilePic ? msg.owner.profilePic : './assets/'} alt={msg.owner.name}/>} 
      <Box sx={{ maxWidth: '40%', minWidth: 50,  bgcolor: fromMe() ? '#9ECDFF' : '#3590F3', p: 1, borderRadius: 5, m: 1, color: fromMe() ? 'black' : '#fff'}}>
        { !fromMe() &&
          <Typography variant="body1" sx={{fontWeight: 600}}>
            {msg.owner.name}
          </Typography>
        }
        {msg.body}
      </Box>
    </Box>
  )
}

export default Message