import { Router } from 'express'
import * as TaskController from '../controllers/TaskController.js' 
import auth from '../middlewares/auth.js'

const taskRoutes = Router()

taskRoutes.get('/task/:projectId/:boardId', auth, TaskController.listTaskPerBoard)

taskRoutes.post('/task/:projectId/:boardId', auth, TaskController.storeTask)

taskRoutes.put('/task-board', auth, TaskController.changeTaskBoard)

taskRoutes.put('/task/:taskId', auth, TaskController.updateTask)

taskRoutes.delete('/task/:taskId', auth, TaskController.deleteTask)


export default taskRoutes