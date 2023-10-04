import React, { useRef, useState } from 'react'
import { Dialog, Button, DialogActions, DialogTitle, DialogContent, TextField, Avatar, Autocomplete , Box, Typography,Grid} from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import { StoreProject } from '../services/ProjectRequest';
import { notify } from '../Utils/Notifications';
import PrioritySelect from './PrioritySelect';
import { Editor } from '@tinymce/tinymce-react'
import UserAutoComplete from './UserAutoComplete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import BoardSelect from './BoardSelect';
import { useParams } from 'react-router-dom';
import { ChangeCardBoard, CreateTask } from '../services/Taskservice';
import parse from 'html-react-parser';
import CircleIcon from '@mui/icons-material/Circle'
import { format } from 'date-fns';
import AlarmIcon from '@mui/icons-material/Alarm';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';


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
  if (task) {
    return (
      <Dialog open={taskModal} onClose={handleClose} fullWidth maxWidth={'lg'}>
      <DialogContent sx={{p: 4}}>
        <Grid container spacing={3} sx={{margin: 'auto', width: '100%', maxHeight: 600}}>
          <Grid lg={9} sm={12}>
            <Box sx={{overflowY: 'auto'}}>
              <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                <Typography variant='h4'>
                  {task.name}
                </Typography>
              </Box>
              <Box sx={{borderRadius: 2, px: 2}}>
                { parse(task.description)}
              </Box>
            </Box>
          </Grid>
          <Grid lg={3} sx={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
            <Box sx={{display: 'flex', alignItems: 'cneter', flexDirection: 'column', gap: 1}}>
              <BoardSelect defultValue={task.board} sx={{m: 1}} handleChange={handleBoardChange}/> 
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
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                  <Avatar alt={task.assigned.name} src={task.assigned.profilePic ? task.assigned.profilePic : './assets'}/> {task.assigned.name}
                </Box>
              </Box>
              <Box>
                <Typography sx={{mb: 1}}>
                  Dead Line:
                </Typography>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                  <AlarmIcon/> {format(new Date(task.deadline), 'dd/MM/yyyy')}
                </Box>
              </Box>
              <Box>
                <Typography sx={{mb: 1}}>
                  Last Update:
                </Typography>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                  <Typography variant='body1' sx={{display: 'block'}}>
                    <EditCalendarIcon/> {format(new Date(task.updatedAt), 'dd/MM/yyyy')}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography sx={{mb: 1}}>
                  Priority
                </Typography>
                <Typography variant='subtitle2'><CircleIcon  sx={{fontSize: 10, color: task.priority === 1 ? 'green' : task.priority === 2 ? 'orange' : 'red'}}/> {task.priority === 1 ? 'Low' :  task.priority === 2 ? 'Medium' : 'High'}
                </Typography>
              </Box>
            </Box>
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
            <BoardSelect value={newTask.board} sx={{m: 1}} handleChange={(e) => setNewTask({...newTask, board: e.target.value})}/> 

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