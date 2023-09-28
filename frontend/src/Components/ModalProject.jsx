import React, { useEffect, useState } from 'react'
import { Dialog, Button, DialogActions, DialogTitle, DialogContent, TextField, Avatar, Autocomplete , Box, Typography, List, ListItem, ListItemAvatar, ListItemText, IconButton} from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { ListUserByLetter } from '../services/UserRequest';
import DeleteIcon from '@mui/icons-material/Delete';
import { StoreProject } from '../services/ProjectRequest';
import { notify } from '../Utils/Notifications';

function ModalProject({projectModal, setProjectModal, listProjects}) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState()
  const [participants, setParticipants] = useState([])
  const [project, setProject] = useState({
    name: '',
    description: '',
    picture: undefined,
  })

  const handleClose = () => {
    setProjectModal(false)
    setParticipants([])
    setPreviewImage()
  }

  const findUsers = (e) => {
    setLoading(true)
    setTimeout(async () => {
      if(e.target.value.length < 3) {
        setUsers([])
        setLoading(false)
        return 
      } else {
        setLoading(true)
        const params = {
          match: e.target.value
        }
        const { data } = await ListUserByLetter(params)
        setUsers(data)
        setLoading(false)
      }
    }, 2000)
  }

  const addParticipant = (e, val) => {
    if (typeof val === 'object' && val && !participants.find(item => item._id === val._id)) {
      const copy = [...participants]
      copy.push(val)
      setParticipants(copy)
    }
  }

  const removeParticipant = (idx) => {
    const copy = [...participants]
    setParticipants(copy.toSpliced(idx, 1))
  }
  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('file', project.picture)
    formData.append('name', project.name)
    formData.append('description', project.description)
    const usersId = []
    participants.forEach(item => {
      usersId.push(item._id)
    })
    formData.append('participants', JSON.stringify(usersId))
    try {
      await StoreProject(formData)
      notify('Project created!', 'success')
    } catch (error) {
    }
    listProjects()
    handleClose()
  }
  const handleMediaChange = (e) => {
    setProject({...project, picture: e.target.files[0]})
    const fileReader = new FileReader()
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0])
      fileReader.onloadend = (e) => {
        const { result } = e.target
        setPreviewImage(result)
      }
    }
  }

  return (
    <Dialog open={projectModal} onClose={handleClose} maxWidth={'md'}>
      <DialogTitle>New project</DialogTitle>
      <DialogContent sx={{display: 'flex', justifyContent: 'space-between'}}>
        <DialogContent>
          <Avatar component="label" sx={{ width: 200, height: 200, cursor: 'pointer' }}>
            {project.picture ? 
              <img src={previewImage} alt="" style={{width: '-webkit-fill-available'}}/>
            : 
            <>
              <AddAPhotoIcon />
            </>
            }
            <input type="file" hidden onChange={handleMediaChange} accept='image/*'/>
          </Avatar>
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setProject({...project, name: e.target.value})}
            autoComplete="off"
          />
          <TextField
            id="standard-multiline-static"
            label="Description"
            multiline
            rows={4}
            variant="standard"
            fullWidth
            onChange={e => setProject({...project, description: e.target.value})}
          />
        </DialogContent>
      </DialogContent>
      <DialogContent>
        <Autocomplete
          disableCloseOnSelect
          fullWidth
          key={participants.length}
          options={users}
          getOptionLabel={(option) => option.name}
          loading={loading}
          onChange={addParticipant}
          renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              <Avatar alt={option.name} src={option.profilePic ? option.profilePic : './assets'} sx={{marginRight: 2}}/>
              <Box>
                <Typography variant='subtitle1'>
                  {option.name}
                </Typography>
                <Typography variant='caption' component="div">
                  {option.email}
                </Typography>
              </Box>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Invite users"
              helperText="Type the first three letters to find. You can try email or name"
              variant="standard"
              onChange={findUsers}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'off',
              }}
            />
          )}
        />
      </DialogContent>
      <DialogContent>
        <Typography variant='h6'>
          Selected users
        </Typography>
        <List sx={{maxHeight: 200}}>
          {participants.length > 0 ? participants.map((item, idx) => (
            <ListItem key={item._id} secondaryAction={
              <IconButton edge="end" onClick={() => removeParticipant(idx)} >
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemAvatar>
                <Avatar src={item.profilePic ? item.profilePic : './assets'} alt={item.name}/>
              </ListItemAvatar>
              <ListItemText sx={{flex: 10}} primary={item.name} secondary={item.email}/>
            </ListItem>
          )) : ''}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalProject