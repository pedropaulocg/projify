import { Box, Typography, TextField, InputAdornment, IconButton, Select, MenuItem, InputLabel ,FormControl, Button, Card, Avatar } from '@mui/material'
import React, { useContext } from 'react'
import { ProjectContext } from '../Contexts/ProjectContext'
import SearchIcon from '@mui/icons-material/Search'
import CircleIcon from '@mui/icons-material/Circle';

function Kanban() {
  const { projects, selectedProject } = useContext(ProjectContext)
  const project = projects.find(item => item._id === selectedProject)

  return (
    <Box sx={{ flexGrow: 1, p: 3, maxHeight: '100vh', overflowY: 'auto' }}>
      <Box>
        <Typography variant='h5'>
          Kanban view
        </Typography>
      </Box>
      <Box sx={{mt: 3, display: 'flex', alignItems: 'center'}}>
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
      <Box sx={{display: 'flex', mt: 5}}>
        <Box>
          <Card sx={{bgcolor: '#EAEFF5',width: 300, padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '5px solid green'}}>
            <Typography variant='h6'>Backlog</Typography>
            <Avatar sx={{width: 30, height: 30}}>
              2
            </Avatar>
          </Card>
          <Card sx={{bgcolor: '#EAEFF5', mt: 1, py: 2, px: 0.5, height: '60vh'}}>
            <Card sx={{padding: 1}}>
              <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box>
                  <Typography variant='h6'>Create drag and drop</Typography>
                  <Typography variant='subtitle2'><CircleIcon  sx={{fontSize: 10, color: 'green'}}/> Medium</Typography>
                </Box>
                  <Typography variant='caption'>
                    #1
                  </Typography>
              </Box>
            </Card>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}

export default Kanban