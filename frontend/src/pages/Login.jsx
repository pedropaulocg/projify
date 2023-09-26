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
import Logo from '../assets/logo.svg'
import { Login as LoginRequest, Signup } from '../services/UserRequest';
import { notify } from '../Utils/Notifications';
import { useNavigate } from 'react-router-dom';

function Login({checkToken}) {
  const navigate = useNavigate()

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
    for(let field in user) {
      if (user[field] === '') {
        notify("Invalid fields!", 'error')
        return
      }
    }
    try {
      const { data } = await LoginRequest({email: user.email, password: user.password})
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)
      notify(`Hi ${data.username}! Welcome back!`, 'success')
      checkToken()
      navigate('/projects')
    } catch(e) {
      console.log(e)
    }
  }
  async function handleSignUp (e){
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
      notify('Welcome! Here is your projify!', 'success')
      checkToken()
      navigate('/projects')
    } catch(e) {
    }
  }
  if (isSignUp) {
    return (
      <Box sx={{ width: '30%', minWidth: 400, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
      <Card>
        <CardContent sx={{padding: 3}}>
          <img src={Logo} alt="" style={{marginBottom: 20}}/>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'start', flexDirection: 'column', marginBottom: 4 }}>
            <h1 className='text-2xl'>Nice to see you here!</h1>
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
              <Button type='submit' color='primary' fullWidth variant='contained'>Sign up!</Button>
            </Box>
          </form>
          <Box sx={{marginTop: 3}}>
            <p><Link onClick={() => setSignUp(false)}>Go back to login</Link></p>
          </Box>
        </CardContent>
          <Wave fill='#DDDDDD'
            paused={false}
            options={{
              height: 40,
              amplitude: 25,
              speed: 0.15,
              points: 3
            }}
          />
        </Card>
      </Box>
    )
  }
  return (
    <Box sx={{ width: '30%', minWidth: 400, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
      <Card>
        <CardContent sx={{padding: 3}}>
          <img src={Logo} alt="" style={{marginBottom: 20}}/>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'start', flexDirection: 'column', marginBottom: 4 }}>
            <h1 className='text-2xl'>Welcome back!</h1>
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
              <Button type='submit' color='primary' fullWidth variant='contained'>Login</Button>
            </Box>
          </form>
          <Box sx={{marginTop: 3}}>
            <p>You don't have an account? <Link onClick={() => setSignUp(true)}>Click here!</Link></p>
          </Box>
        </CardContent>
          <Wave fill='#DDDDDD'
            paused={false}
            options={{
              height: 40,
              amplitude: 25,
              speed: 0.15,
              points: 3
            }}
          />
      </Card>
    </Box>
  )
}

export default Login