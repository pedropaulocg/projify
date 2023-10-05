import React, { useState } from 'react'
import { ListItem, ListItemText, IconButton, TextField, Box } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { MuiColorInput } from 'mui-color-input'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { DeleteBoard, UpdateBoard } from '../services/BoardRequest';
import { notify } from '../Utils/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import { useConfirm } from 'material-ui-confirm';


function BoardListItem({board, listBoards}) {
  const [isEdit, setIsEdit] = useState(false)
  const [editBoard, setEditBoard] = useState(board)
  const confirm = useConfirm()
  const handleCancel = () => {
    setEditBoard(board)
    setIsEdit(false)
  }
  const handleSubmit = async () => {
    delete editBoard._id
    await UpdateBoard(board._id, editBoard)
    notify('Board updated', 'success')
    setIsEdit(false)
    listBoards()
  }
  const handleBoardDelete = () => {
    confirm({ description: `Do you really want to delete ${board.name}? This action is irreversible. Make sure to remove all tasks of it` })
    .then(async () => {
      await DeleteBoard(board._id)
      listBoards()
    })
    .catch(() => {
      return
    });
  }
  return (
    <ListItem sx={{borderRadius: 1, m: 1, border: '1px solid #DDD', borderLeft: `4px solid ${editBoard.color}`}}>
      {
        isEdit || !board._id ? 
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Box component={'div'} sx={{width: '60%', mr: 2}}>
            <TextField
              label="Name"
              value={editBoard.name}
              onChange={e => setEditBoard({...editBoard, name: e.target.value})}
              size='small'
              fullWidth
            />
          </Box>
          <MuiColorInput size='small'  label="Board color" value={editBoard.color} onChange={(newVal) => setEditBoard({...editBoard, color: newVal})}/>
          <IconButton onClick={handleCancel}>
            <CloseIcon />
          </IconButton>
          <IconButton onClick={handleSubmit}>
            <CheckIcon />
          </IconButton>
        </Box>
        :
        <>
          <ListItemText primary={editBoard.name}/>
          <IconButton onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleBoardDelete}>
            <DeleteIcon />
          </IconButton>
        </>
      }
    </ListItem>
  )
}

export default BoardListItem