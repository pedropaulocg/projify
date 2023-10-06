import React, { useContext, useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box'
import { TablePagination, Typography, IconButton, TextField, InputAdornment } from '@mui/material';
import { ProjectContext } from '../Contexts/ProjectContext'
import { useParams } from 'react-router-dom';
import { GetTaskPerProject } from '../services/Taskservice';
import CircleIcon from '@mui/icons-material/Circle'
import { format } from 'date-fns';
import SearchIcon from '@mui/icons-material/Search'
import BoardSelect from '../Components/BoardSelect';
import PrioritySelect from '../Components/PrioritySelect';
import UserAutoComplete from '../Components/UserAutoComplete';
// import InfoIcon from '@mui/icons-material/Info';


function Tasks() {
  const { selectedProject, setSelectedProject } = useContext(ProjectContext)
  const { projectId } = useParams()
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [renderedRows, setRenderedRows] = useState([])
  const [filters, setFilters] = useState({
    name: '',
    board: '',
    priority: '',
    assigned: ''
  })
  const emptyRows = page > 0 ? rowsPerPage - rows.length : 0;
  const renderPages = async () => {
    const params = {
      page,
      filters
    }
    const { data } = await GetTaskPerProject(projectId, params)
    setRows(data.tasks)
    setCount(data.count)
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    renderPages()
  };
  
  useEffect(()=> {
    renderPages()
  }, [page, rowsPerPage])

  useEffect(() => {
    if(!selectedProject) {
      setSelectedProject(projectId)
    }
  },[])

  const handleFilterSubmit = (e) => {
    e.preventDefault()
    setPage(0)
    renderPages()
  }
  
  return (
    <Box sx={{width: '100%', p: 2, height: '100vh', overflowY: 'auto'}}>
      <Typography variant="h5">
        Tasks
      </Typography>
      <Box component={'div'} sx={{mt: 5, display: 'flex', alignItems: 'center'}}>
        <form onSubmit={handleFilterSubmit}>
          <TextField
            id="outlined-start-adornment"
            label='Search task'
            size='small'
            InputProps={{
              endAdornment: <InputAdornment position="end"><IconButton type='submit'><SearchIcon /></IconButton></InputAdornment>,
            }}
            onChange={(e) => setFilters({...filters, name: e.target.value})}
          />
        </form>
        <UserAutoComplete handleBlur={handleFilterSubmit} label={'Assignee'} handleChange={(e, val) => setFilters({...filters, assigned: val})}/>
        <PrioritySelect handleChange={(e) => setFilters({...filters, priority: e.target.value})}/>
        <BoardSelect handleBlur={handleFilterSubmit} sx={{ml: 1}} handleChange={(e) => setFilters({...filters, board: e.target.value})}/> 
      </Box>
      <TableContainer>
      <Table sx={{ width: '90%', margin: 'auto', mt: 2}} size='medium' aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left"></TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Board</TableCell>
            <TableCell align="left">Assigned</TableCell>
            <TableCell align="left">Reporter</TableCell>
            <TableCell align="left">Dead line</TableCell>
            {/* <TableCell align="right">Action</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.length > 0 && rows.map((row, index) => (
            <TableRow
              key={row.name}
            >
              <TableCell width={5} align='left'>
                <CircleIcon  sx={{fontSize: 10, color: row.priority === 1 ? 'green' : row.priority === 2 ? 'orange' : 'red'}}/>
              </TableCell>
              <TableCell align='left' width={400}>
                {row.name}
              </TableCell>
              <TableCell align="left">{row.board.name}</TableCell>
              <TableCell align="left">{row.assigned.name}</TableCell>
              <TableCell align="left">{row.reporter.name}</TableCell>
              <TableCell align="left">{row.deadline ? format(new Date(row.deadline), 'dd/MM/yyyy') : '-'}</TableCell>
              {/* <TableCell align="right">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </TableCell> */}
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: (53) * emptyRows,
              }}
            >
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[10]}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
    />    
  </Box>
  )
}

export default Tasks