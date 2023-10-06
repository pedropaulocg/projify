import { Router } from 'express'
import * as TaskController from '../controllers/TaskController.js' 
import auth from '../middlewares/auth.js'

const taskRoutes = Router()

taskRoutes.get('/task/:projectId/:boardId', auth, TaskController.listTaskPerBoard)

taskRoutes.get('/task/:projectId', auth, TaskController.getTaskPerPeriod)

taskRoutes.post('/task/:projectId/:boardId', auth, TaskController.storeTask)

taskRoutes.put('/task-board', auth, TaskController.changeTaskBoard)

taskRoutes.put('/task/:taskId', auth, TaskController.updateTask)

taskRoutes.delete('/task/:taskId', auth, TaskController.deleteTask)

taskRoutes.get('/task-user/:projectId', auth, TaskController.taskPeruserChart)

taskRoutes.get('/task-list/:projectId', auth, TaskController.listTasksPerProject)


export default taskRoutes