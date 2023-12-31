import React, { useEffect, useState } from 'react'
import { Autocomplete, TextField, Box, Typography, Avatar } from '@mui/material'
import { ListUserByLetter } from '../services/UserRequest';
import { useParams } from 'react-router-dom';
import { ListProjectParticipants } from '../services/ProjectRequest';

function UserAutoComplete({label, value, handleChange, defaultValue, handleBlur, blurOnSelect}) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const { projectId } = useParams()
  const listUsers = async () => {
    const { data } = await ListProjectParticipants(projectId)
    setUsers(data)
  }

  useEffect(() => {
    listUsers()
  }, [])

  return (
    <Autocomplete
      sx={{width: 220, m: 1}}
      size='small'
      blurOnSelect={Boolean(blurOnSelect)}
      options={users}
      getOptionLabel={(option) => option.name}
      loading={loading}
      value={value}
      onChange={handleChange}
      defaultValue={defaultValue}
      onBlur={handleBlur}
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
          label={label}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off',
          }}
        />
      )}
    />
  )
}

export default UserAutoComplete