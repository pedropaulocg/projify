import { Box, TextField, InputAdornment, IconButton, Avatar, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';

import React, { useEffect, useState } from 'react'
import { CreateComment, DeleteComment, GetComments } from '../services/CommentService';
import { format } from 'date-fns';
import { useConfirm } from 'material-ui-confirm';

function CommentSection({task}) {
  const confirm = useConfirm()
  const [comment, setComment] = useState('')
  const [commentList, setCommentList] = useState([])

  const handleCreateComment = async (e) => {
    if (e) e.preventDefault()
    if (!comment) return
    const data = {
      owner: localStorage.getItem('userId'),
      body: comment
    }
    await CreateComment(task._id, data)
    setComment('')
    getComments()
  }
  const handleSend = (e) => {
    if(e.ctrlKey && e.key === "Enter") handleCreateComment()
  }

  const getComments = async () => {
    const { data } = await GetComments(task._id)
    setCommentList(data)
  }

  const deleteComment = (comment) => {
    confirm({ description: `Do you really want to delete this comment? This action is irreversible.` })
    .then(async () => {
      await DeleteComment(comment._id)
      getComments()
    })
    .catch(() => {
      return
    });
  } 

  useEffect(() => {
    getComments()
  }, [])
  return (
    <Box component={'div'}>
      <Box component={'div'} sx={{maxHeight: 180, overflowY: 'auto', display: 'flex', flexDirection: 'column-reverse'}}>
        {commentList && commentList.map(item => {
          return <Box key={item._id} sx={{display: 'flex', alignItems: 'center', gap: 2, mt: 1}}>
            <Box>
              <Avatar alt={item.owner.name} src={item.owner.profilePic ? item.owner.profilePic : './assets'} />
            </Box> 
            <Box>
              <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                <Typography variant="h6">
                  {item.owner.name}
                </Typography>
                <Typography variant="caption">
                  {format(new Date(item.createdAt), 'dd LLL yyyy HH:mm')}
                </Typography>
                <Typography variant="caption" component={'div'} onClick={() => deleteComment(item)} sx={{cursor: 'pointer'}}>DELETE</Typography>
              </Box>
              <Typography variant="body1" sx={{width: '100%', wordBreak: 'break-all'}}>
                {item.body}
              </Typography>
            </Box>
          </Box>
        })}
      </Box>
      <form onSubmit={handleCreateComment}>
        <TextField
        sx={{mt: 3}}
          multiline
          placeholder='Add a comment...'
          variant="outlined"
          size='small'
          fullWidth
          value={comment}
          onKeyDown={handleSend}
          onChange={(e)=> setComment(e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end"><IconButton type='submit'><SendIcon sx={{rotate: '-50deg'}}/></IconButton></InputAdornment>,
          }}
        />
      </form>
    </Box>
  )
}

export default CommentSection