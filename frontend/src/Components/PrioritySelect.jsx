import React from 'react'
import CircleIcon from '@mui/icons-material/Circle';
import { Select, MenuItem, InputLabel ,FormControl  } from '@mui/material'

function PrioritySelect({value, handleChange, variant, sx, defaultValue}) {
  return (
    <FormControl sx={{ ...sx, minWidth: 220 }} size='small'>
      <InputLabel id='priority'>Priority</InputLabel>
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
        <MenuItem value={1}><CircleIcon sx={{fontSize: 10, mr: 1, color: 'green'}}/> Low</MenuItem>
        <MenuItem value={2}><CircleIcon sx={{fontSize: 10, mr: 1, color: 'orange'}}/> Medium</MenuItem>
        <MenuItem value={3}><CircleIcon sx={{fontSize: 10, mr: 1, color: 'red'}}/> High</MenuItem>
      </Select>
    </FormControl>
  )
}

export default PrioritySelect