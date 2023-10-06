import React, { useEffect, useState } from 'react'
import { Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Select, MenuItem, Tooltip } from '@mui/material'
import { GetTaskPerPeriod } from '../services/Taskservice';
import { useParams } from 'react-router-dom';
import CircleIcon from '@mui/icons-material/Circle'
import ContentPasteIcon from '@mui/icons-material/ContentPaste';


function TaskCard({project}) {
  const [tasks, setTasks] = useState()
  const { projectId } = useParams()
  const getTaskPerPeriod = async (e) => {
    const params = {
      period: 'day'
    }
    if (e?.target.value){
      params.period = e.target.value
    }
    console.log(project)
    const { data } = await GetTaskPerPeriod(projectId, params)
    setTasks(data)
  }

  useEffect(() => {
    getTaskPerPeriod()
  }, [])

  return (
    <Card sx={{p:1, width: '68%', minWidth: 600, height: 300}}>
      <CardContent sx={{p: 0, display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="h6" sx={{fontWeight: 600}} color="primary">
          Tasks 
        </Typography>
        <Select  defaultValue={'day'} size='small' onChange={getTaskPerPeriod}>
          <MenuItem value='day'>Today</MenuItem>
          <MenuItem value='week'>This week</MenuItem>
          <MenuItem value='month'>This Month</MenuItem>
        </Select>
      </CardContent>
      <CardContent sx={{p: 0, m: 0}}>
        <List sx={{overflowY: 'auto', height: 270, p: 1}}>
        {tasks && tasks.length > 0 ? 
          tasks.map(task => (
            <ListItem>
              <Tooltip title={task.board.name}>
                <ContentPasteIcon sx={{fontSize: 10, mr: 1, color: task.board.color}}/>
              </Tooltip>
              <ListItemText primary={task.name}/>
              <CircleIcon  sx={{fontSize: 10, color: task.priority === 1 ? 'green' : task.priority === 2 ? 'orange' : 'red'}}/>
            </ListItem>
          ))
          :
          'No tasks yet'
        }
        </List>
      </CardContent>
    </Card>
  )
}

export default TaskCard