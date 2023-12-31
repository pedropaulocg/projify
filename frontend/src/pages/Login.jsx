import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import Wave from 'react-wavify';
import Link from '@mui/material/Link';
import Logo from '../assets/logoDark.svg'
import { Login as LoginRequest, Signup } from '../services/UserRequest';
import { notify } from '../Utils/Notifications';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

function Login({checkToken}) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState()
  const [isSignUp, setSignUp] = useState(false)
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const [registerUser, setRegisterUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPass: ''
  })
  async function handleLogin (e){
    e.preventDefault()
    if(Object.values(user).includes("")){
      notify("Invalid fields!", 'error')
      return
    }
    try {
      setLoading(true)
      const { data } = await LoginRequest({email: user.email, password: user.password})
      setLoading(false)
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)
      localStorage.setItem('userId', data.userId)
      localStorage.setItem('profilePic', data.profilePic)
      notify(`Hi ${data.username}! Welcome back!`, 'success')
      checkToken()
      setLoading(false)
      navigate('/projects')
    } catch(e) {
      setLoading(false)
      console.log(e)
    }
  }
  async function handleSignUp (e){
    setLoading(true)
    e.preventDefault()
    for(let field in registerUser) {
      if (registerUser[field] === '') {
        notify("Invalid fields!", 'error')
        return
      }
    }
    if (registerUser.password !== registerUser.confirmPass) {
      notify("Passwords must match", 'error')
    }
    try {
      const { data } = await Signup({email: registerUser.email, password: registerUser.password, name: registerUser.name})
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)
      localStorage.setItem('userId', data.userId)
      localStorage.setItem('profilePic', data.profilePic)
      notify('Welcome! Here is your projify!', 'success')
      setLoading(false)
      checkToken()
      navigate('/projects')
    } catch(e) {
      setLoading(false)
    }
    setLoading(false)
  }
  if (isSignUp) {
    return (
      <>
      <Box sx={{ width: '30%', minWidth: 400, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 999 }}>
      <Card>
        <CardContent sx={{padding: 3}}>
          <img src={Logo} alt="" style={{marginBottom: 20, width: '-webkit-fill-available'}}/>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'start', flexDirection: 'column'}}>
            <h1 className='text-2xl m-0'>Nice to see you here!</h1>
            <p>Create your account its totally free!</p>
          </Box>
          <form onSubmit={handleSignUp}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField fullWidth label="Name" variant="standard" onChange={e => setRegisterUser({...registerUser, name: e.target.value})}/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField fullWidth label="Email" variant="standard" onChange={e => setRegisterUser({...registerUser, email: e.target.value})}/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField fullWidth type='password' label="Password" variant="standard" onChange={e => setRegisterUser({...registerUser, password: e.target.value})}/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField fullWidth type='password' label="Confirm password" variant="standard" onChange={e => setRegisterUser({...registerUser, confirmPass: e.target.value})}/>
            </Box>
            <Box sx={{marginTop: 5}}>
              <Button disabled={loading} type='submit' color='primary' fullWidth variant='contained'>{loading ? <CircularProgress /> : 'Sign up!'}</Button>
            </Box>
          </form>
          <Box sx={{marginTop: 3}}>
            <p><Link sx={{cursor: 'pointer'}} onClick={() => setSignUp(false)}>Go back to login</Link></p>
          </Box>
        </CardContent>
        </Card>
      </Box>
      <Wave fill='#171f39'
        paused={false}
        style={{position: 'absolute', bottom: 0, display: 'flex'}}
        options={{
          height: 10,
          amplitude: 50,
          speed: 0.15,
          points: 3
        }}
      />
    </>
    )
  }
  return (
    <>
      <Box sx={{ width: '30%', minWidth: 400, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',  zIndex: 999 }}>
        <Card sx={{pb: 0}}>
          <CardContent sx={{padding: 3}}>
            <img src={Logo} alt="" style={{marginBottom: 20, width: '-webkit-fill-available'}}/>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'start', flexDirection: 'column'}}>
              <h1 className='text-2xl' style={{marginBottom: 0}}>Welcome back!</h1>
              <p>Sign in to your account to continue!</p>
            </Box>
            <form onSubmit={handleLogin}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField fullWidth label="Email" variant="standard" onChange={e => setUser({...user, email: e.target.value, emailError: false})}/>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField fullWidth type='password' label="Password" variant="standard" onChange={e => setUser({...user, password: e.target.value, passwordError: false})}/>
              </Box>
              <Box sx={{marginTop: 5}}>
                <Button disabled={loading} type='submit' color='primary' fullWidth variant='contained'>{loading ? <CircularProgress /> : 'Login'}</Button>
              </Box>
            </form>
            <Box sx={{marginTop: 3}}>
              <p>You don't have an account? <Link sx={{cursor: 'pointer'}} onClick={() => setSignUp(true)}>Click here!</Link></p>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Wave fill='#171f39'
        paused={false}
        style={{position: 'absolute', bottom: 0, display: 'flex'}}
        options={{
          height: 10,
          amplitude: 50,
          speed: 0.15,
          points: 3
        }}
      />
    </>
  )
}

export default Login