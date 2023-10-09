import React, { useState, useEffect, useContext } from 'react'
import { Card, Typography, Avatar, Box, Button, Menu, MenuItem} from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import AddIcon from '@mui/icons-material/Add';
import ModalTask from './ModalTask';
import { useParams } from 'react-router-dom';
import { ChangeCardBoard, DeleteTask, ListTasks } from '../services/Taskservice';
import { format } from 'date-fns'
import { ProjectContext } from '../Contexts/ProjectContext';
import { useConfirm } from 'material-ui-confirm';
import { notify } from '../Utils/Notifications';


function KanbanBoard({board, filters}) {
  const confirm = useConfirm()
  const { projectLeader } = useContext(ProjectContext)
  const [taskModal, setTaskModal] = useState(false)
  const [tasks, setTasks] = useState()
  const [task, setTask] = useState()
  const { projectId } = useParams()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleRightClick = (e, task) => {
    e.preventDefault()
    setTask(task)
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const listCards = async () => {
    const { _id: boardId } = board
    const params = {
      filters
    }
    const { data } = await ListTasks(projectId, boardId, params)
    setTasks(data)
  }
  useEffect(() => {
    listCards()
  }, [filters])

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
    listCards()
  }
  const handleTaskDelete = () => {
    confirm({ description: `Do you really want to delete ${task.name}? This action is irreversible.` })
    .then(async () => {
      setAnchorEl(null)
      await DeleteTask(task._id)
      notify('Task deleted', 'success')
      listCards()
    })
    .catch(() => {
      return
    });
  }
  return (
    <Box component='div' 
      onDragEnter={e => e}
      onDragLeave={e => e}
      onDragOver={e => { e.preventDefault() }}
      onDrop={handleDrop}
    >
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <MenuItem sx={{borderBottom: '1px solid #ddd'}} onClick={() => {setTaskModal(true); setAnchorEl(null)}}>Info</MenuItem>
        { ((task && task.reporter._id === localStorage.getItem('userId')) || projectLeader === localStorage.getItem('userId')) ? 
        <MenuItem onClick={handleTaskDelete}>Delete</MenuItem> : ''}
      </Menu>
      <Card sx={{bgcolor: '#EAEFF5',width: 300, padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `5px solid ${board.color}`}}>
        <Typography variant='h6'>{board.name}</Typography>
        {tasks && tasks.length}
      </Card>
      <Card sx={{bgcolor: '#EAEFF5', mt: 1, py: 2, px: 0.5, height: '60vh', overflowY: 'auto'}}>
        {tasks && tasks.length > 0 ?
        tasks.map(item => (
          <Card id={item._id} sx={{padding: 1, width: '100%', mt: 1, cursor: 'pointer'}} onContextMenu={e => handleRightClick(e, item)} onClick={() => handleTaskDetail(item)} component={'div'} onDragStart={startDragEv} onDragEnd={handleDragEnd} draggable={true}>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Box sx={{display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant='h6'>{item.name}</Typography>
              </Box>
                <Typography variant='caption'>
                  #1
                </Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
              <Box>
                <Typography variant='caption' sx={{display: 'block'}}>
                  {
                    item.deadline ? 'DeadLine:' + format(new Date(item.deadline), 'dd/MM/yyyy') : ''
                  }
                </Typography>
                <Typography variant='caption' sx={{display: 'block'}}>
                  Last update: {format(new Date(item.updatedAt), 'dd/MM/yyyy')}
                </Typography>
              </Box>
              <Box sx={{display: 'flex', alignItems: 'end', gap: 1}}>
                {item.assigned && <Avatar alt={item.assigned.name} src={item.assigned.profilePic ? item.assigned.profilePic : './assets'}/>}
                <CircleIcon  sx={{fontSize: 10, color: item.priority === 1 ? 'green' : item.priority === 2 ? 'orange' : 'red'}}/>
              </Box>
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