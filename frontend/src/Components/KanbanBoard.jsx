import React, { useState, useEffect } from 'react'
import { Card, Typography, Avatar, Box, Button} from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import AddIcon from '@mui/icons-material/Add';
import ModalTask from './ModalTask';
import { useParams } from 'react-router-dom';
import { ChangeCardBoard, ListTasks } from '../services/Taskservice';
import { format } from 'date-fns'

function KanbanBoard({board}) {
  const [taskModal, setTaskModal] = useState(false)
  const [tasks, setTasks] = useState()
  const [task, setTask] = useState()
  const { projectId } = useParams()

  const listCards = async () => {
    const { _id: boardId } = board
    const { data } = await ListTasks(projectId, boardId)
    setTasks(data)
  }
  useEffect(() => {
    listCards()
  }, [])

  const handleTaskDetail = (selectedTask) => {
    setTask(selectedTask)
    setTaskModal(true)
  }
  const startDragEv = (e) => {
    e.dataTransfer.clearData()
    console.log(e.dataTransfer.types)
    e.dataTransfer.setData('text/plain', e.target.id)
  }
  const handleDrop = async (e) => {
    e.preventDefault()
    const taskId = e.dataTransfer.getData('text')
    const data = {
      taskId,
      destiantionBoard: board._id
    }
    await ChangeCardBoard(data)
    listCards()
  }
  const handleDragEnd = (e) => {
    const taskCopy = [...tasks]
    const taskId = e.dataTransfer.getData('text')
    const index = taskCopy.findIndex(item => item._id === taskId)
    taskCopy.splice(index, 1)
    setTasks(taskCopy)
  }
  return (
    <Box component='div' 
      onDragEnter={e => e}
      onDragLeave={e => e}
      onDragOver={e => { e.preventDefault() }}
      onDrop={handleDrop}
    >
      <Card sx={{bgcolor: '#EAEFF5',width: 300, padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `5px solid ${board.color}`}}>
        <Typography variant='h6'>{board.name}</Typography>
        {tasks && tasks.length}
      </Card>
      <Card sx={{bgcolor: '#EAEFF5', mt: 1, py: 2, px: 0.5, height: '60vh', overflowY: 'auto'}}>
        {tasks && tasks.length > 0 ?
        tasks.map(item => (
          <Card id={item._id} sx={{padding: 1, width: '100%', mt: 1, cursor: 'pointer'}} onClick={() => handleTaskDetail(item)} component={'div'} onDragStart={startDragEv} onDragEnd={handleDragEnd} draggable={true}>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Box sx={{display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant='h6'>{item.name}</Typography>
                <Typography variant='subtitle2'><CircleIcon  sx={{fontSize: 10, color: item.priority === 1 ? 'green' : item.priority === 2 ? 'orange' : 'red'}}/> {item.priority === 1 ? 'Low' :  item.priority === 2 ? 'Medium' : 'High'}
                </Typography>
              </Box>
                <Typography variant='caption'>
                  #1
                </Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
              <Box>
                <Typography variant='caption' sx={{display: 'block'}}>
                  Deadline: {format(new Date(item.deadline), 'dd/MM/yyyy')}
                </Typography>
                <Typography variant='caption' sx={{display: 'block'}}>
                  Last update: {format(new Date(item.updatedAt), 'dd/MM/yyyy')}
                </Typography>
              </Box>
              <Avatar alt={item.assigned.name} src={item.assigned.profilePic ? item.assigned.profilePic : './assets'}/>
            </Box>
          </Card>
        ))
        : 
        ''}
        <Button fullWidth variant='outlined' sx={{mt: 2}} onClick={() => setTaskModal(true)}><AddIcon />  New Task</Button>
      </Card>
      <ModalTask taskModal={taskModal} setTaskModal={setTaskModal} selectedBoard={board} listCards={listCards} task={task} setTask={setTask}/>
    </Box>
  )
}

export default KanbanBoard