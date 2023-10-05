import React, { useContext, useEffect, useState } from 'react'
import { Dialog, Button, DialogActions, DialogTitle, DialogContent, TextField, Avatar, Autocomplete , Box, Typography, List, ListItem, ListItemAvatar, ListItemText, IconButton, Divider} from '@mui/material'
import { CreateBoard, ListBoards } from '../services/BoardRequest'
import { useParams } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import BoardListItem from './BoardListItem'
import { MuiColorInput } from 'mui-color-input'
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

function BoardModal({boardModal, setBoardModal, boards, listBoards}) {
  const [newBoard, setNewBoard] = useState()
  const { projectId } = useParams()
  const handleClose = () => {
    setBoardModal(false)
  }
  const handleSubmitNewBoard = async () => {
    await CreateBoard(projectId, newBoard)
    listBoards()
    setNewBoard(null)
  }
  return (
    <Dialog open={boardModal} onClose={handleClose} fullWidth maxWidth={'sm'}>
      <DialogTitle>Manage boards</DialogTitle>
      <DialogContent>
        <List>
          {boards && boards.length > 0 ? boards.map(item => (
            <BoardListItem board={item} listBoards={listBoards}/>
          ))
          :
          'No boards'
        }
        {
          newBoard ? <ListItem sx={{borderRadius: 1, m: 1, border: '1px solid #DDD'}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between', my: 1}}>
            <Box component={'div'} sx={{width: '60%', mr: 2}}>
              <TextField
                label="Name"
                size='small'
                fullWidth
                onChange={(e) => setNewBoard({...newBoard, name: e.target.value})}
              />
            </Box>
            <MuiColorInput size='small' value={newBoard.color} label="Board color" onChange={(newVal) => setNewBoard({...newBoard, color: newVal})}
            />
            <IconButton onClick={() => setNewBoard(null)}>
              <CloseIcon />
            </IconButton>
            <IconButton onClick={handleSubmitNewBoard}>
              <CheckIcon />
            </IconButton>
          </Box>
        </ListItem>
        :
        <Button fullWidth variant='outlined' sx={{mt: 2}} onClick={() => setNewBoard({name: '', color: ''})}>Add new board</Button>
        }
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        {/* <Button onClick={handleSubmit}>Save</Button> */}
      </DialogActions>
    </Dialog>
  )
}

export default BoardModal