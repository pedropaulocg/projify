import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import logo from '../assets/logo.svg'
import { TextField, InputAdornment, IconButton, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import { useState } from 'react';
import { notify } from '../Utils/Notifications';
import ModalProfile from './ModalProfile';

function TopNavbar({checkToken}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileModal, setProfileModal] = useState(false);
  const open = anchorEl
  const openDropMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeDropMenu = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    notify(`Good bye ${localStorage.getItem('username', 'success')}!`)
    localStorage.clear()
    checkToken()
  }
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 15 }}>
      <AppBar position="fixed">
        <Toolbar>
          <img src={logo} alt="logo" width={200}/>
          <Box sx={{ flexGrow: 1, display:'flex', paddingX: 5}}>
          <TextField
            id="outlined-start-adornment"
            fullWidth
            placeholder='Search project'
            size='small'
            InputProps={{
              endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
            }}
          />
          </Box>
          <IconButton
            onClick={openDropMenu}>
             <Avatar alt={localStorage.getItem('username')} src={localStorage.getItem('profilePic') ? localStorage.getItem('profilePic') : './assets'} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={closeDropMenu}
          >
            <MenuItem onClick={() => {setProfileModal(true); closeDropMenu()}}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <ModalProfile serProfilemodal={setProfileModal} profileModal={profileModal} />
    </Box>
  );
}

export default TopNavbar