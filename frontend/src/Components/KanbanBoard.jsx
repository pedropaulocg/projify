import React from 'react'
import { Card, Typography, Avatar, Box, Button} from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import AddIcon from '@mui/icons-material/Add';

function KanbanBoard({board}) {
  console.log(board)
  return (
    <Box>
      <Card sx={{bgcolor: '#EAEFF5',width: 300, padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `5px solid ${board.color}`}}>
        <Typography variant='h6'>{board.name}</Typography>
        <Avatar sx={{width: 30, height: 30}}>
          2
        </Avatar>
      </Card>
      <Card sx={{bgcolor: '#EAEFF5', mt: 1, py: 2, px: 0.5, height: '60vh'}}>
        <Card sx={{padding: 1, width: '100%'}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box>
              <Typography variant='h6'>Create drag and drop</Typography>
              <Typography variant='subtitle2'><CircleIcon  sx={{fontSize: 10, color: 'green'}}/> Medium</Typography>
            </Box>
              <Typography variant='caption'>
                #1
              </Typography>
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <Box>
              <Typography variant='caption' sx={{display: 'block'}}>
                Last update: 29/09/2023
              </Typography>
            </Box>
            <Avatar alt='Pedro' src='./'/>
          </Box>
        </Card>
        <Button fullWidth variant='outlined' sx={{mt: 2}}><AddIcon />  New Task</Button>
      </Card>
    </Box>
  )
}

export default KanbanBoard