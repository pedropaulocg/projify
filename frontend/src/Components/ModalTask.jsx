import React, { useEffect, useRef, useState } from 'react'
import { Dialog, Button, DialogActions, DialogContent, TextField, Avatar ,InputAdornment, Box, Typography,Grid, ListItem, IconButton} from '@mui/material'
import { notify } from '../Utils/Notifications';
import PrioritySelect from './PrioritySelect';
import { Editor } from '@tinymce/tinymce-react'
import UserAutoComplete from './UserAutoComplete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import BoardSelect from './BoardSelect';
import { useParams } from 'react-router-dom';
import { ChangeCardBoard, CreateTask, UpdateTask } from '../services/Taskservice';
import parse from 'html-react-parser';
import CircleIcon from '@mui/icons-material/Circle'
import { format } from 'date-fns';
import AlarmIcon from '@mui/icons-material/Alarm';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function ModalTask({taskModal, setTaskModal, selectedBoard, listCards, task, setTask}) {
  const { projectId } = useParams()
  const editorRef = useRef(null);
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    priority: '',
    assigned: '',
    deadline: '',
    project: projectId,
    board: selectedBoard._id,
  })
  const [updateTask, setUpdateTask] = useState(null)
  const [isEdit, setIsEdit] = useState({
    name: false,
    description: false,
    assigned: false,
    deadline: false,
    priority: false
  })
  useEffect(()=>{
    console.log(isEdit)
  }, [isEdit])
  const handleClose = () => {
    setTaskModal(false)
    setNewTask({})
    setTask(null)
  }
  const handleSubmit = async () => {
    await CreateTask(newTask, projectId, newTask.board)
    notify("Task created successfully", 'success')
    listCards()
    handleClose()
  };
  const handleBoardChange = async (e) => {
    const data = {
      taskId: task._id,
      destiantionBoard: e.target.value._id
    }
    await ChangeCardBoard(data)
    notify('Card board updated.', 'success')
  }
  const closeEdit = (e) => {{
    e.stopPropagation();
    setUpdateTask(null)
    const copy = {...isEdit}
    for(let key in copy) {
      copy[key] = false
    }
    setIsEdit(copy)
  }}
  const handleTaskUpdate = async (e, field) => {
    e.preventDefault()
    e.stopPropagation()
    const {data} = await UpdateTask(task._id, updateTask)
    setUpdateTask(null)
    setIsEdit({...isEdit, [field]: false})
    notify('Task updated', 'success')
    listCards()
    setTask(data)
  }
  if (task) {
    return (
      <Dialog open={taskModal} onClose={handleClose} fullWidth maxWidth={'lg'}>
      <DialogContent sx={{p: 4}}>
        <Grid container spacing={3} sx={{margin: 'auto', width: '100%', maxHeight: 600}}>
          <Grid lg={9} sm={12}>
            <Box sx={{overflowY: 'auto'}}>
              <Box className={!isEdit.name ? 'hoverEdit' : ''} sx={{display: 'flex', alignItems: 'center', gap: 2, p: 1, cursor: 'pointer', transition: '.2s', borderRadius: 2}} component={'div'} onClick={(e) => { setIsEdit({...isEdit, name: true })}}>
                {
                  isEdit.name ? 
                  <form onSubmit={(e) => handleTaskUpdate(e, 'name')} style={{width: '100%'}}>
                    <TextField
                      label='Name'
                      fullWidth
                      autoFocus
                      sx={{mt: 1}}
                      defaultValue={task.name}
                      size='small'
                      onChange={(e)=> setUpdateTask({...updateTask, name: e.target.value})}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">
                          <IconButton onClick={closeEdit}><CloseIcon /></IconButton>
                          <IconButton type='submit'><CheckIcon /></IconButton>
                        </InputAdornment>,
                      }}
                    />
                  </form>
                  :
                <Typography variant='h4'>
                  {task.name} 
                </Typography>
                }
              </Box>
              <Box sx={{borderRadius: 2, px: 2,  height: '100%'}}>
                {
                  isEdit.description ? 
                  <>
                    <Editor
                    apiKey='pj982s91plr6wnxxwa2mlgf50djcp09bvi7k3kq8rrtgz9dh'
                    initialValue={task.description ? task.description : ''}
                    onInit={(evt, editor) => editorRef.current = editor}
                    init={{
                      statusbar: false,
                      height: 400,
                      placeholder: 'Add a description to the task',
                      menubar: false,
                      plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'wordcount', 'emoticons'
                      ],
                      toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | emoticons',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={(content, editor) => setUpdateTask({...updateTask, description: content})}
                  />
                  <Box sx={{mt: 1, textAlign: 'right'}}>
                    <Button onClick={closeEdit}>Cancel</Button>
                    <Button onClick={(e) => handleTaskUpdate(e, 'description')} variant='contained'>Save</Button>
                  </Box>
                  </>
                  :
                  <Box component={'div'} onClick={() => setIsEdit({...isEdit, description: true})} className='hoverEdit' sx={{cursor: 'pointer', p: 1, borderRadius: 2, transition: '.2s'}}>{task.description ? parse(task.description) : 'No description'}</Box>
                }
              </Box>
            </Box>
          </Grid>
          <Grid lg={3} sx={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
            <Box sx={{display: 'flex', alignItems: 'cneter', flexDirection: 'column', gap: 1}}>
              <BoardSelect defaultValue={task.board} sx={{m: 1}} handleChange={handleBoardChange}/> 
              <Box>
                <Typography sx={{mb: 1}}>
                  Reporter:
                </Typography>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                  <Avatar alt={task.reporter.name} src={task.reporter.profilePic ? task.reporter.profilePic : './assets'}/> {task.reporter.name}
                </Box>
              </Box>
              <Box>
                <Typography sx={{mb: 1}}>
                  Assignee:
                </Typography>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}} onClick={() => setIsEdit({...isEdit, assigned: true})}>
                  {
                    isEdit.assigned ?
                    <form onSubmit={e => handleTaskUpdate(e, 'assigned')}>
                      <UserAutoComplete label={"Assigee"} defaultValue={task.assigned} handleChange={(e, val) => setUpdateTask({...updateTask, assigned: val})}/>
                      <IconButton onClick={closeEdit}><CloseIcon /></IconButton>
                      <IconButton type='submit'><CheckIcon /></IconButton>
                    </form>
                    :
                    <Box  className='hoverEdit' sx={{cursor: 'pointer', borderRadius: 2, transition: '.2s', display: 'flex', alignItems: 'center', gap: 1, width: '100%'}}>
                     <Avatar  alt={task.assigned.name} src={task.assigned.profilePic ? task.assigned.profilePic : './assets'}/>
                      <p>{task.assigned.name}</p>
                    </Box>
                  }
                </Box>
              </Box>
              <Box>
                <Typography sx={{mb: 1}}>
                  Dead Line:
                </Typography>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}} onClick={() => setIsEdit({...isEdit, deadline: true})}>
                  {
                    isEdit.deadline ? 
                      <form onSubmit={(e) => handleTaskUpdate(e, 'deadline')}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker label="End date" slotProps={{ textField: { size: 'small', sx: {width: 220, m: 1 } } }} onChange={(newValue) => setUpdateTask({...updateTask, deadline: new Date(newValue)})} format="DD/MM/YYYY"/>
                          <Box component={'div'}>
                            <IconButton onClick={closeEdit}><CloseIcon /></IconButton>
                            <IconButton type='submit'><CheckIcon /></IconButton>
                          </Box>
                        </LocalizationProvider>
                      </form>
                    :
                    <Box  className='hoverEdit' sx={{cursor: 'pointer', borderRadius: 2, transition: '.2s', display: 'flex', alignItems: 'center', gap: 1, width: '100%', p: 1}}>
                      <AlarmIcon/> {task.deadline ? format(new Date(task.deadline), 'dd/MM/yyyy') : 'None'}
                    </Box>
                  }
                </Box>
              </Box>
              <Box>
                <Typography sx={{mb: 1}}>
                  Last Update:
                </Typography>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                  <Typography variant='body1' sx={{display: 'block', p: 1}}>
                    <EditCalendarIcon/> {format(new Date(task.updatedAt), 'dd/MM/yyyy')}
                  </Typography>
                </Box>
              </Box>
              <Box onClick={() => setIsEdit({...isEdit, priority: true})}>
                <Typography sx={{mb: 1}}>
                  Priority
                </Typography>
                  {
                    isEdit.priority ?
                    <Box>
                      <form onSubmit={(e) => handleTaskUpdate(e, 'priority')}>
                        <PrioritySelect sx={{m: 1}} defaultValue={task.priority} handleChange={(e) => setUpdateTask({...updateTask, priority: e.target.value})}/> <br/>
                        <IconButton onClick={closeEdit}><CloseIcon /></IconButton>
                        <IconButton type='submit'><CheckIcon /></IconButton>
                      </form>
                    </Box>
                    :
                    <Typography variant='subtitle2'  className='hoverEdit' sx={{cursor: 'pointer', p: 1, borderRadius: 2, transition: '.2s'}}>
                      <CircleIcon  sx={{fontSize: 10, color: task.priority === 1 ? 'green' : task.priority === 2 ? 'orange' : 'red'}}/> {task.priority === 1 ? 'Low' :  task.priority === 2 ? 'Medium' : 'High'}
                    </Typography>
                  }
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
    )
  }
  return (
    <Dialog open={taskModal} onClose={handleClose} maxWidth={'xl'}>
      <DialogContent>
        <Grid container spacing={2} sx={{margin: 'auto', width: '100%'}}>
          <Grid lg={8} sm={12}>
            <TextField fullWidth label="Name" sx={{mb: 3}} onChange={(e) => setNewTask({...newTask, name: e.target.value})}/>
            <Editor
              apiKey='pj982s91plr6wnxxwa2mlgf50djcp09bvi7k3kq8rrtgz9dh'
              onInit={(evt, editor) => editorRef.current = editor}
              init={{
                statusbar: false,
                height: 400,
                placeholder: 'Add a description to the task',
                menubar: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'code', 'wordcount', 'emoticons'
                ],
                toolbar: 'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | emoticons',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
              value={newTask.description}
              onEditorChange={(content, editor) => setNewTask({...newTask, description: content})}
            />
            <Box>
            </Box>
          </Grid>
          <Grid lg={4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
            {/* working */}
            <PrioritySelect sx={{m: 1}} value={newTask.priority} handleChange={(e) => setNewTask({...newTask, priority: e.target.value})}/>
              {/* working */}
            <UserAutoComplete label={'Assignee'} handleChange={(e, val) => setNewTask({...newTask, assigned: val})}/>
              {/* working */}
            <BoardSelect defaultValue={selectedBoard._id} sx={{m: 1}} handleChange={(e) => setNewTask({...newTask, board: e.target.value})}/> 

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="End date" slotProps={{ textField: { size: 'small', sx: {width: 220, m: 1 } } }} onChange={(newValue) => setNewTask({...newTask, deadline: new Date(newValue)})} format="DD/MM/YYYY"/>
            </LocalizationProvider>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalTask