import React, { useContext, useEffect, useState } from 'react'
import { Dialog, Button, DialogActions, DialogTitle, DialogContent, TextField, Avatar, Autocomplete , Box, Typography, List, ListItem, ListItemAvatar, ListItemText, IconButton, Divider} from '@mui/material'
import { ListBoards } from '../services/BoardRequest'
import { useParams } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'

function BoardModal({boardModal, setBoardModal, boards}) {
  const handleClose = () => {
    setBoardModal(false)
  }
  return (
    <Dialog open={boardModal} onClose={handleClose} fullWidth maxWidth={'sm'}>
      <DialogTitle>Manage boards</DialogTitle>
      <DialogContent>
        <List>
          {boards && boards.length > 0 ? boards.map(item => (
            <ListItem sx={{borderRadius: 1, m: 1, border: '1px solid #DDD', borderLeft: `4px solid ${item.color}`}}>
              <ListItemText primary={item.name}/>
              <IconButton>
                <EditIcon />
              </IconButton>
            </ListItem>
          ))
          :
          'No boards'
        }

        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {/* <Button onClick={handleSubmit}>Save</Button> */}
      </DialogActions>
    </Dialog>
  )
}

export default BoardModal