import { Router } from 'express'
import * as BoardController from '../controllers/BoardController.js' 
import auth from '../middlewares/auth.js'
import upload from '../config/upload.js'

const boardRoutes = Router()

boardRoutes.get('/board/:projectId', auth, BoardController.listBoards)

boardRoutes.post('/board/:projectId', auth, BoardController.storeBoard)


export default boardRoutes