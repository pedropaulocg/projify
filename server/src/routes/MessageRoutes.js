import { Router } from 'express'
import * as MessageController from '../controllers/MessageController.js' 
import auth from '../middlewares/auth.js'

const messageRoutes = Router()

messageRoutes.get('/message/:projectId', auth, MessageController.ListMessages)

messageRoutes.post('/message/:projectId', auth, MessageController.CreateMessage)


export default messageRoutes