import { Box, Typography, TextField, InputAdornment, IconButton, Select, MenuItem, InputLabel ,FormControl, Button, Card } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { ProjectContext } from '../Contexts/ProjectContext'
import SearchIcon from '@mui/icons-material/Search'
import CircleIcon from '@mui/icons-material/Circle';
import KanbanBoard from '../Components/KanbanBoard';
import { useParams } from 'react-router-dom';
import { ListBoards, CreateBoard } from '../services/BoardRequest'
import { MuiColorInput } from 'mui-color-input'
import CloseIcon from '@mui/icons-material/Close';
import { notify } from '../Utils/Notifications';


function Kanban() {
  const { setSelectedProject } = useContext(ProjectContext)
  // const project = projects.find(item => item._id === selectedProject)
  const params = useParams()
  const [boards, setBoards] = useState()
  const [isCreate, setIsCreate] = useState(false)
  const [newBoard, setNewBoard] = useState({
    name: '',
    color: ''
  })
  
  const listBoards = async () => {
    const { data } = await ListBoards(params.projectId)
    setBoards(data)
  }

  useEffect(() => {
    listBoards()
  }, [])

  useEffect(() => {
    setSelectedProject(params.projectId)
  },[])

  const handleBoardCreation = async (e) => {
    e.preventDefault()
    if (newBoard.color == '' || newBoard.name == '' ) {
      notify("Invalid fields", 'error')
      return
    }
    try {
      await CreateBoard(params.projectId, newBoard)
      notify('Board created!', 'success')
      listBoards()
    } catch (error) {
    }
    setNewBoard({
      name: '',
      color: ''
    })
    setIsCreate(false)
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3, maxHeight: '100vh', overflowY: 'auto' }}>
      <Box>
        <Typography variant='h5'>
          Kanban view
        </Typography>
      </Box>
      <Box sx={{mt: 3, display: 'flex', alignItems: 'center', width: '100%'}}>
        <form>
          <TextField
              id="outlined-start-adornment"
              label='Search task'
              size='small'
              InputProps={{
                endAdornment: <InputAdornment position="end"><IconButton type='submit'><SearchIcon /></IconButton></InputAdornment>,
              }}
            />
        </form>
        <FormControl sx={{ m: 1, minWidth: 200 }} size='small'>
          <InputLabel id='priority'>Priority</InputLabel>
          <Select
            labelId='priority'
            label='Priority'
            >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}><CircleIcon sx={{fontSize: 10, mr: 1, color: 'green'}}/> Low</MenuItem>
            <MenuItem value={20}><CircleIcon sx={{fontSize: 10, mr: 1, color: 'yellow'}}/> Medium</MenuItem>
            <MenuItem value={30}><CircleIcon sx={{fontSize: 10, mr: 1, color: 'red'}}/> High</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{display: 'flex', mt: 5, gap: 3, overflowX: 'auto', flexWrap: 'nowrap', alignItems: 'start'}}>
        { boards && boards.length > 0 ? boards.map(item => {
          return <KanbanBoard board={item}/>
        }) : <p>No boards yet</p>}
        <Card sx={{bgcolor: '#EAEFF5',width: 300, padding: 2, transition: '.5s', height: isCreate ? '175px' : '68px', minWidth: 300}}>
          {
            !isCreate ? <Button variant='outlined' fullWidth onClick={() => setIsCreate(true)}>Create Board</Button> 
            :
              <form onSubmit={handleBoardCreation}>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', justifyContent: 'center'}}>
                  <TextField
                    id="outlined-start-adornment"
                    label='Board name'
                    fullWidth
                    size='small'
                    onChange={(e) => setNewBoard({...newBoard, name: e.target.value})}
                    autoComplete='off'
                  />
                  <MuiColorInput size='small' fullWidth label="Board color" value={newBoard.color} onChange={(newVal) => setNewBoard({...newBoard, color: newVal})}/>
                  <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'end', width: '100%', gap: 2}}>
                    <IconButton onClick={() => setIsCreate(false)}> <CloseIcon /> </IconButton>
                    <Button variant='outlined' type='submit' size='small'>Create</Button>
                  </Box>
                </Box>
              </form>
          }
        </Card>
      </Box>
    </Box>
  )
}

export default Kanban