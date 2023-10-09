import { Box, TextField, InputAdornment, IconButton } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { ProjectContext } from '../Contexts/ProjectContext';
import { useParams } from 'react-router-dom';
import Message from '../Components/Message';
import { CreateMessage, ListMessages } from '../services/MessageRequest';

function Chat() {
  const { socket, selectedProject, setSelectedProject } = useContext(ProjectContext)
  const { projectId } = useParams()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState({
    body: '',
    isReply: false
  })
  const getMessages = async () => {
    const { data } = await ListMessages(projectId)
    setMessages(data)
  }
  useEffect(() => {
    getMessages()
  }, [])

  useEffect(() => {
    if(!selectedProject) {
      setSelectedProject(projectId)
    }
    socket.emit('join_room', {project: projectId, user: localStorage.getItem('username')})
  },[])

  useEffect(() => {
    socket.on('newMessageEvent', (data) => {
      console.log(data)
      setMessages(state => [
        data,
        ...state
      ])
    });

  }, [socket]);
  useEffect(() => {

    return () => socket.off('newMessageEvent')
  }, [])
  const handleSendMessage = async (e) => {
    e.preventDefault()
    try {
      await CreateMessage(projectId, newMessage)
    } catch (error) {
    }
    setNewMessage({...newMessage, body: ''})
  }
  return (
    <Box sx={{width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'end'}}>
      <Box sx={{display: 'flex', flexDirection: 'column-reverse', overflowY: 'auto'}}>
        {messages && messages.reverse().map(msg => {
          return <Message key={msg._id} msg={msg}/>
        })}
      </Box>
      <Box component={'div'} sx={{width: '100%', bgcolor: '#fff', p: 2}}>
      <form onSubmit={handleSendMessage}>
        <TextField
          placeholder='Message'
          variant="outlined"
          fullWidth
          value={newMessage.body}
          onChange={(e) => setNewMessage({...newMessage, body: e.target.value})}
          InputProps={{
            endAdornment: <InputAdornment position="end"><IconButton type='submit'><SendIcon sx={{rotate: '-50deg'}}/></IconButton></InputAdornment>,
          }}
        />
      </form>
      </Box>
    </Box>
  )
}

export default Chat