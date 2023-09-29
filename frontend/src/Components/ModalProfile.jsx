import React, { useContext, useEffect, useState } from 'react'
import { Dialog, Button, DialogActions, DialogTitle, DialogContent, TextField, Avatar, Autocomplete , Box, Typography, List, ListItem, ListItemAvatar, ListItemText, IconButton} from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { GetUserById, ListUserByLetter, UpdateUser } from '../services/UserRequest';
import DeleteIcon from '@mui/icons-material/Delete';
import { notify } from '../Utils/Notifications';
import { ProjectContext } from '../Contexts/ProjectContext';

function ModalProfile({profileModal, serProfilemodal}) {
  const [previewImage, setPreviewImage] = useState()
  const { isEdit, setIsEdit } = useContext(ProjectContext)

  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    profilePic: undefined,
    password: ''
  })

  useEffect(() => {
    async function fetchUser() {
      const { data } = await GetUserById(localStorage.getItem('userId'))
      setUser({
        id: data._id,
        name: data.name,
        email: data.email,
        profilePic: data.profilePic
      })
    }
    fetchUser()
    setPreviewImage(null)
  }, [])

  const handleClose = () => {
    serProfilemodal(false)
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('file', user.profilePic)
    formData.append('name', user.name)
    formData.append('email', user.email)
    // formData.append('password', user.password)
    try {
      const { data } = await UpdateUser(user.id, formData)
      localStorage.setItem('username', data.name)
      localStorage.setItem('profilePic', data.profilePic)
      notify('Profile updated!', 'success')
    } catch (error) {
    }
    setIsEdit(prevState=>!isEdit)
  
    handleClose()
  }
  const handleMediaChange = (e) => {
    setUser({...user, profilePic: e.target.files[0]})
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
    <Dialog open={profileModal} onClose={handleClose} maxWidth={'md'}>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogContent sx={{display: 'flex', justifyContent: 'space-between'}}>
        <DialogContent>
          <Avatar component="label" sx={{ width: 200, height: 200, cursor: 'pointer' }}>
            {user.profilePic ? 
              <img src={user.profilePic && previewImage == null ? user.profilePic : previewImage} alt="" style={{width: '-webkit-fill-available'}}/>
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
            value={user.name}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setUser({...user, name: e.target.value})}
            autoComplete="off"
          />
          <TextField
            value={user.email}
            label="Email"
            variant="standard"
            fullWidth
            onChange={e => setUser({...user, email: e.target.value})}
          />
          {/* <TextField
            value={user.password}
            label="Password"
            type='password'
            variant="standard"
            fullWidth
            onChange={e => setUser({...user, email: e.target.value})}
          /> */}
        </DialogContent>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalProfile