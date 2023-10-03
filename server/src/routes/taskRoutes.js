import { Router } from 'express'
import * as TaskController from '../controllers/TaskController.js' 
import auth from '../middlewares/auth.js'

const taskRoutes = Router()

taskRoutes.get('/task/:projectId/:boardId', auth, TaskController.listTaskPerBoard)

taskRoutes.post('/task/:projectId/:boardId', auth, TaskController.storeTask)


export default taskRoutes