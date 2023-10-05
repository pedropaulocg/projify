import React, { useEffect, useState } from 'react'
import { Select, MenuItem, InputLabel ,FormControl  } from '@mui/material'
import { useParams } from 'react-router-dom';
import { ListBoards } from '../services/BoardRequest';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

function BoardSelect({value, handleChange, variant, sx, defaultValue}) {
  const [ boards, setBoards ] = useState([])
  const { projectId } = useParams()

  const listBoards = async () => {
    const { data } = await ListBoards(projectId)
    console.log(data)
    setBoards(data)
  }

  useEffect(() => {
    listBoards()
  }, [])

  return (
    <FormControl sx={{ ...sx, minWidth: 220 }} size='small'>
      <InputLabel id='priority'>Board</InputLabel>
      <Select
        labelId='priority'
        label='Priority'
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        variant={variant ? variant : 'outlined'}
        >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {boards && boards.length > 0 ? boards.map(item => (
          <MenuItem key={item._id} value={item._id}><ContentPasteIcon sx={{fontSize: 10, mr: 1, color: item.color}}/> {item.name}</MenuItem>
        )) : <MenuItem value="">No data</MenuItem>}
      </Select>
    </FormControl>
  )
}

export default BoardSelect